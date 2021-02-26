import { observable, action, decorate } from "mobx";

class UserStore {}

UserStore = decorate(UserStore, {});

export { UserStore };
