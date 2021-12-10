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

class ListStaff extends Component {                 // ListStaff Component để xử lý hiển thị thông tin nhân viên.

    constructor(props) {                            //Thiết lập state cho component và nhận dữ liệu đc truyền từ App qua props.
        super(props);                               //Sử dụng this.props trong phạm vi hàm constructor này.
        this.state = {                              //Thiết lập state ban đầu cho component.
            selectedStaff: null,                    //Thông tin nhân viên lúc đầu bằng "null".
            isOpen: false,                          // Cờ ẩn/hiện thông tin nhân viên bằng false sẽ ẩn và ngược lại.
        };
        this.onStaffSelected = this.onStaffSelected.bind(this);     // Hàm bind() dùng để gán dữ liệu vào đối tượng this của hàm đang dùng.
        this.hideInfo = this.hideInfo.bind(this);
    }

    onStaffSelected(staff) {     // Khi có sự kiện onClick vào tên nhân viên sẽ gọi hàm này với tham số là thông tin nhân viên được click.
        this.setState({          // Set state khi có sự kiện onClick vào tên nhân viên.
            selectedStaff: staff,       // Set state selectedStaff bằng object chứa thông tin nhân viên đc click.
            isOpen: !this.state.isOpen, // Set state isOpen bằng true để hiển thị thông tin nhân viên.
         });
    };

    hideInfo() {                // Khi có sự kiện onClick vào button "Close" sẽ gọi hàm hideInfo.
        this.setState({         // Set lại state isOpen = false để ẩn thông tin.
            isOpen: !this.state.isOpen,
        }); 
    };

    renderInfo(staff) {       // Hàm hiển thị chi tiết thông tin nhân viên được click với tham số truyền vào là thông tin nhân viên đó.
        if (staff != null) {
            let position = staff.salaryScale > 1 ? "Quản lý" : "Nhân viên";
            let dateDoB = dateFormat(staff.doB, "dd/mm/yyyy");      // Định dạng thời gian theo dd/mm/yyyy.
            let dateStart = dateFormat(staff.startDate, "dd/mm/yyyy");
            return (            // Trả về thông tin nhân viên và cách hiển thị.
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

    render() {      // Hàm render các element cần thiết của component.
        const list = this.props.staffs.map((staff) => {         // Lặp qua danh sách nhân viên.
            let role = staff.salaryScale > 1 ?  'manager' : 'nomal';
            let apartment = staff.department.id === "Dept01" ? 'dept01' : 
                            staff.department.id === "Dept02" ? 'antiquewhite' : 
                            staff.department.id === "Dept03" ? 'aqua' : 
                            staff.department.id === "Dept04" ? 'aquamarine' : 'yellow';
            return (        // Trả dữ liệu về cho hàm map().
                <div key={staff.id} className="col-12 col-md-6 col-lg-4 staff">
                    <Card id={staff.id} className={apartment} onClick={() => this.onStaffSelected(staff)}>
                        <CardBody>
                            <CardTitle tag="p" className={role}>
                                {staff.name}
                            </CardTitle>
                        </CardBody>
                    </Card>
                </div>
            )
        });
        return (        // Trả dữ liệu về cho hàm render() để hiển thị ra màn hình.
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">
                            Ứng dụng quản lý nhân sự V1.0
                        </NavbarBrand>
                    </div>
                </Navbar>
                <div className="container container-content">
                    <h5 className="staff-detail">(Bấm vào tên nhân viên để xem thông tin chi tiết)</h5>  
                    <div className="row">
                        {list}
                    </div>
                    <div className="row">
                        <div className="col-md-6 detail">
                            <p>Chú thích:</p>
                            <ul>
                                <li className="manager">Quản lý</li>
                                <li className="nomal">Nhân viên</li>
                                <li>
                                    <span className="info-detail sale"></span>
                                    <span className="info-department">- Sale Department</span>
                                </li>
                                <li>
                                    <span className="info-detail hr"></span>
                                    <span className="info-department">- HR Department</span>
                                </li>
                                <li>
                                    <span className="info-detail marketing"></span>
                                    <span className="info-department">- Marketing Department</span>
                                </li>
                                <li>
                                    <span className="info-detail it"></span>
                                    <span className="info-department">- IT Department</span>
                                </li>
                                <li>
                                    <span className="info-detail finance"></span> 
                                    <span className="info-department">- Finance Department</span>  
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {this.renderInfo(this.state.selectedStaff)} 
            </div>
        );
    }
}

export default ListStaff;
