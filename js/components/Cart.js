const React = require("react");
const ReactDOM = require("react-dom");
const Ps = require("perfect-scrollbar");

// const {cartItems,products} = require("../data");
const QuantityControl = require("./QuantityControl");
const { connect} = require('react-redux');

let Cart = React.createClass({
  componentDidMount() {
    let $content = this.refs.content;
    Ps.initialize($content);
  },

  renderCartItems() {
    // let cartItems = ...;
    let { cartItems, products, removeCartItem} = this.props;
    return Object.keys(cartItems).map(key => {
      let item = cartItems[key];
      return <CartItem key={key} item={item} products={products} removeCartItem={removeCartItem}/>
    });
  },

  render() {
    return (
      <div className="cart">
        <h3 className="cart__title">Shopping Cart</h3>
        <div ref="content" className="cart__content">
          <h3 className="cart__title cart__title--spacer">Shopping Cart</h3>

          {this.renderCartItems()}

        </div> {/* cart-item */}
      </div>
    );
  }
});

let CartItem = React.createClass({
  render: function() {
    let {item, removeCartItem} = this.props;
    let {id,quantity} = this.props.item;
    let {price,imagePath,name} = this.props.products[id];

    let priceDisplay = `$${price}`
    if(quantity >= 2) {
      priceDisplay = `${priceDisplay} x ${quantity}`
    }

    return (

      <div className="cart-item">
        <div className="cart-item__top-part">
          <div className="cart-item__image">
            <img src={imagePath} />
          </div>

          <div className="cart-item__top-part__middle">
            <div className="cart-item__title">
              {name}
            </div>
            <div className="cart-item__price">
              {priceDisplay}
            </div>
          </div>
          <img className="cart-item__trash" src="img/trash-icon.svg" onClick={() => removeCartItem(id)}/>
        </div> {/* cart-item__top-part */}

        <div className="cart-item__qty">
          <QuantityControl item={item}/>
        </div>



      </div>
    );
  }
});

module.exports = connect(state => ({
  cartItems: state.cartItems,
  products: state.products,
}),
dispatch => ({
  removeCartItem: (id) => dispatch({type: 'REMOVE_CART_ITEM', id})
})
)(Cart);