import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Card, Button, Table, Tabs, Tab } from "react-bootstrap";
import Moment from "moment";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import objetivo from "../../../assets/images/objetivo.jpg";

import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import Init from "./init";
import Finish from "./finish";
import ModalMessage from "../../components/ModalMessage";
import ModalDelete from "../../components/ModalDelete";

import {
  getBinnacleWait,
  getBinnacleInit,
  getBinnacleFinish,
  addActivitie,
  getActivitieById,
  editActivitie,
  deleteActivitie,
  initActivitie,
  finishActivitie,
} from "../../../store/actionsApp/activities";
import { getListHR } from "../../../store/actionsApp/humanResources";
import { getBinnacleById } from "../../../store/actionsApp/binnacle";

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataWait: [],
      dataInit: [],
      dataFinish: [],
      dataPersonal: [],
      showModalAdd: false,
      showModalEdit: false,
      showModalInit: false,
      showModalFinish: false,
      showModalDelete: false,
      showAlertAdd: false,
      contentAlertAdd: "",
      showModalSuccess: false,
      titleSuccess: "",
      contentSuccess: "",
      activitie: {
        id: "",
        name: "",
        dateStart: "",
        dateFinish: "",
        estimatedExpense: "",
        resources: [],
        humanResource: "",
        actualExpense: "",
        status: "",
      },
      botonDisabled: false,
      titleBinnacle: "",
      descBinnacle: "",
    };
  }

  async componentDidMount() {
    try {
      let token = localStorage.getItem("token");
      let binnacleId = this.props.match.params.binnacleId;
      const wait = await this.props.getBinnacleWait(token, binnacleId);
      const init = await this.props.getBinnacleInit(token, binnacleId);
      const finish = await this.props.getBinnacleFinish(token, binnacleId);
      const dataPersona = await this.props.getListHR(token);
      const dataBinnacle = await this.props.getBinnacleById(token, binnacleId);
      console.log(wait.data);
      console.log(init.data);
      console.log(finish.data);

      if (dataBinnacle.status === 201) {
        if (dataBinnacle.data.status === false) {
          this.setState({ botonDisabled: true });
        }
        this.setState({ titleBinnacle: dataBinnacle.data.name });
        this.setState({ descBinnacle: dataBinnacle.data.description });
      }
      if (wait.status === 201) {
        this.setState({ dataWait: wait.data });
      }
      if (init.status === 201) {
        this.setState({ dataInit: init.data });
      }
      if (finish.status === 201) {
        this.setState({ dataFinish: finish.data });
      }
      if (dataPersona.status === 201) {
        this.setState({ dataPersonal: dataPersona.data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  showModalAddActivitie = (e) => {
    e.preventDefault();
    this.setState({ showModalAdd: true });
  };

  sendActivitie = async (e, id) => {
    e.preventDefault();
    this.setState({ showModalEdit: true });
    console.log("id actividad", id);
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getActivitieById(token, id);
      console.log(res.data);
      if (res.status === 201) {
        if (res.data.humanResource.length !== 0) {
          this.setState((prevState) => {
            let activitie = { ...prevState.activitie };
            activitie.humanResource = res.data.humanResource.name;
            return { activitie };
          });
        }
        this.setState((prevState) => {
          let activitie = { ...prevState.activitie };
          activitie.id = res.data.id;
          activitie.name = res.data.name;
          activitie.dateStart = new Date(res.data.dateStart);
          activitie.dateFinish = new Date(res.data.dateFinish);
          activitie.estimatedExpense = res.data.estimatedExpense;
          activitie.resources = res.data.resources;
          activitie.actualExpense = res.data.actualExpense;
          activitie.status = res.data.status;
          return { activitie };
        });
        console.log(this.state.activitie);
      }
    } catch (error) {
      console.log(error);
    }
  };

  showDeleteModal = async (e, id) => {
    e.preventDefault();
    this.setState({ showModalDelete: true });
    console.log(id);
    this.setState((prevState) => {
      let activitie = { ...prevState.activitie };
      activitie.id = id;
      return { activitie };
    });
  };

  sendInit = async (e, id) => {
    e.preventDefault();
    console.log("id actividad", id);
    await this.setState({ showModalInit: true });
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getActivitieById(token, id);
      console.log(res.data);
      if (res.status === 201) {
        this.setState((prevState) => {
          let activitie = { ...prevState.activitie };
          activitie.id = res.data.id;
          activitie.dateStart = new Date(res.data.dateStart);
          return { activitie };
        });
        console.log(this.state.activitie);
      }
    } catch (error) {
      console.log(error);
    }
  };

  sendFinish = async (e, id) => {
    e.preventDefault();
    console.log("id actividad", id);
    await this.setState({ showModalFinish: true });
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getActivitieById(token, id);
      console.log(res.data);
      if (res.status === 201) {
        this.setState((prevState) => {
          let activitie = { ...prevState.activitie };
          activitie.id = res.data.id;
          activitie.dateFinish = new Date(res.data.dateFinish);
          activitie.actualExpense = res.data.actualExpense;
          return { activitie };
        });
        console.log(this.state.activitie);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    Moment.locale();
    const {
      dataWait,
      dataInit,
      dataFinish,
      dataPersonal,
      showModalAdd,
      showModalEdit,
      showModalDelete,
      showModalInit,
      showModalFinish,
      showAlertAdd,
      contentAlertAdd,
      showModalSuccess,
      titleSuccess,
      contentSuccess,
      activitie,
      botonDisabled,
      titleBinnacle,
      descBinnacle,
    } = this.state;

    let cancelModalAdd = () => {
      this.setState({ showModalAdd: false });
    };

    let saveModalAddActivitie = async (
      name,
      dateStart,
      dateFinish,
      estimatedExpense,
      resources,
      humanResourceId
    ) => {
      try {
        let id = this.props.match.params.binnacleId;
        console.log("id de bitácora", id);
        let data = {
          name,
          dateStart,
          dateFinish,
          estimatedExpense,
          resources,
          humanResourceId,
          binnacleId: id,
        };
        let token = localStorage.getItem("token");
        console.log("datos", data);
        const res = await this.props.addActivitie(token, data);
        console.log(res);
        if (res.status === 201) {
          console.log("Se creo");
          this.setState({ showModalAdd: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha agregado una nueva actividad..",
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

    let editActivitie = async (
      id,
      name,
      dateStart,
      dateFinish,
      estimatedExpense,
      resources,
      humanResource,
      actualExpense
    ) => {
      try {
        let token = localStorage.getItem("token");
        let data = {
          id,
          name,
          dateStart,
          dateFinish,
          estimatedExpense,
          resources,
          humanResourceId: humanResource,
          actualExpense,
        };
        console.log("datos a editar sss", data);
        console.log("token", token);
        console.log("id", id);
        const res = await this.props.editActivitie(token, id, data);
        console.log("actualizacion", res);
        if (res.status === 201) {
          console.log("Se actualizo");
          this.setState({ showModalEdit: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha editado la actividad..",
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

    let deleteActivitie = async (id) => {
      try {
        let token = localStorage.getItem("token");
        const res = await this.props.deleteActivitie(token, id);
        console.log(res);
        if (res.status === 201) {
          console.log("Se elimino");
          this.setState({ showModalDelete: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha eliminado la actividad..",
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    let initActivitie = async (id, dateStart) => {
      try {
        let token = localStorage.getItem("token");
        let data = {
          dateStart,
        };
        console.log("datos a editar", data);
        const res = await this.props.initActivitie(token, id, data);
        console.log("actualizacion", res.data);
        if (res.status === 201) {
          console.log("Se actualizo");
          this.setState({ showModalInit: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha inicializado la actividad..",
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
          this.setState({ showAlertAdd: true });
          this.setState({
            contentAlertAdd: "Campo requerido..",
          });
        }
      }
    };

    let finishActivitie = async (id, dateFinish, actualExpense) => {
      try {
        let token = localStorage.getItem("token");
        let data = {
          dateFinish,
          actualExpense,
        };
        console.log("datos a editar", data);
        const res = await this.props.finishActivitie(token, id, data);
        console.log("actualizacion", res.data);
        if (res.status === 201) {
          console.log("Se actualizo");
          this.setState({ showModalFinish: false });
          this.setState({ showModalSuccess: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha finalizado la actividad..",
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

    let cancelModalEdit = () => {
      this.setState({ showModalEdit: false });
    };

    let cancelModalDelete = () => {
      this.setState({ showModalDelete: false });
    };

    let cancelModalInit = () => {
      this.setState({ showModalInit: false });
    };

    let cancelModalFinish = () => {
      this.setState({ showModalFinish: false });
    };

    let cancelModalMessageShow = () => {
      this.setState({ showModalSuccess: false });
    };

    return (
      <Aux>
        <Col md={10} xl={12} className="m-b-30"></Col>
        <Card>
          <Card.Header md={12}>
            <Card.Title as="h5">Actividades</Card.Title>
            <div style={{ textAlign: "left" }}>
              <h7 className="fuente-encabezado">
                <i className="fa fa-list-alt auth-icono-encabezado"></i>{" "}
                {titleBinnacle}
              </h7>
            </div>
            <div style={{ textAlign: "left" }}>
              <h7 className="fuente-encabezado">{descBinnacle}</h7>
            </div>
            <div style={{ textAlign: "right" }}>
              <Button
                size="sm"
                onClick={this.showModalAddActivitie}
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

        <Col md={12} xl={12} className="m-b-30">
          <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
            <Tab eventKey="espera" title="En espera">
              <Table striped responsive>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>
                      <i className="fa fa-circle text-c-red f-17 m-r-15" />
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Actividad
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Inicia
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Finaliza
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        $ Estimado
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Atiende
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
                  {dataWait.map((act, index) => (
                    <tr key={act.id}>
                      <td>
                        <img
                          src={objetivo}
                          style={{ width: "30px", height: "30px" }}
                          alt="objetivo"
                        />
                      </td>
                      <td>{act.name}</td>
                      <td>
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        {Moment(act.dateStart).format("L")}
                      </td>
                      <td>
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        {Moment(act.dateFinish).format("L")}
                      </td>
                      <td>{act.estimatedExpense}</td>
                      {act.humanResource !== null ? (
                        <td>{act.humanResource.name}</td>
                      ) : (
                        <td>{""}</td>
                      )}
                      <td>
                        <Button
                          variant="primary"
                          title="Iniciar actividad"
                          size="sm"
                          className="drp-icon "
                          style={{
                            width: "40px",
                            height: "30px",
                            paddingTop: "5px",
                          }}
                          onClick={(e) => {
                            this.sendInit(e, act.id);
                          }}
                        >
                          <i className="fa fa-power-off" />
                        </Button>
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
                            this.sendActivitie(e, act.id);
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
                            this.showDeleteModal(e, act.id);
                          }}
                        >
                          <i className="feather icon-trash-2" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="iniciado" title="Inicializadas">
              <Table striped responsive>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>
                      <i className="fa fa-circle text-c-yellow f-17 m-r-15" />
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Actividad
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Inicia
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Finaliza
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        $ Estimado
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Atiende
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
                  {dataInit.map((act, index) => (
                    <tr key={act.id}>
                      <td>
                        <i
                          className="fa fa-power-off auth-icono-table"
                          style={{ width: "20px" }}
                        />
                      </td>
                      <td>{act.name}</td>
                      <td>
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        {Moment(act.dateStart).format("L")}
                      </td>
                      <td>
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        {Moment(act.dateFinish).format("L")}
                      </td>
                      <td>{act.estimatedExpense}</td>
                      {act.humanResource !== null ? (
                        <td>{act.humanResource.name}</td>
                      ) : (
                        <td>{""}</td>
                      )}
                      <td>
                        <Button
                          variant="danger"
                          title="Finalizar actividad"
                          size="sm"
                          className="drp-icon "
                          style={{
                            width: "40px",
                            height: "30px",
                            paddingTop: "5px",
                          }}
                          onClick={(e) => {
                            this.sendFinish(e, act.id);
                          }}
                        >
                          <i className="fa fa-power-off" />
                        </Button>
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
                            this.sendActivitie(e, act.id);
                          }}
                        >
                          <i className="feather icon-edit-1" />
                        </Button>
                        <Button
                          className="drp-icon "
                          style={{
                            width: "30px",
                            height: "30px",
                            paddingTop: "5px",
                          }}
                          variant="danger"
                          size="sm"
                          onClick={(e) => {
                            this.showDeleteModal(e, act.id);
                          }}
                        >
                          <i className="feather icon-trash-2" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="finalizado" title="Finalizadas">
              <Table striped responsive>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>
                      <i className="fa fa-circle text-c-green f-17 m-r-15" />
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Actividad
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Inicia
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Finaliza
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        $ Estimado
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Atiende
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
                  {dataFinish.map((act, index) => (
                    <tr key={act.id}>
                      <td>
                        <i
                          className="feather icon-check-square auth-icono-table"
                          style={{ width: "20px" }}
                        />
                      </td>
                      <td>{act.name}</td>
                      <td>
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        {Moment(act.dateStart).format("L")}
                      </td>
                      <td>
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        {Moment(act.dateFinish).format("L")}
                      </td>
                      <td>{act.estimatedExpense}</td>
                      {act.humanResource !== null ? (
                        <td>{act.humanResource.name}</td>
                      ) : (
                        <td>{""}</td>
                      )}
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
                            this.sendActivitie(e, act.id);
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
                            this.showDeleteModal(e, act.id);
                          }}
                        >
                          <i className="feather icon-trash-2" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Col>
        <ModalAdd
          show={showModalAdd}
          dataPersonal={dataPersonal}
          onCancel={cancelModalAdd}
          onHide={saveModalAddActivitie}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <ModalEdit
          show={showModalEdit}
          activitie={activitie}
          dataPersonal={dataPersonal}
          onHide={editActivitie}
          onCancel={cancelModalEdit}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <ModalDelete
          show={showModalDelete}
          id={activitie.id}
          title={"¡ Advertencia !"}
          content={"¿Está seguro que desea eliminar la actividad?"}
          onCancel={cancelModalDelete}
          onHide={deleteActivitie}
        />
        <ModalMessage
          show={showModalSuccess}
          onHide={cancelModalMessageShow}
          title={titleSuccess}
          content={contentSuccess}
        />
        <Init
          show={showModalInit}
          activitie={activitie}
          onHide={initActivitie}
          onCancel={cancelModalInit}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <Finish
          show={showModalFinish}
          activitie={activitie}
          onHide={finishActivitie}
          onCancel={cancelModalFinish}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
      </Aux>
    );
  }
}

Activities.propTypes = {
  getBinnacleWait: PropTypes.func,
  getBinnacleInit: PropTypes.func,
  getBinnacleFinish: PropTypes.func,
  getListHR: PropTypes.func,
  addActivitie: PropTypes.func,
  getActivitieById: PropTypes.func,
  editActivitie: PropTypes.func,
  deleteActivitie: PropTypes.func,
  initActivitie: PropTypes.func,
  finishActivitie: PropTypes.func,
  getBinnacleById: PropTypes.func,
};

export default connect(null, {
  getBinnacleWait,
  getBinnacleInit,
  getBinnacleFinish,
  getListHR,
  addActivitie,
  getActivitieById,
  editActivitie,
  deleteActivitie,
  initActivitie,
  finishActivitie,
  getBinnacleById,
})(Activities);
