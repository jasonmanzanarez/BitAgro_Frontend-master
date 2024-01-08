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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../../../assets/scss/style.scss";
import objetivo from "../../../assets/images/objetivo.jpg";
import DangerAlert from "../../components/DangerAlert";
import ButtonItem from "../../components/ButtonItem";
import Item from "../../components/Item";

class ModalAddActivitie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dateStart: "",
      dateFinish: "",
      estimatedExpense: "",
      resources: [],
      humaResourceId: "",
      itemResource: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  remove(position) {
    let { resources } = this.state;

    let newData = [
      ...resources.slice(0, position),
      ...resources.slice(position + 1),
    ];

    this.setState({ resources: newData });
  }

  add(itemName) {
    let { resources } = this.state;
    let newData = [...resources, itemName];
    this.setState({ resources: newData });
    this.setState({ itemResource: "" });
    console.log(resources);
  }

  onChange(e) {
    console.log({ [e.target.id]: e.target.value });
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const {
      name,
      dateStart,
      dateFinish,
      estimatedExpense,
      resources,
      humanResourceId,
      itemResource,
    } = this.state;

    return (
      <div>
        <Modal {...this.props} className="modal" centered size="lg">
          <Modal.Header>
            <Modal.Title style={{ fontSize: "16px" }}>
              Agregar Actividad
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <img
                src={objetivo}
                style={{ width: "60px", height: "60px" }}
                alt="objetivo"
              />
            </div>
            <Form>
              {this.props.showAlert ? (
                <div>
                  <DangerAlert content={this.props.contentAlert} />
                </div>
              ) : null}
              <Row style={{ marginTop: "5px" }}>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Actividad</Form.Label>
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
                      placeholder="Actividad"
                      id="name"
                      value={name}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Fecha de inicio</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-calendar auth-icono-forms" />
                      </InputGroup.Text>

                      <DatePicker
                        selected={dateStart}
                        onChange={(date) => {
                          this.setState({ dateStart: date });
                        }}
                      />
                    </InputGroup.Prepend>
                  </InputGroup>
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Presupuesto estimado</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-usd auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      type="text"
                      placeholder="Presupuesto"
                      id="estimatedExpense"
                      value={estimatedExpense}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Fecha de finalización</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-calendar auth-icono-forms" />
                      </InputGroup.Text>

                      <DatePicker
                        selected={dateFinish}
                        onChange={(date) => {
                          this.setState({ dateFinish: date });
                        }}
                      />
                    </InputGroup.Prepend>
                  </InputGroup>
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Recursos</Form.Label>
                  <InputGroup className="mb-3" size="sm">
                    <FormControl
                      placeholder="Recursos"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      id="itemResource"
                      value={itemResource}
                      onChange={this.onChange}
                    />
                    <InputGroup.Append>
                      <ButtonItem
                        onClick={() => {
                          this.add(itemResource);
                        }}
                      />
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Persona a cargo</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="feather icon-user auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      as="select"
                      aria-describedby="inputGroup-sizing-sm"
                      id="humanResourceId"
                      value={humanResourceId}
                      onChange={(e) => this.onChange(e)}
                    >
                      <option>Seleccione..</option>
                      {this.props.dataPersonal.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.name}
                        </option>
                      ))}
                    </FormControl>
                  </InputGroup>
                </Col>
                <Col md={6}>
                  {resources.map((item, index) => (
                    <Item
                      name={item}
                      key={index}
                      onRemove={() => this.remove(index)}
                    />
                  ))}
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
                this.props.onHide(
                  name,
                  dateStart,
                  dateFinish,
                  estimatedExpense,
                  resources,
                  humanResourceId
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

ModalAddActivitie.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  showAlert: PropTypes.bool,
  contentAlert: PropTypes.string,
};

export default connect(null, {})(ModalAddActivitie);
