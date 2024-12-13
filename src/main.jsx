import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./assets/css/custom.scss";
import "./assets/css/bootstrap.min.css";

//components
import App from "./App.jsx";
import store from "./store/index";
import { persistedStore } from "./store/index";
import {
  SocketProvider,
  FancySocket,
  _socket,
} from "./context/socketContext.js";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/custom.scss";
import "./assets/css/bootstrap.min.css";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true, // Keep previous data while Loading
      refetchOnWindowFocus: false, // Optional: Prevent refetching on window focus
    },
  },
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <SocketProvider value={{ FancySocket, _socket }}>
          <QueryClientProvider client={queryClient}>
            <App />
            <Toaster />
          </QueryClientProvider>
        </SocketProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
