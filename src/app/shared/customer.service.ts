import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Customer} from "./customer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

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

  resetCustomer(customer: Customer): Customer {
    customer = {
      key: null,
      name: null,
      email: null,
      mobile: null,
      location: null
    };
    return  customer;
  }

  mergeCustomerProps(customer: Customer, temp: Customer): Customer | any {
    const result = {...customer};


    Object.keys(temp).forEach(key => {
      if (temp[key]) {
        result[key] = temp[key];
      }
    });
    return result;
  }

// CRUD
// create = POST
  createData(): void {
    const customer = this.form.value;
    this.http.post<Customer>(`${url}.json`, customer, httpOptions).subscribe(
      res => this.customers.push({...customer, ...{key: res.name}}),
      err => console.log(err)
    );
  }

// read = GET
  getData(): void {
    this.http.get<Customer[]>(`${url}.json`, httpOptions).subscribe(
      res => {
        Object.keys(res).forEach(key => {
          const obj = Object.assign({}, res[key]);
          obj.key = key;

          this.customers.push(obj);
        })
      }
    )
  }

// update = PUT/PATCH
  update(customer: Customer): Observable<Customer> | any {
    const {key, ...ctm} = customer;

    return this.http.put<Customer>(`${url}/${key}.json`, ctm, httpOptions);
  }

// delete = DELETE
  delete(customer: Customer): void {
    this.http.delete<void>(`${url}/${customer.key}.json`, httpOptions).subscribe(
      () => this.customers.splice(this.customers.indexOf(customer), 1),
      err => console.log(err)
    )
  }
}
