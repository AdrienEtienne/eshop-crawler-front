import React from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { Game } from "../types";

export default function GameCard({ game }: { game: Game }) {
  let img = null;

  if (game.euImageUrl) {
    img = (
      <CardImg top width="100%" src={game.euImageUrl || ""} alt={game.title} />
    );
  }

  return (
    <Card className="text-dark" color="light" onClick={() => null}>
      {img}
      <CardBody className="text-center">{game.title}</CardBody>
    </Card>
  );
}
