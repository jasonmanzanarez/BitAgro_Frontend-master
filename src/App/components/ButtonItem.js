import React, { Component } from "react";
import { Button } from "react-bootstrap";

class ButtonItem extends Component {
  add() {
    if (this.props.onClick) this.props.onClick();
  }

  render() {
    return (
      <Button variant="info" onClick={this.add.bind(this)}>
        Agregar
      </Button>
    );
  }
}

export default ButtonItem;
