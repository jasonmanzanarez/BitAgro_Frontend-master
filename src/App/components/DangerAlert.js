import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../assets/scss/style.scss";

class DangerAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Alert variant="danger" style={{ padding: "1px", borderRadius: "3px" }}>
          <p style={{ paddingBottom: "1px" }}>{this.props.content}</p>
        </Alert>
      </div>
    );
  }
}

DangerAlert.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default DangerAlert;
