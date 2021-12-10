import React, { Component } from 'react';
import { 
        Card, 
        CardImg, 
        CardBody, 
        CardTitle, 
        Navbar, 
        NavbarBrand,
        Modal, 
        ModalHeader, 
        ModalBody, 
        ModalFooter, 
        Button} from 'reactstrap';
import dateFormat from 'dateformat';

class ListStaff extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            selectedStaff: null,
            isOpen: false,
        };
        this.onStaffSelected = this.onStaffSelected.bind(this);
        this.hideInfo = this.hideInfo.bind(this);
    }

    onStaffSelected(staff) {
        this.setState({ 
            selectedStaff: staff,
            isOpen: !this.state.isOpen,
         });
    };

    hideInfo() {
        this.setState({ 
            isOpen: !this.state.isOpen,
        }); 
    };

    renderInfo(staff) {
        if (staff != null) {
            console.log(staff.salaryScale);
            let position = staff.salaryScale > 1 ? "Quản lý" : "Nhân viên";
            console.log(position);
            let dateDoB = dateFormat(staff.doB, "dd/mm/yyyy");
            let dateStart = dateFormat(staff.startDate, "dd/mm/yyyy");
            console.log(dateDoB, dateStart)
            return (
                <Modal
                    fullscreen="true"
                    isOpen={this.state.isOpen}
                >
                    <ModalHeader tag="h3">
                    Thông tin nhân viên
                    </ModalHeader>
                    <ModalBody className="row">
                        <div className="img-container col-md-3">
                            <CardImg
                            alt={staff.name}
                            src={staff.image}
                            />
                        </div>
                        <div className="info-container col-md-9">
                            <h4><span className="info-title">Họ và tên</span>{' : '}{staff.name}</h4>
                            <hr/>
                            <h5><span className="info-title">Vị trí</span>{' : '}{position}</h5>
                            <hr/>
                            <p><span className="info-title">Ngày sinh</span>{' : '}{dateDoB}</p>
                            <hr/>
                            <p><span className="info-title">Ngày vào công ty</span>{' : '}{dateStart}</p>
                            <hr/>
                            <p><span className="info-title">Phòng ban</span>{' : '}{staff.department.name}</p>
                            <hr/>
                            <p><span className="info-title">Số ngày nghỉ còn lại</span>{' : '}{staff.annualLeave}</p>
                            <hr/>
                            <p><span className="info-title">Số ngày đã làm thêm</span>{' : '}{staff.overTime}</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button
                        color="primary"
                        onClick={this.hideInfo}
                    >
                        Close
                    </Button>
                    </ModalFooter>
                </Modal>
            );
        }
        else {
            return (
                <div></div>
            )
        }
    };

    render() {
        const list = this.props.staffs.map((staff) => {
            let role;
            staff.salaryScale > 1 ? role = 'manager' : role = 'nomal';
            return (
                <div key={staff.id} className="col-12 col-md-6 col-lg-4 staff">
                    <Card id={staff.id} className={role} onClick={() => this.onStaffSelected(staff)}>
                        <CardBody>
                            <CardTitle tag="p">
                                {staff.name}
                            </CardTitle>
                        </CardBody>
                    </Card>
                </div>
            )
        });
        return (
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">
                            Ứng dụng quản lý nhân sự V1.0
                        </NavbarBrand>
                    </div>
                </Navbar>
                <div className="container">
                    <div className="row">
                        {list}
                    </div>
                </div>
                {this.renderInfo(this.state.selectedStaff)}
                {/* <Modal
                    fullscreen="true"
                    isOpen={this.state.isOpen}
                >
                    <ModalHeader>
                    Thông tin nhân viên
                    </ModalHeader>
                    <ModalBody className="row">
                        <div className="img-container col-3">
                            <CardImg
                            alt="Card image cap"
                            src="https://picsum.photos/318/180"
                            max-width="100%"
                            />
                        </div>
                        <div className="info-container col-9">
                            <h4>Họ và tên: Nguyễn Văn A</h4>
                            <hr/>
                            <p>Ngày sinh: 01/01/2000</p>
                            <hr/>
                            <p>Ngày vào công ty: 09/11/2020</p>
                            <hr/>
                            <p>Phòng ban: 09/11/2020</p>
                            <hr/>
                            <p>Số ngày nghỉ còn lại: 09/11/2020</p>
                            <hr/>
                            <p>Số ngày đã làm thêm: 09/11/2020</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button
                        color="primary"
                        onClick={this.hideInfo}
                    >
                        Close
                    </Button>
                    </ModalFooter>
                </Modal> */}
            </div>
        );
    }
}

export default ListStaff;
