import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import StaffDetail from './StaffDetailComponent';
import Department from './DepartmentComponent';
import StaffOfDepartment from './StaffOfDepartmentComponent';
import Salary from './SalaryComponent';
import Footer from './FooterComponent';
import { STAFFS, DEPARTMENTS } from '../shared/staffs';   
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {                 

    constructor(props) {                           
        super(props);      
        this.state = {           
            staffs: STAFFS,
            departments: DEPARTMENTS    
        };
    }

    render() {  

        const StaffWithId = ({match}) => {
            return (
                <StaffDetail staff={this.state.staffs.find((staff) => staff.id === parseInt(match.params.staffId, 10))}/>
            );
        };

        const StaffOfDept = ({match}) => {
            return(
                <StaffOfDepartment items={this.state.staffs.filter((item) => item.department.id === match.params.departmentId)}
                            department={this.state.departments.find((item) => item.id === match.params.departmentId)}
                />
            );
        }

        return (        
            <div>
                <Header/>
                <div className="container container-content">
                    <Switch>
                        <Route exact path="/staffs" component={() => <Home staffs={this.state.staffs}/>} />
                        <Route path="/staffs/:staffId" component={StaffWithId} />
                        <Route exact path="/departments" 
                            component={() => <Department departments={this.state.departments}/>} /> 
                        <Route path="/departments/:departmentId" component={StaffOfDept}/> 
                        <Route exact path="/salary" component={() => <Salary staffs={this.state.staffs}/>}/> 
                        <Redirect to='/staffs'/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Main;
