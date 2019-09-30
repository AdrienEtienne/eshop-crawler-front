import { connect, MapStateToPropsParam } from "react-redux";
import { StoreState, Game } from "../types";
import { bindActionCreators, ActionCreator, Dispatch } from "redux";
import { StoreAction } from "../actions";
import React from "react";
import { CardColumns, Spinner } from "reactstrap";
import GameCard from "../components/GameCard";
import { isActionLoading } from "../selectors.ts";

interface StateProps {
  games: Game[];
  isLoading: boolean;
}

interface OwnProps {}

interface DispatchProps extends ActionCreator<StoreAction> {}

type Props = StateProps & OwnProps & DispatchProps;

class Games extends React.Component<Props> {
  render() {
    const spinner = (
      <div className="text-center py-5">
        <Spinner color="light" />
      </div>
    );

    return (
      <div>
        <CardColumns>
          {this.props.games.map((game, key) => (
            <GameCard key={key} game={game} />
          ))}
        </CardColumns>
        {this.props.isLoading ? spinner : null}
      </div>
    );
  }
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  StoreState
> = state => ({
  games: state.games,
  isLoading: isActionLoading(state.actions, "fetch_games")
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

export const GamesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);
