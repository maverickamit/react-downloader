import React, { useState, useEffect } from "react";
import Dexie from "dexie";
import Papa from "papaparse";

export default function Database() {
  var db = new Dexie("reactdb");
  db.version(1).stores({
    files: "++id,name",
  });
  return null;
}
