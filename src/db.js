import React, { useState, useEffect } from "react";
import Dexie from "dexie";
import Papa from "papaparse";

export default function Database() {
  var db = new Dexie("reactdb");
  db.version(1).stores({
    files: "++id,name",
  });
  //Update dbversion to wipe and rewrite the database
  let dbversion = "version 1";
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

  return null;
}
