import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Card, Table, Button } from "react-bootstrap";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import avatar2 from "../../../assets/images/user/avatar-2.jpg";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import ModalMessage from "../../components/ModalMessage";
import ModalDelete from "../../components/ModalDelete";

import {
  getListHR,
  addPerson,
  getPersonById,
  editPerson,
  deletePerson,
} from "../../../store/actionsApp/humanResources";

class HumanResources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalAdd: false,
      showModalMessage: false,
      showModalEdit: false,
      showModalDelete: false,
      titleSuccess: "",
      contentSuccess: "",
      showAlertAdd: false,
      contentAlertAdd: "",
      person: {
        id: "",
        name: "",
        phone: "",
        address: "",
        salary: "",
      },
      data: [],
    };
  }

  async componentDidMount() {
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getListHR(token);
      console.log(res.data);
      if (res.status === 201) {
        this.setState({ data: res.data });
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  // ---- Agregar personal -----
  showModalAdd = (e) => {
    e.preventDefault();
    this.setState({ showModalAdd: true });
  };

  sendPerson = async (e, id) => {
    e.preventDefault();
    this.setState({ showModalEdit: true });
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getPersonById(token, id);
      console.log(res.data);
      if (res.status === 201) {
        console.log("este es la persona", res.data);
        this.setState((prevState) => {
          let person = { ...prevState.person };
          person.id = res.data.id;
          person.name = res.data.name;
          person.phone = res.data.phone;
          person.address = res.data.address;
          person.salary = res.data.salary;
          return { person };
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  //---- Eliminar personal ----
  showDeleteModal = async (e, id) => {
    e.preventDefault();
    this.setState({ showModalDelete: true });
    console.log(id);
    this.setState((prevState) => {
      let person = { ...prevState.person };
      person.id = id;
      return { person };
    });
  };

  render() {
    const {
      showModalAdd,
      showModalMessage,
      showModalEdit,
      showModalDelete,
      titleSuccess,
      contentSuccess,
      data,
      showAlertAdd,
      contentAlertAdd,
      person,
    } = this.state;

    let cancelModalAdd = () => {
      this.setState({ showModalAdd: false });
    };

    let addPerson = async (name, phone, address, salary) => {
      try {
        /* let id = localStorage.getItem("id"); */
        let data = {
          name,
          phone,
          address,
          salary,
        };
        let token = localStorage.getItem("token");
        console.log("datos", data);
        const res = await this.props.addPerson(token, data);
        console.log(res);
        if (res.status === 201) {
          console.log("Se creo");
          this.setState({ showModalAdd: false });
          this.setState({ showModalMessage: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha agregado nuevo personal..",
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
    }; //Se hace la peticion al servicio de agregar personal

    let editPerson = async (id, name, phone, address, salary) => {
      try {
        let token = localStorage.getItem("token");
        let data = {
          name,
          phone,
          address,
          salary,
        };
        console.log("datos", data);
        const res = await this.props.editPerson(token, id, data);
        console.log(res);
        if (res.status === 201) {
          console.log("Se actualizo");
          this.setState({ showModalEdit: false });
          this.setState({ showModalMessage: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha editado el personal..",
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

    let deletePerson = async (id) => {
      try {
        let token = localStorage.getItem("token");
        const res = await this.props.deletePerson(token, id);
        console.log(res);
        if (res.status === 201) {
          console.log("Se elimino");
          this.setState({ showModalDelete: false });
          this.setState({ showModalMessage: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha eliminado personal..",
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    }; //Se hace la peticion al servicio de eliminar personal

    let cancelModalMessageShow = () => {
      this.setState({ showModalMessage: false });
    };

    let cancelModalEdit = () => {
      this.setState({ showModalEdit: false });
    };

    let cancelModalDelete = () => {
      this.setState({ showModalDelete: false });
    };

    return (
      <Aux>
        <Col md={12}>
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">Lista de personal</Card.Title>
              <div style={{ textAlign: "right" }}>
                <Button size="sm" onClick={this.showModalAdd}>
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
                        Teléfono
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Dirección
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Salario semanal
                      </h6>
                    </th>
                    <th>
                      <h6 className="mb-1" style={{ fontWeight: "bold" }}>
                        Acciones
                      </h6>
                    </th>
                  </tr>
                  {data.map((person) => (
                    <tr className="unread" key={person.id}>
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ width: "40px" }}
                          src={avatar2}
                          alt="activity-user"
                        />
                      </td>
                      <td>
                        <h6 className="mb-1">{person.name}</h6>
                      </td>
                      <td>
                        <h6 className="text-muted">{person.phone}</h6>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fa fa-circle text-c-green f-10 m-r-15" />
                          {person.address}
                        </h6>
                      </td>
                      <td>
                        <h6 className="text-muted">$ {person.salary}</h6>
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
                            this.sendPerson(e, person.id);
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
                            this.showDeleteModal(e, person.id);
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
          onHide={addPerson}
          onCancel={cancelModalAdd}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <ModalEdit
          show={showModalEdit}
          person={person}
          onHide={editPerson}
          onCancel={cancelModalEdit}
          showAlert={showAlertAdd}
          contentAlert={contentAlertAdd}
        />
        <ModalDelete
          show={showModalDelete}
          id={person.id}
          title={"¡ Advertencia !"}
          content={"¿Está seguro que desea eliminar el personal?"}
          onCancel={cancelModalDelete}
          onHide={deletePerson}
        />
        <ModalMessage
          show={showModalMessage}
          onHide={cancelModalMessageShow}
          title={titleSuccess}
          content={contentSuccess}
        />
      </Aux>
    );
  }
}

HumanResources.propTypes = {
  getListHR: PropTypes.func.isRequired,
  addPerson: PropTypes.func.isRequired,
  getPersonById: PropTypes.func.isRequired,
  editPerson: PropTypes.func.isRequired,
  deletePerson: PropTypes.func.isRequired,
};

export default connect(null, {
  getListHR,
  addPerson,
  getPersonById,
  editPerson,
  deletePerson,
})(HumanResources);
