import { useDispatch, useSelector } from "react-redux";
import { selectSortedByPrices } from "../../features/book/bookSlice";

import "./OrderBook.scss";
import { useEffect } from "react";

const useOrderBook = () => {
  const dispatch = useDispatch();

  const sortedBids = useSelector(selectSortedByPrices("bids"));
  const sortedAsks = useSelector(selectSortedByPrices("asks"));

  useEffect(() => {
    dispatch({ type: "INIT_WATCH_BOOK" });
    dispatch({ type: "INITIALIZE_WEB_SOCKETS_CHANNEL" });
  }, [dispatch]);

  // the max total value from both lists
  let maxTotal = 0;

  const [bids, asks] = [sortedBids, sortedAsks].map((list) => {
    const limitedOrders = list.slice(0, 25);

    let total = 0;

    const ordersWithTotal = limitedOrders.map((order) => {
      total = total + order.amount;
      if (total > maxTotal) {
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

  return { bids, asks, maxTotal };
};

export default useOrderBook;
