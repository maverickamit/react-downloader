import { makeAutoObservable } from "mobx";

export class UserStore {
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
}
