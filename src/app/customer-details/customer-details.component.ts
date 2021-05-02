import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../shared/customer.service";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  constructor(public svc: CustomerService) { }

  ngOnInit(): void {
    // this.svc.createData();
  }

  onSubmit(): void {

  }

}
