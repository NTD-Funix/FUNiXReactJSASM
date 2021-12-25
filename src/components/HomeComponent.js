import React from 'react';
import {Card, CardBody, CardTitle, CardImg} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderStaff ({item}) {
    return(
        <Card id={item.id} className="Dept01">
            <Link to={`/staffs/${item.id}`}>
                <CardBody>
                    <CardImg src={item.image}/>
                    <CardTitle tag="p">
                        {item.name}
                    </CardTitle>
                </CardBody>
            </Link>
        </Card>
    );
};

function Home(props) {
    const list = props.staffs.map((staff) => {
        return (
        <div className="col-6 col-md-4 col-lg-2 staff">
            <RenderStaff item={staff} />
        </div>
        );
    })
    return(
        <div>
            <div className="row">
            <div className="col-12 ">
                <h3 className="text-center">Danh sách nhân viên</h3>
                <hr/>
            </div>
            </div>
            <div className="row"> 
                {list}
            </div>
        </div>
    );
}

export default Home;