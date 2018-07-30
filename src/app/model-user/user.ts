export class IUser {

   email: string;
   password: string;
   name: string;
   id?: number;
 

   constructor(email, password, name) {
       this.email = email;
       this.password = password;
       this.name = name;
       
   }
}
