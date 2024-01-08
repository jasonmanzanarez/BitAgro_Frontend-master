import React from "react";
import NVD3Chart from "react-nvd3";
import { Row, Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getSowingAll } from "../../../store/actionsApp/sowings";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  async componentDidMount() {
    try {
      console.log("aqui");
      let token = localStorage.getItem("token");
      console.log(token);
      const res = await this.props.getSowingAll(token);
      console.log("data", res.data);
      if (res.status === 201) {
        console.log("todo bien");
        this.setState({ data: res.data });
        console.log("cambio", this.state.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  render() {
    const { data } = this.state;
    function getDatum() {
      console.log("esta es", data);
      let sin = [],
        sin2 = [],
        sin3 = [];

      data.map(
        (item, index) => (
          sin.push({
            x: index,
            y: item.finance.budget,
          }),
          sin2.push({
            x: index,
            y: item.finance.gain,
          }),
          sin3.push({
            x: index,
            y: item.finance.expenditure,
          })
        )
      );
      return [
        {
          values: sin,
          key: "Presupuesto",
          color: "#A389D4",
        },
        {
          values: sin3,
          key: "Gastos",
          color: "#04a9f5",
        },
        {
          values: sin2,
          key: "Ganancias",
          color: "#1de9b6",
          area: true,
        },
      ];
    }
    const info = getDatum();
    return (
      <Col sm={12}>
        <Card>
          <Card.Header>
            <Card.Title as="h5">
              Presupuestos, Gastos, Ganancias / Siembras
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <NVD3Chart
              type="multiBarChart"
              datum={info}
              x="x"
              y="y"
              height={300}
              showValues
              groupSpacing={0.2}
            />
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

Dashboard.propTypes = {
  getSowingAll: PropTypes.func,
};

export default connect(null, { getSowingAll })(Dashboard);
