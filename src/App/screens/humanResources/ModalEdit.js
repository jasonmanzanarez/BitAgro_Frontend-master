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

import "../../../assets/scss/style.scss";
import Avatar2 from "../../../assets/images/user/avatar-2.jpg";
import DangerAlert from "../../components/DangerAlert";

class ModalHumanResources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      phone: "",
      address: "",
      salary: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ id: nextProps.person.id });
    this.setState({ name: nextProps.person.name });
    this.setState({ phone: nextProps.person.phone });
    this.setState({ address: nextProps.person.address });
    this.setState({ salary: nextProps.person.salary });
  }

  onChange(e) {
    console.log({ [e.target.id]: e.target.value });
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { id, name, phone, address, salary } = this.state;

    return (
      <div>
        <Modal {...this.props} className="modal" centered>
          <Modal.Header>
            <Modal.Title style={{ fontSize: "16px" }}>
              Editar Personal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <img src={Avatar2} className="img-radius" alt="User Profile" />
            </div>
            <Form>
              {this.props.showAlert ? (
                <div>
                  <DangerAlert content={this.props.contentAlert} />
                </div>
              ) : null}
              <Row style={{ marginTop: "20px" }}>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Nombre</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="feather icon-user auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      type="text"
                      placeholder="Nombre"
                      id="name"
                      value={name}
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
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Dirección</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-address-card-o auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      type="text"
                      placeholder="Dirección"
                      id="address"
                      value={address}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Salario semanal</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-usd auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      type="number"
                      placeholder="Salario"
                      id="salary"
                      value={salary}
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
                this.props.onHide(id, name, phone, address, salary);
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

ModalHumanResources.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  showAlert: PropTypes.bool,
  contentAlert: PropTypes.string,
};

export default ModalHumanResources;
