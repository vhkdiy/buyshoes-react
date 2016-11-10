const React = require("react");
const ReactDOM = require("react-dom");

// const {cartItems,products} = require("../data");
const { connect} = require('react-redux');

let Checkout = React.createClass({
  render() {
    let subtotal = 0;
    const {cartItems, products} = this.props;
    Object.keys(cartItems).forEach(key => {
      let {quantity} = cartItems[key];
      let {price} = products[key];
      subtotal += price * quantity;
    });

    return (
      <div className="checkout">
        <hr className="checkout__divider" />

        <input type="text" className="checkout__coupon-input" placeholder="coupon code" />

        {/*
        <div className="checkout__line">
          <div className="checkout__line__label">
            Discount
          </div>
          <div className="checkout__line__amount">
            -$90
          </div>
        </div>
        */}

        <div className="checkout__line">
          <div className="checkout__line__label">
            Subtotal
          </div>
          <div className="checkout__line__amount">
            {`$${subtotal.toFixed(2)}`}
          </div>
        </div>

        <a className="checkout__button">
          <img className="checkout__button__icon" src="img/cart-icon.svg" />
          <div className="checkout__button__label">
            Checkout
          </div>
        </a>
      </div>
    );
  }
});

module.exports = connect(state => ({
  cartItems: state.cartItems,
  products: state.products,
}))(Checkout);