import React, {useState} from 'react';
import {Card, CardBody, CardTitle, CardText, CardImg,
        InputGroup, InputGroupText, Input, 
        Breadcrumb, BreadcrumbItem,
        FormGroup, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

// Hàm hiển thị bảng lương của từng nhân viên.
function RenderStaff ({item, staffsSalary}) {
    let department = item.departmentId === "Dept01" ? "dept01" :
                    item.departmentId === "Dept02" ? "antiquewhite" :
                    item.departmentId === "Dept03" ? "aqua" :
                    item.departmentId === "Dept04" ? "aquamarine" : "yellow";
    let departmentName = item.departmentId === "Dept01" ? "Sale" :
                        item.departmentId === "Dept02" ? "HR" :
                        item.departmentId === "Dept03" ? "Marketing" :
                        item.departmentId === "Dept04" ? "IT" : "Finance"; 
 
    return(
        <Card id={item.id}>
            <CardBody className={department}>
                <CardTitle>Họ và tên: {item.name}</CardTitle>
                <hr/>
                <div className="row">
                    <div className="col-4">
                        <CardImg src={item.image} alt={item.name}/>
                    </div>
                    <div className="col-8">
                        <CardText>Phòng ban: {departmentName}</CardText>
                        <CardText>Mã nhân viên: {staffsSalary.indexOf(item)}</CardText>
                        <CardText>Hệ số lương: {item.salaryScale}</CardText>
                        <CardText>Số giờ làm thêm: {item.overTime}</CardText>
                    </div>
                </div>
                <InputGroup className={department}>
                    <InputGroupText>Lương</InputGroupText>
                    <Input value={`${item.salary} VNĐ`} disabled className="text-center"/>
                </InputGroup>
            </CardBody>
        </Card>
    );
};

// Hàm xử lý, sắp xếp và hiển thị thông tin bảng lương của toàn bộ nhân viên.
function Salary(props) {
    const [sortValue, onSort] = useState('staffId');
    if(props.staffsSalary) {
        function onSortChange(e) {
            onSort(e.target.value);
        }; 
        
        sortValue === "highToLow" ? props.staffsSalary.sort((a,b)=> a.salary > b.salary ? -1 : 1) 
        : sortValue === "lowToHigh" ? props.staffsSalary.sort((a,b)=> a.salary > b.salary ? 1 : -1)
        : sortValue === "department" ? props.staffsSalary.sort((a,b) => a.department > b.department ? 1 : -1)
        : sortValue === "nameAToZ" ? props.staffsSalary.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
        : sortValue === "nameZToA" ? props.staffsSalary.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1)
        : props.staffsSalary.sort((a,b)=> a.id > b.id ? 1 : -1);
    
        const listRender = props.staffsSalary.map((staffSalary) =>{
            return(
                <div  key={staffSalary.id}  className="col-12 col-md-6 col-lg-4 staff">
                    <RenderStaff item={staffSalary} staffsSalary={props.staffsSalary}/>
                </div>
            );
        });

    return(
        <div className="container container-content">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                    <Link to='/staffs'>Nhân viên</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <hr/>
            <div className="row">
                <div className="col-12 col-md-6 m-auto">
                    <h3>Bảng lương</h3>
                </div>
                <div className="col-12 col-md-6 m-auto">
                    <FormGroup row>
                        <Label for="salarySelect" sm={12} md={4} lg={3}>
                            Sắp xếp theo: 
                        </Label>
                        <Col sm={12} md={8} lg={9}>
                            <Input
                            id="salarySelect"
                            name="select"
                            type="select"
                            onChange={onSortChange}
                            >
                                <option value="staffId"> Mã nhân viên</option>
                                <option value="lowToHigh">Mức lương tăng dần</option>
                                <option value="highToLow">Mức lương giảm dần</option>
                                <option value="department">Phòng ban</option>
                                <option value="nameAToZ">Tên từ A - Z</option>
                                <option value="nameZToA">Tên từ Z - A</option>
                            </Input>
                        </Col>
                    </FormGroup>
                </div>
            </div>
            <hr/>
            <div className="row"> 
                {listRender}
            </div>
        </div>
    );
    } else {
        return (
            <div className="row">
            </div>
            );
    }
}

export default Salary;