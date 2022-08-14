// import { HomePage } from "./app.js";
import { objOfHomePage } from "./app.js";
import { ICrud } from "./Icrud.js";
import { Role, User } from "./user.js";

export class UserService implements ICrud {
  users: User[] = [];
  constructor() {
    this.loadData();
  }

  async loadData() {
    let usersData: any[];
    await fetch("../data.json")
      .then((Response) => Response.json())
      .then((data) => (usersData = data));

    usersData.forEach((user) => {
      this.users.push(new User(user));
    });
  }
  edit(event: any): void {
    let tr = event.target.parentElement.parentElement as HTMLTableRowElement;
    tr.contentEditable = "true";

    (event.target as HTMLButtonElement).parentElement.contentEditable = "false";

    event.target.parentElement.children[0].style.display = "none";
    event.target.parentElement.children[1].style.display = "none";
    event.target.parentElement.children[2].style.display = "flex";
    event.target.parentElement.children[3].style.display = "flex";
  }

  create(item: User): void {
    this.users.push(item);
    objOfHomePage.render();
  }
  read(): User[] {
    return this.users;
  }

  update(event: any, item: User): void {
    event.target.parentElement.parentElement.contentEditable = "false";
    let tr = event.target.parentElement.parentElement as HTMLTableRowElement;
    item.firstName = tr.children[0].innerHTML;
    item.middleName = tr.children[1].innerHTML;
    item.lastName = tr.children[2].innerHTML;
    item.email = tr.children[3].innerHTML;
    item.phone = tr.children[4].innerHTML;
    item.role =
      tr.children[5].innerHTML === "Super Admin"
        ? Role.SUPERADMIN
        : tr.children[5].innerHTML === "Admin"
        ? Role.ADMIN
        : Role.SUBSCRIBER;
    item.address = tr.children[6].innerHTML;

    event.target.style.display = "none";
    event.target.parentElement.children[3].style.display = "none";
    event.target.parentElement.children[0].style.display = "flex";
    event.target.parentElement.children[1].style.display = "flex";
  }

  delete(item: User): void {
    this.users.splice(this.users.indexOf(item), 1);
    objOfHomePage.render();
  }
}
