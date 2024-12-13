import React from "react";
import { Route, Routes } from "react-router-dom";
import { authRouter, publicRouter } from "./Routes/router";
import { ProtectedRoute, GetLocalStorage } from "./HigherOrderComponent";
import Master from "./Layouts/Master";

const App = () => {
  return (
    <Routes>
      {authRouter.map((route, index) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute>
              <Master />
            </ProtectedRoute>
          }
        >
          <Route key={index} path={route.path} element={<route.component />} />
        </Route>
      ))}

      {publicRouter.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <GetLocalStorage>
              <route.component />
            </GetLocalStorage>
          }
        />
      ))}
    </Routes>
  );
};

export default App;
