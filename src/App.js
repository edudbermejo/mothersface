import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import MotherInterface from './components/MotherInterface';

class App extends React.Component {
  render() {
    return (
    <Router>
      <Route exact path="/" component={MotherInterface} />
    </Router>
    )};
}

export default App;
