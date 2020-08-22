import React, { Component } from 'react'
import * as THREE from 'three'

class Scene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cubes: [],
            maxX: 0,
            offset: 0.1
        }


            this.start = this.start.bind(this)
            this.stop = this.stop.bind(this)
            this.animate = this.animate.bind(this)
            this.addBoxes = this.addBoxes.bind(this)
        }

        addBoxes(boxes){
            const material = new THREE.MeshBasicMaterial({ color: '#433F81' })

            for(let i=0; i<boxes.length; i++){
                let box = boxes[i];
                const offset = this.state.maxX + this.state.offset;
                const geometry = new THREE.BoxGeometry(box.x, box.y, box.z)
                const cube = new THREE.Mesh(geometry, material)
                cube.position.set(this.state.maxX + offset, 0, 0)
                this.scene.add(cube)
                this.state.cubes.push({"id": box.id, "cube": cube})
                this.setState({
                    maxX: parseInt(this.state.maxX) + parseInt(box.x)
                })
            }


        }

        componentDidMount() {
            const width = this.mount.clientWidth
            const height = this.mount.clientHeight

            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(
                75,
                width / height,
                0.1,
                1000
            )
            const renderer = new THREE.WebGLRenderer({ antialias: true })


            camera.position.z = 4

            renderer.setClearColor('#b6b2b2')
            renderer.setSize(width, height)

            this.scene = scene
            this.camera = camera
            this.renderer = renderer


            this.mount.appendChild(this.renderer.domElement)
            this.start()
        }

        componentWillUnmount() {
            this.stop()
            this.mount.removeChild(this.renderer.domElement)
        }

        start() {
            if (!this.frameId) {
                this.frameId = requestAnimationFrame(this.animate)
            }
        }

        stop() {
            cancelAnimationFrame(this.frameId)
        }

        animate() {
            // this.cube.rotation.x += 0.01
            // this.cube.rotation.y += 0.01

            this.renderScene()
            this.frameId = window.requestAnimationFrame(this.animate)
        }

        renderScene() {
            this.renderer.render(this.scene, this.camera)
        }

        render() {
            return (
                <div className="scenediv"
                    style={{ width: '1000px', height: '400px' }}
                    ref={(mount) => { this.mount = mount }}
                />
            )
        }
    }

    export default Scene