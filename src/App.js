import React, { Component } from 'react';
import { DEPARTMENTS, ROLE, STAFFS } from './shared/staffs';
import ListStaff from './components/staff';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      role: ROLE,
      departments: DEPARTMENTS
    }
  }
  render() {
    return (
      <ListStaff staffs= {this.state.staffs} />
    );
  }
}

export default App;
