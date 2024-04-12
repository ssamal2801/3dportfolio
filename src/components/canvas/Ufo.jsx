import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber'; // Import useFrame hook
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../loaders/HashLoader';
import PropTypes from 'prop-types';
import { HemisphereLight, Mesh, PointLight, SpotLight } from 'three';

const Ufo = ({ isMobile }) => {
    const [ascentLight, setAscentLight] = useState(null);
    const [frontLight, setFrontLight] = useState(null);
    const [overheadLight, setOverheadLight] = useState(null);
    const [ufoMesh, setUfoMesh] = useState(null);

    useEffect(() => {
        // Create and set up the light sources and mesh
        const masterLight = new SpotLight(0xffffff);
        const frontLight = new PointLight(0xff0000, 1, 100);
        const overheadLight = new HemisphereLight(0xffffff);
        const ufoMesh = new Mesh();

        setAscentLight(masterLight);
        setFrontLight(frontLight);
        setOverheadLight(overheadLight);
        setUfoMesh(ufoMesh);

        return () => {
            // Clean up resources when the component unmounts
            masterLight.dispose();
            frontLight.dispose();
            overheadLight.dispose();
            ufoMesh.geometry.dispose();
            ufoMesh.material.dispose();
        };
    }, []);

    const ufoModel = useGLTF('./UFO/Rigged_Modular.glb');

    const compRef = useRef();

    const handleScroll = () => {
        const scrollValue =
            window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const rotationValue = scrollValue * Math.PI * 4;
        if (compRef.current) {
            compRef.current.rotation.y = rotationValue;
        }
    };

    // Use useEffect hook to listen for scroll events and update rotation
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <mesh ref={compRef}>
            {overheadLight && (
                <primitive object={overheadLight} intensity={6} castShadow />
            )}
            {ascentLight && (
                <primitive
                    object={ascentLight}
                    position={[-20, 50, 20]}
                    angle={0.12}
                    penumbra={1}
                    intensity={100}
                    castShadow
                    shadow-mapSize={1024}
                />
            )}
            {frontLight && (
                <primitive
                    object={frontLight}
                    intensity={20}
                    position={[1, 1, 1]}
                />
            )}
            {ufoMesh && (
                <primitive
                    object={ufoModel.scene}
                    scale={isMobile ? 0.7 : 0.8}
                    position={isMobile ? [0, 0, 0] : [0, -0.5, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                />
            )}
        </mesh>
    );
};

Ufo.propTypes = {
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
                <Ufo isMobile={isMobile} />
                <Preload all />
            </Suspense>
        </Canvas>
    );
};

export default ComputerCanvas;
