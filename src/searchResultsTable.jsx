import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import Dexie from "dexie";
import { observer } from "mobx-react-lite";

const SearchResultsTable = observer(({ appStore }) => {
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
