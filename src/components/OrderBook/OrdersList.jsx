import PropTypes from "prop-types";
import clsx from "clsx";
import OrdersRow from "./OrdersRow";

const OrdersList = ({ orders, maxTotal, inverted = false }) => {
  return (
    <div data-testid="order-list" className="orders-list">
      <div
        data-testid="order-list-head"
        className={clsx(
          "orders-list__row",
          "orders-list__head",
          inverted && "orders-list__row--inverted"
        )}
      >
        <div className="text-center">Count</div>
        <div>Amount</div>
        <div>Total</div>
        <div>Price</div>
      </div>

      {Array(25) // always show 25 rows
        .fill(0)
        .map((_, i) => {
          const currOrder = orders[i];

          if (!currOrder) {
            return (
              <OrdersRow
                key={i}
                price={0}
                count={0}
                amount={0}
                total={0}
                maxTotal={0}
                inverted={inverted}
              />
            );
          }

          const { price, count, amount, total } = currOrder;

          return (
            <OrdersRow
              key={i}
              price={price}
              count={count}
              amount={amount}
              total={total}
              maxTotal={maxTotal}
              inverted={inverted}
            />
          );
        })}
    </div>
  );
};

OrdersList.propTypes = {
  orders: PropTypes.array.isRequired,
  maxTotal: PropTypes.number.isRequired,
  inverted: PropTypes.bool,
};

export default OrdersList;
