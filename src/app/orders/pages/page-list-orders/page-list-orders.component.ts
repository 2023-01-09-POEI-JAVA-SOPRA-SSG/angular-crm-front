import { Component } from '@angular/core';
import { Order } from '../../models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss'],
})
export class PageListOrdersComponent {
  public title: string;
  public collection!: Order[];
  public headers: string[];

  constructor(private ordersService: OrdersService) {
    this.title = 'List of orders';
    this.headers = [
      'Type',
      'Client',
      'Period',
      'Unit price',
      'Total exc. taxes',
      'Total Incl. taxes',
      'State',
    ];

    this.ordersService.collection$.subscribe((data) => {
      console.log(data);
      this.collection = data;
    });
  }
}
