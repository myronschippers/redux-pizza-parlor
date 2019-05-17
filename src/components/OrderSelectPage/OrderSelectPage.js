import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapReduxStateToProps from '../../modules/mapReduxStateToProps'; 
import { getPizzaMenu } from '../../modules/services/pizza.api.service';
import PizzaMenuList from '../PizzaMenuList/PizzaMenuList';

class OrderSelectPage extends Component {
    componentDidMount() {
        getPizzaMenu()
            .then((response) => {
                console.log('response', response);
                this.props.dispatch({
                    type: 'PIZZA_MENU',
                    payload: response.data,
                })
            });
    }

    clickNextStep = (event) => {
        if (this.props.reduxState.pizzaOrderReducer.length === 0) {
            // exiting erly not allowing the user
            return false;
        }
        this.props.history.push('/order-customer-info');
    }

    render() {
        console.log('pizzaMenu', this.props.reduxState.pizzaMenuReducer);
        let isNextDisabled = false;
        let nextBtnText = 'NEXT';
        if (this.props.reduxState.pizzaOrderReducer.length === 0) {
            isNextDisabled = true;
            nextBtnText = 'SELECT A PIZZA';
        }

        return (
            <div>
                <h2>Step 1: Select Your Pizza</h2>

                <div className="container">
                    <PizzaMenuList pizzaMenu={this.props.reduxState.pizzaMenuReducer} />
                </div>
                <div>
                    <button disabled={isNextDisabled} onClick={this.clickNextStep}>{nextBtnText}</button>
                </div>
            </div>
        );
    }
}

export default connect(mapReduxStateToProps)(OrderSelectPage);