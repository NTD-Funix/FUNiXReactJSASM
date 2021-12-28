import React from 'react';


// Hàm hiển thị trang chủ.
function Home(props) {
    return(
        <div>
            <img src={props.image.img} alt={props.image.name} width="100%"/>
        </div>
    );
}

export default Home;