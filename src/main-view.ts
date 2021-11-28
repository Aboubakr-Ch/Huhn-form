class Asset {
  id: string;
  name: string;
  symbol: string;
}

class User {
  Id: Number;
  Age:Number;
  FirstName:string;
  LastName:string;
  Address:string;
  Email:string;
  Assets:Asset[]
}
import{HttpClient, json} from'aurelia-fetch-client'
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';
 let client = new HttpClient();
 @inject(Router)
export class MainView {
  doneAssets:Asset[] = [];
  router:Router;
  public user =new User();
  constructor(router){
    this.getData();
    this.router = router;   
}
getData(){
  let id = location.pathname.split("/")[2];
  return client.fetch(`https://localhost:5001/api/users/${id}`)
  .then(response => response.json())
  .then(data => {
    this.user =data;
    console.log(this.user)})
 .catch(error => { alert("the resource cannot be reached need to refresh the page");});
}
}
