import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {} from "@apollo/client";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

reportWebVitals();
