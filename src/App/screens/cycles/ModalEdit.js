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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import "../../../assets/scss/style.scss";
import DangerAlert from "../../components/DangerAlert";
import ButtonItem from "../../components/ButtonItem";
import Item from "../../components/Item";

class ModalAddCycles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      dateStart: new Date(),
      dateFinish: new Date(),
      itemCrop: "",
      crops: [],
      status: true,
    };
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ id: nextProps.cycle.id });
    this.setState({ name: nextProps.cycle.name });
    this.setState({ dateStart: nextProps.cycle.dateStart });
    this.setState({ dateFinish: nextProps.cycle.dateFinish });
    this.setState({ crops: nextProps.cycle.crops });
    this.setState({ status: nextProps.cycle.status });
  }

  remove(position) {
    let { crops } = this.state;

    let newData = [...crops.slice(0, position), ...crops.slice(position + 1)];

    this.setState({ crops: newData });
  }

  add(itemName) {
    let { crops } = this.state;
    let newData = [...crops, itemName];
    this.setState({ crops: newData });
    this.setState({ itemCrop: "" });
    console.log(crops);
  }

  onChange(e) {
    console.log({ [e.target.id]: e.target.value });
    this.setState({ [e.target.id]: e.target.value });
  }

  onSwitch(checked) {
    console.log(checked);
    this.setState({ status: checked });
  }

  render() {
    const {
      id,
      name,
      dateStart,
      dateFinish,
      crops,
      itemCrop,
      status,
    } = this.state;

    return (
      <div>
        <Modal {...this.props} className="modal" centered>
          <Modal.Header>
            <Modal.Title style={{ fontSize: "16px" }}>
              Editar Ciclo Agrícola
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <i className="fa fa-clock-o auth-icono" />
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
                  <Form.Label>Posibles cultivos</Form.Label>
                  <InputGroup className="mb-3" size="sm">
                    <FormControl
                      placeholder="Cultivo"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      id="itemCrop"
                      value={itemCrop}
                      onChange={this.onChange}
                    />
                    <InputGroup.Append>
                      <ButtonItem
                        onClick={() => {
                          this.add(this.state.itemCrop);
                        }}
                      />
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Fecha de culminación</Form.Label>
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
                <Col md={6}>
                  {crops.map((item, index) => (
                    <Item
                      name={item}
                      key={index}
                      onRemove={() => this.remove(index)}
                    />
                  ))}
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Estado</Form.Label>
                  <div className="mb-3">
                    <BootstrapSwitchButton
                      checked={status}
                      onlabel="Activo "
                      offlabel="Inactivo"
                      size="lm"
                      onstyle="info"
                      offstyle="secondary"
                      width={100}
                      id="status"
                      onChange={(checked) => {
                        this.onSwitch(checked);
                      }}
                    />
                  </div>
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
                  id,
                  name,
                  dateStart,
                  dateFinish,
                  crops,
                  status
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

ModalAddCycles.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  showAlert: PropTypes.bool,
  contentAlert: PropTypes.string,
};

export default ModalAddCycles;
