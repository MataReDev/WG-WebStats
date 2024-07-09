import React, { useState } from 'react';
import axios from 'axios';
import PlayerList from '../components/PlayerList';
const Main = () => {
    const [searchValue, setSearchValue] = useState('');
    const [players, setPlayers] = useState([]);
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Make the API request and update the player list
        try {
            const response = await axios.get(`https://api.worldoftanks.eu/wot/account/list/?application_id=ee1c1ba95ae2d7842580a3535c9c64e0&search=${searchValue}`);
            const playersData = response.data.data;
            if (playersData) {
                const playersList = playersData.map(player => ({
                    nickname: player.nickname,
                    account_id: player.account_id
                    
                }));
                setPlayers(playersList);
            } else {
                setPlayers([]);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit} className="m-4 space-x-2">
                <input type="text" placeholder="Entrez votre pseudo" value={searchValue} onChange={handleSearchChange} className="border p-2 mb-2 border-yellow-800 rounded" />
                <button type="submit" className="bg-yellow-800 text-white p-2 rounded">Valider</button>
            </form>
            <PlayerList players={players} />
            </div>
    );
};
export default Main;