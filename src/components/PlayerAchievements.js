import React from 'react';

const PlayerAchievements = ({ playerAchievements, allAchievements }) => {
    return (
        <div className='bg-gray-300 p-5 rounded'>
            {Object.keys(playerAchievements).map((achievementId) => (
                <ul key={achievementId} className='grid grid-cols-5 gap-4'>
                    {Object.entries(playerAchievements[achievementId].achievements)
                        .sort(([, valueA], [, valueB]) => valueB - valueA) // Sort by achievementValue
                        .map(([achievementName, achievementValue]) => {
                            const achievementDetails = allAchievements[achievementName];
                            
                            return (
                                <li key={achievementName} className='bg-gray-200 p-4 mb-4 rounded'>
                                    <div className='flex'>
                                        {achievementDetails ? <img src={achievementDetails.image_big} alt={achievementDetails.name_i18n} className='w-12 h-12 mr-2' /> : null}
                                        <div>
                                            <h3 className='font-bold'>{achievementDetails ? achievementDetails.name_i18n : achievementName}</h3>
                                            <p>{achievementValue}</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            ))}
        </div>
    );
};

export default PlayerAchievements;
