import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {


  // onToken = (token) => {
  //   fetch('/save-stripe-token', {
  //     method: 'POST',
  //     body: JSON.stringify(token),
  //   }).then(response => {

  //     console.log(response);
  //     response.json().then(data => {
  //       alert(`We are in business, ${data.email}`);
  //     });
  //   });
  // }
    
  render() {
    return (
      <StripeCheckout
        name="Emaily BR"
        description="R$ 5 para 5 creditos de email."
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        currency="BRL"
        
      >
        <button className="btn">Adicionar Creditos</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions) (Payments);