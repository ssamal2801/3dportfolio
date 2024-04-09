import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { technologies } from '../constants';
import FramerWrapper from './FramerWrapper';

const TechStack = () => {
    return (
        <div className="flex flex-wrap gap-10">
            {technologies.map((tech) => (
                <Tilt key={tech.title} className="xs:w-[250px] w-full">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
                    >
                        <div
                            className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
                            style={{ background: '#4f2d98' }}
                        >
                            <img
                                src={tech.icon}
                                alt={tech.title}
                                className="w-16 h-16 object-contain"
                            />
                            <h3 className="text-white text-[20px] font-bold text-center">
                                {tech.title}
                            </h3>
                        </div>
                    </motion.div>
                </Tilt>
            ))}
        </div>
    );
};

export default FramerWrapper(TechStack, 'techStack');
