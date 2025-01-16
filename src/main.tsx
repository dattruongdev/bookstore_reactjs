import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Books from "./pages/Books.tsx";
import Book from "./pages/Book.tsx";
import Payment from "./pages/payment/Payment.tsx";
import PaymentSuccess from "./pages/PaymentSuccess.tsx";
import PaymentCancel from "./pages/PaymentCancel.tsx";
import Login from "./pages/Login.tsx";
import AuthLayout from "./pages/AuthLayout.tsx";
import Register from "./pages/Register.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<Book />} />
            <Route path="/books/payment" element={<ProtectedRoute />}>
              <Route index element={<Payment />} />
            </Route>
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<div>Profile</div>} />
            </Route>
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/books/payment/success" element={<PaymentSuccess />} />
          <Route path="/books/payment/cancel" element={<PaymentCancel />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
