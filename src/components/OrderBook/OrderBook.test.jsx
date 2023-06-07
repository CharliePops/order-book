import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { OrderBook } from "./OrderBook";
import OrdersList from "./OrdersList";
import OrdersRow from "./OrdersRow";

const mockOrdersBids = [
  {
    type: "bids",
    price: 27331,
    amount: 0.26645642,
    count: 5,
    total: 0.26645642,
    maxTotal: 0.26645642,
  },
  {
    type: "bids",
    price: 27330,
    amount: 0.17293226,
    count: 1,
    total: 0.43938868000000003,
    maxTotal: 0.43938868000000003,
  },
  {
    type: "bids",
    price: 27329,
    amount: 0.21623428,
    count: 1,
    total: 0.6556229600000001,
    maxTotal: 0.6556229600000001,
  },
  {
    type: "bids",
    price: 27328,
    amount: 0.36636442,
    count: 2,
    total: 1.0219873800000001,
    maxTotal: 1.0219873800000001,
  },
  {
    type: "bids",
    price: 27326,
    amount: 0.34150993,
    count: 3,
    total: 1.36349731,
    maxTotal: 1.36349731,
  },
];

const mockOrdersAsks = [
  {
    type: "asks",
    price: 25600,
    amount: 0.89693958,
    count: 11,
    total: 0.89693958,
    maxTotal: 34.77960037,
  },
  {
    type: "asks",
    price: 25601,
    amount: 0.12,
    count: 3,
    total: 1.0169395799999998,
    maxTotal: 34.77960037,
  },
  {
    type: "asks",
    price: 25602,
    amount: 0.02,
    count: 2,
    total: 1.0369395799999999,
    maxTotal: 34.77960037,
  },
  {
    type: "asks",
    price: 25603,
    amount: 0.483,
    count: 1,
    total: 1.51993958,
    maxTotal: 34.77960037,
  },
  {
    type: "asks",
    price: 25604,
    amount: 0.390567,
    count: 1,
    total: 1.9105065799999998,
    maxTotal: 34.77960037,
  },
];

describe("OrderBook", () => {
  it("should render title/subtitle", () => {
    render(
      <OrderBook bids={mockOrdersBids} asks={mockOrdersAsks} maxTotal={100} />
    );
    expect(screen.getByText(/Order Book/i)).toBeInTheDocument();
    expect(screen.getByText(/BTC\/USD/i)).toBeInTheDocument();
  });

  it("should render 2 list", () => {
    render(
      <OrderBook bids={mockOrdersBids} asks={mockOrdersAsks} maxTotal={100} />
    );
    expect(screen.getAllByTestId("order-list").length).toBe(2);
  });

  it("should render loading if bids/asks are empty", () => {
    render(<OrderBook bids={[]} asks={[]} maxTotal={0} />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});

describe("OrdersList", () => {
  it("should display all colums", () => {
    render(<OrdersList maxTotal={50} orders={mockOrdersBids} />);
    expect(screen.getByText(/count/i)).toBeInTheDocument();
    expect(screen.getByText(/amount/i)).toBeInTheDocument();
    expect(screen.getByText(/total/i)).toBeInTheDocument();
    expect(screen.getByText(/price/i)).toBeInTheDocument();
  });

  it("should always display 25 rows", () => {
    render(<OrdersList maxTotal={50} orders={mockOrdersBids} />);
    expect(screen.getAllByTestId("orders-row").length).toBe(25);
  });

  it("should be inverted", () => {
    render(<OrdersList maxTotal={50} orders={mockOrdersBids} />);
    expect(screen.getByTestId("order-list-head")).toHaveClass(
      "orders-list__row orders-list__head"
    );
  });
});

describe("OrdersRow", () => {
  const { amount, count, price, total, maxTotal } = mockOrdersBids[4];

  it("should display all values correctly", () => {
    render(
      <OrdersRow
        count={count}
        maxTotal={maxTotal}
        price={price}
        total={total}
        amount={amount}
      />
    );
    expect(screen.getByText(count)).toBeInTheDocument();
    expect(screen.getByText(total.toFixed(3))).toBeInTheDocument();
    expect(
      screen.getByText(Number(price).toLocaleString())
    ).toBeInTheDocument();
    expect(screen.getByText(amount.toFixed(3))).toBeInTheDocument();

    const widthValue = Math.abs(total / maxTotal) * 100;

    expect(screen.getByTestId("total-bar")).toHaveAttribute(
      "style",
      `width: ${widthValue}%;`
    );
  });

  it("should be inverted if inverted", () => {
    render(
      <OrdersRow
        count={count}
        maxTotal={maxTotal}
        price={price}
        total={total}
        amount={amount}
        inverted
      />
    );

    expect(screen.getByTestId("total-bar")).toHaveClass(
      "orders-list__total-bar--inverted"
    );
  });
});
