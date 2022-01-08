import React from 'react';
import {Card, CardBody, CardTitle, CardText, CardImg} from 'reactstrap';
import {Link} from 'react-router-dom';


// Hàm hiển thị từng phòng ban.
function RenderDepartment({department}) {
    let deptClass = department.id === "Dept01" ? "dept01" :
                    department.id === "Dept02" ? "antiquewhite" :
                    department.id === "Dept03" ? "aqua" :
                    department.id === "Dept04" ? "aquamarine" : "yellow";

    return(
        <Link to={`/departments/${department.name}`}>
            <Card className={deptClass}>
                <CardBody>
                    <CardImg src={department.image} alt={department.name} className="departmentImg"/>
                    <CardTitle>{department.name} Department</CardTitle>
                    <CardTitle>ID: {department.id}</CardTitle>
                    <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
                </CardBody>
            </Card>
        </Link>
    );
}


// Hàm xử lý và hiển thị tất cả các phòng ban.
function Department(props) {
    const departmentList = props.departments.map((department) => {
        return (
        <div key={department.id} className="col-12 col-md-6 col-lg-4 staff">
            <RenderDepartment department={department}/>
        </div>
        );
    })
    return(                
        <div className="container container-content">
            <div className="row">
            <div className="col-12 ">
                <h3 className="text-center">Phòng ban</h3>
                <hr/>
            </div>
            </div>
            <div className="row"> 
                {departmentList}
            </div>
        </div>
    );
}

export default Department;