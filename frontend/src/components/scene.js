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
            1000000
        )
        const renderer = new THREE.WebGLRenderer({ antialias: true })


        camera.position.z = 900;
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
        let material = new THREE.MeshBasicMaterial({color: '#6F6F6F'})
        material.transparent = true;
        material.opacity = 0.2;
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

    addBoxes(iteration){

        if(this.props.boxes !==null) {
            let filtered = this.props.boxes.filter(box => box.iteration <= iteration);
            for (let i = 0; i < filtered.length; i++) {
                let box = filtered[i];
                let material = new THREE.MeshBasicMaterial({color: box.color})
                material.transparent = true;
                material.opacity = 0.5;
                const geometry = new THREE.BoxGeometry(box.x2-box.x1, box.y2-box.y1, box.z2-box.z1)
                const cube = new THREE.Mesh(geometry, material)
                cube.position.set((box.x2+box.x1)/2, (box.y2+box.y1)/2, (box.z2+box.z1)/2)
                this.scene.add(cube)
                this.state.cubes.push({"id": box.id, "cube": cube})
                let edges = new THREE.EdgesGeometry(geometry);
                let lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: '#000000'}))

                this.scene.add(lines);
                lines.position.set((box.x1+box.x2)/2, (box.y1 + box.y2)/2, (box.z1 + box.z2)/2);
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

    refresh(containerVisible, iteration){
        this.mount.removeChild(this.renderer.domElement);
        this.init();
        this.addBoxes(iteration);
        if(containerVisible){
            this.addContainer();
        }
        this.camera.position.x = this.props.container.x
        this.camera.position.y = this.props.container.y
        this.camera.position.z = this.props.container.z

        this.camera.updateProjectionMatrix()
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
                 style={{ width: '100%', height: '100%' }}
                 ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

export default Scene