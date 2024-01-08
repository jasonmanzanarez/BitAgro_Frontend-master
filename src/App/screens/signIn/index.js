import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import logo from "../../../assets/images/logo.ico";
import { login } from "../../../store/actionsApp/auth";
import DangerAlert from "../../components/DangerAlert";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      showAlert: false,
      contentAlert: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    console.log({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  }

  validate = () => {
    let emailError = "";
    let passwordError = "";
    if (!this.state.email.includes("@")) {
      emailError = "Correo inválido";
    }
    if (!this.state.password) {
      passwordError = "Ingresar contraseña";
      this.setState({ passwordError });
    }

    if (!this.state.email) {
      emailError = "Ingresar correo electrónico";
      this.setState({ emailError });
    }

    if (emailError || passwordError) {
      return false;
    }

    return true;
  };

  onSubmit = async (e) => {
    e.preventDefault();
    /* this.setState({ showModal: true }); */
    try {
      let isValid = this.validate();
      if (isValid) {
        const res = await this.props.login(this.state);
        console.log(res);
        this.props.history.push("/dasboard");
      }
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        console.log("error 401");
        this.setState({ showAlert: true });
        this.setState({
          contentAlert:
            "Comprobar que sus credenciales sean correctas y su cuenta esté activa...",
        });
      } else {
        this.setState({ showAlert: true });
        this.setState({ contentAlert: "Ups..Algo ha fallado" });
      }
    }
  };

  render() {
    const {
      email,
      password,
      emailError,
      passwordError,
      showAlert,
      contentAlert,
    } = this.state;

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
              <form onSubmit={this.onSubmit}>
                <div className="card-body text-center">
                  <div className="mb-4">
                    {/* <i className="feather icon-unlock auth-icon" /> */}
                    <img src={logo} className="auth-icon-image"></img>
                  </div>
                  <h3 className="mb-4">Iniciar Sesión</h3>
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
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Correo"
                      name="email"
                      value={email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="input-group">
                    <div style={{ fontSize: 13, color: "red" }}>
                      {passwordError}
                    </div>
                  </div>
                  <div className="input-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      name="password"
                      value={password}
                      onChange={this.onChange}
                    />
                  </div>
                  <button className="btn btn-primary shadow-1 mb-4">
                    Iniciar Sesión
                  </button>
                  <p className="mb-2 text-muted">
                    ¿Olvidaste tu contraseña?{" "}
                    <NavLink to="/account/send/resetpassword">
                      Recuperar contraseña
                    </NavLink>
                  </p>
                  <p className="mb-0 text-muted">
                    ¿Aún no tienes cuenta?{" "}
                    <NavLink to="/auth/signup">Registrarse</NavLink>
                  </p>
                  <p
                    className="mb-0 text-muted-footer"
                    style={{ paddingTop: "25px" }}
                  >
                    Por INTECDEV
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(SignIn);
