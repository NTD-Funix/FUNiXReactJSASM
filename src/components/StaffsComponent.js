import React, { Component } from 'react';
import {Card, CardBody, CardTitle, CardImg, 
        InputGroup, Input, Button, 
        Form, FormGroup, Label, Col, FormFeedback, 
        Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';

class FormComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            isModalOpen: false,
            id: '',
            name: '',
            doB: '',
            salaryScale: 1.0,
            startDate: '',
            department: 'Sale',
            annualLeave: 0,
            overTime: 0,
            salary: '',
            clicked: false,
            touched: {
                name: false,
                doB: false,
                startDate: false,
            },
            searchValue: ''
        }
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

// Hàm xử lý Submit Uncontrolled Form (Form Tìm kiếm nhân viên)
    handleSubmitSearch (e) {
        e.preventDefault(); 
        this.setState({
            searchValue: this.fullName.value,
        })
    };

// Hàm đóng/ mở Form Thêm nhân viên
    handleToggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    };

// Hàm xử lý, lấy dữ liệu đầu vào Controlled Form (Form Thêm nhân viên).
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value,
        });
    }

// Hàm xử lý Submit Controlled Form (Form THêm nhân viên)
    handleSubmitAdd(e) {
        e.preventDefault();
        const error = this.validate(this.state.name);
        const errorsSubmit = this.validateSubmit(this.state.name, this.state.doB, this.state.startDate);
        if (error === ''
            && errorsSubmit.name === ''
            && errorsSubmit.doB === '' 
            && errorsSubmit.startDate === ''
        ) {
            this.props.handleSubmitAdd(this.state);
            this.handleToggleModal();
            this.setState({
                name: '',
                doB: '',
                salaryScale: '',
                startDate: '',
                department: 'Sale',
                annualLeave: '',
                overTime: '',
                salary: '',
            });
        };
    };

// Hàm xử lý khi Blur vào Field Controlled Form
    handleBlur = (field) => (e) => { 
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    };

// Hàm xử lý Validate Controlled Form
    validate(name) {
        let error = '';
        if(this.state.touched.name && name.length < 3) {
            error = "Yêu cầu nhiều hơn 2 ký tự";
        } else if (this.state.touched.name && name.length > 29) {
            error = "Yêu cầu ít hơn 30 ký tự";
        } 
        return error;
    };

//  Hàm xử lý validate Controlled Form khi submit
    validateSubmit(name, doB, startDate) {
        const errors = {
            name: '',
            doB: '',
            startDate:'',
        };
        if (this.state.clicked && name === '') {
            errors.name = "Yêu cầu nhập";
        } ;
        if(this.state.clicked && doB === '') {
            errors.doB = "Yêu cầu nhập";
        } ;
        if(this.state.clicked && startDate === '') {
            errors.startDate = "Yêu cầu nhập";
        } 
        return errors;
    };

// Hàm xử lý khi Click lên nút bấm Thêm ở Form Thêm nhân viên
    handleClick() {
        this.setState({
            clicked: true
        })
    }

// Hiển thị ra view của component FormComponent
    render() {
        const error = this.validate(this.state.name);
        const errorsSubmit = this.validateSubmit(this.state.name, this.state.doB, this.state.startDate);

        if(this.props.staffs){
            const filtered = !this.state.searchValue
                ? this.props.staffs 
                : this.props.staffs.filter((staff) => 
                    staff.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
                );
            var list = filtered.map((staff) => {
                return (
                    <div  key={staff.id}  className="col-6 col-md-4 col-lg-2 staff">
                        <RenderStaff item={staff} />
                    </div>
                );
            });
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12 col-md-6 header-add">
                        <h3>Nhân viên</h3>
                        <Button color="success" 
                        onClick={this.handleToggleModal}
                        >
                            <i className="fa fa-plus-square" aria-hidden="true"></i>
                            {' '}
                            Thêm nhân viên
                        </Button>
                    </div>
                    <div className="col-12 col-md-6">
                    <Form 
                    onSubmit={this.handleSubmitSearch}
                    >
                        <FormGroup>
                            <InputGroup>
                                <Input 
                                    type="text" 
                                    placeholder="Nhập tên nhân viên..."
                                    innerRef={(input) => this.fullName = input}/>
                                <Button type="submit" color="primary">Tìm kiếm</Button>
                            </InputGroup>   
                        </FormGroup>
                    </Form>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    {list}
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.handleToggleModal}>
                    <ModalHeader toggle={this.handleToggleModal}>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmitAdd}>
                            <FormGroup row>
                                <Label htmlFor="name" md={4}>Tên</Label>
                                <Col md={8}>
                                    <Input type="text" id="name" name="name" 
                                        placeholder="Nhập họ tên nhân viên"
                                        value={this.state.name}
                                        valid={error === '' && this.state.name !== '' && errorsSubmit.name === ''}
                                        invalid={error !== '' || errorsSubmit.name !== ''}
                                        onBlur={this.handleBlur('name')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errorsSubmit.name ? errorsSubmit.name : error}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                <Col md={8}>
                                    <Input type="date" id="doB" name="doB"
                                        value={this.state.doB}
                                        valid={errorsSubmit.doB === '' && this.state.doB !== ''}
                                        invalid={errorsSubmit.doB !== ''}
                                        onBlur={this.handleBlur('doB')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errorsSubmit.doB}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                <Col md={8}>
                                    <Input type="date" id="startDate" name="startDate" 
                                        value={this.state.startDate}
                                        valid={errorsSubmit.startDate === '' && this.state.startDate !== ''}
                                        invalid={errorsSubmit.startDate !== ''}
                                        onBlur={this.handleBlur('startDate')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errorsSubmit.startDate}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="department" md={4}>Phòng ban</Label>
                                <Col md={8}>
                                    <Input type="select" name="department"
                                            value={this.state.department}
                                            onChange={this.handleInputChange}>
                                        <option defaultValue>Sale</option>
                                        <option>Marketing</option>
                                        <option>Finance</option>
                                        <option>HR</option>
                                        <option>IT</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                <Col md={8}>
                                    <Input type="text" id="salaryScale" name="salaryScale" 
                                        placeholder="1.0 đến 3.0"
                                        value={this.state.salaryScale}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                <Col md={8}>
                                    <Input type="text" id="annualLeave" name="annualLeave" 
                                        placeholder="1.0"
                                        value={this.state.annualLeave}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                <Col md={8}>
                                    <Input type="text" id="overTime" name="overTime" 
                                        placeholder="1.0"
                                        value={this.state.overTime}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                            </FormGroup>
                            <hr/>
                            <FormGroup row>
                                <Col>
                                    <Button type="submit" color="primary" onClick={this.handleClick}>
                                        Thêm
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

// Hàm hiển thị ảnh, Họ và tên, Mã NV của từng nhân viên.
function RenderStaff ({item}) {
    return(
        <Card id={item.id} className="Dept01">
            <Link to={`/staffs/${item.id}`}>
                <CardBody>
                    <CardImg src={item.image} alt={item.name}/>
                    <CardTitle tag="p">
                        {item.name}
                    </CardTitle>
                    <CardTitle tag="p">
                        Mã NV: {item.id}
                    </CardTitle>
                </CardBody>
            </Link>
        </Card>
    );
};

// Hàm xử lý lọc nhân viên, sắp xếp nhân viên theo vị trí và hiển thị toàn bộ nhân viên.
function Staffs(props) {

    return(
        <div className="container container-content">
            <FormComponent 
                staffs={props.staffs}
                handleSubmitAdd={(data) => props.handleSubmitAdd(data)}
            />
        </div>
    );
}

export default Staffs;