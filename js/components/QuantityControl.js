const React = require("react");
const ReactDOM = require("react-dom");
const { connect} = require('react-redux');

let QuantityControl = React.createClass({
  render() {
    let {variant, incrementQuantity, decrementQuantity, removeCartItem} = this.props;
    let {quantity, id} = this.props.item;

    let className = "adjust-qty";
    if(variant === "gray") {
      className = "adjust-qty adjust-qty--gray";
    }

    return (
      <div className={className}>
        <a className="adjust-qty__button" onClick={() => {
          if (quantity === 1) {
            removeCartItem(id);
          } else {
            decrementQuantity(id);
          }
        }}>-</a>
        <div className="adjust-qty__number">{quantity}</div>
        <a className="adjust-qty__button" onClick={() => incrementQuantity(id)}>+</a>
      </div>
    );
  }
});

module.exports = connect(
  state => ({}),
  dispatch => ({
    incrementQuantity: (id) => dispatch({type: "INCREMENT_QUANTITY", id}),
    decrementQuantity: (id) => dispatch({type: "DECREMENT_QUANTITY", id}),
    removeCartItem: (id) => dispatch({type: 'REMOVE_CART_ITEM', id})
  })
)(QuantityControl);