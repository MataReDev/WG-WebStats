import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="flex bg-yellow-800 p-4 text-center">
            <Link to={`/`}> <img src="https://cdn-icons-png.flaticon.com/512/7133/7133312.png" className='h-12'/> </Link>
            <h1 className="text-white text-2xl font-bold mx-auto">World Of Tanks : Stats</h1>
        </header>
    );
}

export default Header;