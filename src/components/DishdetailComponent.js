import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, 
        Breadcrumb, BreadcrumbItem, Button, 
        Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent'

const required = (val) => val && val.length;
const minLength = (min) => (val) => (val) && (val.length >= min);
const maxLength = (max) => (val) => !(val) || (val.length <= max);
class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state={
            isModalOpen: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggleModal = this.handleToggleModal.bind(this);
    }

    handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.rating, values.yourName, values.comment);
    }
 
    handleToggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    
    render() {
        return(
            <React.Fragment>
                <Button outline onClick={this.handleToggleModal}>
                    <i className="fa fa-pencil"></i>
                    {' '}
                    Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.handleToggleModal}>
                    <ModalHeader toggle={this.handleToggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" 
                                            name="rating" id="rating"
                                            className="form-control"
                                            defaultValue="1"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourName">Your Name</Label>
                                <Control.text model=".yourName" name="yourName" id="yourName" 
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                />
                                <Errors 
                                    model=".yourName"
                                    show="touched"
                                    className="text-danger"
                                    messages={{
                                        required: 'Required ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor=".comment">Comment</Label>
                                    <Control.textarea model=".comment" name="comment" id="comment" 
                                                    className="form-control" 
                                                    rows={6}
                                    />
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    };
}


function RenderDish({dish}) {
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
};

function RenderComment({comments, addComment, dishId}) {
    let comment = comments.map((comment) => {
        let timeComment = new Intl.DateTimeFormat
        ('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)));
       return (
        <div key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author}, {timeComment}</p>
        </div>
       ); 
    });  
    return (
        <div>
            {comment}
            <CommentForm 
                addComment={addComment} 
                dishId={dishId}
            />
        </div>
    );
};


const Dishdetail = (props) => {
    if(props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }

    else if(props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    else if (props.dish!= null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                        <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h3>Comments</h3>    
                        <RenderComment comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        );

    }
    else
        return(
            <div></div>
        );
}

export default Dishdetail;