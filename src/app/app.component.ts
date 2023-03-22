import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  public title: string;
  private obs$: Observable<any>;
  private subj$: Subject<any>;
  private behav$: BehaviorSubject<any>;
  private sub: Subscription;

  constructor() {
    this.title = 'crm';
    this.obs$ = new Observable<any>((listX) => {
      listX.next(Math.random());
    });
    this.subj$ = new Subject();
    this.behav$ = new BehaviorSubject(1);

    this.sub = this.obs$.subscribe((data) => console.log(data));
    // this.obs$.subscribe((data) => console.log(data));

    // this.subj$.subscribe((data) => console.log(data));
    // this.subj$.next(1);
    // this.subj$.next(2);
    // this.subj$.subscribe((data) => console.log(data));
    // this.subj$.next(Math.random());

    // this.behav$.subscribe((data) => console.log(data));
    // this.behav$.next(2);
    // this.behav$.next(Math.random());
    // this.behav$.subscribe((data) => console.log(data));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
