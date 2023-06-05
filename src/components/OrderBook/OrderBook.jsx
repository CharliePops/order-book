import OrderList from "./OrdersList";
import useOrderBook from "./useOrderBook";

import "./OrderBook.scss";

const OrderBook = () => {
  const { bids, asks, maxTotal } = useOrderBook();

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
    </div>
  );
};

export default OrderBook;
