import * as THREE from 'three'
import { PANELS, SectionId } from './panels'

// Same transform chain as the nested groups in Cockpit.tsx: mesh-local space -> world space
const MODEL_MATRIX = new THREE.Matrix4()
  .makeRotationX(-Math.PI / 2)
  .multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2).scale(new THREE.Vector3(0.01, 0.01, 0.01)))
  .multiply(new THREE.Matrix4().makeRotationY(Math.PI))
  .multiply(new THREE.Matrix4().makeRotationX(-Math.PI / 2).scale(new THREE.Vector3(100, 100, 100)))
const WORLD_TO_LOCAL = MODEL_MATRIX.clone().invert()

// Max distance between an island's center and a panel's center to belong to it.
// Neighbouring wall triangles sit ~0.25 away, panel plates and lights ~0.01.
const MATCH_DISTANCE = 0.15

export type SplitGeometry = {
  rest: THREE.BufferGeometry
  panels: Map<SectionId, THREE.BufferGeometry>
}

// Unit vector, in mesh-local space, along which a panel lifts towards the cockpit interior
export function getLocalPanelNormal(id: SectionId) {
  const panel = PANELS.find((p) => p.id === id)!
  return new THREE.Vector3(...panel.normal).transformDirection(WORLD_TO_LOCAL)
}

function withIndex(source: THREE.BufferGeometry, index: number[]) {
  const geometry = new THREE.BufferGeometry()
  // Attributes are shared with the source geometry, only the index differs
  for (const [name, attribute] of Object.entries(source.attributes)) geometry.setAttribute(name, attribute)
  geometry.setIndex(index)
  geometry.computeBoundingSphere()
  return geometry
}

// The model stores all panels in one mesh: split out the connected pieces
// (islands) sitting on each interactive panel so they can move on their own.
export function splitPanels(source: THREE.BufferGeometry): SplitGeometry {
  const position = source.getAttribute('position')
  const index = source.getIndex()!.array

  // Union-find over vertices, merging duplicated vertices at UV seams by position
  const keyToId = new Map<string, number>()
  const vertexId = new Int32Array(position.count)
  for (let i = 0; i < position.count; i++) {
    const key = `${position.getX(i).toFixed(4)},${position.getY(i).toFixed(4)},${position.getZ(i).toFixed(4)}`
    if (!keyToId.has(key)) keyToId.set(key, keyToId.size)
    vertexId[i] = keyToId.get(key)!
  }
  const parent = Array.from({ length: keyToId.size }, (_, i) => i)
  const find = (x: number): number => {
    while (parent[x] !== x) x = parent[x] = parent[parent[x]]
    return x
  }
  for (let t = 0; t < index.length; t += 3) {
    const a = find(vertexId[index[t]])
    parent[find(vertexId[index[t + 1]])] = a
    parent[find(vertexId[index[t + 2]])] = a
  }

  // Bounding box of each island, in world space
  const boxes = new Map<number, THREE.Box3>()
  const v = new THREE.Vector3()
  for (let t = 0; t < index.length; t += 3) {
    const root = find(vertexId[index[t]])
    if (!boxes.has(root)) boxes.set(root, new THREE.Box3())
    for (let k = 0; k < 3; k++) boxes.get(root)!.expandByPoint(v.fromBufferAttribute(position, index[t + k]).applyMatrix4(MODEL_MATRIX))
  }

  const islandToPanel = new Map<number, SectionId>()
  const center = new THREE.Vector3()
  boxes.forEach((box, root) => {
    box.getCenter(center)
    const panel = PANELS.find((p) => center.distanceTo(v.set(...p.position)) < MATCH_DISTANCE)
    if (panel) islandToPanel.set(root, panel.id)
  })

  const restIndex: number[] = []
  const panelIndex = new Map<SectionId, number[]>(PANELS.map((p) => [p.id, []]))
  for (let t = 0; t < index.length; t += 3) {
    const panelId = islandToPanel.get(find(vertexId[index[t]]))
    const target = panelId ? panelIndex.get(panelId)! : restIndex
    target.push(index[t], index[t + 1], index[t + 2])
  }

  return {
    rest: withIndex(source, restIndex),
    panels: new Map(Array.from(panelIndex, ([id, idx]) => [id, withIndex(source, idx)])),
  }
}
