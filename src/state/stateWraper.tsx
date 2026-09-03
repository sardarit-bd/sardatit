"use client";
import { store } from "../state/redux/store";
import { Provider } from "react-redux";
import { CounterProvider } from "../state/context/CounterContext";
export default function StateWraper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Provider store={store}>
        <CounterProvider>{children}</CounterProvider>
      </Provider>
    </div>
  );
}
