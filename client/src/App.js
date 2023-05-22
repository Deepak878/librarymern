import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@mui/material";
import { NotificationContainer } from "react-notifications";
import AppLayout from "./components/layout/AppLayout.jsx";
import { UserProvider } from "./context/userContext.js";
export const App = () => (
  <UserProvider>
    <Suspense fallback={null}>
      <Container className="page-container">
        <Router>
          <AppLayout />
          <NotificationContainer />
        </Router>
      </Container>
    </Suspense>
  </UserProvider>
);

export default App;
