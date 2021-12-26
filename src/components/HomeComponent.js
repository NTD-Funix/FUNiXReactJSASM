import React, {useState} from 'react';
import {Card, CardBody, CardTitle, CardImg, InputGroup, FormGroup, Input} from 'reactstrap';
import { Link } from 'react-router-dom';

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


function Home(props) {

    const [search, setNewSearch] = useState('');
    const [sort, setNewSort] = useState('all');

    function handleSearchChange (e) {
            setNewSearch(e.target.value);
    };
    
    function onSort (e) {
        setNewSort(e.target.value);
    };

    const filtered = !search 
                    ? props.staffs 
                    : props.staffs.filter((staff) => 
                        staff.name.toLowerCase().includes(search.toLowerCase())
                    );

    const sorted = sort === 'all' ? filtered 
                : sort === 'manager' ? filtered.filter((a) => a.salaryScale > 1) 
                : filtered.filter((a) => a.salaryScale === 1); 

    const list = sorted.map((staff) => {
        return (
        <div className="col-6 col-md-4 col-lg-2 staff">
            <RenderStaff item={staff} />
        </div>
        );
    });

    return(
        <div>
            <div className="row">
                <div className="col-4">
                    <h3>Danh sách nhân viên</h3>
                </div>
                <div className="col-4">
                    <InputGroup>
                        <Input type="text" placeholder="Lọc theo tên nhân viên" onChange={handleSearchChange}/>
                        {/* <Button color="primary">Tìm kiếm</Button> */}
                    </InputGroup>   
                </div>
                <div className="col-4">
                    <FormGroup>
                        <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        onChange={onSort}
                        >
                        <option value="all">
                            Tất cả
                        </option>
                        <option value="manager">
                            Quản lý
                        </option>
                        <option value="staff">
                            Nhân viên
                        </option>
                        </Input>
                </FormGroup>
                {/* <label for="position">Sắp xếp theo vị trí:</label>
                    <select name="position" id="position" onChange={onSort}>
                    <option value="all" >Tất cả</option>
                    <option value="manager">Quản lý</option>
                    <option value="staff">Nhân viên</option>
                    </select> */}
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