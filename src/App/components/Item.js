import React, { Component } from "react";
import { Card } from "react-bootstrap";

class Item extends Component {
  remove() {
    if (this.props.onRemove) this.props.onRemove();
  }
  render() {
    return (
      <Card style={{ marginBottom: "2px" }}>
        <Card.Header style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ textAlign: "left", width: "80%" }}>
            <Card.Title as="p">{this.props.name}</Card.Title>
          </div>
          <div style={{ textAlign: "right", width: "20%" }}>
            <a className="aboton" onClick={this.remove.bind(this)}>
              <i className="fa fa-times auth-icon"></i>
            </a>
          </div>
        </Card.Header>
      </Card>
    );
  }
}

export default Item;
