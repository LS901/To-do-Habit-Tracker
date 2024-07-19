import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import './styles.css';

const ProgressBar = ({className, progressUpdate = 0}) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(progressUpdate), 500);
        return () => clearTimeout(timer);
    }, [progressUpdate]);

    return (
        <Progress.Root className={`ProgressRoot overflow-hidden bg-red-800 w-1/4 h-[12px] ${className}`} value={progress}>
            <Progress.Indicator
                className="ProgressIndicator bg-green-500 w-full h-full "
                style={{ transform: `translateX(-${100 - progress}%)` }}
            />
        </Progress.Root>
    );
};

export default ProgressBar;