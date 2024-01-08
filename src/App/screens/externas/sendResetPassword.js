import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../layout/AdminLayout/Breadcrumb";
import logo from "../../../assets/images/logo.ico";
import { sendResetPassword } from "../../../store/actionsApp/auth";
import DangerAlert from "../../components/DangerAlert";
import ModalMessage from "../../components/ModalMessage.js";

class SendResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      emailError: "",
      showModal: false,
      showAlert: false,
      contentAlert: "",
    };
    this.onChange = this.onChange.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  onChange(e) {
    console.log({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  }

  validate = () => {
    let emailError = "";

    if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
      emailError = "Correo inválido";
      this.setState({ emailError });
    }
    if (!this.state.email) {
      emailError = "Ingrese un correo electrónico";
      this.setState({ emailError });
    }
    if (emailError) {
      return false;
    }

    return true;
  };

  sendData = async (e) => {
    e.preventDefault();
    try {
      let isValid = this.validate();

      if (isValid) {
        const res = await this.props.sendResetPassword(this.state);
        console.log(res);
        if (res.status === 201) {
          this.setState({ showModal: true });
        }
      }
    } catch (error) {
      if (error.message === "Request failed with status code 404") {
        console.log("error 404");
        this.setState({ showAlert: true });
        this.setState({
          contentAlert: "No existe una cuenta con ese correo...",
        });
      } else {
        this.setState({ showAlert: true });
        this.setState({ contentAlert: "Ups..Algo ha fallado" });
      }
      console.log(error);
    }
  };

  render() {
    const {
      email,
      emailError,
      showModal,
      showAlert,
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
              {/* <span className="r" /> */}
              <span className="r s" />
              <span className="r s" />
              <span className="r s" />
              <span className="r s" />
              {/*  <span className="r" /> */}
            </div>
            <div className="card">
              <form onSubmit={this.sendData}>
                <div className="card-body text-center">
                  <div className="mb-4">
                    <i className="feather icon-lock auth-icon" />
                    {/* <img src={logo} className="auth-icon-image"></img> */}
                  </div>
                  <h6 className="mb-4">
                    Se enviará un correo para restablecer su contraseña..
                  </h6>
                  {showAlert ? (
                    <div>
                      <DangerAlert content={contentAlert} />
                    </div>
                  ) : null}
                  <div className="input-group">
                    <div style={{ fontSize: 13, color: "red" }}>
                      {emailError}
                    </div>
                  </div>
                  <div className="input-group mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Correo"
                      name="email"
                      value={email}
                      onChange={(e) => this.onChange(e)}
                    />
                  </div>
                  <button className="btn btn-primary shadow-1 mb-4">
                    Restablecer contraseña
                  </button>
                  <p className="mb-0 text-muted">
                    <NavLink to="/auth/signin">Iniciar Sesión</NavLink>
                  </p>
                  <p className="mb-0 text-muted-footer">Por INTECDEV</p>
                  <ModalMessage
                    show={showModal}
                    onHide={cancelModalShow}
                    title={"¡ Éxito !"}
                    content={
                      "Se ha enviado un correo para restablecer su contraseña."
                    }
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

SendResetPassword.propTypes = {
  sendResetPassword: PropTypes.func.isRequired,
};

export default connect(null, { sendResetPassword })(SendResetPassword);
