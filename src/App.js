import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './containers/MainPage';
import PlayerPage from './containers/PlayerPage';
import Header from './components/Header';

function App() {
    return (
        <div>
            <Router basename="/">
                <Header />
                <Routes>
                    <Route exact path="/" element={<MainPage />} />
                    <Route path="/player/:account_id" element={<PlayerPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
