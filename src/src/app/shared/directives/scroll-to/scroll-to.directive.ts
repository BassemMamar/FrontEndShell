import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective implements AfterViewInit {

  constructor(private el: ElementRef ) { }

  ngAfterViewInit() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    setTimeout(() => {
      nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}
