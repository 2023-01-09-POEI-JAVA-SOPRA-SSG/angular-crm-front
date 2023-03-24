import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateOrder } from '../../enums/state-order';
import { Order } from '../../models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-add-order',
  templateUrl: './page-add-order.component.html',
  styleUrls: ['./page-add-order.component.scss'],
})
export class PageAddOrderComponent {
  public states: string[];
  public order: Order;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.states = Object.values(StateOrder);
    this.order = new Order();
    this.form = this.formBuilder.group({
      typePresta: [this.order.typePresta, Validators.required],
      client: [this.order.client],
      nbJours: [this.order.nbJours],
      tjmHt: [this.order.tjmHt],
      tva: [this.order.tva],
      state: [this.order.state],
      comment: [this.order.comment],
      id: [this.order.id],
    });
  }

  public onSubmit() {
    this.ordersService.add(this.form.value).subscribe(() => {
      this.router.navigate(['orders']);
    });
  }
}
