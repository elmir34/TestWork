import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color('black')

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.BasicShadowMap
const controls = new OrbitControls(camera, renderer.domElement)


const cubeGeometry = new THREE.BoxGeometry()
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 'yellow' })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.castShadow = true
cube.position.x = -2
scene.add(cube)

const sphereGeometry = new THREE.SphereGeometry()
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow = true
scene.add(sphere)


var doorWidth = 1
var doorHeight = 2

const doorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, 0.1)
const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 })
const door = new THREE.Mesh(doorGeometry, doorMaterial)
door.castShadow = true
door.position.x = 2
scene.add(door)


const light = new THREE.PointLight('white', 30)
light.position.set(4, 5, 6)
light.castShadow = true
scene.add(light)

const groundGeometry = new THREE.PlaneGeometry(100, 100)
const groundMaterial = new THREE.MeshStandardMaterial({ color: 'white', side: THREE.DoubleSide })
const ground = new THREE.Mesh(groundGeometry, groundMaterial)
ground.rotation.x = Math.PI / 2
ground.position.y = -2
ground.receiveShadow = true
scene.add(ground)

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  cube.rotation.x += 0.1
}

animate()

function updateDoorSize(width, height) {
    door.geometry.dispose()
    door.geometry = new THREE.BoxGeometry(width, height, 0.1)
  }

  const minSizeDoor = document.createElement('button')
  minSizeDoor.textContent = 'Уменьшить дверь'
  minSizeDoor.style.top = '1vw'
  minSizeDoor.addEventListener('click', () => {
    doorWidth -= 0.2
    doorHeight -= 0.2
    updateDoorSize(doorWidth, doorHeight)
  })
  document.body.appendChild(minSizeDoor)

  const maxSizeDoor = document.createElement('button')
  maxSizeDoor.textContent = 'Увеличить дверь'
  maxSizeDoor.style.top = '5vw'
  maxSizeDoor.addEventListener('click', () => {
    doorHeight += 0.2
    doorWidth += 0.2
    updateDoorSize(doorWidth, doorHeight)
  });
  document.body.appendChild(maxSizeDoor)