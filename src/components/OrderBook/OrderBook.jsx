import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderList from "./OrdersList";

import { selectSortedByPrices } from "../../features/book/bookSlice";

import "./OrderBook.scss";

const OrderBook = () => {
  const dispatch = useDispatch();

  const bids = useSelector(selectSortedByPrices("bids"));
  const asks = useSelector(selectSortedByPrices("asks"));

  useEffect(() => {
    dispatch({ type: "INIT_WATCH_BOOK" });
    dispatch({ type: "INITIALIZE_WEB_SOCKETS_CHANNEL" });
  }, [dispatch]);

  let maxTotal = 0;

  const [sortedBids, sortedAsks] = [bids, asks].map((list) => {
    const limitedOrders = list.slice(0, 25);

    let total = 0;

    const ordersWithTotal = limitedOrders.map((order) => {
      total = total + order.amount;
      if (total > maxTotal) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        maxTotal = total;
      }

      return {
        ...order,
        total,
        maxTotal,
      };
    });

    return ordersWithTotal;
  });

  if (sortedBids.length === 0 || asks.length === 0) {
    return "Loading...";
  }

  return (
    <div className="order-book">
      <div className="order-book__title">
        Order Book <span className="order-book__title--secondary">BTC/USD</span>
      </div>
      <div className="order-book__lists">
        <OrderList orders={sortedBids} maxTotal={maxTotal} />
        <OrderList orders={sortedAsks} maxTotal={maxTotal} inverted />
      </div>
    </div>
  );
};

export default OrderBook;
