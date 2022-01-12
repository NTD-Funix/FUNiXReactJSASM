import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

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
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
})
class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
  }

    render() {
        const dishes = this.props.dishes;
        const comments = this.props.comments;
        const leaders = this.props.leaders;
        const promotions = this.props.promotions;

        const HomePage = () => {
            return(
              <Home dish={dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={dishes.isLoading}
                    dishesErrMess={dishes.errMess}
                    promotion={promotions.filter((promotion) => promotion.featured)[0]}
                    leader={leaders.filter((leader) => leader.featured)[0]}
              />
            );
        };

        const DishWithId = ({match}) => {
          return(
            <Dishdetail dish={dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                        isLoading={dishes.isLoading}
                        errMess={dishes.errMess}
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
                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
                <Redirect to="/home" />
              </Switch>
            </div>
            <Footer/>
          </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));