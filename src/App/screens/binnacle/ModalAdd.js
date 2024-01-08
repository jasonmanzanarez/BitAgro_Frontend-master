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
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../../../assets/scss/style.scss";
import DangerAlert from "../../components/DangerAlert";

class ModalAddBinnacle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    console.log({ [e.target.id]: e.target.value });
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { name, description } = this.state;

    return (
      <div>
        <Modal {...this.props} className="modal" centered size="sm">
          <Modal.Header>
            <Modal.Title style={{ fontSize: "16px" }}>
              Agregar Bitácora
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <i className="fa fa-list-alt auth-icono" />
            </div>
            <Form>
              {this.props.showAlert ? (
                <div>
                  <DangerAlert content={this.props.contentAlert} />
                </div>
              ) : null}
              <Row style={{ marginTop: "5px" }}>
                <Col style={{ textAlign: "left" }}>
                  <Form.Label>Nombre</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-tag auth-icono-forms" />
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
              </Row>
              <Row>
                <Col style={{ textAlign: "left" }}>
                  <Form.Label>Descripción</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-pencil auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      as="textarea"
                      rows="3"
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      type="text"
                      placeholder="Descripción..."
                      id="description"
                      value={description}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ marginTop: "20px" }}>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={this.props.onCancel}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                this.props.onHide(name, description);
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

ModalAddBinnacle.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  showAlert: PropTypes.bool,
  contentAlert: PropTypes.string,
};

export default connect(null, {})(ModalAddBinnacle);
