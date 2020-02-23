import React from 'react';
import './App.css';
import Navbar from './components/layout/header/Navbar';
import ListItem from './components/items/ListItem';
const App = () => {
    return(
        <>
            <header className="header bg-dark">
                <Navbar />
            </header>
            <div className="grid">
                <ListItem />
            </div>
        </>
    )
}

export default App;
