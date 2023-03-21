import { Component } from '@angular/core';

@Component({
  selector: 'app-template-container',
  templateUrl: './template-container.component.html',
  styleUrls: ['./template-container.component.scss'],
})
export class TemplateContainerComponent {
  public title: string;

  constructor() {
    this.title = 'Ohhhhh le joli title';
  }
}
