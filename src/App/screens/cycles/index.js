import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Card, Table, Button } from "react-bootstrap";
import Moment from "moment";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import ModalMessage from "../../components/ModalMessage";
import ModalDelete from "../../components/ModalDelete";

import {
  getListCycles,
  addCycle,
  getCycleById,
  editCycle,
  deleteCycle,
} from "../../../store/actionsApp/cycles";

class Cycles extends React.Component {
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
      cycle: {
        id: "",
        name: "",
        dateStart: new Date(),
        dateFinish: new Date(),
        crops: [],
        status: true,
      },
    };
  }

  async componentDidMount() {
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getListCycles(token);
      console.log(res.data);
      if (res.status === 201) {
        this.setState({ data: res.data });
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  showModalAddCycle = (e) => {
    e.preventDefault();
    this.setState({ showModalAdd: true });
  };

  sendCycle = async (e, id) => {
    e.preventDefault();
    this.setState({ showModalEdit: true });
    console.log(id);
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getCycleById(token, id);
      console.log(res.data);
      if (res.status === 201) {
        console.log("este es el ciclo", res.data);
        this.setState((prevState) => {
          let cycle = { ...prevState.cycle };
          cycle.id = res.data.id;
          cycle.name = res.data.name;
          cycle.dateStart = new Date(res.data.dateStart);
          cycle.dateFinish = new Date(res.data.dateFinish);
          cycle.crops = res.data.crops;
          cycle.status = res.data.status;
          return { cycle };
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
      let cycle = { ...prevState.cycle };
      cycle.id = id;
      return { cycle };
    });
  };

  showModalEdit = (e) => {
    e.preventDefault();
    this.setState({ showModalEdit: false });
  };

  render() {
    Moment.locale();
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
      cycle,
    } = this.state;

    let cancelModalAddCycle = () => {
      this.setState({ showModalAdd: false });
    };

    let saveModalAddCycle = async (name, dateStart, dateFinish, crops) => {
      try {
        let id = localStorage.getItem("id");
        let data = {
          name,
          dateStart,
          dateFinish,
          crops,
        };
        let token = localStorage.getItem("token");
        console.log("datos", data);
        const res = await this.props.addCycle(token, data);
        console.log(res);
        if (res.status === 201) {
          console.log("Se creo");
          this.setState({ showModalAdd: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha agregado un nuevo ciclo agrícola..",
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

    let editCycle = async (id, name, dateStart, dateFinish, crops, status) => {
      try {
        let token = localStorage.getItem("token");
        let data = {
          id,
          name,
          dateStart,
          dateFinish,
          crops,
          status,
        };
        console.log("datos", data);
        const res = await this.props.editCycle(token, id, data);
        console.log(res);
        if (res.status === 201) {
          console.log("Se actualizo");
          this.setState({ showModalEdit: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha editado el ciclo agrícola..",
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

    let deleteCycle = async (id) => {
      try {
        let token = localStorage.getItem("token");
        const res = await this.props.deleteCycle(token, id);
        console.log(res);
        if (res.status === 201) {
          console.log("Se elimino");
          this.setState({ showModalDelete: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha eliminado el ciclo agrícola..",
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    }; //Se hace la peticion al servicio de eliminar ciclo

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
              <Card.Title as="h5">Lista de ciclos agrícolas</Card.Title>
              <div style={{ textAlign: "right" }}>
                <Button size="sm" onClick={this.showModalAddCycle}>
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
                        Nombre
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Fecha inicio
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Fecha final
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Cultivos
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
                  {data.map((cycle) => (
                    <tr className="unread" key={cycle.id}>
                      <td>
                        <i
                          className="fa fa-clock-o auth-icono-table"
                          style={{ width: "20px" }}
                        />
                      </td>
                      <td>
                        <h6 className="mb-1">{cycle.name}</h6>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fa fa-circle text-c-green f-10 m-r-15" />
                          {Moment(cycle.dateStart).format("L")}
                        </h6>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fa fa-circle text-c-red f-10 m-r-15" />
                          {Moment(cycle.dateFinish).format("L")}
                        </h6>
                      </td>
                      <td>
                        {cycle.crops.map((item, index) => (
                          <h6 className="text-muted" key={index}>
                            {index + 1}.{item}
                          </h6>
                        ))}
                      </td>
                      <td>
                        {cycle.status ? (
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
                            this.sendCycle(e, cycle.id);
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
                            this.showDeleteModal(e, cycle.id);
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
          onCancel={cancelModalAddCycle}
          onHide={saveModalAddCycle}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <ModalEdit
          show={showModalEdit}
          cycle={cycle}
          onHide={editCycle}
          onCancel={cancelModalEdit}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <ModalDelete
          show={showModalDelete}
          id={cycle.id}
          title={"¡ Advertencia !"}
          content={"¿Está seguro que desea eliminar el ciclo agrícola?"}
          onCancel={cancelModalDelete}
          onHide={deleteCycle}
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

Cycles.propTypes = {
  getListCycles: PropTypes.func,
  addCycle: PropTypes.func,
  getCycleById: PropTypes.func,
  editCycle: PropTypes.func,
  deleteCycle: PropTypes.func,
};

export default connect(null, {
  getListCycles,
  addCycle,
  getCycleById,
  editCycle,
  deleteCycle,
})(Cycles);
