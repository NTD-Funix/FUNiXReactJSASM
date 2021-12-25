import React from 'react';
import {Card, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';


function RenderStaffOfDep({item}) {
    let department = item.department.id === "Dept01" ? "dept01" :
                    item.department.id === "Dept02" ? "antiquewhite" :
                    item.department.id === "Dept03" ? "aqua" :
                    item.department.id === "Dept04" ? "aquamarine" : "yellow";
    return(
        <Card id={item.id} className="Dept01">
            <CardBody>
                <CardImg src={item.image}/>
                <CardTitle tag="p" className={department}>
                    {item.name}
                </CardTitle>
            </CardBody>
        </Card>
    );

}

function StaffOfDepartment(props) {
    const list = props.items.map((item) => {
        return (
        <div className="col-6 col-md-4 col-lg-2 staff">
            <RenderStaffOfDep item={item} />
        </div>
        );
    })
    return(
        <div>
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                    <Link to='/departments'>Phòng ban</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <hr/>
            <div className="row">
                <div className="col-12 ">
                    <h3>Danh sách nhân viên phòng {props.department.name}</h3>
                </div>
            </div>
            <div className="row"> 
                {list}
            </div>
        </div>
    );
}

export default StaffOfDepartment;