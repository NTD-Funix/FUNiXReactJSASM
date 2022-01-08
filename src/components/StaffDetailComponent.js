import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardBody} from 'reactstrap';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';


// Hàm hiển thị thông tin chi tiết của nhân viên.
function RenderStaff({staff}) {
    let doB = dateFormat(staff.doB, "dd/mm/yyyy");
    let startDate = dateFormat(staff.startDate, "dd/mm/yyyy");
    let position = staff.salaryScale > 1 ? "Quản lý" : "Nhân viên";
    return(
        <div className="row">
            <div className="col-12 col-md-4 col-lg-3 m-auto">
                <Card>
                    <CardBody>
                        <CardImg src={staff.image} alt={staff.name} />
                    </CardBody>
                </Card>
            </div>
            <div className="col-12 col-md-8 col-lg-9 p-3">
                    <div className="input-group mb-1">
                        <span className="input-group-text">Họ và tên</span>
                        <input type="text" className="form-control" placeholder="Username" name="usrname" value={staff.name} disabled />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text">Vị trí</span>
                        <input type="text" className="form-control" value={position} disabled />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text">Ngày sinh</span>
                        <input type="text" className="form-control" value={doB} disabled />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text">Ngày vào công ty</span>
                        <input type="text" className="form-control" value={startDate} disabled />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text">Phòng ban</span>
                        <input type="text" className="form-control" value={staff.department} disabled />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text">Số ngày nghỉ còn lại</span>
                        <input type="text" className="form-control" value={staff.annualLeave} disabled />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text">Số ngày đã làm thêm</span>
                        <input type="text" className="form-control" value={staff.overTime} disabled />
                    </div>
            </div>
        </div>
    );
}

// Hàm xử lý và hiển thị thông tin chi tiết của nhân viên.
const StaffDetail = (props) => {
    let staff = props.staff;
    if (staff != null) {
        return(
            <div className="container container-content">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                        <Link to='/staffs'>Nhân viên</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <hr/>  
                <div className="row">
                    <div className="col-12 ">
                        <h3>Thông tin cơ bản</h3>
                    </div>
                </div> 
                    <RenderStaff staff={staff}/>
            </div>
        );
    } else {
        return(
            <div></div>
        )
    }
}

export default StaffDetail;