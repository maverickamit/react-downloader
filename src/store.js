import { makeAutoObservable } from "mobx";

export class UserStore {
  searchResults = [];
  constructor() {
    makeAutoObservable(this);
  }
  setSearchResults(searchResults) {
    this.searchResults = searchResults;
  }
}
