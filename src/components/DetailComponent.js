import React, { Component }from 'react';

class Detail extends Component {
    render() {
        return(
            <div className="row detail">
            <div className="col-12 col-md-6 detail-comment">
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
        );
    }
}

export default Detail;