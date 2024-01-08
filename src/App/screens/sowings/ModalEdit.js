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

import { getCycleById } from "../../../store/actionsApp/cycles";

class ModalEditSowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      alias: "",
      cycle: "",
      crops: "",
      status: "",
      data: [],
      dataCrops: [],
      decideCycle: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeCycle = this.onChangeCycle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ id: nextProps.sowing.id });
    this.setState({ alias: nextProps.sowing.alias });
    this.setState({ cycle: nextProps.sowing.cycle });
    this.setState({ crops: nextProps.sowing.crops });
    this.setState({ status: nextProps.sowing.status });
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSwitch(checked) {
    this.setState({ status: checked });
  }

  onChangeCycle = async (e) => {
    try {
      let token = localStorage.getItem("token");
      await this.setState({ cycle: e.target.value });
      const resCrops = await this.props.getCycleById(token, this.state.cycle);
      if (resCrops.status === 201) {
        this.setState({ dataCrops: resCrops.data.crops });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  render() {
    const {
      id,
      cycle,
      alias,
      crops,
      status,
      dataCrops,
      decideCycle,
    } = this.state;

    return (
      <div>
        <Modal {...this.props} className="modal" centered>
          <Modal.Header>
            <Modal.Title style={{ fontSize: "16px" }}>
              Editar Siembra
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
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Ciclo</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-clock-o auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      as="select"
                      aria-describedby="inputGroup-sizing-sm"
                      id="cycle"
                      value={cycle}
                      onChange={(e) => this.onChangeCycle(e)}
                    >
                      <option>{this.props.sowing.cycle}</option>
                      {this.props.dataCycle.map((data, index) =>
                        data.status ? (
                          <option key={index} value={data.id}>
                            {data.name}
                          </option>
                        ) : null
                      )}
                    </FormControl>
                  </InputGroup>
                </Col>
                <Col md={6} style={{ textAlign: "left" }}>
                  <Form.Label>Cultivo</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa  fa-leaf auth-icono-forms" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      size="sm"
                      as="select"
                      aria-describedby="inputGroup-sizing-sm"
                      id="crops"
                      value={crops}
                      onChange={this.onChange}
                    >
                      <option>{this.props.sowing.crops}</option>
                      {dataCrops.map((data, index) => (
                        <option key={index}>{data}</option>
                      ))}
                    </FormControl>
                  </InputGroup>
                </Col>
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
                this.props.onHide(id, alias, cycle, crops, status);
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

ModalEditSowing.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  showAlert: PropTypes.bool,
  contentAlert: PropTypes.string,
  getCycleById: PropTypes.func,
};

export default connect(null, {
  getCycleById,
})(ModalEditSowing);
