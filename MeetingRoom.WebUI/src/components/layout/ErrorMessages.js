import React, { Component } from "react";

class ErrorMessages extends Component {
  render() {
    const theMessage = this.props.theMessage;
    return <div className="col-12 alert alert-danger px-3">{theMessage}</div>;
  }
}

export default ErrorMessages;
