import { createSlice, current } from "@reduxjs/toolkit";

export const book = createSlice({
  name: "book",
  initialState: {
    bids: {},
    asks: {},
  },
  reducers: {
    // set initila state
    initBook: (state) => {
      try {
        const book = JSON.parse(localStorage.getItem("book"));
        if (book) {
          state.bids = book.bids;
          state.asks = book.asks;
        }
      } catch (error) {
        console.log("error loading book from storage", error);
      }
    },
    saveBook: (state) => {
      localStorage.setItem("book", JSON.stringify(current(state)));
    },
    addOrder: (state, { payload: order }) => {
      const { type, price } = order;
      // save order for easier querying later
      state[type][price] = order;
    },
    addManyOrders: (state, { payload: orders }) => {
      orders.forEach((order) => {
        const { type, price } = order;
        state[type][price] = order;
      });
    },
    deleteOrder: (state, { payload }) => {
      const { type, price } = payload;
      if (state[type][price]) {
        delete state[type][price];
      }
    },
  },
});

// actions
export const { addOrder, deleteOrder, initBook, saveBook } = book.actions;

// selectors
export const selectOrders = (type) => (state) => state.book[type];
export const selectBids = (state) => state.book.bids;
export const selectAsks = (state) => state.book.asks;

export const selectSortedByPrices = (type) => (state) => {
  const orders = state.book[type] || [];
  const sorted = Object.keys(orders || []).sort((a, b) => {
    if (type === "bids") {
      return Number(a) >= Number(b) ? -1 : 1;
    } else {
      return Number(a) <= Number(b) ? -1 : 1;
    }
  });
  return sorted.map((price) => orders[price]);
};

// reducer
export default book.reducer;
