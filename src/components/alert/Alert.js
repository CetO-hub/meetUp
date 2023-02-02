import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.alert = "Alert";
  }
  getStyle = () => {
    return {
      color: this.color,
    };
  };

  render() {
    return (
      <div className={this.alert}>
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "blue";
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "red";
    this.alert = "ErrorAlert";
  }
}

export { InfoAlert, ErrorAlert };
