import { connect, MapStateToPropsParam } from "react-redux";
import { StoreState } from "../types";
import { GameFilter } from "../components/GameFilter";

interface StateProps {}

interface OwnProps {}

type Props = StateProps & OwnProps;

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  StoreState
> = (state, ownProps) => ({});

export const GameFilterContainer = connect(mapStateToProps)(GameFilter);
