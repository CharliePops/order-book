import { it, describe, expect } from "vitest";
import { handleMessage } from "./rootSaga";
import { put } from "redux-saga/effects";
import { addOrder, deleteOrder } from "../features/book/bookSlice";

describe("sagas", () => {
  it("should add a bid", () => {
    const message = [257956, [25857, 1, 1.933762]];
    const gen = handleMessage({ data: JSON.stringify(message) });
    const next = gen.next();
    expect(next.value).toStrictEqual(
      put(addOrder({ type: "bids", price: 25857, count: 1, amount: 1.933762 }))
    );
  });

  it("should add an ask", () => {
    const message = [257956, [25857, 1, -1.933762]];
    const gen = handleMessage({ data: JSON.stringify(message) });
    const next = gen.next();
    expect(next.value).toStrictEqual(
      put(addOrder({ type: "asks", price: 25857, count: 1, amount: -1.933762 }))
    );
  });

  it("should delete a bid", () => {
    const message = [257956, [25857, 0, 1.933762]];
    const gen = handleMessage({ data: JSON.stringify(message) });
    const next = gen.next();
    expect(next.value).toStrictEqual(
      put(deleteOrder({ type: "bids", price: 25857 }))
    );
  });

  it("should delete an ask", () => {
    const message = [257956, [25857, 0, -1.933762]];
    const gen = handleMessage({ data: JSON.stringify(message) });
    const next = gen.next();
    expect(next.value).toStrictEqual(
      put(deleteOrder({ type: "asks", price: 25857 }))
    );
  });

  it("should do nothing if it's an event message", () => {
    const eventMessage = {
      event: "info",
      version: 2,
      serverId: "9ea42ef0-0982-482d-a5bb-026f0a5160f8",
      platform: {
        status: 1,
      },
    };
    const gen = handleMessage({ data: JSON.stringify(eventMessage) });
    const next = gen.next();
    expect(next.value).toStrictEqual(undefined);
  });
});
