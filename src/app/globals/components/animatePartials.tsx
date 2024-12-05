"use client";

import { AnimatePresence, motion } from "framer-motion";

const AnimatePartials = ({ children, ...rest }: { children: React.ReactNode }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={self.crypto.randomUUID()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                {...rest}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default AnimatePartials;