import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';
import { colors } from './colors';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {
  defaultColor= colors.$secondary;
  hoverColor= colors.$tertiary;

  constructor(
    private elementRef:ElementRef, 
    private renderer:Renderer2
  ) { }
    
    ngOnInit(){
      this.color = this.defaultColor;
    }

    @HostBinding('style.background-color') color:string = this.defaultColor;

    @HostListener('mouseenter') mouseover(){
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.hoverColor ); 

    }

    @HostListener('mouseleave') mouseleave(){
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.defaultColor );
    }

}
