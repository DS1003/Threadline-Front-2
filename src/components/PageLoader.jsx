import React, { useState, useEffect } from 'react';

const PageLoader = () => {
    const [progress, setProgress] = useState(0);
    const [currentColor, setCurrentColor] = useState(0);

    const colors = ['#CC8C87', '#EAB0B7', '#CC8C87', '#EAB0B7'];

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prev) => (prev + 1) % 101);
        }, 50);

        const colorInterval = setInterval(() => {
            setCurrentColor((prev) => (prev + 1) % colors.length);
        }, 1000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(colorInterval);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#FFF5F5]">
            <div className="relative w-64 h-64">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="absolute w-full h-full border-8 rounded-full"
                        style={{
                            borderColor: colors[(currentColor + index) % colors.length],
                            transform: `rotate(${index * 45}deg) scale(${1 - index * 0.2})`,
                            opacity: progress > index * 25 ? 1 : 0,
                            transition: 'all 0.5s ease',
                        }}
                    ></div>
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-[#CC8C87]">{`${progress}%`}</span>
                </div>
            </div>
            <div className="mt-8 space-y-2 text-center">
                <p className="text-xl font-bold text-[#4A4A4A] animate-pulse">
                    Génération de votre look avant-garde
                </p>
                <p className="text-sm text-gray-800">
                    Fusion des tendances du passé, du présent et du futur
                </p>
            </div>
        </div>
    );
}; export default PageLoader;