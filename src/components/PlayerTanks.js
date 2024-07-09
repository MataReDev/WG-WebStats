import React, { useEffect, useState } from 'react';

const PlayerTanksComponent = ({ playerTanks }) => {
    const [tankDetails, setTankDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTankDetails = async () => {
            setIsLoading(true); // Set loading state when fetching new data

            try {
                const tankIds = Object.keys(playerTanks).flatMap(tankId => playerTanks[tankId].map(tank => tank.tank_id));
                const tankDetailsData = {};

                for (const tankId of tankIds) {
                    const response = await fetch(`https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=ee1c1ba95ae2d7842580a3535c9c64e0&tank_id=${tankId}`);
                    const data = await response.json();

                    tankDetailsData[tankId] = data.data[tankId];
                }

                setTankDetails(tankDetailsData); // Update tankDetails state
                setIsLoading(false); // Set loading state to false after data is fetched
            } catch (error) {
                console.error('Error fetching tank details:', error);
                setIsLoading(false); // Ensure loading state is set to false on error
            }
        };

        fetchTankDetails();
    }, [playerTanks]); // Trigger useEffect whenever playerTanks prop changes

    return (
        <div className='bg-gray-300 p-5 rounded grid grid-cols-5 gap-4'>
            {Object.keys(playerTanks).map((tankId) => {
                const tanksData = playerTanks[tankId];

                return tanksData.map((tankData, index) => {
                    const tankDetailsData = tankDetails[tankData.tank_id];

                    return (
                        <div key={`${tankId}-${index}`} className={`${tankDetailsData && tankDetailsData.is_premium ? 'border-2 bg-yellow-300' : 'bg-gray-100'} p-4 mb-4 rounded ${tankDetailsData && tankDetailsData.is_premium ? 'border-2 border-yellow-500' : ''}`}>
                            
                            {!isLoading && tankDetailsData ? (
                                <>
                                    <img src={tankDetailsData.images.contour_icon} alt={tankDetailsData.name} />
                                    <h3 className="text-xl font-bold">{tankDetailsData.name}</h3>
                                    <img src={tankDetailsData.images.big_icon} alt={tankDetailsData.name} />
                                    <p>Is Premium: {tankDetailsData.is_premium ? 'Yes' : 'No'}</p>
                                    <p>Nation: {tankDetailsData.nation}</p>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-xl font-bold">{tankData.tank_id}</h3>
                                    <p>Loading tank details...</p>
                                </>
                            )}
                            <p className="text-gray-600 italic text-md">
                                Battles: {tankData.statistics.battles} <br></br>
                                Wins: {tankData.statistics.wins}<br></br> 
                                Mark of Mastery: {tankData.mark_of_mastery}<br></br> 
                                Win Rate: {(tankData.statistics.wins / tankData.statistics.battles * 100).toFixed(2)}%
                            </p>
                        </div>
                    );
                });
            })}
        </div>
    );
};

export default PlayerTanksComponent;
