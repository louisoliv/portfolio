'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const STAR_COUNT = 4000
// Stars live in a box around the cockpit and loop along z
const FIELD_HALF_WIDTH = 30
const FIELD_LENGTH = 60
// Most stars are packed in the corridor seen through the front window: as they only move
// along z, they keep crossing the pilot's view. The rest fill the side and top windows.
const CORRIDOR_SHARE = 0.75
const CORRIDOR_HALF_WIDTH = 12
// Keep stars out of the cockpit itself (hull radius is about 1.3)
const MIN_DISTANCE = 3
// Calm cruise: world units per second towards the pilot (-z), slow enough to stay in the background
const SPEED = 0.6
// Apparent size of a star, in pixels at one world unit away
const SIZE_SCALE = 40

const WHITE = new THREE.Color('#ffffff')
const BLUE = new THREE.Color('#bcd4ff')

// All the motion happens on the GPU: z only depends on time, so nothing is updated on the CPU per star
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uLength;
  uniform float uPixelRatio;
  attribute float aSize;
  attribute float aBrightness;
  attribute vec3 aColor;
  varying float vBrightness;
  varying vec3 vColor;

  void main() {
    vec3 p = position;
    // Drift towards the pilot and wrap around at the end of the field
    p.z = mod(p.z - uTime * uSpeed + uLength * 0.5, uLength) - uLength * 0.5;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // Fade out stars that get too close to the cockpit, and at both ends of the loop (no popping)
    float fade = smoothstep(${MIN_DISTANCE.toFixed(1)}, ${(MIN_DISTANCE * 2).toFixed(1)}, length(p))
      * (1.0 - smoothstep(uLength * 0.4, uLength * 0.5, abs(p.z)));
    vBrightness = aBrightness * fade;
    vColor = aColor;

    // Perspective size, never below one pixel
    gl_PointSize = max(1.0, aSize * uPixelRatio * ${SIZE_SCALE.toFixed(1)} / -mv.z);
  }
`

const fragmentShader = /* glsl */ `
  varying float vBrightness;
  varying vec3 vColor;

  void main() {
    // Soft round dot
    // smoothstep needs edge0 < edge1 (inverted edges are undefined in GLSL)
    float alpha = (1.0 - smoothstep(0.0, 0.5, length(gl_PointCoord - 0.5))) * vBrightness;
    gl_FragColor = vec4(vColor, alpha);
  }
`

function createStars() {
  const positions = new Float32Array(STAR_COUNT * 3)
  const sizes = new Float32Array(STAR_COUNT)
  const brightness = new Float32Array(STAR_COUNT)
  const colors = new Float32Array(STAR_COUNT * 3)
  const color = new THREE.Color()

  for (let i = 0; i < STAR_COUNT; i++) {
    const halfWidth = i < STAR_COUNT * CORRIDOR_SHARE ? CORRIDOR_HALF_WIDTH : FIELD_HALF_WIDTH
    let x, y, z
    do {
      x = (Math.random() * 2 - 1) * halfWidth
      y = (Math.random() * 2 - 1) * halfWidth
      z = (Math.random() - 0.5) * FIELD_LENGTH
    } while (Math.hypot(x, y, z) < MIN_DISTANCE)
    positions.set([x, y, z], i * 3)

    // Mostly small stars with a few bigger ones, all fairly bright
    sizes[i] = 0.4 + Math.pow(Math.random(), 3) * 1.6
    brightness[i] = 0.6 + Math.random() * 0.4
    color.copy(WHITE).lerp(BLUE, Math.random())
    colors.set([color.r, color.g, color.b], i * 3)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('aBrightness', new THREE.BufferAttribute(brightness, 1))
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
  return geometry
}

// Animated star field seen through the cockpit windows
export function Starfield() {
  const geometry = useMemo(createStars, [])
  const pixelRatio = useThree((state) => state.gl.getPixelRatio())
  const reducedMotion = usePrefersReducedMotion()
  const material = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: SPEED },
      uLength: { value: FIELD_LENGTH },
      uPixelRatio: { value: pixelRatio },
    }),
    [pixelRatio],
  )

  useFrame((_, delta) => {
    // With reduced motion the stars stay still
    if (material.current && !reducedMotion) material.current.uniforms.uTime.value += delta
  })

  return (
    // Stars move in the shader, so the geometry bounds are meaningless for culling
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
