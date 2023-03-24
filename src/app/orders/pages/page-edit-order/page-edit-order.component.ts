import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateOrder } from '../../enums/state-order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-edit-order',
  templateUrl: './page-edit-order.component.html',
  styleUrls: ['./page-edit-order.component.scss'],
})
export class PageEditOrderComponent {
  public states: string[];
  public id: number;
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.states = Object.values(StateOrder);
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ordersService.getById(this.id).subscribe((order) => {
      this.form = this.formBuilder.group({
        typePresta: [order.typePresta, Validators.required],
        client: [order.client],
        nbJours: [order.nbJours],
        tjmHt: [order.tjmHt],
        tva: [order.tva],
        state: [order.state],
        comment: [order.comment],
        id: [order.id],
      });
    });
  }

  public onSubmit() {
    this.ordersService.update(this.form.value).subscribe(() => {
      this.router.navigate(['orders']);
    });
  }
}
