import { makeAutoObservable } from "mobx";

export class UserStore {
  searchResults = [];
  searchString = "";
  constructor() {
    makeAutoObservable(this);
  }
  setSearchResults(searchResults) {
    this.searchResults = searchResults;
  }
  setSearchString(searchString) {
    this.setSearchString = searchString;
  }
}
