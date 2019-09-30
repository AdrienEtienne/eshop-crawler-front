import React from "react";
import { Row, Col, Container } from "reactstrap";
import { GameFilterContainer } from "./containers/GameFilter";
import { GamesContainer } from "./containers/Games";

const App = () => {
  return (
    <Container className="my-3">
      <Row>
        <Col md={4} lg={3}>
          <GameFilterContainer />
        </Col>
        <Col>
          <GamesContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
