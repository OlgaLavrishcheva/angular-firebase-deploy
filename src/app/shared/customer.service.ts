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
    key: [''],
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
    const customer = this.form.value
    this.http.post<Customer>(`${url}.json`, customer, httpOptions).subscribe(
      res => {
        console.log(res)
      }
    )
  }

// read = GET
  getData(): void {
    this.http.get<Customer[]>(`${url}.json`, httpOptions).subscribe(
      res => {
        Object.keys(res).forEach(key => {
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
