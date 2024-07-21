import React from 'react';
import { motion } from 'framer-motion';
import HabitManager from "./HabitManager.jsx";

const NavBar = () => {
    return (
        <div className='sidebar-wrapper h-[100%] justify-between border-r-2 p-6 rounded-lg flex flex-row bg-gradient-to-r from-gray-600 to-gray-800'>
            <div className='flex flex-row items-center'>
                <div className='flex flex-col justify-center'>
                    <div className='flex-row flex'>
                        <span className='bg-[#ba9ffb] block transition-all duration-300 ease-out h-1 w-1 mr-2 rounded-sm -translate-y-0.5'></span>
                        <span className='bg-white block transition-all duration-300 ease-out h-1 w-6 rounded-sm -translate-y-0.5'></span>
                    </div>
                    <div className='flex-row flex'>
                        <span className='bg-[#ba9ffb] block transition-all duration-300 ease-out h-1 w-1 mr-2 rounded-sm my-0.5'></span>
                        <span className='bg-white block transition-all duration-300 ease-out h-1 w-6 rounded-sm my-0.5'></span>
                    </div>
                    <div className='flex-row flex'>
                        <span className='bg-[#ba9ffb] block transition-all duration-300 ease-out h-1 w-1 mr-2 rounded-sm translate-y-0.5'></span>
                        <span className='bg-white block transition-all duration-300 ease-out h-1 w-6 rounded-sm translate-y-0.5'></span>
                    </div>
                </div>
                <h1 className='px-3 text-gray-300 text-2xl'>My List</h1>
            </div>
            <motion.div
                className='task-manager flex flex-row items-center'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <HabitManager />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NavBar;
