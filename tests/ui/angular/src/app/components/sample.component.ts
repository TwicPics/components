// src/app/components/sample/sample.component.ts
import { Component, OnInit} from '@angular/core';
import '@twicpics/components/style.css';

@Component({
  selector: 'app-sample',
  "templateUrl": `./sample.component.html`,
})
export class SampleComponent implements OnInit {
  params: any = {};

  ngOnInit(): void {
    const queryParams = new URLSearchParams( window.location.search );
    this.params = {
      src: 'football.jpg',
      component: 'TwicImg',
      ...JSON.parse(queryParams.get('params') || '{}')
    };
  }
}
