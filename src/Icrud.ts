import { User } from "./user";

export interface ICrud {
  create(item: User): void;
  read(): User[];
  update(event: any, item: User): void;
  delete(item: User): void;
}
