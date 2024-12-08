"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatePartials = ({ children, ...rest }: { children: React.ReactNode }) => {
    const [uuid, generateUuid] = useState<string>("");
    useEffect(()=>{
        generateUuid(self.crypto.randomUUID());
    },[])
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={uuid}
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