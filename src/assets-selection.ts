import{HttpClient, json} from'aurelia-fetch-client'
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';
 let client = new HttpClient();

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
@inject(Router)
 export class AssetsSelection {
  assets = [];
  doneAssets:Asset[] = [];
  router:Router;
 public user =new User();
  constructor(router){
    this.getAssets();
    this.router = router;   
}

AddSelected(asset){
const result = this.doneAssets.filter(word => asset === word);
if(result.length >0) return false;
this.doneAssets.push(asset);
}
 
removeSelected(asset){
  let index = this.doneAssets.indexOf(asset);
  if (index !== -1) {
    this.doneAssets.splice(index, 1);
  }
}
Submit(){
  let id = location.pathname.split("/")[2];
  this.user.Assets = this.doneAssets;
  this.user.Id = Number.parseInt(id);
  console.log(this.user)
  client.fetch(`https://localhost:5001/api/users/${id}`,{
    method: 'put',
    body:JSON.stringify(this.user)})
    .then(response => response.json())  
    .then(data =>{
      this.router.navigate('Main/'+id);
    } )    
    .catch(error => {alert(error);});
}
getAssets(){
  return client.fetch('https://api.coincap.io/v2/assets')
                 .then(response => response.json())
                 .then(res => {this.assets = res;})
                .catch(error => { alert("the resource cannot be reached need to refresh the page");});
}
reset(){
 this.doneAssets=[];
}
get can(){
  if(this.doneAssets.length !==0)return this.doneAssets;
}
}
