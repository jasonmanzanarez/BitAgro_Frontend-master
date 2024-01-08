import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../layout/AdminLayout/Breadcrumb";
import logo from "../../../assets/images/logo.ico";
import { ResetPassword } from "../../../store/actionsApp/auth";
import DangerAlert from "../../components/DangerAlert";
import ModalMessage from "../../components/ModalMessage.js";

class ResetPasswordConfirm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      confirmPassword: "",
      errorNewPassword: "",
      errorConfirmPassword: "",
      resetPassword: "",
      showAlert: false,
      showModal: false,
      contentAlert: "",
    };
    this.onChange = this.onChange.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  onChange(e) {
    console.log({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ resetPassword: this.props.match.params.resetPassword });
  }

  validate = () => {
    let errorNewPassword = "";
    let errorConfirmPassword = "";

    if (this.state.newPassword.length < 8) {
      errorNewPassword = "La contraseña debe contener mínimo 8 caractéres";
      this.setState({ errorNewPassword });
    }
    if (!this.state.newPassword) {
      errorNewPassword = "Ingresar su nueva contraseña";
      this.setState({ errorNewPassword });
    }
    if (!this.state.confirmPassword) {
      errorConfirmPassword = "Ingresar la confirmación de su contraseña";
      this.setState({ errorConfirmPassword });
    }

    if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({ showAlert: true });
      this.setState({ contentAlert: "Las contraseñas no coinciden.." });
    }

    if (errorNewPassword || errorConfirmPassword) {
      return false;
    }

    return true;
  };

  sendData = async (e) => {
    e.preventDefault();
    console.log(this.state);
    try {
      let isValid = this.validate();
      if (isValid) {
        console.log("entro");
        const res = await this.props.ResetPassword(this.state);
        if (res.status === 201) {
          this.setState({ showModal: true });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      newPassword,
      confirmPassword,
      errorNewPassword,
      errorConfirmPassword,
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
                    <img src={logo} className="auth-icon-image"></img>
                  </div>
                  <h5 className="mb-4">Restablecimiento de contraseña</h5>
                  {showAlert ? (
                    <div>
                      <DangerAlert content={contentAlert} />
                    </div>
                  ) : null}
                  <div className="input-group">
                    <div style={{ fontSize: 13, color: "red" }}>
                      {errorNewPassword}
                    </div>
                  </div>
                  <div className="input-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Nueva contraseña"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => this.onChange(e)}
                    />
                  </div>
                  <div className="input-group">
                    <div style={{ fontSize: 13, color: "red" }}>
                      {errorConfirmPassword}
                    </div>
                  </div>
                  <div className="input-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirmar contraseña"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => this.onChange(e)}
                    />
                  </div>
                  <button className="btn btn-primary shadow-1 mb-4">
                    Reestablecer contraseña
                  </button>
                  <p className="mb-0 text-muted-footer">Por INTECDEV</p>
                  <ModalMessage
                    show={showModal}
                    onHide={cancelModalShow}
                    title={" ¡ Éxito !"}
                    content={
                      "Se ha reestablecido su contraseña correctamente.."
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

ResetPasswordConfirm.propTypes = {
  ResetPassword: PropTypes.func.isRequired,
};

export default connect(null, { ResetPassword })(ResetPasswordConfirm);
