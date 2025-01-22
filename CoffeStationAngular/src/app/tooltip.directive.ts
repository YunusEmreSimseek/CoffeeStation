import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';
  private tooltipElement: HTMLElement | null = null;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipText) return;
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltipText)
    );
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background', '#333');
    this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
    this.renderer.setStyle(this.tooltipElement, 'padding', '5px 10px');
    this.renderer.setStyle(this.tooltipElement, 'borderRadius', '4px');
    this.renderer.setStyle(this.tooltipElement, 'top', `${this.el.nativeElement.offsetTop - 30}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${this.el.nativeElement.offsetLeft}px`);
    this.renderer.setStyle(this.tooltipElement, 'zIndex', '1000');
    this.renderer.appendChild(document.body, this.tooltipElement);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
