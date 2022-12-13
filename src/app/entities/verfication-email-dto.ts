export class VerficationEmailDto {
  tokenEmail!: string;

  constructor(tokenEmail: string){
    this.tokenEmail = tokenEmail;
  }
}
