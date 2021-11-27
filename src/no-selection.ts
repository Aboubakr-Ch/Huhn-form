interface User {
  Id: Number;
  Age:Number;
  FirstName:string;
  LastName:string;
  Address:string;
  Email:string;
}
import { HttpClient ,json} from "aurelia-fetch-client";
import {ValidationRules} from 'aurelia-validation'
let httpClient = new HttpClient();
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router)
export class NoSelection {
  public user:User;
  public id;
  public code:Number;
  public house:string;
  public street:string;
  router:Router;
  constructor(router) {
    this.router = router;
}

  save(){
    ValidationRules.ensure((p: User) => p.FirstName).required().minLength(3);
    ValidationRules.ensure((p: User) => p.LastName).required().minLength(3);
    ValidationRules.ensure((p: User) => p.Age).required().min(18);
    ValidationRules.ensure((p: User) => p.Email).required().email().withMessage(`its not an valid email form.`);
    this.street = this.street.concat('');
    this.house = this.house.concat('');
    this.user.Address = this.street.concat(this.house)+ this.code;
    httpClient.fetch('https://localhost:5001/api/users', {
      method: 'post',
      body: json(this.user) })
      .then(response => response.json())  
      .then(data =>{
        this.router.navigate('Assets/'+data.id);
      } )    
      .catch(error => {alert(error);});
  }
  get canSave() {
    return this.user && this.code && this.house && this.street;
  }
  get canReset() {
    return this.user || this.code || this.house || this.street;
  }
  reset(){
    this.user = null;
    this.code = Number.NaN;
    this.house = '';
    this.street = '';
  }}
