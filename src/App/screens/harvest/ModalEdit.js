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
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import "../../../assets/scss/style.scss";
import DangerAlert from "../../components/DangerAlert";

class ModalEditHarvest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      ton: 0,
      salePrice: 0,
      amount: 0,
      customer: "",
      status: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ id: nextProps.harvest.id });
    this.setState({ ton: nextProps.harvest.ton });
    this.setState({ salePrice: nextProps.harvest.salePrice });
    this.setState({ amount: nextProps.harvest.amount });
    this.setState({ customer: nextProps.harvest.customer });
    this.setState({ status: nextProps.harvest.status });
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSwitch(checked) {
    this.setState({ status: checked });
  }

  calculaImporte = async (e) => {
    const { ton, salePrice } = this.state;

    let totalImport = ton * salePrice;
    await this.setState({ amount: totalImport });
  };

  render() {
    const { id, ton, salePrice, amount, customer, status } = this.state;

    return (
      <div>
        <Modal {...this.props} className="modal" centered size="lg">
          <Modal.Header>
            <Modal.Title style={{ fontSize: "16px" }}>
              Editar Cosecha
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <i className="fa fa-truck auth-icono" />
            </div>
            <Form>
              {this.props.showAlert ? (
                <div>
                  <DangerAlert content={this.props.contentAlert} />
                </div>
              ) : null}
              <Row style={{ marginTop: "5px" }}>
                <Col sm={4} style={{ textAlign: "left" }}>
                  <Form.Label>Toneladas</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-truck  auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      type="number"
                      placeholder="Toneladas"
                      id="ton"
                      value={ton}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
                <Col sm={4} style={{ textAlign: "left" }}>
                  <Form.Label>Precio de venta por tonelada</Form.Label>
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
                      placeholder="Precio venta"
                      id="salePrice"
                      value={salePrice}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
                <Col sm={4} style={{ textAlign: "left" }}>
                  <Form.Label>Importe</Form.Label>
                  <div className="mb-3" style={{ width: "100%" }}>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={this.calculaImporte}
                    >
                      Calcular
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={4} style={{ textAlign: "left" }}>
                  <Form.Label>Importe de venta</Form.Label>
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
                      placeholder="Importe"
                      id="amount"
                      value={amount}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
                <Col sm={4} style={{ textAlign: "left" }}>
                  <Form.Label>Cliente</Form.Label>
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
                      placeholder="Cliente"
                      id="customer"
                      value={customer}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
                <Col sm={4} style={{ textAlign: "left" }}>
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
                this.props.onHide(id, ton, salePrice, amount, customer, status);
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

ModalEditHarvest.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  showAlert: PropTypes.bool,
  contentAlert: PropTypes.string,
};

export default connect(null, {})(ModalEditHarvest);
