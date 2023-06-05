import PropTypes from "prop-types";
import clsx from "clsx";
import React from "react";

const OrdersRow = ({
  count,
  total,
  maxTotal,
  amount,
  price,
  inverted = false,
}) => {
  return (
    <div data-testid="orders-row" className="orders-list__row-wrapper">
      <div
        className={clsx(
          "orders-list__row",
          inverted && "orders-list__row--inverted"
        )}
      >
        <div className="text-center">{count}</div>
        <div>{amount.toFixed(3)}</div>
        <div>{total.toFixed(3)}</div>
        <div>{Number(price).toLocaleString()}</div>
      </div>
      <div
        data-testid="total-bar"
        className={clsx(
          "orders-list__total-bar",
          inverted && "orders-list__total-bar--inverted"
        )}
        style={{
          width: `${total ? Math.abs(total / maxTotal) * 100 : 0}%`,
        }}
      ></div>
    </div>
  );
};

OrdersRow.propTypes = {
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  maxTotal: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  inverted: PropTypes.bool,
};

const OrdersRowMemo = React.memo(OrdersRow);
export default OrdersRowMemo;
