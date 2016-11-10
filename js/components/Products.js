const React = require("react");
const ReactDOM = require("react-dom");
const QuantityControl = require("./QuantityControl");
// const {cartItems,products} = require("../data");
const { connect } = require('react-redux');

let Product = React.createClass({
  render() {
    let { cartItems, addProductToCart, toggleProductLike, isLiked} = this.props;
    let {id, name, price, imagePath} = this.props.product;

    let productControl;
    let item = cartItems[id];
    if (item) {
      productControl = (
        <QuantityControl item={item} variant="gray"/>
      );
    } else {
      productControl = (
        <a className="product__add" onClick={() => addProductToCart(id)}>
          <img className="product__add__icon" src="img/cart-icon.svg" />
        </a>
      );
    }


    return (
      <div className="product">

        <div className="product__display">
          <div className="product__img-wrapper">
            <img className="product__img" src={imagePath} />
          </div>

          <div className="product__control">
            {productControl}
          </div>

          <div className="product__price">
            {"$" + price}
          </div>
        </div>

        <div className="product__description">
          <div className="product__name">
            {name}
          </div>

          <img className="product__heart" src={`${isLiked ? "img/heart-liked.svg":"img/heart.svg"}`} onClick={() => toggleProductLike(id)}/>
        </div>
      </div>
    );
  }
});

let Products = React.createClass({
  renderProducts() {
    // let products ...
    let { cartItems, products, addProductToCart, likeProducts, toggleProductLike} = this.props;
    let productViews = Object.keys(products).map(id => {
      let product = products[id];
      const isLiked = likeProducts.indexOf(id) >= 0;
      return (
        <Product key={id} product={product} cartItems={cartItems} addProductToCart={addProductToCart} isLiked={isLiked} toggleProductLike={toggleProductLike}/>
      );
    });

    return productViews;
  },

  render() {
    return (
      <div ref="products" className="products">
        {this.renderProducts() }
      </div>
    );
  },
});


const getVisibleLike = (products, likeProducts, filter) => {
  switch (filter) {
    case 'SHOW_LIKED':
      let dislike = Object.keys(products).filter(id => (likeProducts.indexOf(id) < 0));
      return products.without(dislike);
    default:
      return products;
  }
}


module.exports = connect(state => ({
  cartItems: state.cartItems,
  products: getVisibleLike(state.products, state.likeProducts, state.visibilityFilter),
  likeProducts: state.likeProducts,
  curfilter: state.visibilityFilter,
}),
  dispatch => ({
    addProductToCart: (id) => dispatch({ type: 'ADD_PRODUCT_TO_CART', id }),
    toggleProductLike: (id) => dispatch({ type: 'TOGGLE_PRODUCT_LIKE', id})
  })
)(Products)
