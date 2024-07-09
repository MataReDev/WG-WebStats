import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayerTanksComponent from '../components/PlayerTanks';
import PlayerAchievementsComponent from '../components/PlayerAchievements';
import PlayerStatsComponent from '../components/PlayerStats';

const PlayerPage = () => {
    const { account_id } = useParams();
    const [playerName, setPlayerName] = useState(null);
    const [playerStats, setPlayerStats] = useState(null);
    const [playerTanks, setPlayerTanks] = useState(null);
    const [playerAchievements, setPlayerAchievements] = useState(null);
    const [allAchievements, setAllAchievements] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const achievmentResponse = await fetch(`https://api.worldoftanks.eu/wot/encyclopedia/achievements/?application_id=ee1c1ba95ae2d7842580a3535c9c64e0`);
                const achievmentData = await achievmentResponse.json();
                setAllAchievements(achievmentData.data);
                const statsResponse = await fetch(`https://api.worldoftanks.eu/wot/account/info/?application_id=ee1c1ba95ae2d7842580a3535c9c64e0&account_id=${account_id}`);
                const statsData = await statsResponse.json();
                setPlayerStats(statsData.data);
                setPlayerName(statsData.data[account_id].nickname)
                const tanksResponse = await fetch(`https://api.worldoftanks.eu/wot/account/tanks/?application_id=ee1c1ba95ae2d7842580a3535c9c64e0&account_id=${account_id}`);
                const tanksData = await tanksResponse.json();
                setPlayerTanks(tanksData.data);
                const achievementsResponse = await fetch(`https://api.worldoftanks.eu/wot/account/achievements/?application_id=ee1c1ba95ae2d7842580a3535c9c64e0&account_id=${account_id}`);
                const achievementsData = await achievementsResponse.json();
                setPlayerAchievements(achievementsData.data);
                
            } catch (error) {
                console.error('Error fetching player data:', error);
            }
        };
        fetchData();
    }, [account_id]);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold m-4 text-yellow-800">Player : {playerName}</h1>
            {playerStats && (
                <div>
                    <h2 className="text-xl font-bold m-4">Stats</h2>
                    <PlayerStatsComponent playerStats={playerStats[account_id]} />
                </div>
            )}
            {playerTanks && (
                <div>
                    <h2 className="text-xl font-bold m-4">Tanks</h2>
                    <PlayerTanksComponent playerTanks={playerTanks} player_id={account_id} />
                </div>
            )}
            {playerAchievements && (
                <div>
                    <h2 className="text-xl font-bold m-4">Achievements</h2>
                    <PlayerAchievementsComponent playerAchievements={playerAchievements} allAchievements={allAchievements}/>
                </div>
            )}
        </div>
    );
};
export default PlayerPage;