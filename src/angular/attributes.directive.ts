import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive( {
    "selector": `[twicPicsAttributes]`,
} )
export class AttributesDirective implements OnInit {

  @Input()
  public twicPicsAttributes?: { [key: string]: string; };
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }
  // eslint-disable-next-line class-methods-use-this
  formatAttributValue( attributeValue: any ): any {
      let formattedAttributValue = attributeValue;
      if ( typeof attributeValue === `object` ) {
          formattedAttributValue = ``;
          for ( const attributeValueKey in attributeValue ) {
              formattedAttributValue =
              `${ formattedAttributValue } ${ attributeValueKey } : ${ attributeValue[ attributeValueKey ] };`;
          }
      }
      return formattedAttributValue;
  }
  manageAttributes():void {
      for ( const attributeName in this.twicPicsAttributes ) {
          const attributeValue = this.twicPicsAttributes[ attributeName ];
          if ( attributeValue ) {
              this.renderer.setAttribute(
                  this.elementRef.nativeElement,
                  attributeName,
                  this.formatAttributValue( attributeValue )
              );
          } else {
              this.renderer.removeAttribute( this.elementRef.nativeElement, attributeName );
          }
      }
  }
  ngOnInit(): void {
      this.manageAttributes();
  }
}
