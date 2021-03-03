

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);

scene.background = new THREE.Color(0xff5f0)

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



var controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set( 0, 5, 5 );
controls.update();


var loader = new THREE.GLTFLoader();
var obj;
loader.load('chicken.gltf', function ( gltf ) {
        obj = gltf.scene; 
        gltf.scene.scale.set(1,1,1)
        scene.add(obj);
})


function resizeRendererToDisplaySize(renderer){
    const canvas = renderer.domElement;;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvasPixelWidth = canvas.width / window.devicePixelRatio;
    let canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize =
    canvasPixelWidth !== width || canvasPixelHeight !== height;
    if (needResize){
        renderer.setSize(width, height, false)
    }
    return needResize;
}


window.addEventListener('resize', function(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
})



var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
scene.add(light);

function animate() {

    if (resizeRendererToDisplaySize(renderer)){
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    obj.rotation.y += 0.01;
    controls.update();
}

animate();