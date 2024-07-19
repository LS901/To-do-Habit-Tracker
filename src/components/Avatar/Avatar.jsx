import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import './styles.css';
const AvatarIcon = () => (
    <div style={{ display: 'flex', gap: 20 }}>
        <Avatar.Root className="AvatarRoot">
            <Avatar.Image
                className="AvatarImage"
                alt="Lewis Saunders"
            />
            <Avatar.Fallback className="AvatarFallback bg-purple-600 text-white" delayMs={600}>
                LS
            </Avatar.Fallback>
        </Avatar.Root>
    </div>
);

export default AvatarIcon;