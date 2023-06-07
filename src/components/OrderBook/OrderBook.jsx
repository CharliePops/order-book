import PropTypes from "prop-types";
import OrderList from "./OrdersList";
import useOrderBook from "./useOrderBook";

import "./OrderBook.scss";

export const OrderBook = ({ bids, asks, maxTotal, resetData = () => {} }) => {
  if (!bids.length || !asks.length) {
    return "Loading...";
  }

  return (
    <div className="order-book">
      <div className="order-book__title">
        Order Book <span className="order-book__title--secondary">BTC/USD</span>
      </div>
      <div className="order-book__lists">
        <OrderList orders={bids} maxTotal={maxTotal} />
        <OrderList orders={asks} maxTotal={maxTotal} inverted />
      </div>
      <button
        className="order-book__reset"
        title="Reset Book Data"
        onClick={resetData}
      >
        Reset Book
      </button>
    </div>
  );
};

OrderBook.propTypes +
  {
    bids: PropTypes.array.isRequired,
    asks: PropTypes.array.isRequired,
    maxTotal: PropTypes.number.isRequired,
    resetData: PropTypes.func,
  };

const OrderBookEnhanced = () => {
  const orderBook = useOrderBook();
  return <OrderBook {...orderBook} />;
};

export default OrderBookEnhanced;
