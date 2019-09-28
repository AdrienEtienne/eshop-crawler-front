import React from "react";
import { Row, Col } from "reactstrap";

const App: React.FC = () => {
  return (
    <Row>
      <Col md={3} className="m-3">
        search
      </Col>
      <Col className="m-3">games</Col>
    </Row>
  );
};

export default App;
