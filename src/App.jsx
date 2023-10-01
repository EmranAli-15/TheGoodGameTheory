import React, { useEffect, useState } from 'react';

const App = () => {
    const [percent, setPercent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!isPaused) {
            const id = setInterval(() => {
                if (percent < 100) {
                    setPercent(percent + 1);
                } else {
                    clearInterval(id);
                }
            }, 1000);
            return () => clearInterval(id);
        }
    }, [percent, isPaused]);

    const style = {
        background: `conic-gradient(red ${percent * 3.6}deg, gray 0deg)`
    }

    const handlePause = () => {
        setIsPaused(true)
    }

    const handleResume = () => {
        setIsPaused(false)
    }

    return (
        <div>
            <div className='flex items-center justify-center'>
                <div className='circular' style={style} >
                    <h1 className='text-red-500 font-bold text-5xl z-10'>
                        {percent}%
                    </h1>
                </div>
            </div>
            <div className='flex justify-center items-center mt-10 gap-x-10'>
                <button className='btn btn-error' onClick={() => handlePause()}>
                    Pause
                </button>
                <button className='btn btn-warning' onClick={() => handleResume()}>
                    Resume
                </button>
            </div>
        </div>
    );
};

export default App;