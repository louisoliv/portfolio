'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// Upper body cut out of assets/hologram/photo-détourée.png, down to the clasped hands
// (the stray hand in the foreground removed; the source stays out of public/)
const PORTRAIT_URL = '/hologram/pilot.webp'
const PORTRAIT_ASPECT = 512 / 578

// Forearms resting on the console head (its top is at y -0.06), facing the pilot
const HEIGHT = 0.235
const BASE_Y = -0.07
const POSITION: [number, number, number] = [0, BASE_Y + HEIGHT / 2, 0.55]
// Projector glow under the hands
const PAD_POSITION: [number, number, number] = [0, BASE_Y, 0.55]

// Time for the figure to build up from the bottom, or fade out (seconds)
const APPEAR_SPEED = 2.5

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform float uAppear;
  // 1 = scanlines scroll, flicker and glitches; 0 = still image (reduced motion)
  uniform float uMotion;
  varying vec2 vUv;

  float hash(float n) { return fract(sin(n) * 43758.5453); }

  void main() {
    vec2 uv = vUv;
    // Rare horizontal glitch: a few frames per second shift some rows sideways
    float glitch = step(0.93, hash(floor(uTime * 12.0))) * uMotion;
    uv.x += glitch * 0.012 * sin(uv.y * 90.0 + uTime * 40.0);

    vec4 tex = texture2D(uMap, uv);
    float lum = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    vec3 color = vec3(0.3, 0.72, 1.0) * (0.35 + 1.3 * lum);

    float scan = 0.7 + 0.3 * sin(vUv.y * 260.0 - uTime * 6.0 * uMotion);
    float flicker = 1.0 - uMotion * (0.08 * sin(uTime * 31.0) + 0.12 * step(0.96, hash(floor(uTime * 20.0) + 7.0)));
    // Softens the flat edge of the forearms
    float bottomFade = smoothstep(0.0, 0.06, vUv.y);
    // Builds up from the bottom, with a bright edge on the line being drawn
    float reveal = uAppear * 1.1;
    float shown = 1.0 - smoothstep(reveal - 0.08, reveal, vUv.y);
    float edge = (1.0 - smoothstep(0.0, 0.04, abs(vUv.y - reveal))) * step(uAppear, 0.99);

    float alpha = tex.a * (scan * flicker * bottomFade * shown * 0.85 + edge * 0.8);
    gl_FragColor = vec4(color + edge * 0.5, alpha);
  }
`

const padFragmentShader = /* glsl */ `
  uniform float uAppear;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float glow = 1.0 - smoothstep(0.0, 1.0, d);
    gl_FragColor = vec4(vec3(0.3, 0.72, 1.0), glow * glow * 0.6 * uAppear);
  }
`

type HologramProps = {
  visible: boolean
}

// Blue hologram of the pilot's portrait, toggled by the console's right button
export function Hologram({ visible }: HologramProps) {
  const texture = useTexture(PORTRAIT_URL)
  const reducedMotion = usePrefersReducedMotion()
  const group = useRef<THREE.Group>(null)
  const material = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uMap: { value: texture },
      uTime: { value: 0 },
      uAppear: { value: 0 },
      uMotion: { value: 1 },
    }),
    [texture],
  )
  const padUniforms = useMemo(() => ({ uAppear: uniforms.uAppear }), [uniforms])

  // Uniforms are animated through the material ref, as React Three Fiber intends
  // (the pad shares uAppear, so it follows)
  useFrame((_, delta) => {
    if (!material.current) return
    const { uAppear: appear, uTime, uMotion } = material.current.uniforms
    const target = visible ? 1 : 0
    appear.value = reducedMotion
      ? target
      : THREE.MathUtils.clamp(appear.value + Math.sign(target - appear.value) * delta * APPEAR_SPEED, 0, 1)
    uTime.value += delta
    uMotion.value = reducedMotion ? 0 : 1
    // Nothing to draw once faded out
    if (group.current) group.current.visible = appear.value > 0
  })

  return (
    // Decorative: never catches the pointer (the window and cards behind stay clickable)
    <group ref={group} visible={false}>
      <mesh position={POSITION} rotation={[0, Math.PI, 0]} raycast={() => null}>
        <planeGeometry args={[HEIGHT * PORTRAIT_ASPECT, HEIGHT]} />
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh position={PAD_POSITION} rotation={[-Math.PI / 2, 0, 0]} raycast={() => null}>
        <planeGeometry args={[0.24, 0.1]} />
        <shaderMaterial
          uniforms={padUniforms}
          vertexShader={vertexShader}
          fragmentShader={padFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
