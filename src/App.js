import React, { Component } from 'react';
//import { data } from '../src/component/multiSelect/data';

import './App.css';
import { data } from './component/multiSelect/data';
import MultiSelect from '../src/component/multiSelect'

class App extends Component {
  render() {
    console.log('parent ....')
    return (
      <div style={{ color: 'red', textAlign: "left", padding: '20' }}>
        <div style={{ padding: 100 }}>
          <MultiSelect
            data={data}
          />
        </div>
      </div>
    );
  }
}
//datasource ={data}
export default App;
