import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Card, Row, Button, Table } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import cosecha from "../../../assets/images/cosecha.jpg";

import ModalEdit from "./ModalEdit";
import ModalMessage from "../../components/ModalMessage";
import { getSowingByLotId } from "../../../store/actionsApp/sowings";
import { getLotById } from "../../../store/actionsApp/lots";
import { getHarvestById, editHarvest } from "../../../store/actionsApp/harvest";

class SowingsHarvest extends React.Component {
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
      harvest: {
        id: "",
        ton: 0,
        salePrice: 0,
        amount: 0,
        customer: "",
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

  sendHarvest = async (e, id) => {
    e.preventDefault();
    this.setState({ showModalEdit: true });
    console.log(id);
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getHarvestById(token, id);
      console.log(res.data);
      if (res.status === 201) {
        console.log("estas son las cosechas", res.data);
        this.setState((prevState) => {
          let harvest = { ...prevState.harvest };
          harvest.id = res.data.id;
          harvest.ton = res.data.ton;
          harvest.salePrice = res.data.salePrice;
          harvest.amount = res.data.amount;
          harvest.customer = res.data.customer;
          harvest.status = res.data.status;
          return { harvest };
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
      harvest,
    } = this.state;

    let cancelModalEdit = () => {
      this.setState({ showModalEdit: false });
    };

    let cancelModalMessageShow = () => {
      this.setState({ showModalSuccess: false });
    };

    let editHarvest = async (id, ton, salePrice, amount, customer, status) => {
      try {
        let token = localStorage.getItem("token");
        let data = {
          id,
          ton,
          salePrice,
          amount,
          customer,
          status,
        };
        console.log("datos", data);
        const res = await this.props.editHarvest(token, id, data);
        console.log(res);
        if (res.status === 201) {
          console.log("Se actualizo");
          this.setState({ showModalEdit: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha editado la cosecha..",
          });
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 400) {
          this.setState({ showAlertAdd: true });
          this.setState({
            contentAlertAdd: "...",
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
                <Card.Title as="h5">Cosechas por Siembras</Card.Title>
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
                            Toneladas
                          </h6>
                        </th>
                        <th>
                          <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                            Precio de venta
                          </h6>
                        </th>
                        <th>
                          <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                            Importe
                          </h6>
                        </th>
                        <th>
                          <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                            Cliente
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
                            src={cosecha}
                            style={{ width: "40px", height: "35px" }}
                            alt="finanzas"
                          />
                        </td>
                        <td>{item.harvest.ton}</td>
                        <td>
                          {"$"}
                          {item.harvest.salePrice}
                        </td>
                        <td>
                          {"$"}
                          {item.harvest.amount}
                        </td>
                        <td>{item.harvest.customer}</td>
                        <td>
                          {item.harvest.status ? (
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
                              this.sendHarvest(e, item.harvest.id);
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
          harvest={harvest}
          onHide={editHarvest}
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

SowingsHarvest.propTypes = {
  getSowingByLotId: PropTypes.func,
  getLotById: PropTypes.func,
  getHarvestById: PropTypes.func,
  editHarvest: PropTypes.func,
};

export default connect(null, {
  getSowingByLotId,
  getLotById,
  getHarvestById,
  editHarvest,
})(SowingsHarvest);
