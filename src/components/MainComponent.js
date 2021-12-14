import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
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
        let dishes = this.state.dishes;
        let dish = dishes.find((dish) =>  dish.id === this.state.selectedDish);
        return (
          <div>
            <Navbar dark color="primary">
                <div className="container">
                <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                </div>
            </Navbar>
            <div className="container">
                <Menu dishes = {dishes} onClick={(dishId) => this.onDishSelect(dishId)} />,
                <Dishdetail dish={dish}/>
            </div>
          </div>
        );
    }
}

export default Main;