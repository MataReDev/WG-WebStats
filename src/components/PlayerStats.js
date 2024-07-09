import React from 'react';

const PlayerStatsComponent = ({ playerStats }) => {
    const renderStats = () => {
        if (!playerStats || !playerStats.statistics) {
            return <p>No statistics available</p>;
        }

        const stats = playerStats.statistics;
        const statCategories = Object.keys(stats);

        return (
            <div className='bg-gray-300 p-5 rounded'>
            {statCategories.map(category => (
                <div key={category} className=''>
                    <h3 className='text-xl font-bold mb-4'>{category}</h3>
                    <ul className='grid grid-cols-5 gap-4'>
                        {stats[category] && Object.keys(stats[category]).map(stat => (
                        <li key={stat} className='bg-gray-200 p-4 mb-4 rounded'>
                            {stat}: {stats[category][stat]}
                        </li>
                        ))}
                    </ul>
                </div>
            ))}
            </div>
        );
    };

    return (
        <div>
            {renderStats()}
        </div>
    );
};

export default PlayerStatsComponent;
