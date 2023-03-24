import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StateOrder } from '../../enums/state-order';
import { Order } from '../../models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss'],
})
export class PageListOrdersComponent {
  public title: string;
  public collection$!: BehaviorSubject<Order[]>;
  public states: string[];
  public headers: string[];

  constructor(private ordersService: OrdersService, private router: Router) {
    this.title = 'List of orders';
    this.collection$ = this.ordersService.collection$;
    this.states = Object.values(StateOrder);
    this.headers = [
      'Actions',
      'Type',
      'Client',
      'Period',
      'Unit price',
      'Total exc. taxes',
      'Total Incl. taxes',
      'State',
    ];
  }

  public changeState(event: any, order: Order): void {
    const state = event.target.value;
    this.ordersService.changeState(order, state).subscribe((data) => {
      Object.assign(order, data);
    });
  }

  public goToEdit(id: number): void {
    this.router.navigate(['orders', 'edit', id]);
  }

  public deleteItem(id: number): void {
    this.ordersService.delete(id).subscribe();
  }
}
