import { connect, MapStateToPropsParam } from "react-redux";
import { StoreState, Shop } from "../types";
import GameFilter from "../components/GameFilter";
import { bindActionCreators, ActionCreator, Dispatch } from "redux";
import {
  StoreAction,
  setSearchGamesFilter,
  setCountriesGamesFilter
} from "../actions";
import { isActionLoading } from "../selectors.ts";

interface StateProps {
  countries: string[];
  search: string;
  shops: Shop[];
  isLoading: boolean;
}

interface OwnProps {}

interface DispatchProps extends ActionCreator<StoreAction> {
  onSearchChange: (search: string) => void;
  onCountriesChange: (countries: string[]) => void;
}

type Props = StateProps & OwnProps & DispatchProps;

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  StoreState
> = state => ({
  countries: state.gamesFilter.countries,
  search: state.gamesFilter.search,
  shops: state.shops,
  isLoading: isActionLoading(state.actions, "fetch_shops")
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSearchChange: setSearchGamesFilter,
      onCountriesChange: setCountriesGamesFilter
    },
    dispatch
  );

export const GameFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameFilter);
