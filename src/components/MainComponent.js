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


const mapStateToProps = state => {
    return {
        image: state.image,
    };
};

// Hàm chỉnh quản lý, truyền các state cho các component con của ứng dụng và điều hướng ứng dụng.
class Main extends Component {                 

    constructor(props) {                           
        super(props);      
        this.state = {           
            staffs: [], 
        };
    };

// Hàm lấy dữ liệu từ localStorage khi trang được load lại.
    componentWillMount() {
        if (localStorage && localStorage.getItem('staffs')){
            var staffs = JSON.parse(localStorage.getItem('staffs'));
            this.setState({
                staffs: staffs,
            });
        };
    };
    
// Hàm tạo ID duy nhất theo thứ tự tăng dần 1 đơn vị
    GenerateID() {
        let id = this.state.staffs.length;
        return id += 1;
    };

// Hàm nhận dữ liệu newStaff từ Staffs Component và xử lý dữ liệu lưu vào localStorage
    handleSubmitAdd = (data) => {
        var staffs=this.state.staffs;
        var newStaff = {
            id: this.GenerateID(),
            name: data.name,
            doB: data.doB,
            salaryScale: data.salaryScale,
            startDate: data.startDate,
            department: data.department,
            annualLeave: data.annualLeave,
            overTime: data.overTime,
            salary: 3000000*data.salaryScale + 200000*data.overTime,
            image: '/assets/images/alberto.png',
        };
        staffs.push(newStaff);
        this.setState({
            staffs: staffs,
        });
        localStorage.setItem('staffs', JSON.stringify(staffs));
    };
    
    
    render() {  

        let staffs = this.state.staffs;

        let departments = [
            {
                id: "Dept01",
                name: "Sale",
                numberOfStaff: (staffs.filter((staff) => staff.department === "Sale")).length,
                image: '/assets/images/sale-department.png'
            },
            {
                id: "Dept02",
                name: "HR",
                numberOfStaff: (staffs.filter((staff) => staff.department === "HR")).length,
                image: '/assets/images/hr-department.jpg'
            },
            {
                id: "Dept03",
                name: "Marketing",
                numberOfStaff: (staffs.filter((staff) => staff.department === "Marketing")).length,
                image: '/assets/images/marketing-department.jpg'
            },
            {
                id: "Dept04",
                name: "IT",
                numberOfStaff: (staffs.filter((staff) => staff.department === "IT")).length,
                image: '/assets/images/it-department.png'
            },
            {
                id: "Dept05",
                name: "Finance",
                numberOfStaff: (staffs.filter((staff) => staff.department === "Finance")).length,
                image: '/assets/images/finance-department.jpg'
             }
        ];
        
        const StaffWithId = ({match}) => {
            return (
                <StaffDetail staff={staffs.find((staff) => parseInt(staff.id, 10) === parseInt(match.params.staffId, 10))}/>
            );
        };

        const StaffOfDept = ({match}) => {
            return(
                <StaffOfDepartment items={staffs.filter((item) => item.department === match.params.department)}
                            department={departments.find((item) => item.name === match.params.department)}
                />
            );
        };

        return (        
            <div>
                <Header/>
                    <Switch>
                        <Route exact path="/home" component={() =><Home image={this.props.image} />} />
                        <Route exact path="/staffs" component={() => <Staffs staffs={staffs} handleSubmitAdd={this.handleSubmitAdd} />} />
                        <Route path="/staffs/:staffId" component={StaffWithId} />
                        <Route exact path="/departments" 
                            component={() => <Department departments={departments}/>} /> 
                        <Route path="/departments/:department" component={StaffOfDept}/> 
                        <Route exact path="/salary" component={() => <Salary staffs={staffs}/>}/> 
                        <Redirect to='/home'/>
                    </Switch>
                <Footer/>
            </div>
        );
    };
};

export default withRouter(connect(mapStateToProps)(Main));
