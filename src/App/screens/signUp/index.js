import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import logo from "../../../assets/images/logo.ico";
import { signUp } from "../../../store/actionsApp/auth";
import DangerAlert from "../../components/DangerAlert";
import ModalMessage from "../../components/ModalMessage.js";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastName: "",
      email: "",
      nameError: "",
      lastNameError: "",
      emailError: "",
      showAlert: false,
      showModal: false,
      contentAlert: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    let nameError = "";
    let lastNameError = "";
    let emailError = "";

    if (!this.state.email.includes("@")) {
      emailError = "Correo inválido";
    }
    if (!this.state.name) {
      nameError = "Ingrese su nombre";
      this.setState({ nameError });
    }

    if (!this.state.lastName) {
      lastNameError = "Ingrese su apellido";
      this.setState({ lastNameError });
    }

    if (!this.state.email) {
      emailError = "Ingrese un correo electrónico";
      this.setState({ emailError });
    }

    if (nameError || lastNameError || emailError) {
      return false;
    }

    return true;
  };

  submitHandler = async (e) => {
    e.preventDefault();
    console.log(this.state);
    try {
      let isValid = this.validate();
      if (isValid) {
        const res = await this.props.signUp(this.state);
        console.log(res);
        if (res.status === 201) {
          this.setState({ showModal: true });
        }
      }
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        console.log("error 401");
        this.setState({ showAlert: true });
        this.setState({
          contentAlert: "Ya existe una cuenta con ese correo...",
        });
      } else {
        this.setState({ showAlert: true });
        this.setState({ contentAlert: "Ups..Algo ha fallado" });
      }
    }
  };

  render() {
    const {
      name,
      lastName,
      email,
      nameError,
      lastNameError,
      emailError,
      showAlert,
      showModal,
      contentAlert,
    } = this.state;

    let cancelModalShow = () => {
      this.setState({ showModal: false });
      this.props.history.push("/auth/signin");
    };

    return (
      <Aux>
        <Breadcrumb />
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <div className="card">
              <form onSubmit={this.submitHandler}>
                <div className="card-body text-center">
                  <div className="mb-4">
                    {/* <i className="feather icon-user-plus auth-icon" /> */}
                    <img src={logo} className="auth-icon-image"></img>
                  </div>
                  <h3 className="mb-4">Crea tu cuenta</h3>
                  {showAlert ? (
                    <div>
                      <DangerAlert content={contentAlert} />
                    </div>
                  ) : null}
                  <div className="input-group">
                    <div style={{ fontSize: 13, color: "red" }}>
                      {nameError}
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      name="name"
                      value={name}
                      onChange={(e) => this.changeHandler(e)}
                    />
                  </div>
                  <div className="input-group">
                    <div style={{ fontSize: 13, color: "red" }}>
                      {lastNameError}
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apellido"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => this.changeHandler(e)}
                    />
                  </div>
                  <div className="input-group">
                    <div style={{ fontSize: 13, color: "red" }}>
                      {emailError}
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Correo"
                      name="email"
                      defaultValue={email}
                      onChange={(e) => this.changeHandler(e)}
                    />
                  </div>
                  <button className="btn btn-primary shadow-1 mb-4">
                    Registrarse
                  </button>
                  <p className="mb-0 text-muted">
                    ¿Ya tienes una cuenta?{" "}
                    <NavLink to="/auth/signin">Iniciar Sesión</NavLink>
                  </p>
                  <p
                    className="mb-0 text-muted-footer"
                    style={{ paddingTop: "25px" }}
                  >
                    Por INTECDEV
                  </p>
                  <ModalMessage
                    show={showModal}
                    onHide={cancelModalShow}
                    title={" ¡ Se ha creado satisfactoriamente su cuenta !"}
                    content={"Se ha enviado un correo para activar su cuenta.."}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export default connect(null, { signUp })(SignUp);
