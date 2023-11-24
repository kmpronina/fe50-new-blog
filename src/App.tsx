import React from 'react';
import Router from '#router/Router';
import MainContext from '#store/context';

function App() {
  return (
    <MainContext>
      <Router />
    </MainContext>
  );
}

export default App;
