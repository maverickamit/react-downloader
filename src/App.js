import logo from "./logo.svg";
import "./App.css";
import Database from "./db";
import SearchResultsTable from "./searchResultsTable";
import { observer } from "mobx-react-lite";

const App = observer(({ appStore }) => {
  return (
    <div className="container">
      <div className="input-group mb-3 row m-3">
        <input
          type="text"
          className="form-control col-9 m-3"
          placeholder="Enter search term"
          aria-label="Enter search term"
          aria-describedby="button-addon2"
        />
        <button
          className="btn btn-outline-primary col-3 m-3"
          type="button"
          id="button-addon2"
        >
          Search
        </button>
        <div className="containers">
          <SearchResultsTable appStore={appStore} />
        </div>
        <Database />
      </div>
    </div>
  );
});
export default App;
