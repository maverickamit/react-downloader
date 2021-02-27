import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import Dexie from "dexie";
import { observer } from "mobx-react-lite";

const SearchResultsTable = observer(({ appStore }) => {
  var db = new Dexie("reactdb")
    .open()
    .then(function (db) {
      db.table("files")
        .toArray()
        .then((data) => {
          console.log("Database found");
          let sortedData = [];
          data.map((item, index) => {
            item.item.id = index;
            sortedData[index] = item.item;
          });
          if (
            JSON.stringify(sortedData) !==
            JSON.stringify(appStore.searchResults)
          ) {
            appStore.setSearchResults(sortedData);
          }
        });
    })
    .catch("NoSuchDatabaseError", function (e) {
      // Database with that name did not exist
      console.error("Database not found");
    })
    .catch(function (e) {
      console.error("Oh uh: " + e);
    });

  const columns = [
    {
      headerName: "Name",
      field: "name",
      flex: 1,
    },
    {
      headerName: "Size",
      field: "size_bytes",
      flex: 1,
    },
    {
      headerName: "Seeds",
      field: "seeders",
      flex: 1,
    },
    {
      headerName: "Leeches",
      field: "leechers",
      flex: 1,
    },
    {
      headerName: "Scraped",
      field: "scraped_date",
      flex: 1,
    },
  ];
  return (
    <DataGrid rows={appStore.searchResults} columns={columns} autoHeight />
  );
});

export default SearchResultsTable;
