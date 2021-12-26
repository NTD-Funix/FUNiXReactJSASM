import React from 'react';
import {Card, CardBody, CardTitle, CardText, 
        InputGroup, InputGroupText, Input, 
        Breadcrumb, BreadcrumbItem,
        FormGroup, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderStaff ({item}) {
    const basicSalary = 3000000;
    const overTimeSalary = 200000;
    const salary = Math.floor((item.salaryScale*basicSalary) + (overTimeSalary*item.overTime));
    let department = item.department.id === "Dept01" ? "dept01" :
                    item.department.id === "Dept02" ? "antiquewhite" :
                    item.department.id === "Dept03" ? "aqua" :
                    item.department.id === "Dept04" ? "aquamarine" : "yellow";
    return(
        <Card id={item.id} className="Dept01">
                <CardBody className={department}>
                    <CardTitle>Họ và tên: {item.name}</CardTitle>
                    <CardText>Mã nhân viên: {item.id}</CardText>
                    <CardText>Hệ số lương: {item.salaryScale}</CardText>
                    <CardText>Số giờ làm thêm: {item.overTime}</CardText>
                    <InputGroup className={department}>
                        <InputGroupText>Lương</InputGroupText>
                        <Input value={`${salary} VNĐ`} disabled className="text-center"/>
                    </InputGroup>
                </CardBody>
        </Card>
    );
};

function Home(props) {

    function abc(e) {
        console.log(e.target.value)
    }

    const list = props.staffs.map((staff) => {
        return (
        <div className="col-12 col-md-6 col-lg-4 staff">
            <RenderStaff item={staff} />
        </div>
        );
    })
    return(
        <div>
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
                        <Label for="exampleSelect" sm={12} md={4} lg={3}>
                            Sắp xếp theo: 
                        </Label>
                        <Col sm={12} md={8} lg={9}>
                            <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            onChange={abc}
                            >
                                <option value="staffId"> Mã nhân viên</option>
                                <option value="lowToHigh">Mức lương tăng dần</option>
                                <option value="highToLow">Mức lương giảm dần</option>
                            </Input>
                        </Col>
                    </FormGroup>
                </div>
            </div>
            <hr/>
            <div className="row"> 
                {list}
            </div>
        </div>
    );
}

export default Home;