import React from 'react';
import {Card, CardBody, CardTitle, CardText} from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderDepartment({item}) {
    let department = item.id === "Dept01" ? "dept01" :
                    item.id === "Dept02" ? "antiquewhite" :
                    item.id === "Dept03" ? "aqua" :
                    item.id === "Dept04" ? "aquamarine" : "yellow";
    return(
        <Link to={`/departments/${item.id}`}>
            <Card className={department}>
                <CardBody>
                    <CardTitle>{item.name} Department</CardTitle>
                    <CardTitle>ID: {item.id}</CardTitle>
                    <CardText>Số lượng nhân viên: {item.numberOfStaff}</CardText>
                </CardBody>
            </Card>
        </Link>
    );
}

function Department(props) {
    const departmentList = props.departments.map((department) => {
        return (
        <div className="col-12 col-md-6 col-lg-4 staff">
            <RenderDepartment item={department} />
        </div>
        );
    })
    return(
        <div>
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