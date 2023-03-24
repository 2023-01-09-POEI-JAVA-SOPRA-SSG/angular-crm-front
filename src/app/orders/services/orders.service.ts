import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { StateOrder } from '../enums/state-order';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private urlApi: string;
  public collection$: BehaviorSubject<Order[]>;

  constructor(private httpClient: HttpClient) {
    this.urlApi = 'http://localhost:3000/orders';
    this.collection$ = new BehaviorSubject<Order[]>([]);

    this.refreshCollection();
  }

  public refreshCollection(): void {
    this.httpClient.get<Order[]>(this.urlApi).subscribe((data) => {
      this.collection$.next(data);
    });
  }

  public getById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.urlApi}/${id}`);
  }

  public changeState(order: Order, state: StateOrder): Observable<Order> {
    const obj = new Order(order);
    obj.state = state;
    return this.update(obj);
  }

  public update(order: Order): Observable<Order> {
    return this.httpClient
      .put<Order>(`${this.urlApi}/${order.id}`, order)
      .pipe(tap(() => this.refreshCollection()));
  }

  public add(order: Order): Observable<Order> {
    return this.httpClient
      .post<Order>(`${this.urlApi}`, order)
      .pipe(tap(() => this.refreshCollection()));
  }

  public delete(id: number): Observable<Order> {
    return this.httpClient
      .delete<Order>(`${this.urlApi}/${id}`)
      .pipe(tap(() => this.refreshCollection()));
  }
}
