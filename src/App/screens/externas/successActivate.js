import React from "react";
import { NavLink } from "react-router-dom";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import logo from "../../../assets/images/logo.ico";

class SuccessActivate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
              <div className="card-body text-center">
                <div className="mb-4">
                  <img src={logo} className="auth-icon-image"></img>
                </div>
                <h4 className="mb-4">Se ha activado su cuenta correctamente</h4>
                <div className="input-group mb-3"></div>

                <NavLink to="/auth/signin">
                  <button className="btn btn-primary shadow-1 mb-4">
                    Aceptar
                  </button>
                </NavLink>
                <p className="mb-0 text-muted-footer">Por INTECDEV</p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SuccessActivate;
