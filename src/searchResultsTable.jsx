import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import Dexie from "dexie";

function SearchResultsTable() {
  const rows = [
    {
      id: 1,
      leechers: "0",
      name: "xyz",
      scraped_date: "1590740560",
      seeders: "10",
      size_bytes: "1181647367",
    },
  ];

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

  return <DataGrid rows={rows} columns={columns} autoHeight co />;
}

export default SearchResultsTable;
