import React from "react";
import { Row, Col } from "reactstrap";
import { GameFilterContainer } from "./containers/GameFilter";

const App = () => {
  return (
    <Row>
      <Col md={4} lg={3} className="m-3">
        <GameFilterContainer />
      </Col>
      <Col className="m-3">games</Col>
    </Row>
  );
};

export default App;
