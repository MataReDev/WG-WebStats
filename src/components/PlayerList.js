import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importez le composant Link depuis react-router-dom
import Player from './Player';

const PlayerList = ({ players }) => {
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);
    const [playerDetails, setPlayerDetails] = useState(null);

    const handlePlayerClick = async (player) => {
        setSelectedPlayerId(player.account_id);

        const response = await fetch(
            `https://api.worldoftanks.eu/wot/account/info/?application_id=ee1c1ba95ae2d7842580a3535c9c64e0&account_id=${player.account_id}`
        );
        const data = await response.json();

        setPlayerDetails(data.data[player.account_id]);
    };

    return (
        <div className="grid grid-cols-5 gap-4">
            {players.map((player) => (
                <div key={player.account_id} className="mb-4">
                    <Player
                        nickname={player.nickname}
                        account_id={player.account_id}
                        onClick={() => handlePlayerClick(player)}
                    />
                    {selectedPlayerId === player.account_id && playerDetails && (
                        <div className="player-details bg-yellow-100 p-4 mt-2 rounded-lg">
                            <h3>Details for {playerDetails.nickname}</h3>
                            <p>ID: {playerDetails.account_id}</p>
                            <p>Global Rating: {playerDetails.global_rating}</p>
                            <p>Last Battle Time: {new Date(playerDetails.last_battle_time * 1000).toLocaleDateString()}</p>
                            <p>Created At: {new Date(playerDetails.created_at * 1000).toLocaleDateString()}</p>
                            <p>Updated At: {new Date(playerDetails.updated_at * 1000).toLocaleDateString()}</p>
                            <h4>Statistics</h4>
                            <p>Battles: {playerDetails.statistics.all.battles}</p>
                            <p>Wins: {playerDetails.statistics.all.wins}</p>
                            <p>Losses: {playerDetails.statistics.all.losses}</p>
                            {/* Ajoutez ici d'autres détails pertinents */}
                            <Link to={`/player/${player.account_id}`} className="btn btn-primary bg-yellow-800 text-white rounded-lg px-4 py-2 block mx-auto mt-4">Plus de détails</Link>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PlayerList;
