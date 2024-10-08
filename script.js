function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}
// Script to load the 3D model into the canvas using Three.js

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('carModelCanvas') });
renderer.setSize(window.innerWidth, 500); // Make sure the canvas matches the size defined in CSS

// Add a light to illuminate the model
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5).normalize();
scene.add(light);

// Create grid floor (optional)
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// OBJ Loader
const objLoader = new THREE.OBJLoader();
objLoader.load(
    'path/to/your/car.obj', // Path to your OBJ file
    function (object) {
        scene.add(object); // Add the loaded car model to the scene
        object.position.y = -1.5; // Adjust position of the model
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error occurred while loading the car model');
    }
);

// Set up the camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the model for a dynamic view (optional)
    scene.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

animate();

// Handle window resize to ensure the model is properly scaled
window.addEventListener('resize', function () {
    const width = window.innerWidth;
    const height = 500; // Maintain a consistent height
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
