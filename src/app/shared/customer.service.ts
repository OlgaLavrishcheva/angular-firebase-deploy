import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Customer} from "./customer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const url = 'https://angular-firebase-deploy-6c3f4-default-rtdb.firebaseio.com/customers';
const httpOptions = {headers: new HttpHeaders({'Content-Tipe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customers: Customer[] = [];
  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.minLength(8)]],
    location: ['', [Validators.required]]
  });

  constructor(private http: HttpClient, private fb: FormBuilder) {
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
    this.http.get<Customer[]>(`${url}.json`, httpOptions).subscribe(
      res => {
        console.log(res);

        Object.keys(res).forEach(key => {
          // console.log(key);
          // console.log(res[key]);
          const obj = Object.assign({}, res[key]);
          obj.key = key;

          this.customers.push(obj);
          console.log(this.customers);
        })
      }
    )
  }

// update = PUT/PATCH
  update(): any {

  }

// delete = DELETE
  delete(): void {

  }
}
