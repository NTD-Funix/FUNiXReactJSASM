import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Staffs from './StaffsComponent';
import StaffDetail from './StaffDetailComponent';
import Department from './DepartmentComponent';
import StaffOfDepartment from './StaffOfDepartmentComponent';
import Salary from './SalaryComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchStaffs, fetchDepartments, postStaff, onDelete, fetchStaffsSalary, changeInfo } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return { 
        staffs: state.staffs,
        departments: state.departments,
        homeImage: state.homeImage,
        deptImages: state.deptImages,
        staffsSalary: state.staffsSalary,
    };
};

const mapDispatchToProps = dispatch => ({
    postStaff: (name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => dispatch(postStaff(name, doB, startDate, departmentId, salaryScale, annualLeave, overTime)),
    fetchStaffs: () => {dispatch(fetchStaffs())},
    onDelete: (staffId) => dispatch(onDelete(staffId)),
    fetchDepartments: () => {dispatch(fetchDepartments())},
    fetchStaffsSalary: () => {dispatch(fetchStaffsSalary())},
    changeInfo: (staffId, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => dispatch(changeInfo(staffId, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime)),
});


// Hàm chỉnh quản lý, truyền các state cho các component con của ứng dụng và điều hướng ứng dụng.
class Main extends Component {    

    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartments();
        this.props.fetchStaffsSalary();
    }
    
    render() {  

        const staffs = this.props.staffs.staffs;
        const departments = this.props.departments.departments;
        const staffsSalary = this.props.staffsSalary.staffsSalary;
        
        const StaffWithId = ({match}) => {
            return (
                <StaffDetail staff={staffs.find((staff) => parseInt(staff.id, 10) === parseInt(match.params.staffId, 10))}
                            departments = {departments} changeInfo={this.props.changeInfo}
                />
            );
        };

        const StaffOfDept = ({match}) => {
            return(
                <StaffOfDepartment items={staffs.filter((item) => item.departmentId === match.params.departmentId)}
                            department={departments.find((item) => item.id === match.params.departmentId)}
                />
            );
        };

        return (        
            <div>
                <Header/>
                    <Switch>
                        <Route exact path="/home" component={() =><Home image={this.props.homeImage} />} />
                        <Route exact path="/staffs" component={() => <Staffs staffs={staffs} 
                                                                        postStaff={this.props.postStaff}
                                                                        onDelete={this.props.onDelete}
                                                                        />}/>
                        <Route path="/staffs/:staffId" component={StaffWithId} />
                        <Route exact path="/departments" 
                            component={() => <Department departments={departments} deptImages={this.props.deptImages}/>} /> 
                        <Route path="/departments/:departmentId" component={StaffOfDept}/> 
                        <Route exact path="/salary" component={() => <Salary staffsSalary={staffsSalary}/>}/> 
                        <Redirect to='/home'/>
                    </Switch>
                <Footer/>
            </div>
        );
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
