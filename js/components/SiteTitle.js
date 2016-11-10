const React = require("react");
const ReactDOM = require("react-dom");
const { connect } = require('react-redux');

let SiteTitle = React.createClass({
  render() {
    const filter = "SHOW_LIKED";
    let { curfilter, visibilityFilter } = this.props;
    return (
      <div className="title">
        <h2>Buy Me Shoes</h2>
        <img className="title__heart" src={`${curfilter === filter ? "img/heart-liked.svg":"img/heart.svg"}`} onClick={() => {
          visibilityFilter(curfilter)
        }}/>
      </div>
    );
  }
});

module.exports = connect(
  state => ({
    curfilter: state.visibilityFilter
  }),
  dispatch => ({
    visibilityFilter: (curfilter) => (curfilter === "SHOW_ALL") ? dispatch({ type: 'SET_VISIBILITY_FILTER', filter: "SHOW_LIKED"}):dispatch({ type: 'SET_VISIBILITY_FILTER', filter: "SHOW_ALL"})
  })
)(SiteTitle);