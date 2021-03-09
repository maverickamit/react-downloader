import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import Dexie from "dexie";
import { observer } from "mobx-react-lite";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import parseTorrent from "parse-torrent";
import "./searchResultsTable.css";
import trackers from "./trackers";
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

//function to format date into human readable form
TimeAgo.addLocale(en);
const formatDate = (params) => {
  const timeAgo = new TimeAgo("en-US");
  return timeAgo.format(new Date(parseInt(params.value) * 1000));
};

//function to format infohash to magnet
const formatInfoHash = (params) => {
  const uri = parseTorrent.toMagnetURI({
    tr: trackers,
    infoHash: params.value,
  });
  return (
    <div>
      <a href={uri}>
        <svg className="icon icon-magnet">
          <svg viewBox="0 0 24 28">
            <path d="M24 13v2c0 6.375-5.047 11-12 11S0 21.375 0 15v-2c0-.547.453-1 1-1h6c.547 0 1 .453 1 1v2c0 2.859 3.328 3 4 3s4-.141 4-3v-2c0-.547.453-1 1-1h6c.547 0 1 .453 1 1zM8 3v6c0 .547-.453 1-1 1H1c-.547 0-1-.453-1-1V3c0-.547.453-1 1-1h6c.547 0 1 .453 1 1zm16 0v6c0 .547-.453 1-1 1h-6c-.547 0-1-.453-1-1V3c0-.547.453-1 1-1h6c.547 0 1 .453 1 1z"></path>
          </svg>
        </svg>
      </a>
    </div>
  );
};

const SearchResultsTable = observer(({ appStore }) => {
  const columns = [
    {
      headerName: "Name",
      field: "name",
      flex: 3,
      sortable: false,
    },
    {
      headerName: "Size",
      field: "size_bytes",
      flex: 1,
      valueFormatter: formatBytes,
      sortable: false,
    },
    {
      headerName: "Seeds",
      field: "seeders",
      flex: 1,
      sortable: true,
    },
    {
      headerName: "Leeches",
      field: "leechers",
      flex: 1,
      sortable: false,
    },
    {
      headerName: "Scraped",
      field: "scraped_date",
      flex: 1,
      valueFormatter: formatDate,
      sortable: false,
    },
    {
      headerName: "Download",
      field: "id",
      flex: 1,
      renderCell: formatInfoHash,
      sortable: false,
    },
  ];
  if (appStore.database.length === 0) {
    return <h2>Loading... Please wait approx 20 sec. Don't Refresh. </h2>;
  }

  return (
    <DataGrid rows={appStore.searchResults} columns={columns} autoHeight />
  );
});

export default SearchResultsTable;
