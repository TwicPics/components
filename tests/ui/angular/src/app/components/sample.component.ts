import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TwicImgComponent, TwicPictureComponent, TwicVideoComponent } from '@twicpics/components/angular18';
import '@twicpics/components/style.css';

@Component({
  selector: 'app-sample',
  template: `
    <div [class]="params.containerClass">
      <ng-container [ngSwitch]="params.component">
        <TwicImg
            *ngSwitchCase="'TwicImg'"
            #twicImg
            [src]="params.src"
            [alt]="params.alt"
            [attr.aria-label]="params['aria-label'] ?? null"
            [anchor]="params.anchor"
            [bot]="params.bot"
            [attr.draggable]="params.draggable ?? null"
            [eager]="params.eager"
            [focus]="params.focus"
            [attr.id]="params.id ? params.id : null"
            [intrinsic]="params.intrinsic"
            [mode]="params.mode"
            [position]="params.position"
            [placeholder]="params.placeholder"
            [preTransform]="params.preTransform"
            [ratio]="params.ratio"
            [refit]="params.refit"
            [step]="params.step"
            [attr.style]="params.style ? params.style : null"
            [attr.tabindex]="params.tabindex ? params.tabindex : null"
            [title]="params.title"
            [transition]="params.transition"
            [transitionDelay]="params.transitionDelay"
            [transitionDuration]="params.transitionDuration"
            [transitionTimingFunction]="params.transitionTimingFunction"
            [zoom]="params.zoom"
        ></TwicImg>
        <TwicVideo
            *ngSwitchCase="'TwicVideo'"
            #twicVideo
            [attr.aria-label]="params['aria-label'] ?? null"
            [src]="params.src"
            [anchor]="params.anchor"
            [bot]="params.bot"
            [attr.draggable]="params.draggable ?? null"
            [duration]="params.duration"
            [eager]="params.eager"
            [focus]="params.focus"
            [from]="params.from"
            [attr.id]="params.id ? params.id : null"
            [intrinsic]="params.intrinsic"
            [mode]="params.mode"
            [position]="params.position"
            [posterFrom]="params.posterFrom"
            [placeholder]="params.placeholder"
            [preTransform]="params.preTransform"
            [ratio]="params.ratio"
            [attr.tabindex]="params.tabindex ? params.tabindex : null"
            [step]="params.step"
            [attr.style]="params.style ? params.style : null"
            [to]="params.to"
            [title]="params.title"
            [transition]="params.transition"
            [transitionDelay]="params.transitionDelay"
            [transitionDuration]="params.transitionDuration"
            [transitionTimingFunction]="params.transitionTimingFunction"
        ></TwicVideo>
        <TwicPicture
            *ngSwitchCase="'TwicPicture'"
            #twicPicture
            [src]="params.src"
            [alt]="params.alt"
            [anchor]="params.anchor"
            [attr.aria-label]="params['aria-label'] ?? null"
            [attr.draggable]="params.draggable ?? null"
            [eager]="params.eager"
            [fetchpriority]="params.fetchpriority"
            [focus]="params.focus"
            [attr.id]="params.id ? params.id : null"
            [mode]="params.mode"
            [position]="params.position"
            [preTransform]="params.preTransform"
            [ratio]="params.ratio"
            [refit]="params.refit"
            [attr.style]="params.style ? params.style : null"
            [attr.tabindex]="params.tabindex ? params.tabindex : null"
            [title]="params.title"
        ></TwicPicture>
      </ng-container>
    </div>
  `
})
export class SampleComponent implements OnInit, AfterViewInit {
    @ViewChild( `twicImg`, { "static": false,} ) twicImgRef!: TwicImgComponent;
    @ViewChild( `twicVideo`, { "static": false,} ) twicVideoRef!: TwicVideoComponent;
    @ViewChild( `twicPicture`, { "static": false,} ) twicPictureRef!: TwicPictureComponent;
    params: any = {};
    ngOnInit(): void {
        const queryParams = new URLSearchParams(window.location.search);
        this.params = {
            src: 'football.jpg',
            containerClass: 'default',
            component: 'TwicImg',
            ...JSON.parse( queryParams.get( 'params' ) || '{}' )
        };
        console.log(this.twicImgRef, this.twicPictureRef, this.twicVideoRef);
    }

    /**
     * Managing prope
     * ie: we need to be able to test the component without passing the `role` property if it is not defined
     */
    ngAfterViewInit(): void {
      const actualComponent = this.twicImgRef || this.twicPictureRef || this.twicVideoRef;
      if ( actualComponent ) {
          if ( this.params.role !== undefined ) {
              actualComponent.role = this.params.role;
              actualComponent.ngOnChanges();
          }
      }
    }
}
