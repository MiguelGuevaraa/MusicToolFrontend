import { Users } from "./Users";

export class Mensaje {
  id: number = 0;
  content: string = '';
  dateSent: Date = new Date(Date.now());
  user: Users = new Users()
}
