import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../shared/customer.service";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  key: AbstractControl;
  name: AbstractControl;
  email: AbstractControl;
  mobile: AbstractControl;
  location: AbstractControl;

  constructor(public svc: CustomerService) {
  }

  ngOnInit(): void {
    this.key = this.svc.form.controls.key;
    this.name = this.svc.form.controls.name;
    this.email = this.svc.form.controls.email;
    this.mobile = this.svc.form.controls.mobile;
    this.location = this.svc.form.controls.location;

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
