import React from 'react';
import './App.css';
import QuestionLoader from './components/QuestionLoader'; // QuestionLoaderをインポート

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <QuestionLoader />
      </header>
    </div>
  );
}

export default App;
