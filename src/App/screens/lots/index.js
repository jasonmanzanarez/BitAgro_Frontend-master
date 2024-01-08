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
  getListLots,
  addLot,
  getLotById,
  editLot,
  deleteLot,
} from "../../../store/actionsApp/lots";

class Lots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showModalAdd: false,
      showModalEdit: false,
      showModalSuccess: false,
      showModalDelete: false,
      showAlertAdd: false,
      contentAlertAdd: "",
      titleSuccess: "",
      contentSuccess: "",
      lot: {
        id: "",
        alias: "",
        address: "",
        numHas: "",
        typeAdq: "",
        cost: "",
        status: true,
      },
    };
  }

  async componentDidMount() {
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getListLots(token);
      console.log(res.data);
      if (res.status === 201) {
        this.setState({ data: res.data });
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  showModalAddLot = (e) => {
    e.preventDefault();
    this.setState({ showModalAdd: true });
  };

  sendLot = async (e, id) => {
    e.preventDefault();
    this.setState({ showModalEdit: true });
    console.log(id);
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getLotById(token, id);
      console.log(res.data);
      if (res.status === 201) {
        console.log("este es el lote", res.data);
        this.setState((prevState) => {
          let lot = { ...prevState.lot };
          lot.id = res.data.id;
          lot.alias = res.data.alias;
          lot.address = res.data.address;
          lot.numHas = res.data.numHas;
          lot.typeAdq = res.data.typeAdq;
          lot.cost = res.data.cost;
          lot.status = res.data.status;
          return { lot };
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
      let lot = { ...prevState.lot };
      lot.id = id;
      return { lot };
    });
  };

  render() {
    const {
      data,
      showModalAdd,
      showModalEdit,
      showModalSuccess,
      showModalDelete,
      showAlertAdd,
      contentAlertAdd,
      titleSuccess,
      contentSuccess,
      lot,
    } = this.state;

    let cancelModalAddLot = () => {
      this.setState({ showModalAdd: false });
    };

    let saveModalAddLot = async (alias, address, numHas, typeAdq, cost) => {
      try {
        let id = localStorage.getItem("id");
        let data = {
          alias,
          address,
          numHas,
          typeAdq,
          cost,
        };
        let token = localStorage.getItem("token");
        console.log("datos", data);
        const res = await this.props.addLot(token, data);
        console.log(res);
        if (res.status === 201) {
          console.log("Se creo");
          this.setState({ showModalAdd: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha agregado un nuevo lote..",
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

    let editLot = async (id, alias, address, numHas, typeAdq, cost, status) => {
      try {
        let token = localStorage.getItem("token");
        let data = {
          id,
          alias,
          address,
          numHas,
          typeAdq,
          cost,
          status,
        };
        console.log("datos", data);
        const res = await this.props.editLot(token, id, data);
        console.log(res);
        if (res.status === 201) {
          console.log("Se actualizo");
          this.setState({ showModalEdit: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha editado el lote..",
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

    let deleteLot = async (id) => {
      try {
        let token = localStorage.getItem("token");
        const res = await this.props.deleteLot(token, id);
        console.log(res);
        if (res.status === 201) {
          console.log("Se elimino");
          this.setState({ showModalDelete: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha eliminado el lote..",
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
              <Card.Title as="h5">Lista de lotes</Card.Title>
              <div style={{ textAlign: "right" }}>
                <Button size="sm" onClick={this.showModalAddLot}>
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
                        Dirección
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Hectáreas
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
                  {data.map((lot) => (
                    <tr className="unread" key={lot.id}>
                      <td>
                        <i
                          className="fa fa-map-signs auth-icono-table"
                          style={{ width: "20px" }}
                        />
                      </td>
                      <td>
                        <h6 className="mb-1">{lot.alias}</h6>
                      </td>
                      <td>
                        <h6 className="text-muted">{lot.address}</h6>
                      </td>
                      <td>
                        <h6 className="text-muted">{lot.numHas}</h6>
                      </td>
                      <td>
                        {lot.status ? (
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
                            this.sendLot(e, lot.id);
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
                            this.showDeleteModal(e, lot.id);
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
          onCancel={cancelModalAddLot}
          onHide={saveModalAddLot}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <ModalEdit
          show={showModalEdit}
          lot={lot}
          onHide={editLot}
          onCancel={cancelModalEdit}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <ModalDelete
          show={showModalDelete}
          id={lot.id}
          title={"¡ Advertencia !"}
          content={"¿Está seguro que desea eliminar el lote?"}
          onCancel={cancelModalDelete}
          onHide={deleteLot}
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

Lots.propTypes = {
  getListLots: PropTypes.func,
  addLot: PropTypes.func,
  getLotById: PropTypes.func,
  editLot: PropTypes.func,
  deleteLot: PropTypes.func,
};

export default connect(null, {
  getListLots,
  addLot,
  getLotById,
  editLot,
  deleteLot,
})(Lots);
