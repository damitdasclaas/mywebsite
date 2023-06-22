import React from 'react';
import Header from "./components/Header";
import "./styles/main-style.scss";
import CalCalculator from "./components/CalCalculator";

const App: React.FC = () => {
  return (
      <div>
        <Header />
          <CalCalculator />
      </div>
  );
};

export default App;
