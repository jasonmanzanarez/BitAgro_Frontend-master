import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import ModalProfile from "../../../../components/ModalProfile";
import ModalChangePass from "../../../../components/ModalChangePassword";
import ModalEliminar from "../../../../components/ModalEliminar";
import ModalMessage from "../../../../components/ModalMessage";

import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../../../../../store/actionsApp/profile";

import Avatar1 from "../../../../../assets/images/user/avatar-1.jpg";

class NavRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      name: localStorage.getItem("name"),
      showModalProfile: false,
      showModalChangePass: false,
      showModalEliminar: false,
      showModalMessage: false,
      showAlertChangePass: false,
      contentAlertPass: "",
      titleSuccess: "",
      contentSuccess: "",
      user: {
        name: "",
        lastname: "",
        email: "",
        phone: "",
      },
    };
    this.showProfile = this.showProfile.bind(this);
  }

  showProfile = async (e) => {
    e.preventDefault();
    this.setState({ showModalProfile: true });
    try {
      let id = localStorage.getItem("id");
      const res = await this.props.getProfile(id);
      console.log(res.data);
      if (res.status === 201) {
        this.setState((prevState) => {
          let user = { ...prevState.user };
          user.name = res.data.name;
          user.lastname = res.data.lastName;
          user.email = res.data.email;
          user.phone = res.data.phone;
          return { user };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  showChangePass = (e) => {
    e.preventDefault();
    this.setState({ showModalChangePass: true });
  };

  showModalEliminar = (e) => {
    e.preventDefault();
    this.setState({ showModalEliminar: true });
  };

  deleteAccountModal = async () => {
    try {
      let id = localStorage.getItem("id");
      const res = await this.props.deleteAccount(id);
      console.log(res);
      if (res.status === 201) {
        console.log("Se elimino la cuenta");
        this.setState({ showModalEliminar: false });
        this.props.history.push("/auth/signup");
      }
    } catch (error) {}
  };

  render() {
    const {
      name,
      showModalProfile,
      showModalChangePass,
      showModalEliminar,
      showModalMessage,
      user,
      showAlertChangePass,
      contentAlertPass,
      titleSuccess,
      contentSuccess,
    } = this.state;

    let updateProfile = async (name, lastname, email, phone) => {
      try {
        let id = localStorage.getItem("id");
        let data = {
          name,
          lastName: lastname,
          email,
          phone,
        };
        console.log("datos", data);
        const res = await this.props.updateProfile(data, id);
        console.log(res);
        if (res.status === 201) {
          console.log("Se actualizo");
          this.setState({ showModalProfile: false });
          this.setState({ showModalMessage: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha actualizado el perfil de usuario..",
          });
        }
      } catch (error) {
        console.log(error);
      }
      console.log(name);
      console.log(lastname);
      console.log(email);
    }; //Se hace la peticion al servicio de actualizar perfil

    let cancelModalProfile = () => {
      this.setState({ showModalProfile: false });
    }; //boton cancelar del modal perfil

    let cancelModalMessageShow = () => {
      this.setState({ showModalMessage: false });
    }; //cancela modal mensaje de exito

    let changePassword = async (
      currentPassword,
      newPassword,
      confirmPassword
    ) => {
      try {
        let id = localStorage.getItem("id");
        let data = {
          currentPassword,
          newPassword,
          confirmPassword,
        };
        console.log("datos", data);
        const res = await this.props.changePassword(data, id);
        console.log(res);
        if (res.status === 201) {
          console.log("Se actualizo");
          this.setState({ showModalChangePass: false });
          this.setState({ showModalMessage: true });
          this.setState({ titleSuccess: "¡ Operación exitosa !" });
          this.setState({
            contentSuccess: "Se ha cambiado su contraseña..",
          });
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.data === "Incorrect password") {
          this.setState({ showAlertChangePass: true });
          this.setState({ contentAlertPass: "Contraseña actual incorrecta.." });
        }
        if (error.response.data === "No matches") {
          this.setState({ showAlertChangePass: true });
          this.setState({
            contentAlertPass: "Las nuevas contraseñas no coinciden..",
          });
        }
        if (error.response.data === "You can not enter an old password") {
          this.setState({ showAlertChangePass: true });
          this.setState({
            contentAlertPass: "La nueva contraseña es igual a la actual..",
          });
        }
        if (error.response.status === 400) {
          this.setState({ showAlertChangePass: true });
          this.setState({
            contentAlertPass: "Todos los campos son requeridos..",
          });
        }
      }
    };

    let cancelModalChangePass = () => {
      this.setState({ showModalChangePass: false });
    };

    let cancelModelDelete = () => {
      this.setState({ showModalEliminar: false });
    };

    return (
      <Aux>
        <ul className="navbar-nav ml-auto">
          {/* Aqui va lo de notificaciones */}
          <li>
            <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
              <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                <i className="icon feather icon-settings" />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="profile-notification">
                <div className="pro-head">
                  <img
                    src={Avatar1}
                    className="img-radius"
                    alt="User Profile"
                  />
                  <span>Bienvenido(a) {name}</span>
                  <a
                    href={DEMO.BLANK_LINK}
                    className="dud-logout"
                    title="Logout"
                  >
                    <i className="feather icon-log-out" />
                  </a>
                </div>
                <ul className="pro-body">
                  <li>
                    <a
                      href={""}
                      className="dropdown-item"
                      onClick={this.showProfile}
                    >
                      <i className="feather icon-user" /> Perfil
                    </a>
                  </li>
                  <li>
                    <a
                      href={""}
                      className="dropdown-item"
                      onClick={this.showChangePass}
                    >
                      <i className="feather icon-edit-1" /> Cambiar contraseña
                    </a>
                  </li>
                  <li>
                    <a
                      href={""}
                      className="dropdown-item"
                      onClick={this.showModalEliminar}
                    >
                      <i className="feather icon-trash-2" /> Eliminar mi cuenta
                    </a>
                  </li>
                </ul>
                <ModalProfile
                  show={showModalProfile}
                  user={user}
                  onHide={updateProfile}
                  onCancel={cancelModalProfile}
                />
                <ModalMessage
                  show={showModalMessage}
                  onHide={cancelModalMessageShow}
                  title={titleSuccess}
                  content={contentSuccess}
                />
                <ModalChangePass
                  show={showModalChangePass}
                  showAlert={showAlertChangePass}
                  contentAlert={contentAlertPass}
                  onHide={changePassword}
                  onCancel={cancelModalChangePass}
                />
                <ModalEliminar
                  show={showModalEliminar}
                  content={"¿Está seguro que desea eliminar su cuenta?"}
                  title={"¡Advertencia!"}
                  onHide={this.deleteAccountModal}
                  onCancel={cancelModelDelete}
                />
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </Aux>
    );
  }
}

NavRight.propTypes = {
  getProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

export default connect(null, {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
})(NavRight);
