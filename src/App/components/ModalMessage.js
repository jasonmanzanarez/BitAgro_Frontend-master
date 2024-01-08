import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../assets/scss/style.scss";

class ModalMessage extends Component {
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
              <i className="feather icon-check-circle auth-icono" />
            </div>
            <h5>{this.props.title}</h5>
            <p>{this.props.content}</p>
          </Modal.Body>
          <div className="modal-pie">
            <button
              onClick={this.props.onHide}
              className="btn btn-primary shadow-1 mb-4"
            >
              Aceptar
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
ModalMessage.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  onHide: PropTypes.func,
};
export default ModalMessage;
