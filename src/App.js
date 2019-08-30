import React from 'react';
import './App.css';
import logo from './nostromo.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MU/TH/UR</h1>
        <h2>6000</h2>
        <img src={logo} className="App-logo" />
      </header>
      <main class="App-main">
        <div class="chat-container">
          <span class="cursor"></span>
        </div>
      </main>
    </div>
  );
}

export default App;
