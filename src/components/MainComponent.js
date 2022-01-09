import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';


const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
  }
};

const mapDispatchToProps =(dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
})
class Main extends Component {

    render() {
        const dishes = this.props.dishes;
        const comments = this.props.comments;
        const leaders = this.props.leaders;
        const promotions = this.props.promotions;

        const HomePage = () => {
            return(
              <Home dish={dishes.filter((dish) => dish.featured)[0]}
                    promotion={promotions.filter((promotion) => promotion.featured)[0]}
                    leader={leaders.filter((leader) => leader.featured)[0]}
              />
            );
        };

        const DishWithId = ({match}) => {
          return(
            <Dishdetail dish={dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                        comments={comments.filter((comments) => comments.dishId === parseInt(match.params.dishId, 10))}
                        addComment={this.props.addComment}
            />
          );
        }

        return (
          <div>
            <Header/>
            <div className="container">
              <Switch>
                <Route path="/home" component={HomePage} /> 
                <Route exact path="/menu" component={() => <Menu dishes={dishes}/>}/>
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route exact path="/contactus" component={Contact} />
                <Redirect to="/home" />
              </Switch>
            </div>
            <Footer/>
          </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));