import logo from "./logo.svg";
import React, { useRef } from "react";

import "./App.css";
import Database from "./db";
import SearchResultsTable from "./searchResultsTable";
import { observer } from "mobx-react-lite";

const App = observer(({ appStore }) => {
  let inputRef = useRef(null);

  const handleClick = () => {
    appStore.setValue(inputRef.current.value);
    console.log(appStore.value);
  };
  const handleKey = (e) => {
    if (e.key === "Enter") {
      appStore.setValue(inputRef.current.value);
    }
    console.log(appStore.value);
  };
  return (
    <div className="container">
      <div className="input-group mb-3 row m-3">
        <input
          type="text"
          className="form-control col-9 m-3"
          placeholder="Enter search term"
          aria-label="Enter search term"
          aria-describedby="button-addon2"
          ref={inputRef}
          onKeyDown={handleKey}
        />
        <button
          className="btn btn-outline-primary col-3 m-3"
          type="button"
          id="button-addon2"
          onClick={handleClick}
        >
          Search
        </button>
        <div className="containers">
          <SearchResultsTable appStore={appStore} />
        </div>
        <Database appStore={appStore} />
      </div>
    </div>
  );
});
export default App;
