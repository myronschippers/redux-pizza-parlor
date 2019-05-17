import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapReduxStateToProps from '../../modules/mapReduxStateToProps'; 

class PizzaMenuItem extends Component {
    getMatchedOrder() {
        const matchedOrder = this.props.reduxState.pizzaOrderReducer.filter(pizzaItem => {
            return this.props.pizza.id === pizzaItem.id;
        });

        return matchedOrder;
    }

    clickAddPizza = (event) => {
        let dispatchType = 'ADD_PIZZA_ORDER';
        const matchedOrder = this.getMatchedOrder();

        if (matchedOrder.length > 0) {
            dispatchType = 'REMOVE_PIZZA_ORDER';
        }

        this.props.dispatch({
            type: dispatchType,
            payload: this.props.pizza,
        });
    }

    render() {
        const {
            image_path,
            name,
            price,
            description,
        } = this.props.pizza;
        let btnText = 'ADD';
        const matchedOrder = this.getMatchedOrder();

        if (matchedOrder.length > 0) {
            btnText = 'REMOVE';
        }

        return (
            <div>
                <div>
                    <img src={image_path} alt={name} />
                </div>
                <div>
                    <h4>{name}</h4>
                    <p>Price: ${price}</p>
                    <p>{description}</p>
                    <button data-id={this.props.pizzaIndex} onClick={this.clickAddPizza}>{btnText}</button>
                </div>
            </div>
        );
    }
}

export default connect(mapReduxStateToProps)(PizzaMenuItem);
