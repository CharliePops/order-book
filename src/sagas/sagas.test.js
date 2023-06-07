import { it, describe, expect } from "vitest";
import { handleMessage } from "./sagas";
import { put } from "redux-saga/effects";
import { addOrder, deleteOrder } from "../features/book/bookSlice";

describe("sagas", () => {
  describe("handleMessage", () => {
    it("should handle adding a bid", () => {
      const message = [257956, [25857, 1, 1.933762]];
      const gen = handleMessage({ data: JSON.stringify(message) });
      let next = gen.next();
      expect(next.value).toStrictEqual(
        put(
          addOrder({ type: "bids", price: 25857, count: 1, amount: 1.933762 })
        )
      );
      next = gen.next();
      expect(next.done).toBe(true);
    });

    it("should handle adding an ask", () => {
      const message = [257956, [25857, 1, -1.933762]];
      const gen = handleMessage({ data: JSON.stringify(message) });
      let next = gen.next();
      expect(next.value).toStrictEqual(
        put(
          addOrder({ type: "asks", price: 25857, count: 1, amount: -1.933762 })
        )
      );
      next = gen.next();
      expect(next.done).toBe(true);
    });

    it("should handling deleting a bid", () => {
      const message = [257956, [25857, 0, 1.933762]];
      const gen = handleMessage({ data: JSON.stringify(message) });
      let next = gen.next();
      expect(next.value).toStrictEqual(
        put(deleteOrder({ type: "bids", price: 25857 }))
      );
      next = gen.next();
      expect(next.done).toBe(true);
    });

    it("should handle deleting an ask", () => {
      const message = [257956, [25857, 0, -1.933762]];
      const gen = handleMessage({ data: JSON.stringify(message) });
      let next = gen.next();
      expect(next.value).toStrictEqual(
        put(deleteOrder({ type: "asks", price: 25857 }))
      );
      next = gen.next();
      expect(next.done).toBe(true);
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
      let next = gen.next();
      expect(next.value).toStrictEqual(undefined);
      next = gen.next();
      expect(next.done).toBe(true);
    });

    // TODO: test watchBook
  });
});
