import { connect, MapStateToPropsParam } from "react-redux";
import { StoreState, Price } from "../types";
import { bindActionCreators, ActionCreator, Dispatch } from "redux";
import { StoreAction } from "../actions";
import PriceAmount from "../components/PriceAmount";

interface StateProps {
  country?: string;
}

interface OwnProps {
  price: Price;
}

interface DispatchProps extends ActionCreator<StoreAction> {}

type Props = StateProps & OwnProps & DispatchProps;

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  StoreState
> = (state, ownProps) => {
  let shop = state.shops.find(el => el.id === ownProps.price.shopId);

  return {
    country: shop ? shop.country : undefined
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

export const PriceAmountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceAmount);
