import React from 'react';

const Player = ({ nickname, account_id, onClick }) => {
  return (
    <div
      className="player-card bg-gray-200 rounded-lg p-4 w-64 cursor-pointer"
      onClick={onClick}
    >
      <h2>{nickname}</h2>
      <p>ID: {account_id}</p>
    </div>
  );
};

export default Player;
