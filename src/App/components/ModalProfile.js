import React, { Component } from "react";
import {
  Modal,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import PropTypes from "prop-types";
import "../../assets/scss/style.scss";

import Avatar1 from "../../assets/images/user/avatar-1.jpg";

class ModalProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.user.name });
    this.setState({ lastname: nextProps.user.lastname });
    this.setState({ email: nextProps.user.email });
    this.setState({ phone: nextProps.user.phone });
  }
  onChange(e) {
    console.log({ [e.target.id]: e.target.value });
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { name, lastname, email, phone } = this.state;

    return (
      <div>
        <Modal {...this.props} className="modal" centered>
          <Modal.Header>
            <Modal.Title style={{ fontSize: "16px" }}>Mi Perfil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={Avatar1} className="img-radius" alt="User Profile" />
            <Form>
              <Row style={{ marginTop: "20px" }}>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    className="mb-3"
                    value={name}
                    id="name"
                    onChange={(e) => this.onChange(e)}
                  />
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    className="mb-3"
                    id="lastname"
                    value={lastname}
                    onChange={this.onChange}
                  />
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Correo electrónico</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="feather icon-mail auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      type="text"
                      id="email"
                      value={email}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Teléfono</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="feather icon-phone auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      type="number"
                      placeholder="Teléfono"
                      id="phone"
                      value={phone}
                      onChange={this.onChange}
                    />
                  </InputGroup>
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
                this.props.onHide(name, lastname, email, phone);
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

ModalProfile.propTypes = {
  show: PropTypes.bool,
  name: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ModalProfile;
