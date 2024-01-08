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
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import PropTypes from "prop-types";

import "../../../assets/scss/style.scss";
import DangerAlert from "../../components/DangerAlert";

class ModalEditLots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      alias: "",
      address: "",
      numHas: "",
      typeAdq: "",
      cost: "",
      status: true,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ id: nextProps.lot.id });
    this.setState({ alias: nextProps.lot.alias });
    this.setState({ address: nextProps.lot.address });
    this.setState({ numHas: nextProps.lot.numHas });
    this.setState({ typeAdq: nextProps.lot.typeAdq });
    this.setState({ cost: nextProps.lot.cost });
    this.setState({ status: nextProps.lot.status });
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
    const { id, alias, address, numHas, typeAdq, cost, status } = this.state;

    return (
      <div>
        <Modal {...this.props} className="modal" centered>
          <Modal.Header>
            <Modal.Title style={{ fontSize: "16px" }}>Editar Lote</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <i className="fa fa-map-signs auth-icono" />
            </div>
            <Form>
              {this.props.showAlert ? (
                <div>
                  <DangerAlert content={this.props.contentAlert} />
                </div>
              ) : null}
              <Row style={{ marginTop: "20px" }}>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Alias</Form.Label>
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
                      placeholder="Alias"
                      id="alias"
                      value={alias}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Dirección</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-map-marker auth-icono-forms" />
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
                  <Form.Label>Número de hectáreas</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-hashtag  auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      type="number"
                      placeholder="Hectáreas"
                      id="numHas"
                      value={numHas}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Costo</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-usd  auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      type="number"
                      placeholder="Costo"
                      id="cost"
                      value={cost}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Tipo de adquisición</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-handshake-o  auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      as="select"
                      aria-describedby="inputGroup-sizing-sm"
                      id="typeAdq"
                      value={typeAdq}
                      onChange={this.onChange}
                    >
                      <option>Seleccione..</option>
                      <option>Renta</option>
                      <option>Propio</option>
                    </FormControl>
                  </InputGroup>
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
                  alias,
                  address,
                  numHas,
                  typeAdq,
                  cost,
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

ModalEditLots.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  showAlert: PropTypes.bool,
  contentAlert: PropTypes.string,
};

export default ModalEditLots;
