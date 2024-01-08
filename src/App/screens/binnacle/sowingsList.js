import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Card, Row } from "react-bootstrap";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import planta from "../../../assets/images/planta.jpg";

import { getSowingByLotId } from "../../../store/actionsApp/sowings";
import { getLotById } from "../../../store/actionsApp/lots";

class SowingsBinnacle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loteName: "",
      loteAddress: "",
      loteNumHas: "",
    };
    this.viewBinnacle = this.viewBinnacle.bind(this);
  }

  async componentDidMount() {
    try {
      let token = localStorage.getItem("token");
      let lotId = this.props.match.params.lotId;
      const dataLot = await this.props.getLotById(token, lotId);
      const res = await this.props.getSowingByLotId(token, lotId);
      console.log(res.data);
      if (dataLot.status === 201) {
        this.setState({ loteName: dataLot.data.alias });
        this.setState({ loteAddress: dataLot.data.address });
        this.setState({ loteNumHas: dataLot.data.numHas });
      }
      if (res.status === 201) {
        this.setState({ data: res.data });
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  viewBinnacle = (id) => {
    console.log(id);
    this.props.history.push(`/binnacle/list/${id}`);
  };

  render() {
    const { data, loteName, loteAddress, loteNumHas } = this.state;

    return (
      <Aux>
        <Row>
          <Col md={12} xl={14}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Lista de Siembras</Card.Title>
                <div style={{ textAlign: "left" }}>
                  <h7 className="fuente-encabezado">
                    <i className="fa fa-map-marker auth-icono-encabezado"></i>{" "}
                    {loteName} {loteAddress}
                    {","} {loteNumHas} {" Has."}
                  </h7>
                </div>
              </Card.Header>
            </Card>
          </Col>
        </Row>

        <Row>
          {data.map((sowing) => (
            <Col md={6} xl={4} key={sowing.id}>
              <Card className="card-event">
                <Card.Body>
                  <div className="row align-items-center justify-content-center">
                    <div className="col">
                      <h5 className="m-0">{sowing.alias}</h5>
                      <h6 className="fa fa-leaf text-muted mt-3 mb-0">
                        {"  "}
                        {sowing.crops}
                      </h6>
                    </div>
                    <div className="col-auto">
                      {sowing.status ? (
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
                        {sowing.binnacles.length}
                        <sub className="text-muted f-14">Bitácoras</sub>
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
                        src={planta}
                        style={{ width: "50px", height: "50px" }}
                        alt="planta"
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <button
                      className="btn-cards"
                      onClick={() => this.viewBinnacle(sowing.id)}
                    >
                      Ver Bitácoras
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

SowingsBinnacle.propTypes = {
  getSowingByLotId: PropTypes.func,
  getLotById: PropTypes.func,
};

export default connect(null, { getSowingByLotId, getLotById })(SowingsBinnacle);
