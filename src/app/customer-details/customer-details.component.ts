import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../shared/customer.service";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  constructor(public svc: CustomerService) {
  }

  ngOnInit(): void {
    this.svc.form.controls.key.setValue(null);
    this.svc.form.controls.name.setValue('John Smith');
    this.svc.form.controls.email.setValue('john@gmail.com');
    this.svc.form.controls.mobile.setValue('12341111');
    this.svc.form.controls.location.setValue('Somewhere');
  }

  onSubmit(): void {
    if (this.svc.form.valid) {
      if (this.svc.form.controls.key.value === null) {
      this.svc.createData();
      }
    }
  }

}
