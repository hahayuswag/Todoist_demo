import React, { Component } from 'react';
import Event_deal from './components/Event_deal/event_deal.js';
//import Button from 'antd/lib/button';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Event_deal/>
        {/* zhushi */}
      </div>
      //<div className="App">
      //  <Button type="primary">Button</Button>
      //</div>
    );
  }
}

export default App;
