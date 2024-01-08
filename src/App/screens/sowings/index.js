import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Card, Row } from "react-bootstrap";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import mapa from "../../../assets/images/mapa.jpg";

import {} from "../../../store/actionsApp/lots";
import { getListLots } from "../../../store/actionsApp/lots";
import { getTotalSowingByLotId } from "../../../store/actionsApp/sowings";

class Sowings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      numSowings: 0,
    };
    this.viewSowing = this.viewSowing.bind(this);
  }

  async componentDidMount() {
    try {
      let token = localStorage.getItem("token");
      const res = await this.props.getListLots(token);
      console.log(res.data);
      /*  if (res.data.sowings.length !== 0) {
        console.log("si hay mas siembras");
      } */
      if (res.status === 201) {
        await this.setState({ data: res.data });
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  viewSowing = (id) => {
    console.log(id);
    this.props.history.push(`/sowings/lote/${id}`);
  };

  render() {
    const { data, numSowings } = this.state;

    return (
      <Aux>
        <Row>
          <Col md={12} xl={14}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Lista de lotes</Card.Title>
              </Card.Header>
            </Card>
          </Col>
        </Row>

        <Row>
          {data.map((lot) => (
            <Col md={6} xl={4} key={lot.id}>
              <Card className="card-event">
                <Card.Body>
                  <div className="row align-items-center justify-content-center">
                    <div className="col">
                      <h5 className="m-0">{lot.alias}</h5>
                      <h6 className="fa fa-map-marker text-muted mt-3 mb-0">
                        {" "}
                        {lot.address}
                      </h6>
                    </div>
                    <div className="col-auto">
                      {lot.status ? (
                        <label className="label theme-bg2 text-white f-14 f-w-400 float-right">
                          Activo
                        </label>
                      ) : (
                        <label className="label theme-bg3 text-white f-14 f-w-400 float-right">
                          Inactivo
                        </label>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ width: "70%" }}>
                      <h2 className="mt-2 f-w-300">
                        {lot.sowings.length}
                        <sub className="text-muted f-14">Siembras</sub>
                      </h2>
                    </div>
                    <div
                      style={{
                        width: "30%",
                        textAlign: "right",
                        paddingTop: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <img
                        src={mapa}
                        style={{ width: "50px", height: "50px" }}
                        alt="User Profile"
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <button
                      className="btn-cards"
                      onClick={() => this.viewSowing(lot.id)}
                    >
                      Ver siembras
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Aux>
    );
  }
}

Sowings.propTypes = {
  getListLots: PropTypes.func,
  getTotalSowingByLotId: PropTypes.func,
};

export default connect(null, { getListLots })(Sowings);
