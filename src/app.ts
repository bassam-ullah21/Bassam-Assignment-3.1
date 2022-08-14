import { Role, User } from "./user.js";
import { UserService } from "./userService.js";

export class HomePage {
  tableContainer = document.getElementById("table-container");
  loadBtn: HTMLButtonElement;
  refreshBtn: HTMLButtonElement;
  userService: UserService;
  users: User[];
  constructor() {
    this.loadBtn = document.getElementById("load-btn") as HTMLButtonElement;
    this.refreshBtn = document.getElementById(
      "refresh-btn"
    ) as HTMLButtonElement;

    this.userService = new UserService();
    this.hookEvents();
  }

  hookEvents(): void {
    this.loadBtn.addEventListener("click", () => {
      this.loadBtn.style.display = "none";
      this.refreshBtn.style.display = "flex";

      this.loadData();
    });

    this.refreshBtn.addEventListener("click", () => {
      this.loadData();
    });
  }

  loadData() {
    this.users = this.userService.read();
    this.render();
  }
  render() {
    const usersTable = document.createElement("table");
    usersTable.innerHTML = "";

    const headRow = usersTable.insertRow(-1);
    headRow.innerHTML = `<th> First Name</th>
    <th>Middle Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Role</th>
    <th>Adress</th>
    <th>Buttons</th>`;

    this.users.forEach((user) => {
      const row = usersTable.insertRow(-1);
      row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.middleName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.role}</td>
        <td>${user.address}</td>
      `;

      let td = document.createElement("td");
      let button = document.createElement("button");
      button.innerHTML = "Edit";
      button.classList.add("edit-btn");
      td.appendChild(button);
      row.appendChild(td);

      button.addEventListener("click", () => {
        this.userService.edit(event!);
      });

      button = document.createElement("button");
      button.innerHTML = "Delete";
      button.classList.add("delete-btn");
      td.appendChild(button);
      row.appendChild(td);
      button.addEventListener("click", () => {
        this.userService.delete(user);
      });

      button = document.createElement("button");
      button.innerHTML = "Save";
      button.classList.add("save-btn");
      button.style.display = "none";
      td.appendChild(button);
      row.appendChild(td);
      button.addEventListener("click", () => {
        this.userService.update(event, user);
      });

      button = document.createElement("button");
      button.innerHTML = "Cancel";
      button.classList.add("cancel-btn");
      button.style.display = "none";
      td.appendChild(button);
      row.appendChild(td);
      button.addEventListener("click", (event: any) => {
        event.target.style.display = "none";
        event.target.parentElement.children[2].style.display = "none";
        event.target.parentElement.children[0].style.display = "flex";
        event.target.parentElement.children[1].style.display = "flex";
        this.render();
      });
    });

    this.tableContainer.innerHTML = "";
    this.tableContainer.appendChild(usersTable);

    let addBtn = document.createElement("button") as HTMLButtonElement;
    addBtn.setAttribute("id", "add-user");
    addBtn.innerHTML = "ADD USER";
    this.tableContainer.appendChild(addBtn);
    addBtn.addEventListener("click", () => {
      addBtn.setAttribute("disabled", "true");
      this.addUser();
    });
  }

  addUser() {
    let newRow = document.createElement("tr") as HTMLTableRowElement;
    let newTd = document.createElement("td") as HTMLTableCellElement;
    let input = document.createElement("input") as HTMLInputElement;
    input.placeholder = "First Name";
    input.type = "text";

    newTd.appendChild(input);
    newRow.appendChild(newTd);

    newTd = document.createElement("td") as HTMLTableCellElement;
    input = document.createElement("input") as HTMLInputElement;
    input.placeholder = "Middle Name";
    input.type = "text";
    newTd.appendChild(input);
    newRow.appendChild(newTd);

    newTd = document.createElement("td") as HTMLTableCellElement;
    input = document.createElement("input") as HTMLInputElement;
    input.placeholder = "Last Name";
    input.type = "text";
    newTd.appendChild(input);
    newRow.appendChild(newTd);

    newTd = document.createElement("td") as HTMLTableCellElement;
    input = document.createElement("input") as HTMLInputElement;
    input.placeholder = "Email";
    input.type = "text";
    newTd.appendChild(input);
    newRow.appendChild(newTd);

    newTd = document.createElement("td") as HTMLTableCellElement;
    input = document.createElement("input") as HTMLInputElement;
    input.placeholder = "Phone";
    input.type = "text";
    newTd.appendChild(input);
    newRow.appendChild(newTd);

    newTd = document.createElement("td") as HTMLTableCellElement;
    input = document.createElement("input") as HTMLInputElement;
    input.placeholder = "Role";
    input.type = "text";
    newTd.appendChild(input);
    newRow.appendChild(newTd);

    newTd = document.createElement("td") as HTMLTableCellElement;
    input = document.createElement("input") as HTMLInputElement;
    input.placeholder = "Address";
    input.type = "text";
    newTd.appendChild(input);
    newRow.appendChild(newTd);

    newTd = document.createElement("td") as HTMLTableCellElement;
    let button = document.createElement("button") as HTMLButtonElement;
    button.innerHTML = "Save";
    button.classList.add("save-btn");
    newTd.appendChild(button);
    button.addEventListener("click", () => {
      let enteredRow = (event as any).target.parentElement
        .parentElement as HTMLTableRowElement;

      const roleInputValue = (
        enteredRow.children[5].children[0] as HTMLInputElement
      ).value;

      if (
        (enteredRow.children[0].children[0] as HTMLInputElement).value === "" ||
        (enteredRow.children[2].children[0] as HTMLInputElement).value === "" ||
        (enteredRow.children[3].children[0] as HTMLInputElement).value === "" ||
        (enteredRow.children[4].children[0] as HTMLInputElement).value === "" ||
        (enteredRow.children[5].children[0] as HTMLInputElement).value === "" ||
        (enteredRow.children[6].children[0] as HTMLInputElement).value === ""
      ) {
        alert("Please enter all details properly");
      } else if (
        (enteredRow.children[5].children[0] as HTMLInputElement).value !==
          Role.ADMIN &&
        (enteredRow.children[5].children[0] as HTMLInputElement).value !==
          Role.SUBSCRIBER &&
        (enteredRow.children[5].children[0] as HTMLInputElement).value !==
          Role.SUPERADMIN
      ) {
        alert("Please choose from [Admin, Subscriber, Super Admin] as Role");
      } else {
        console.log("user is ready to be pushed in Table");

        this.userService.create({
          id: this.users.length + 1,
          firstName: (enteredRow.children[0].children[0] as HTMLInputElement)
            .value,
          middleName: (enteredRow.children[1].children[0] as HTMLInputElement)
            .value,
          lastName: (enteredRow.children[2].children[0] as HTMLInputElement)
            .value,
          email: (enteredRow.children[0].children[0] as HTMLInputElement).value,
          phone: (enteredRow.children[0].children[0] as HTMLInputElement).value,
          role:
            roleInputValue === Role.ADMIN
              ? Role.ADMIN
              : roleInputValue === Role.SUBSCRIBER
              ? Role.SUBSCRIBER
              : Role.SUPERADMIN,

          address: (enteredRow.children[0].children[0] as HTMLInputElement)
            .value,
        });
      }
    });

    button = document.createElement("button") as HTMLButtonElement;
    button.innerHTML = "Cancel";
    button.classList.add("cancel-btn");
    newTd.appendChild(button);
    button.addEventListener("click", () => {
      this.render();
    });

    newRow.appendChild(newTd);

    let tableBodyElement = document.getElementsByTagName(
      "tbody"
    )[0] as HTMLTableSectionElement;
    tableBodyElement.appendChild(newRow);
  }
}
export var objOfHomePage = new HomePage();
