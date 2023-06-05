import reducer, { addOrder, deleteOrder } from "./bookSlice";
import { it, describe, expect } from "vitest";

describe("bookSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      bids: {},
      asks: {},
    });
  });

  it("should handle adding an order to an empty list", () => {
    const previousState = {
      bids: {},
      asks: {},
    };

    const nextState = {
      bids: {
        27331: { type: "bids", price: 27331, amount: 0.26645642, count: 3 },
      },
      asks: {},
    };

    expect(
      reducer(
        previousState,
        addOrder({ type: "bids", price: 27331, amount: 0.26645642, count: 3 })
      )
    ).toEqual(nextState);
  });

  it("should handle adding an ask to the list", () => {
    const previousState = {
      bids: {
        27331: { type: "bids", price: 27331, amount: 0.26645642, count: 3 },
      },
      asks: {},
    };

    const nextState = {
      bids: {
        27331: { type: "bids", price: 27331, amount: 0.26645642, count: 3 },
      },
      asks: {
        27329: { type: "asks", price: 27329, amount: 0.26645642, count: 4 },
      },
    };

    expect(
      reducer(
        previousState,
        addOrder({ type: "asks", price: 27329, amount: 0.26645642, count: 4 })
      )
    ).toEqual(nextState);
  });

  it("should handle deleting a bid from the list", () => {
    const previousState = {
      bids: {
        27331: { type: "bids", price: 27331, amount: 0.26645642, count: 5 },
      },
      asks: {
        27329: { type: "asks", price: 27329, amount: 0.26645642, count: 2 },
      },
    };

    const nextState = {
      bids: {},
      asks: {
        27329: { type: "asks", price: 27329, amount: 0.26645642, count: 2 },
      },
    };

    expect(
      reducer(previousState, deleteOrder({ type: "bids", price: 27331 }))
    ).toEqual(nextState);
  });
});
