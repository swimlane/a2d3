import {
  Input,
  Component,
  ElementRef,
  AfterViewInit,
  ViewEncapsulation,
  HostListener,
  ViewChild,
  HostBinding,
  Renderer2,
  PLATFORM_ID,
  Inject,
  TemplateRef
} from '@angular/core';

import { throttleable } from '../../utils/throttle';
import { PositionHelper, PlacementTypes } from './position';

import { StyleTypes } from './style.type';
import { isPlatformBrowser } from '@angular/common';
import { PieChartService } from '@swimlane/ngx-charts/pie-chart/pie-chart.service';

@Component({
  selector: 'ngx-tooltip-content',
  template: `
    <div>
      <span #caretElm [hidden]="!showCaret" class="tooltip-caret position-{{ this.placement }}"> </span>
      <div class="tooltip-content">
        <span *ngIf="!title">
          <ng-template [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{ model: context }"> </ng-template>
        </span>
        <span *ngIf="title" [innerHTML]="title"> </span>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipContentComponent implements AfterViewInit {
  @Input() host: ElementRef;
  @Input() showCaret: boolean;
  @Input() type: StyleTypes;
  @Input() placement: PlacementTypes;
  @Input() alignment: PlacementTypes;
  @Input() spacing: number;
  @Input() cssClass: string;
  @Input() title: string;
  @Input() template: TemplateRef<any>;
  @Input() context: any;

  @ViewChild('caretElm') caretElm: ElementRef;

  @HostBinding('class')
  get cssClasses(): string {
    let clz = 'ngx-charts-tooltip-content';
    clz += ` position-${this.placement}`;
    clz += ` type-${this.type}`;
    clz += ` ${this.cssClass}`;
    return clz;
  }

  constructor(public element: ElementRef, private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: any, private pieChartSvc: PieChartService) {}

  ngAfterViewInit(): void {
    setTimeout(this.position.bind(this));
  }

  position(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const nativeElm = this.element.nativeElement;
    const hostSvg = this.renderer.parentNode(this.host.nativeElement)
    //TODO: Implement positioning adjustment for other placements
    const isPieChart = this.renderer.parentNode(this.renderer.parentNode(hostSvg)).classList.contains('pie-chart') && (this.placement === 'bottom' || this.placement === 'top');
    
    let hostDim

    //TODO: Implement positioning adjustment for other placements
    if (isPieChart) {
      const hostSvg = this.renderer.parentNode(this.host.nativeElement)
      hostDim =  this.renderer.parentNode(hostSvg).getBoundingClientRect();
    } else {
      hostDim = this.host.nativeElement.getBoundingClientRect();
    }

    // if no dims were found, never show
    if (!hostDim.height && !hostDim.width) return;

    const elmDim = nativeElm.getBoundingClientRect();
    this.checkFlip(hostDim, elmDim);
    this.positionContent(nativeElm, hostDim, elmDim, isPieChart);

    if (this.showCaret) {
      this.positionCaret(hostDim, elmDim);
    }

    // animate its entry
    setTimeout(() => this.renderer.addClass(nativeElm, 'animate'), 1);
  }

  positionContent(nativeElm: HTMLElement, hostDim: DOMRect, elmDim: DOMRect, isPieChart: boolean ): void {
     const { top, left } = PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment, isPieChart, this.pieChartSvc);
 
     this.renderer.setStyle(nativeElm, 'top', `${top}px`);
     this.renderer.setStyle(nativeElm, 'left', `${left}px`);
   }

  positionCaret(hostDim: DOMRect, elmDim: DOMRect): void {
    const caretElm = this.caretElm.nativeElement;
    const caretDimensions = caretElm.getBoundingClientRect();
    const { top, left } = PositionHelper.positionCaret(
      this.placement,
      elmDim,
      hostDim,
      caretDimensions,
      this.alignment
    );

    this.renderer.setStyle(caretElm, 'top', `${top}px`);
    this.renderer.setStyle(caretElm, 'left', `${left}px`);
  }

  checkFlip(hostDim: DOMRect, elmDim: DOMRect): void {
    this.placement = PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing);
  }

  @HostListener('window:resize')
  @throttleable(100)
  onWindowResize(): void {
    this.position();
  }
}
