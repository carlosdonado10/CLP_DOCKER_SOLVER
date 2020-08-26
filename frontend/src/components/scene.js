import React, { Component } from 'react'
import * as THREE from 'three'
// import OrbitControls from 'three-orbit-controls'

class Scene extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cubes: [],
            maxX: 0,
            offset: 0.1
        }
        this.refresh = this.refresh.bind(this);
        this.init = this.init.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
        this.addBoxes = this.addBoxes.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }


    init(){
        let OrbitControls = require('three-orbit-controls')(THREE);
        let axesHelper = new THREE.AxesHelper();
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight

        const scene = new THREE.Scene()
        scene.add(axesHelper);
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            1,
            1000
        )
        const renderer = new THREE.WebGLRenderer({ antialias: true })


        camera.position.z = 4
        const controls = new OrbitControls(camera, this.mount);

        renderer.setClearColor('#b6b2b2')
        renderer.setSize(width, height)

        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.controls = controls
        this.mount.appendChild(this.renderer.domElement)
        this.start()
    }

    addContainer(){

        let box = this.props.container;
        let material = new THREE.MeshBasicMaterial({color: '0x6F6F6F'})
        material.transparent = true;
        material.opacity = 0.5;
        const geometry = new THREE.BoxGeometry(box.x, box.y, box.z)
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(box.x/2, box.y/2, box.z/2)
        this.scene.add(cube)
        this.state.cubes.push({"id": box.id, "cube": cube})
        let edges = new THREE.EdgesHelper(cube, 0x0000);
        edges.material.linewidth = 5;
        edges.position.set(box.x/2, box.y/2, box.z/2);
        this.scene.add(edges);

    }

    addBoxes(){
        let colors = {
            0: 0xe14c14,
            1: 0x71e114,
            2: 0x1439e1,
            3: 0xd7e114,
            4: 0xe114e1,
            5: 0x14d7e1
        };
        if(this.props.boxes !==null) {

            for (let i = 0; i < this.props.boxes.length; i++) {
                let box = this.props.boxes[i];
                let material = new THREE.MeshBasicMaterial({color: colors[box.type]})
                material.transparent = true;
                material.opacity = 0.5;
                const geometry = new THREE.BoxGeometry(box.x2-box.x1, box.y2-box.y1, box.z2-box.z1)
                const cube = new THREE.Mesh(geometry, material)
                cube.position.set((box.x2+box.x1)/2, (box.y2+box.y1)/2, (box.z2+box.z1)/2)
                this.scene.add(cube)
                this.state.cubes.push({"id": box.id, "cube": cube})
                let edges = new THREE.EdgesHelper(cube, 0x0000);
                edges.material.linewidth = 5;
                this.scene.add(edges);
                edges.position.set((box.x1+box.x2)/2, (box.y1 + box.y2)/2, (box.z1 + box.z2)/2);
                this.setState({
                    maxX: parseInt(this.state.maxX) + parseInt(box.x)
                })
            }
        }
    }



    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId)
    }

    refresh(){
        this.mount.removeChild(this.renderer.domElement);
        this.init();
        this.addBoxes();
        this.addContainer();
    }

    animate() {
        // this.cube.rotation.x += 0.01
        // this.cube.rotation.y += 0.01
        this.controls.update();
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