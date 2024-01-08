import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Card, Row, Button, Table } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import finanzas from "../../../assets/images/finanzas.jpg";

import ModalEdit from "./ModalEdit";
import ModalMessage from "../../components/ModalMessage";
import { getSowingByLotId } from "../../../store/actionsApp/sowings";
import { getLotById } from "../../../store/actionsApp/lots";
import {
  getFinanceById,
  editFinance,
} from "../../../store/actionsApp/finances";

class SowingsFinances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loteName: "",
      loteAddress: "",
      loteNumHas: "",
      showModalEdit: false,
      showAlertAdd: false,
      showModalSuccess: false,
      titleSuccess: "",
      contentSuccess: "",
      contentAlertAdd: "",
      finance: {
        id: "",
        budget: 0,
        expenditure: 0,
        gain: 0,
        status: false,
      },
    };
  }

  async componentDidMount() {
    try {
      let token = localStorage.getItem("token");
      let lotId = this.props.match.params.lotId;
      const dataLot = await this.props.getLotById(token, lotId);
      const res = await this.props.getSowingByLotId(token, lotId);
      console.log(res.data);
      console.log(dataLot.data);
      if (dataLot.status === 201) {
        this.setState({ loteName: dataLot.data.alias });
        this.setState({ loteAddress: dataLot.data.address });
        this.setState({ loteNumHas: dataLot.data.numHas });
      }
      if (res.status === 201) {
        this.setState({ data: res.data });
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  sendFinance = async (e, id) => {
    e.preventDefault();
    this.setState({ showModalEdit: true });
    console.log(id);
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getFinanceById(token, id);
      console.log(res.data);
      if (res.status === 201) {
        console.log("estas son las finanzas", res.data);
        this.setState((prevState) => {
          let finance = { ...prevState.finance };
          finance.id = res.data.id;
          finance.budget = res.data.budget;
          finance.expenditure = res.data.expenditure;
          finance.gain = res.data.gain;
          finance.status = res.data.status;
          return { finance };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      data,
      loteName,
      loteAddress,
      loteNumHas,
      showModalEdit,
      showAlertAdd,
      contentAlertAdd,
      showModalSuccess,
      titleSuccess,
      contentSuccess,
      finance,
    } = this.state;

    let cancelModalEdit = () => {
      this.setState({ showModalEdit: false });
    };

    let cancelModalMessageShow = () => {
      this.setState({ showModalSuccess: false });
    };

    let editFinance = async (id, budget, expenditure, status) => {
      try {
        let token = localStorage.getItem("token");
        let data = {
          id,
          budget,
          expenditure,
          status,
        };
        console.log("datos", data);
        const res = await this.props.editFinance(token, id, data);
        console.log(res);
        if (res.status === 201) {
          console.log("Se actualizo");
          this.setState({ showModalEdit: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha editado finanzas..",
          });
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 400) {
          this.setState({ showAlertAdd: true });
          this.setState({
            contentAlertAdd: "Todos los campos son requeridos..",
          });
        }
      }
    };

    return (
      <Aux>
        <Row>
          <Col md={12} xl={14}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Finanzas por Siembras</Card.Title>
                <div style={{ textAlign: "left" }}>
                  <h7 className="fuente-encabezado">
                    <i className="fa fa-map-marker auth-icono-encabezado"></i>{" "}
                    {loteName} {loteAddress}
                    {","} {loteNumHas} {" Has."}
                  </h7>
                </div>
              </Card.Header>
            </Card>
          </Col>
        </Row>
        {data.map((item, index) => (
          <Row key={index}>
            <Col md={12} xl={14}>
              <Card>
                <Card.Header>
                  <Card.Title as="p">{item.alias}</Card.Title>
                  <div style={{ textAlign: "left" }}>
                    <h7 className="fuente-encabezado">
                      <i className="fa fa-leaf auth-icono-encabezado"></i>{" "}
                      {item.crops}
                    </h7>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <h7 className="fuente-encabezado">
                      <i className="fa fa-clock-o auth-icono-encabezado"></i>{" "}
                      {item.cycle.name}
                    </h7>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }}></th>
                        <th>
                          <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                            Presupuesto estimado
                          </h6>
                        </th>
                        <th>
                          <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                            Gastos al día
                          </h6>
                        </th>
                        <th>
                          <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                            Ganancia
                          </h6>
                        </th>
                        <th>
                          <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                            Estado
                          </h6>
                        </th>
                        <th>
                          <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                            Acciones
                          </h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="unread" key={index}>
                        <td>
                          <img
                            src={finanzas}
                            style={{ width: "35px", height: "35px" }}
                            alt="finanzas"
                          />
                        </td>
                        <td>
                          {"$"}
                          {item.finance.budget}
                        </td>
                        <td>
                          {"$"}
                          {item.finance.expenditure}
                        </td>
                        <td>
                          {"$"}
                          {item.finance.gain}
                        </td>
                        <td>
                          {item.finance.status ? (
                            <a className="label theme-bg2 text-white f-12">
                              Activo
                            </a>
                          ) : (
                            <a className="label theme-bg3 text-white f-12">
                              Inactivo
                            </a>
                          )}
                        </td>
                        <td>
                          <Button
                            variant="info"
                            size="sm"
                            className="drp-icon "
                            style={{
                              width: "40px",
                              height: "30px",
                              paddingTop: "5px",
                            }}
                            onClick={(e) => {
                              this.sendFinance(e, item.finance.id);
                            }}
                          >
                            <i className="feather icon-edit-1" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
        <ModalEdit
          show={showModalEdit}
          finance={finance}
          onHide={editFinance}
          onCancel={cancelModalEdit}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <ModalMessage
          show={showModalSuccess}
          onHide={cancelModalMessageShow}
          title={titleSuccess}
          content={contentSuccess}
        />
      </Aux>
    );
  }
}

SowingsFinances.propTypes = {
  getSowingByLotId: PropTypes.func,
  getLotById: PropTypes.func,
  getFinanceById: PropTypes.func,
  editFinance: PropTypes.func,
};

export default connect(null, {
  getSowingByLotId,
  getLotById,
  getFinanceById,
  editFinance,
})(SowingsFinances);
