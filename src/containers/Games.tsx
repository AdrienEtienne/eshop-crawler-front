import { connect, MapStateToPropsParam } from "react-redux";
import { StoreState, Game, Shop } from "../types";
import { bindActionCreators, ActionCreator, Dispatch } from "redux";
import { StoreAction, fetchGames } from "../actions";
import React from "react";
import { Spinner, Col } from "reactstrap";
import GameCard from "../components/GameCard";
import { isActionLoading } from "../selectors.ts";
import InfiniteScroll from "react-infinite-scroller";
import Masonry from "react-masonry-component";

interface StateProps {
  games: Game[];
  shopsSelected: Shop[];
  isLoading: boolean;
  hasMore: boolean;
}

interface OwnProps {}

interface DispatchProps extends ActionCreator<StoreAction> {
  fetchGames: typeof fetchGames;
}

type Props = StateProps & OwnProps & DispatchProps;

class Games extends React.Component<Props> {
  render() {
    const spinner = (
      <div className="text-center py-5">
        <Spinner color="light" />
      </div>
    );

    return (
      <InfiniteScroll
        pageStart={1}
        loadMore={(...args) => {
          console.log(...args);
          this.props.fetchGames();
        }}
        hasMore={this.props.hasMore && !this.props.isLoading}
      >
        <Masonry>
          {this.props.games.map((game, key) => (
            <Col key={key} md={6} lg={4} className="p-0 pr-2 pb-2">
              <GameCard game={game} shops={this.props.shopsSelected} />
            </Col>
          ))}
        </Masonry>
        {this.props.isLoading ? spinner : null}
      </InfiniteScroll>
    );
  }
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  StoreState
> = state => ({
  games: state.games,
  shopsSelected: state.shops.filter(el =>
    state.gamesFilter.countries.includes(el.code)
  ),
  isLoading: isActionLoading(state.actions, "fetch_games"),
  hasMore: state.gamesPage.itemsTotal > state.games.length
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchGames
    },
    dispatch
  );

export const GamesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);
