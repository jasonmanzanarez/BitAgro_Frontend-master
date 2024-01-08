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

class ModalFinishActivitie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      dateFinish: "",
      actualExpense: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ id: nextProps.activitie.id });
    this.setState({ dateFinish: nextProps.activitie.dateFinish });
    this.setState({ actualExpense: nextProps.activitie.actualExpense });
  }

  onChange(e) {
    console.log({ [e.target.id]: e.target.value });
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { id, dateFinish, actualExpense } = this.state;

    return (
      <div>
        <Modal {...this.props} className="modal" centered size="sm">
          <Modal.Header>
            <Modal.Title style={{ fontSize: "16px" }}>
              Finalizar Actividad
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <i className="fa fa-power-off auth-icono" />
            </div>
            <Form>
              {this.props.showAlert ? (
                <div>
                  <DangerAlert content={this.props.contentAlert} />
                </div>
              ) : null}
              <Row style={{ marginTop: "5px" }}>
                <Col m style={{ textAlign: "left" }}>
                  <Form.Label>Fecha de Finalización</Form.Label>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <i className="fa fa-calendar auth-icono-forms" />
                      </InputGroup.Text>

                      <DatePicker
                        selected={dateFinish}
                        onChange={(date) => {
                          this.setState({ dateStart: date });
                        }}
                      />
                    </InputGroup.Prepend>
                  </InputGroup>
                </Col>
                <Col style={{ textAlign: "left" }}>
                  <Form.Label>Gasto actual</Form.Label>
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
                      placeholder="Gasto actual"
                      id="actualExpense"
                      value={actualExpense}
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
                this.props.onHide(id, dateFinish, actualExpense);
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

ModalFinishActivitie.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  showAlert: PropTypes.bool,
  contentAlert: PropTypes.string,
};

export default connect(null, {})(ModalFinishActivitie);
