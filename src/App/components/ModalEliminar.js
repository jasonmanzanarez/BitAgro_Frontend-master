import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../assets/scss/style.scss";

class ModalEliminar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Modal {...this.props} centered className="modal">
          <Modal.Body>
            <div className="mb-4">
              <i className="feather icon-alert-triangle auth-icono" />
            </div>
            <h5>{this.props.title}</h5>
            <p>{this.props.content}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={this.props.onCancel}
            >
              Cancelar
            </Button>
            <Button variant="danger" size="sm" onClick={this.props.onHide}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ModalEliminar.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default ModalEliminar;
