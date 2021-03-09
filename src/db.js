import Dexie from "dexie";
import Papa from "papaparse";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";

const Database = observer(({ appStore }) => {
  //Parsing csv file

  if (appStore.database.length === 0) {
    Papa.parse("http://localhost:3000/test.csv", {
      header: true,
      download: true,
      worker: true,
      complete: function (results, file) {
        try {
          console.log("parsing complete");
          appStore.setDatabase(results.data);
        } catch (err) {
          console.log(err);
        }
      },
    });
  }
  //Algorith to search database

  let filteredKeys = [];
  let filteredResults = [];
  let index = 0;

  //Filtering all keys to check for keys containing search term
  useEffect(() => {
    if (appStore.value.length >= 3) {
      let searchTerm = appStore.value.replace(/\s/g, "");
      try {
        appStore.database.map((item) => {
          let teststr = new RegExp(`${searchTerm}`, "gim");
          if (
            teststr.test(
              item.name.replace(
                /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\s]/gi,
                ""
              )
            )
          ) {
            filteredResults.push(item);
          }
        });
      } catch (e) {}
      appStore.setSearchResults(filteredResults);
    }
  }, [appStore.value]);

  var styles = {
    display: "none",
  };

  return <p style={styles}>{appStore.value}</p>;
});

export default Database;
