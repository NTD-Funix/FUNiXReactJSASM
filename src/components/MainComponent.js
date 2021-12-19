import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
// import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
    }
  }

    render() {
        const dishes = this.state.dishes;
        // const dish = dishes.find((dish) =>  dish.id === this.state.selectedDish);
        const HomePage = () => {
            return(
              <Home/>
            );
        }

        return (
          <div>
            <Header/>
            <div className="container">
              <Switch>
                <Route path="/home" component={HomePage} /> 
                <Route exact path="/menu" component={() => <Menu dishes={dishes}/>}/>
                <Redirect to="/home" />
              </Switch>
            </div>
            <Footer/>
          </div>
        );
    }
}

export default Main;