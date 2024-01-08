import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Card, Table, Button } from "react-bootstrap";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import ModalMessage from "../../components/ModalMessage";
import ModalDelete from "../../components/ModalDelete";

import {
  getSowingByLotId,
  addSowing,
  getSowingById,
  editSowing,
  deleteSowing,
} from "../../../store/actionsApp/sowings";
import { getListCycles, getCycleById } from "../../../store/actionsApp/cycles";
import { getLotById } from "../../../store/actionsApp/lots";

class SowingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataCycles: [],
      showModalAdd: false,
      showModalEdit: false,
      showModalDelete: false,
      showModalSuccess: false,
      showAlertAdd: false,
      contentAlertAdd: "",
      titleSuccess: "",
      contentSuccess: "",
      loteName: "",
      loteAddress: "",
      loteNumHas: "",
      sowing: {
        id: "",
        alias: "",
        cycle: "",
        crops: "",
        status: false,
      },
      botonDisable: false,
    };
  }

  async componentDidMount() {
    try {
      let token = localStorage.getItem("token");
      let lotId = this.props.match.params.lotId;
      console.log("id lote", lotId);
      const dataLot = await this.props.getLotById(token, lotId);
      console.log("data lote", dataLot.data);
      const dataCycle = await this.props.getListCycles(token);
      const res = await this.props.getSowingByLotId(token, lotId);
      console.log("status ciclos", dataCycle.status);
      console.log("data", res.data);
      console.log("data ciclos", dataCycle.data);
      if (dataLot.status === 201) {
        this.setState({ loteName: dataLot.data.alias });
        this.setState({ loteAddress: dataLot.data.address });
        this.setState({ loteNumHas: dataLot.data.numHas });
        if (dataLot.data.status === false) {
          this.setState({ botonDisable: true });
        }
      }
      if (dataCycle.status === 201) {
        this.setState({ dataCycles: dataCycle.data });
      }
      console.log(res.status);
      if (res.status === 201) {
        console.log("si entro");
        this.setState({ data: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  showModalAddSowing = (e) => {
    e.preventDefault();
    this.setState({ showModalAdd: true });
  };

  sendSowing = async (e, id) => {
    e.preventDefault();
    this.setState({ showModalEdit: true });
    console.log(id);
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getSowingById(token, id);
      const resCycle = await this.props.getCycleById(token, res.data.cycleId);
      console.log(res.data);
      if (res.status === 201) {
        console.log("este es el lote", res.data);
        this.setState((prevState) => {
          let sowing = { ...prevState.sowing };
          sowing.id = res.data.id;
          sowing.alias = res.data.alias;
          sowing.crops = res.data.crops;
          sowing.cycle = resCycle.data.name;
          sowing.status = res.data.status;
          return { sowing };
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  showDeleteModal = async (e, id) => {
    e.preventDefault();
    this.setState({ showModalDelete: true });
    console.log(id);
    this.setState((prevState) => {
      let sowing = { ...prevState.sowing };
      sowing.id = id;
      return { sowing };
    });
  };

  render() {
    const {
      data,
      dataCycles,
      showModalAdd,
      showModalEdit,
      showModalSuccess,
      showModalDelete,
      showAlertAdd,
      contentAlertAdd,
      titleSuccess,
      contentSuccess,
      loteName,
      loteAddress,
      loteNumHas,
      sowing,
      botonDisable,
    } = this.state;

    let cancelModalAddSowing = () => {
      this.setState({ showModalAdd: false });
    };

    let saveModalAddCycle = async (alias, cycle, crops, budget) => {
      try {
        let data = {
          alias,
          cycleId: cycle,
          crops,
          lotId: this.props.match.params.lotId,
          budget,
        };
        let token = localStorage.getItem("token");
        console.log("datos", data);
        const res = await this.props.addSowing(token, data);
        console.log(res);
        if (res.status === 201) {
          console.log("Se creo");
          this.setState({ showModalAdd: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha agregado una nueva siembra..",
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

    let editSowing = async (id, alias, cycle, crops, status) => {
      try {
        let token = localStorage.getItem("token");
        let data = {
          alias,
          cycleId: cycle,
          lotId: this.props.match.params.lotId,
          crops,
          status,
        };
        console.log("datos", data);
        const res = await this.props.editSowing(token, id, data);
        console.log(res);
        if (res.status === 201) {
          console.log("Se actualizo");
          this.setState({ showModalEdit: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha editado la siembra..",
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

    let deleteSowing = async (id) => {
      try {
        let token = localStorage.getItem("token");
        const res = await this.props.deleteSowing(token, id);
        console.log(res);
        if (res.status === 201) {
          console.log("Se elimino");
          this.setState({ showModalDelete: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha eliminado la siembra..",
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    }; //Se hace la peticion al servicio de eliminar lote

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
        <Col md={12}>
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">Siembras por lote </Card.Title>

              <div style={{ textAlign: "left" }}>
                <h7 className="fuente-encabezado">
                  <i className="fa fa-map-marker auth-icono-encabezado"></i>{" "}
                  {loteName} {loteAddress}
                  {", "}
                  {loteNumHas}
                  {" Has."}
                </h7>
              </div>
              <div style={{ textAlign: "right" }}>
                <Button
                  size="sm"
                  onClick={this.showModalAddSowing}
                  disabled={botonDisable}
                >
                  <i>
                    <i className="feather icon-plus-circle auth-icon" />
                  </i>
                  Agregar
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover>
                <tbody>
                  <tr>
                    <th></th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Alias
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Cultivo
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Lote
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Ciclo
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
                  {data.map((sowing) => (
                    <tr className="unread" key={sowing.id}>
                      <td>
                        <i
                          className="fa fa-leaf auth-icono-table"
                          style={{ width: "20px" }}
                        />
                      </td>
                      <td>
                        <h6 className="mb-1">{sowing.alias}</h6>
                      </td>
                      <td>
                        <h6 className="text-muted">{sowing.crops}</h6>
                      </td>
                      <td>
                        <h6 className="text-muted">{sowing.lot.alias}</h6>
                      </td>
                      <td>
                        <h6 className="text-muted">{sowing.cycle.name}</h6>
                      </td>
                      <td>
                        {sowing.status ? (
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
                            this.sendSowing(e, sowing.id);
                          }}
                        >
                          <i className="feather icon-edit-1" />
                        </Button>
                        <Button
                          className="drp-icon "
                          style={{
                            width: "40px",
                            height: "30px",
                            paddingTop: "5px",
                          }}
                          variant="danger"
                          size="sm"
                          onClick={(e) => {
                            this.showDeleteModal(e, sowing.id);
                          }}
                        >
                          <i className="feather icon-trash-2" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <ModalAdd
          show={showModalAdd}
          onCancel={cancelModalAddSowing}
          dataCycle={dataCycles}
          onHide={saveModalAddCycle}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <ModalEdit
          show={showModalEdit}
          sowing={sowing}
          dataCycle={dataCycles}
          onHide={editSowing}
          onCancel={cancelModalEdit}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <ModalDelete
          show={showModalDelete}
          id={sowing.id}
          title={"¡ Advertencia !"}
          content={"¿Está seguro que desea eliminar la siembra?"}
          onCancel={cancelModalDelete}
          onHide={deleteSowing}
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

SowingList.propTypes = {
  getSowingByLotId: PropTypes.func,
  getListCycles: PropTypes.func,
  addSowing: PropTypes.func,
  getSowingById: PropTypes.func,
  editSowing: PropTypes.func,
  deleteSowing: PropTypes.func,
  getLotById: PropTypes.func,
};

export default connect(null, {
  getSowingByLotId,
  getListCycles,
  addSowing,
  getSowingById,
  editSowing,
  deleteSowing,
  getCycleById,
  getLotById,
})(SowingList);
