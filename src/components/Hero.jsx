import { motion } from 'framer-motion';

import { styles } from '../style';
import { ComputersCanvas } from './canvas';

const Hero = () => {
    return (
        <>
            <section className={`relative w-full h-screen mx-auto`}>
                <div
                    className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
                >
                    <div className="flex flex-col justify-center items-center mt-5">
                        <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
                        <div className="w-1 sm:h-80 h-40 violet-gradient" />
                    </div>

                    <div>
                        <h3 className={`${styles.heroHeadText} text-white`}>
                            Hi, I'm{' '}
                            <span className="text-[#915EFF]">Swagat. </span>
                            Welcome to my galaxy!
                        </h3>
                        <p
                            className={`${styles.heroSubText} mt-2 text-white-100`}
                        >
                            I develop Modern Full Stack WebAps with{' '}
                            <span className="text-[#915EFF]"> 3D</span> designs
                            like you would see on{' '}
                            <span className="text-[#915EFF]"> Apple</span> or
                            <span className="text-[#915EFF]"> Nike's</span>{' '}
                            website.
                            <br className="sm:block hidden" />I also specialize
                            in Backend development, and, Desktop and IOT app
                            development.
                            <br className="sm:block hidden" />
                            <br className="sm:block hidden" /> I love using
                            technology 👨‍💻 to solve real world problems!
                        </p>
                    </div>
                </div>
            </section>
            <ComputersCanvas />
        </>
    );
};

export default Hero;
