import { Directive, ElementRef, Host, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAppHover]'
})
export class AppHoverDirective {

  constructor(private element:ElementRef,private renderer:Renderer2) { }

  @HostBinding("style.backgroundColor") backgroundColor:string="#2828B"
  @HostBinding("style.border") border:string="none";
  @HostBinding("style.color")  textColor:string="white"

  @HostListener("mouseover")
  onMouseOver(){
    this.backgroundColor='white',
    this.textColor="#28282B",
    this.border='#28282B 3px solid'
  }

  @HostListener("mouseleave")
  onMouseLeave(){
    this.backgroundColor='#2828B',
    this.border="none",
    this.textColor='white'
  }

}
