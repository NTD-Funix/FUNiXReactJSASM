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
            let position = staff.salaryScale > 1 ? "Quản lý" : "Nhân viên";
            let dateDoB = dateFormat(staff.doB, "dd/mm/yyyy");
            let dateStart = dateFormat(staff.startDate, "dd/mm/yyyy");
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
                        color="danger"
                        outline
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
            </div>
        );
    }
}

export default ListStaff;
