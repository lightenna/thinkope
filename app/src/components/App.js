/* eslint-disable import/no-named-as-default */
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        <h2>Far out in the uncharted backwaters...</h2>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
