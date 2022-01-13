import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
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
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
})
class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
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
                    promotion={promotions.promotions.filter((promotion) => promotion.featured)[0]}
                    promosLoading={promotions.isLoading}
                    promosErrMess={promotions.errMess}
                    leader={leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading={leaders.isLoading}
                    leadersErrMess={leaders.errMess}
              />
            );
        };

        const DishWithId = ({match}) => {
          return(
            <Dishdetail dish={dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                        dishesLoading={dishes.isLoading}
                        dishesErrMess={dishes.errMess}
                        comments={comments.comments.filter((comments) => comments.dishId === parseInt(match.params.dishId, 10))}
                        commentsErrMess={comments.errMess}
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