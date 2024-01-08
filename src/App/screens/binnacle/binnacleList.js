import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Card, Row, Button } from "react-bootstrap";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import bitacora from "../../../assets/images/bitacora.jpg";

import {
  getBinnacleBySowingId,
  addBinnacle,
  getBinnacleById,
  editBinnacle,
  deleteBinnacle,
} from "../../../store/actionsApp/binnacle";
import { getSowingById } from "../../../store/actionsApp/sowings";
import { getLotById } from "../../../store/actionsApp/lots";

import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import ModalMessage from "../../components/ModalMessage";
import ModalDelete from "../../components/ModalDelete";

class BinnacleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sowingName: "",
      sowingCrops: "",
      lotName: "",
      lotAddress: "",
      lotNumHas: "",
      showModalAdd: false,
      showModalEdit: false,
      showModalDelete: false,
      showModalSuccess: "",
      titleSuccess: "",
      contentSuccess: "",
      showAlertAdd: false,
      contentAlertAdd: "",
      binnacle: {
        id: "",
        name: "",
        description: "",
        status: false,
      },
      botonDisabled: false,
    };
    /* this.viewSowing = this.viewSowing.bind(this); */
    this.sendBinnacle = this.sendBinnacle.bind(this);
  }

  async componentDidMount() {
    try {
      let token = localStorage.getItem("token");
      let sowingId = this.props.match.params.sowingId;
      const res = await this.props.getBinnacleBySowingId(token, sowingId);
      const dataSowing = await this.props.getSowingById(token, sowingId);
      const dataLot = await this.props.getLotById(token, dataSowing.data.lotId);
      console.log(res.data);
      console.log(dataSowing.data);
      console.log(dataLot.data);
      if (dataSowing.status === 201) {
        this.setState({ sowingName: dataSowing.data.alias });
        this.setState({ sowingCrops: dataSowing.data.crops });
        if (dataSowing.data.status === false) {
          this.setState({ botonDisabled: true });
        }
      }
      if (dataLot.status === 201) {
        this.setState({ lotName: dataLot.data.alias });
        this.setState({ lotAddress: dataLot.data.address });
        this.setState({ lotNumHas: dataLot.data.numHas });
      }
      if (res.status === 201) {
        this.setState({ data: res.data });
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  showModalAddBinnacle = (e) => {
    e.preventDefault();
    this.setState({ showModalAdd: true });
  };

  viewActivities = (id) => {
    console.log(id);
    this.props.history.push(`/binnacle/activities/${id}`);
  };

  sendBinnacle = async (e, id) => {
    e.preventDefault();
    this.setState({ showModalEdit: true });
    console.log("este es el id ", id);
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getBinnacleById(token, id);
      console.log("envio de la data", res.data);
      if (res.status === 201) {
        console.log("data", res.data);
        this.setState((prevState) => {
          let binnacle = { ...prevState.binnacle };
          binnacle.id = res.data.id;
          binnacle.name = res.data.name;
          binnacle.description = res.data.description;
          binnacle.status = res.data.status;
          return { binnacle };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  showModalDelete = async (e, id) => {
    e.preventDefault();
    this.setState({ showModalDelete: true });
    console.log(id);
    this.setState((prevState) => {
      let binnacle = { ...prevState.binnacle };
      binnacle.id = id;
      return { binnacle };
    });
  };

  render() {
    const {
      data,
      sowingName,
      sowingCrops,
      lotName,
      lotAddress,
      lotNumHas,
      showModalAdd,
      showModalEdit,
      showModalDelete,
      showModalSuccess,
      titleSuccess,
      contentSuccess,
      showAlertAdd,
      contentAlertAdd,
      binnacle,
      botonDisabled,
    } = this.state;

    let cancelModalAdd = () => {
      this.setState({ showModalAdd: false });
    };

    let saveModalAddBinnacle = async (name, description) => {
      try {
        let data = {
          name,
          sowingId: this.props.match.params.sowingId,
          description,
        };
        let token = localStorage.getItem("token");
        const res = await this.props.addBinnacle(token, data);
        console.log(res);
        if (res.status === 201) {
          console.log("Se creo");
          this.setState({ showModalAdd: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha agregado una nueva bitácora..",
          });
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 400) {
          this.setState({ showAlertAdd: true });
          this.setState({
            contentAlertAdd: "El campo nombre es requerido..",
          });
        }
      }
    };

    let editBinnacle = async (id, name, description, status) => {
      try {
        let token = localStorage.getItem("token");
        let data = {
          name,
          description,
          status,
        };
        console.log("datos", data);
        const res = await this.props.editBinnacle(token, id, data);
        console.log(res);
        if (res.status === 201) {
          console.log("Se actualizo");
          this.setState({ showModalEdit: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha editado la bitácora..",
          });
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 400) {
          this.setState({ showAlertAdd: true });
          this.setState({
            contentAlertAdd: "El campo de nombre es requerido..",
          });
        }
      }
    };

    let deleteBinnacle = async (id) => {
      try {
        let token = localStorage.getItem("token");
        const res = await this.props.deleteBinnacle(token, id);
        console.log(res);
        if (res.status === 201) {
          console.log("Se elimino");
          this.setState({ showModalDelete: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha eliminado la bitácora..",
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    let cancelModalEdit = () => {
      this.setState({ showModalEdit: false });
    };

    let cancelModalDelete = () => {
      this.setState({ showModalDelete: false });
    };

    let cancelModalMessageShow = () => {
      this.setState({ showModalSuccess: false });
    };

    return (
      <Aux>
        <Row>
          <Col md={12} xl={14}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Bitácoras</Card.Title>
                <div style={{ textAlign: "left" }}>
                  <h7 className="fuente-encabezado">
                    <i className="fa fa-leaf auth-icono-encabezado"></i>{" "}
                    {sowingName}
                    {", "}
                    {sowingCrops}
                    {"."}
                  </h7>
                </div>
                <div>
                  <h7 className="fuente-encabezado">
                    <i className="fa fa-map-marker auth-icono-encabezado"></i>{" "}
                    {lotName} {lotAddress}
                    {", "}
                    {lotNumHas}
                    {" Has."}
                  </h7>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Button
                    size="sm"
                    onClick={this.showModalAddBinnacle}
                    disabled={botonDisabled}
                  >
                    <i>
                      <i className="feather icon-plus-circle auth-icon" />
                    </i>
                    Agregar
                  </Button>
                </div>
              </Card.Header>
            </Card>
          </Col>
        </Row>
        <Row>
          {data.map((binnacle) => (
            <Col md={6} xl={4} key={binnacle.id}>
              <Card className="card-event">
                <Card.Header style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ textAlign: "left", width: "80%" }}>
                    <Card.Title as="h6">{binnacle.name}</Card.Title>
                  </div>
                  <div style={{ textAlign: "right", width: "20%" }}>
                    {binnacle.status ? (
                      <label className="label theme-bg2 text-white f-14 f-w-400 float-right">
                        Activo
                      </label>
                    ) : (
                      <label className="label theme-bg3 text-white f-14 f-w-400 float-right">
                        Inactivo
                      </label>
                    )}
                  </div>
                </Card.Header>
                <Card.Body style={{ paddingTop: "2px" }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ width: "70%", marginTop: "5px" }}>
                      <h2 className="mt-2 f-w-300">
                        {binnacle.activities.length}
                        <sub className="text-muted f-14">Actividades</sub>
                      </h2>
                    </div>
                    <div
                      style={{
                        width: "30%",
                        textAlign: "right",
                        paddingTop: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <img
                        src={bitacora}
                        style={{ width: "75px", height: "50px" }}
                        alt="bitacora"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "right",
                        width: "30%",
                        marginRight: "7px",
                      }}
                    >
                      <button
                        className="btn-cards-binnacle-eliminar"
                        onClick={(e) => {
                          this.showModalDelete(e, binnacle.id);
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                    <div
                      style={{
                        textAlign: "right",
                        width: "25%",
                        marginRight: "7px",
                      }}
                    >
                      <button
                        className="btn-cards-binnacle-edit"
                        onClick={(e) => {
                          this.sendBinnacle(e, binnacle.id);
                        }}
                      >
                        Editar
                      </button>
                    </div>
                    <div
                      style={{
                        textAlign: "right",
                        width: "40%",
                      }}
                    >
                      <button
                        className="btn-cards-binnacle"
                        onClick={() => this.viewActivities(binnacle.id)}
                      >
                        Actividades
                      </button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <ModalAdd
          show={showModalAdd}
          onCancel={cancelModalAdd}
          onHide={saveModalAddBinnacle}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <ModalEdit
          show={showModalEdit}
          binnacle={binnacle}
          onHide={editBinnacle}
          onCancel={cancelModalEdit}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <ModalDelete
          show={showModalDelete}
          id={binnacle.id}
          title={"¡ Advertencia !"}
          content={"¿Está seguro que desea eliminar la bitácora?"}
          onCancel={cancelModalDelete}
          onHide={deleteBinnacle}
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

BinnacleList.propTypes = {
  getBinnacleBySowingId: PropTypes.func,
  getSowingById: PropTypes.func,
  getLotById: PropTypes.func,
  addBinnacle: PropTypes.func,
  getBinnacleById: PropTypes.func,
  editBinnacle: PropTypes.func,
  deleteBinnacle: PropTypes.func,
};

export default connect(null, {
  getBinnacleBySowingId,
  getSowingById,
  getLotById,
  addBinnacle,
  getBinnacleById,
  editBinnacle,
  deleteBinnacle,
})(BinnacleList);
