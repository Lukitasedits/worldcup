import { FiguritaUsuario } from './figurita-usuario';
import { Figurita } from './figurita';
export class Usuario {
  username: string = "";
  email: string = "";
  password: string = "";
  figuritas: FiguritaUsuario[] = [];

  /* set username(username: string){
    this._username = username;
  }

  get username(): string{
    return this._username;
  }

  set email(email: string){
    this._email = email;
  }

  get email(): string{
    return this._email;
  }

  set password(password: string){
    this._password = password;
  }

  get password(): string{
    return this._password;
  } */
}
