import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles.scss';

import Board from './components/board/Board';
import Join from './components/join/Join';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Routes>
            <Route exact path="/" element={<Join />} key="join" />
            <Route exact path="/board" element={<Board />} key="board" />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
