export class EmailValuesDto {

  mailTo!: string;
  username!: string;
  constructor(mailTo: string, username: string){
    this.mailTo = mailTo;
    this.username = username;
  }
}
