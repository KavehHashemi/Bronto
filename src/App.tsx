/* eslint-disable array-callback-return */
import "./App.css";
import { useEffect } from "react";
import events from "./data/sampleData.json";
import CalendarComponent from "./components/CalendarComponent";
import { addEvent, fetchEvents, loadSampleEvents } from "./FCWrapper";

const App = () => {
  return (
    <>
      <CalendarComponent />
    </>
  );
};

export default App;
