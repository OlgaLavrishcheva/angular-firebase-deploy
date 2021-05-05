import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../shared/customer.service";
import {Customer} from "../shared/customer";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  isEditPosition: null | number = null;

  private editCustomer: Customer;

  constructor(public svc: CustomerService) {
  }

  ngOnInit(): void {
    this.svc.getData()
  }

  editMode(i: number): void {
    this.editCustomer = this.svc.resetCustomer(this.editCustomer);
    this.isEditPosition = i;
  }

  cancelEdit(): void {
    this.isEditPosition = null;
    this.editCustomer = this.svc.resetCustomer(this.editCustomer);
  }

  setValue(key: string, value: string, customer: Customer): void {
    this.editCustomer[key] = value;
  }

  saveCustomer(customer: Customer, i: number): void {
    const mergeCustomer: Customer = this.svc.mergeCustomerProps(customer, this.editCustomer)
    this.svc.update(mergeCustomer).subscribe(
      () => {
        this.isEditPosition = null;
        this.svc.customers[i] = mergeCustomer;
      },
      err => console.log(err)
    );
  }

  deleteCustomer(customer: Customer): void {
    this.svc.delete(customer);
  }
}
