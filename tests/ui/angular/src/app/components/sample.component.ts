import { Component, OnInit } from '@angular/core';
import '@twicpics/components/style.css';

@Component({
  selector: 'app-sample',
  template: `
    <div [class]="params.containerClass">
      <ng-container [ngSwitch]="params.component">
        <TwicImg
            *ngSwitchCase="'TwicImg'"
            [src]="params.src"
            [alt]="params.alt"
            [anchor]="params.anchor"
            [bot]="params.bot"
            [crossorigin]="params.crossorigin"
            [decoding]="params.decoding"
            [draggable]="params.draggable"
            [eager]="params.eager"
            [focus]="params.focus"
            [id]="params.id"
            [intrinsic]="params.intrinsic"
            [mode]="params.mode"
            [position]="params.position"
            [placeholder]="params.placeholder"
            [preTransform]="params.preTransform"
            [ratio]="params.ratio"
            [refit]="params.refit"
            [step]="params.step"
            [style]="params.style"
            [tabindex]="params.tabindex"
            [title]="params.title"
            [transition]="params.transition"
            [transitionDelay]="params.transitionDelay"
            [transitionDuration]="params.transitionDuration"
            [transitionTimingFunction]="params.transitionTimingFunction"
            [zoom]="params.zoom"
        ></TwicImg>
        <TwicVideo
            *ngSwitchCase="'TwicVideo'"
            [src]="params.src"
            [anchor]="params.anchor"
            [bot]="params.bot"
            [crossorigin]="params.crossorigin"
            [draggable]="params.draggable"
            [duration]="params.duration"
            [eager]="params.eager"
            [focus]="params.focus"
            [from]="params.from"
            [id]="params.id"
            [intrinsic]="params.intrinsic"
            [mode]="params.mode"
            [position]="params.position"
            [posterFrom]="params.posterFrom"
            [placeholder]="params.placeholder"
            [preTransform]="params.preTransform"
            [ratio]="params.ratio"
            [step]="params.step"
            [style]="params.style"
            [tabindex]="params.tabindex"
            [to]="params.to"
            [title]="params.title"
            [transition]="params.transition"
            [transitionDelay]="params.transitionDelay"
            [transitionDuration]="params.transitionDuration"
            [transitionTimingFunction]="params.transitionTimingFunction"
        ></TwicVideo>
        <TwicPicture
            *ngSwitchCase="'TwicPicture'"
            [src]="params.src"
            [alt]="params.alt"
            [anchor]="params.anchor"
            [crossorigin]="params.crossorigin"
            [decoding]="params.decoding"
            [draggable]="params.draggable"
            [eager]="params.eager"
            [fetchpriority]="params.fetchpriority"
            [focus]="params.focus"
            [id]="params.id"
            [mode]="params.mode"
            [position]="params.position"
            [preTransform]="params.preTransform"
            [ratio]="params.ratio"
            [refit]="params.refit"
            [style]="params.style"
            [tabindex]="params.tabindex"
            [title]="params.title"
        ></TwicPicture>
      </ng-container>
    </div>
  `
})
export class SampleComponent implements OnInit {
    params: any = {};

    ngOnInit(): void {
        const queryParams = new URLSearchParams(window.location.search);
        this.params = {
            src: 'football.jpg',
            containerClass: 'default',
            component: 'TwicImg',
            ...JSON.parse( queryParams.get( 'params' ) || '{}' )
        };
    }
}
