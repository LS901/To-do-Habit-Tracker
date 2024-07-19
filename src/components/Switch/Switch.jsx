import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import './styles.css';

const SwitchToggle = () => (
    <form>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <label className="Label !w-auto" htmlFor="airplane-mode" style={{ paddingRight: 15, color: "black" }}>
                Dark Mode
            </label>
            <Switch.Root className="SwitchRoot" id="airplane-mode">
                <Switch.Thumb className="SwitchThumb" />
            </Switch.Root>
        </div>
    </form>
);

export default SwitchToggle;