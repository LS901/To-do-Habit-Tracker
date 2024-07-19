import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import './styles.css';
import { motion } from 'framer-motion';

const CheckboxIcon= ({checked, onClick}) => (
    <form>
        <motion.div
                    style={{ display: 'flex', alignItems: 'center', backgroundColor: 'transparent',  }}
                    whileHover={{ scale: [1, 1.2, 1.1], transition: { duration: 0.2 }}}
                    initial={{scale:1}}>
            <Checkbox.Root className="p-2 mr-2 !bg-transparent border-solid border-gray-500 rounded-lg hover:!bg-[#382bf0]" checked={checked} id="c1" onClick={onClick}>
                <Checkbox.Indicator className="!text-white">
                    <CheckIcon />
                </Checkbox.Indicator>
            </Checkbox.Root>
        </motion.div>
    </form>
);

export default CheckboxIcon;