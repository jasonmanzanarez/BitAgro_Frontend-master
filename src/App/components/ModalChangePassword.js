import React, { Component } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import DangerAlert from "../components/DangerAlert";
import "../../assets/scss/style.scss";

class ModalChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      showAlert: false,
      contentAlert: "",
    };
  }

  onChange(e) {
    console.log({ [e.target.id]: e.target.value });
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { currentPassword, newPassword, confirmPassword } = this.state;

    return (
      <div>
        <Modal {...this.props} className="modal" centered size="sm">
          <Modal.Header>
            <Modal.Title style={{ fontSize: "16px" }}>
              Cambiar Contraseña
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <i className="feather icon-lock auth-icono" />
            </div>
            <Form>
              {this.props.showAlert ? (
                <div>
                  <DangerAlert content={this.props.contentAlert} />
                </div>
              ) : null}
              <Row style={{ marginTop: "5px" }}>
                <Col style={{ textAlign: "left" }}>
                  <Form.Label>Contraseña actual</Form.Label>
                  <Form.Control
                    size="sm"
                    type="password"
                    placeholder="Contraseña actual"
                    className="mb-3"
                    value={currentPassword}
                    id="currentPassword"
                    onChange={(e) => {
                      this.onChange(e);
                    }}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col style={{ textAlign: "left" }}>
                  <Form.Label>Nueva contraseña</Form.Label>
                  <Form.Control
                    size="sm"
                    type="password"
                    placeholder="Nueva contraseña"
                    className="mb-3"
                    value={newPassword}
                    id="newPassword"
                    onChange={(e) => {
                      this.onChange(e);
                    }}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col style={{ textAlign: "left" }}>
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    size="sm"
                    type="password"
                    placeholder="Nueva contraseña"
                    className="mb-3"
                    value={confirmPassword}
                    id="confirmPassword"
                    onChange={(e) => {
                      this.onChange(e);
                    }}
                  />
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={this.props.onCancel}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                this.props.onHide(
                  currentPassword,
                  newPassword,
                  confirmPassword
                );
              }}
              size="sm"
            >
              Guardar cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ModalChangePass.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  showAlert: PropTypes.bool,
  contentAlert: PropTypes.string,
};
export default ModalChangePass;
