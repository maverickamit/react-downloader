import { makeAutoObservable } from "mobx";

export class UserStore {
  database = [];
  searchResults = [];
  value = "";
  constructor() {
    makeAutoObservable(this);
  }
  setSearchResults(searchResults) {
    this.searchResults = searchResults;
  }
  setValue(value) {
    this.value = value;
  }
  setDatabase(database) {
    this.database = database;
  }
}
