import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Navbar, NavbarBrand, Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';

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
    }

    render() {
        const list = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-12 col-md-6 col-lg-4 staff">
                    <Card id={staff.id}  onClick={() => this.onStaffSelected(staff)}>
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
                <Modal
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
                </Modal>
            </div>
        );
    }
}

export default ListStaff;
