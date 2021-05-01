import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Customer} from "./customer";

const url = 'https://angular-firebase-deploy-6c3f4-default-rtdb.firebaseio.com/customers';
const httpOptions = {headers: new HttpHeaders({'Content-Tipe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private  http: HttpClient) {
  }

// CRUD
// create = POST
  createData(): void {
    const temp: Customer = {
      name: 'Mary',
      email: 'mary@gmail.com',
      mobile: '12341111',
      location: 'Somewhere'
    };

    this.http.post<Customer>(`${url}.json`, temp, httpOptions).subscribe(
      res => {
        console.log(res)
      }
    )
  }

// read = GET
  getData(): void {

  }

// update = PUT/PATCH
  update(): any {

  }

// delete = DELETE
  delete(): void {

  }
}
