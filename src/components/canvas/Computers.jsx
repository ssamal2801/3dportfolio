import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../loaders/HashLoader';
import PropTypes from 'prop-types';
import { HemisphereLight, Mesh, PointLight, SpotLight } from 'three';

const Computers = ({ isMobile }) => {
    const [masterLight, setMasterLight] = useState(null);
    const [frontLight, setFrontLight] = useState(null);
    const [overheadLight, setOverheadLight] = useState(null);
    const [compMesh, setCompMesh] = useState(null);

    useEffect(() => {
        // Create and set up the light sources and mesh
        const masterLight = new SpotLight(0xffffff);
        const frontLight = new PointLight(0xff0000, 1, 100);
        const overheadLight = new HemisphereLight(0xffffff);
        const compMesh = new Mesh();

        setMasterLight(masterLight);
        setFrontLight(frontLight);
        setOverheadLight(overheadLight);
        setCompMesh(compMesh);

        return () => {
            // Clean up resources when the component unmounts
            masterLight.dispose();
            frontLight.dispose();
            overheadLight.dispose();
            compMesh.geometry.dispose();
            compMesh.material.dispose();
        };
    }, []);

    const computer = useGLTF('./desktop_pc/scene.gltf');

    return (
        <mesh>
            {overheadLight && <primitive object={overheadLight} />}
            {masterLight && (
                <primitive
                    object={masterLight}
                    position={[-20, 50, 10]}
                    angle={0.12}
                    penumbra={1}
                    intensity={1}
                    castShadow
                    shadow-mapSize={1024}
                />
            )}
            {frontLight && <primitive object={frontLight} intensity={1} />}
            {compMesh && (
                <primitive
                    object={computer.scene}
                    scale={isMobile ? 0.7 : 0.75}
                    position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
                    rotation={[-0.01, -0.2, -0.1]}
                />
            )}
        </mesh>
    );
};

Computers.propTypes = {
    isMobile: PropTypes.bool.isRequired,
};

const ComputerCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia('(max-width: 500px)');

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
        };

        // Add the callback function as a listener for changes to the media query
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computers isMobile={isMobile} />
                <Preload all />
            </Suspense>
        </Canvas>
    );
};

export default ComputerCanvas;
