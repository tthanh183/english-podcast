import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes.jsx";
import { AuthProvider } from "./components/auth/AuthProvider.jsx";

import 'react-toastify/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            if (route.private) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<PrivateRoute element={route.element} />}
                />
              );
            }
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;
