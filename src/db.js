import Dexie from "dexie";
import Papa from "papaparse";
import { observer } from "mobx-react-lite";

const Database = observer(({ appStore }) => {
  var db = new Dexie("reactdb");
  db.version(1).stores({
    files: "++id,name",
  });

  //Update dbversion to wipe and rewrite the database
  let dbversion = "version 1";

  //Parsing csv file
  Papa.parse("test.csv", {
    header: true,
    download: true,
    complete: async function (results, file) {
      try {
        const value = localStorage.getItem("dbversion");
        if (value !== dbversion) {
          db.files
            .clear()
            .then(() => {
              console.log("Database successfully deleted");
            })
            .catch((err) => {
              console.error("Could not delete database");
            })
            .finally(() => {
              results.data.map(async (item) => {
                await db.files.add({
                  name: item.name,
                  item,
                });
                localStorage.setItem("dbversion", dbversion);
              });
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  //Algorith to search database
  db.files.orderBy("name").keys(function (keysArray) {
    let searchTerm = appStore.value.replace(/\s/g, "");
    let filteredKeys = [];
    let filteredResults = [];
    let index = 0;

    //Filtering all keys to check for keys containing search term
    keysArray.map((item) => {
      let teststr = new RegExp(`${searchTerm}`, "gim");
      if (
        teststr.test(
          item.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
        )
      ) {
        filteredKeys.push({ name: item });
      }
    });

    //Function to get all files associated with the filtered keys
    async function getFilteredResults(filteredKeys) {
      const promises = filteredKeys.map(async (key) => {
        await db.files.get(key).then((data) => {
          data.item.id = index++;
          filteredResults.push(data.item);
        });
      });
      await Promise.all(promises);
      if (
        JSON.stringify(filteredResults) !==
        JSON.stringify(appStore.searchResults)
      ) {
        appStore.setSearchResults(filteredResults);
      }
    }
    getFilteredResults(filteredKeys);
  });
  var styles = {
    display: "none",
  };
  return <p style={styles}>{appStore.value}</p>;
});

export default Database;
