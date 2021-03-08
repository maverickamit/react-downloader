import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import Dexie from "dexie";
import { observer } from "mobx-react-lite";

//function to format bytes into human readablen form
const formatBytes = (params) => {
  if (params.value === 0) return "0 Bytes";
  const k = 1024;
  const dm = 1;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(params.value) / Math.log(k));
  return (
    parseFloat((params.value / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  );
};

const SearchResultsTable = observer(({ appStore }) => {
  const columns = [
    {
      headerName: "Name",
      field: "name",
      flex: 3,
    },
    {
      headerName: "Size",
      field: "size_bytes",
      flex: 1,
      valueFormatter: formatBytes,
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
