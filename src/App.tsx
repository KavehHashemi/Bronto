import "./App.css";
import CalendarComponent from "./components/CalendarComponent";
import { ApolloProvider } from "@apollo/client";
import client from "./Apollo";

function App() {
  return (
    <ApolloProvider client={client}>
      <CalendarComponent />
    </ApolloProvider>
  );
}

export default App;
