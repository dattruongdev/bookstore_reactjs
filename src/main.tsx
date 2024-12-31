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

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<Book />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
