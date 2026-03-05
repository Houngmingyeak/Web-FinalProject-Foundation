import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
// theme context for light/dark mode
import { ThemeProvider } from "./context/ThemeContext.jsx";
// authentication context
import { AuthProvider } from "./hooks/useAuth.jsx";
// import "./index.css";
import "./App.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

