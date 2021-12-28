import React, {useState} from 'react';
import {Card, CardBody, CardTitle, CardText, CardImg,
        InputGroup, InputGroupText, Input, 
        Breadcrumb, BreadcrumbItem,
        FormGroup, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


// Hàm hiển thị bảng lương của từng nhân viên.
function RenderStaff ({item}) {
    let department = item.department.id === "Dept01" ? "dept01" :
                    item.department.id === "Dept02" ? "antiquewhite" :
                    item.department.id === "Dept03" ? "aqua" :
                    item.department.id === "Dept04" ? "aquamarine" : "yellow";
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
                        <CardText>Phòng ban: {item.department.name}</CardText>
                        <CardText>Mã nhân viên: {item.id}</CardText>
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

    const newStaffs = props.staffs.map((staff) => {
        const basicSalary = 3000000;
        const overTimeSalary = 200000;
        const salary = Math.floor((staff.salaryScale*basicSalary) + (overTimeSalary*staff.overTime));
        staff.salary=salary;
        return (
            staff
            );
        });

        const [sortValue, onSort] = useState('staffId');
    
        function onSortChange(e) {
            onSort(e.target.value);
        }; 
        
    sortValue === "highToLow" ? newStaffs.sort((a,b)=> a.salary > b.salary ? -1 : 1) 
    : sortValue === "lowToHigh" ? newStaffs.sort((a,b)=> a.salary > b.salary ? 1 : -1)
    : sortValue === "department" ? newStaffs.sort((a,b) => a.department.name > b.department.name ? 1 : -1)
    : sortValue === "nameAToZ" ? newStaffs.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
    : sortValue === "nameZToA" ? newStaffs.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1)
    : newStaffs.sort((a,b)=> a.id > b.id ? 1 : -1);
    
    const listRender = newStaffs.map((newStaff) =>{
        return(
            <div  key={newStaff.id}  className="col-12 col-md-6 col-lg-4 staff">
                <RenderStaff item={newStaff} />
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
}

export default Salary;