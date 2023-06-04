/* eslint-disable no-constant-condition */

import { eventChannel } from "redux-saga";
import { all, call, delay, put, take, takeLatest } from "redux-saga/effects";
import {
  addOrder,
  deleteOrder,
  initBook,
  saveBook,
} from "../features/book/bookSlice";

function createEventChannel(socket) {
  return eventChannel((emit) => {
    socket.addEventListener("open", () => {
      // TODO: load first orders in bulk

      socket.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          symbol: "tBTCUSD",
          // frequency: "F1",
        })
      );
    });

    socket.addEventListener("message", (message) => {
      emit(message);
    });

    return () => {
      socket.close();
    };
  });
}

function* handleMessage(message) {
  const data = JSON.parse(message.data);

  if (data.event || data[1] === "hb") return;
  const [, [price, count, amount]] = data;

  if (isNaN(amount)) return;

  if (!count) {
    if (amount > 0) {
      yield put(deleteOrder({ type: "bids", price }));
    } else if (amount < 0) {
      yield put(deleteOrder({ type: "asks", price }));
    }
  } else {
    const type = amount >= 0 ? "bids" : "asks";
    yield put(addOrder({ type, price, amount: Math.abs(amount), count }));
  }
}

function* initializeWebSocketsChannel() {
  const socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
  const channel = yield call(createEventChannel, socket);
  while (true) {
    const message = yield take(channel);
    yield call(handleMessage, message);
  }
}

// saves book to localstorage
function* watchBook() {
  yield put(initBook());
  while (true) {
    yield delay(3000);
    yield put(saveBook());
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest("INIT_WATCH_BOOK", watchBook),
    takeLatest("INITIALIZE_WEB_SOCKETS_CHANNEL", initializeWebSocketsChannel),
  ]);
}
