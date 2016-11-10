const React = require("react");
const { render } = require("react-dom");
const App = require("./components/App");
const { Provider } = require('react-redux');
const store = require('./store');

// When the window is loaded, render the App component.
window.onload = () => {
  render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector("#root"));
}