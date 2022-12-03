import { motion } from 'framer-motion'
import styles from '../Sumi/styles.module.css'

const Kinetic = () => {
    const variants = {
        static: {
            scale: 1,
            rotate: 0
        },
        flowing: {
            scale: [1, 1.2, 1],
            rotate: [0, 0, 45],
            transition: {
                duration: 1,
                times: [0, 0.5, 1],
                loop: Infinity,
                ease: 'easeInOut'
            }
        }
    }
    return (
        <div className={styles.marienate}>
        <motion.div
        width="50"
        height="50"
        // viewBox="0 0 50 50"
        fill="none"
        background="none"
        animate="flowing"
        variants={variants}
        >
        </motion.div>
        </div>
    )
}

export default Kinetic