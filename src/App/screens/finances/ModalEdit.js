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

class ModalEditFinance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      budget: 0,
      expenditure: 0,
      status: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ id: nextProps.finance.id });
    this.setState({ budget: nextProps.finance.budget });
    this.setState({ expenditure: nextProps.finance.expenditure });
    this.setState({ status: nextProps.finance.status });
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSwitch(checked) {
    this.setState({ status: checked });
  }

  render() {
    const { id, budget, expenditure, status } = this.state;

    return (
      <div>
        <Modal {...this.props} className="modal" centered size="sm">
          <Modal.Header>
            <Modal.Title style={{ fontSize: "16px" }}>
              Editar Finanzas
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <i className="fa fa-leaf auth-icono" />
            </div>
            <Form>
              {this.props.showAlert ? (
                <div>
                  <DangerAlert content={this.props.contentAlert} />
                </div>
              ) : null}
              <Row style={{ marginTop: "5px" }}>
                <Col style={{ textAlign: "left" }}>
                  <Form.Label>Presupuesto</Form.Label>
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
                      placeholder="Presupuesto"
                      id="budget"
                      value={budget}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ textAlign: "left" }}>
                  <Form.Label>Gastos</Form.Label>
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
                      placeholder="Presupuesto"
                      id="expenditure"
                      value={expenditure}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ textAlign: "left" }}>
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
                this.props.onHide(id, budget, expenditure, status);
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

ModalEditFinance.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  showAlert: PropTypes.bool,
  contentAlert: PropTypes.string,
  getCycleById: PropTypes.func,
};

export default connect(null, {})(ModalEditFinance);
