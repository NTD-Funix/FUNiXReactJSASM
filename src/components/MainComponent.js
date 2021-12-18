import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
    }
  }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId});
    }

    render() {
        const dishes = this.state.dishes;
        const dish = dishes.find((dish) =>  dish.id === this.state.selectedDish);
        return (
          <div>
            <Header/>
            <div className="container">
                <Menu dishes = {dishes} onClick={(dishId) => this.onDishSelect(dishId)} />,
                <Dishdetail dish={dish}/>
            </div>
            <Footer/>
          </div>
        );
    }
}

export default Main;