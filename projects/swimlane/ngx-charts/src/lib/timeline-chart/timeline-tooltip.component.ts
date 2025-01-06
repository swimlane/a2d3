import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectionStrategy,
  TemplateRef,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';

import { createMouseEvent } from '../events';
import { formatLabel } from '../common/label.helper';
import { ColorHelper } from '../common/color.helper';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { TimelineChartType } from './types/timeline-chart-type.enum';

export interface Tooltip {
  color: string;
  d0: number;
  d1: number;
  max: number;
  min: number;
  name: any;
  series: any;
  value: any;
}

@Component({
  selector: 'g[ngx-charts-timeline-tooltip]',
  template: `
    <svg:g>
      <svg:rect
        class="tooltip-area"
        [attr.x]="0"
        y="0"
        [attr.width]="dims.width"
        [attr.height]="dims.height"
        style="opacity: 0; cursor: 'auto';"
        (mousemove)="mouseMove($event)"
        (mouseleave)="hideTooltip()"
      />
      <ng-template #defaultTooltipTemplate let-model="model">
        <xhtml:div class="area-tooltip-container">
          <xhtml:div *ngFor="let tooltipItem of model" class="tooltip-item">
            <xhtml:span class="tooltip-item-color" [style.background-color]="tooltipItem.color"></xhtml:span>
            {{ getToolTipText(tooltipItem) }}
          </xhtml:div>
        </xhtml:div>
      </ng-template>
      <svg:rect
        #tooltipAnchor
        [@animationState]="anchorOpacity !== 0 ? 'active' : 'inactive'"
        class="tooltip-anchor"
        [attr.x]="anchorPos"
        y="0"
        [attr.width]="1"
        [attr.height]="dims.height"
        [style.opacity]="anchorOpacity"
        [style.pointer-events]="'none'"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Right"
        [tooltipType]="styleTypes.tooltip"
        [tooltipSpacing]="15"
        [tooltipTemplate]="tooltipTemplate ? tooltipTemplate : defaultTooltipTemplate"
        [tooltipContext]="anchorValues"
        [tooltipImmediateExit]="true"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition('inactive => active', [
        style({
          opacity: 0
        }),
        animate(250, style({ opacity: 0.7 }))
      ]),
      transition('active => inactive', [
        style({
          opacity: 0.7
        }),
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TimelineTooltip {
  anchorOpacity: number = 0;
  anchorPos: number = -1;
  anchorValues: Tooltip[] = [];
  lastAnchorPos: number;

  placementTypes = PlacementTypes;
  styleTypes = StyleTypes;
  tooltip = [
    {
      'series': 'tooltip'
    }
  ];

  @Input() type: TimelineChartType = TimelineChartType.Standard;
  @Input() dims: ViewDimensions;
  @Input() xScale;
  @Input() yScale;
  @Input() results: any[];
  @Input() colors: ColorHelper;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;

  @Output() hover: EventEmitter<{ value: any }> = new EventEmitter();

  @ViewChild('tooltipAnchor', { static: false }) tooltipAnchor;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  getValues(xPos): Tooltip[] {
    const results = [];

    if (this.type === TimelineChartType.Standard) {
      for (const d of this.results) {
        const xPosStart = this.xScale(d.startTime);
        const xPosEnd = this.xScale(d.endTime);

        let dName = d.name;
        if (dName instanceof Date) {
          dName = dName.toLocaleDateString();
        }

        if (xPos >= xPosStart && xPos <= xPosEnd) {
          let val = formatLabel(d.startTime) +  ' - ' + formatLabel(d.endTime);

          const data = Object.assign({}, d, {
            value: val,
            series: dName,
            color: this.colors.getColor(d.name)
          });

          results.push(data);
        }
      }
    } else {
      for (const group of this.results) {
        let groupName = group.name;
        if (groupName instanceof Date) {
          groupName = groupName.toLocaleDateString();
        }

        for (const d of group.series) {
          const xPosStart = this.xScale(d.startTime);
          const xPosEnd = this.xScale(d.endTime);

          let dName = d.name;
          if (dName instanceof Date) {
            dName = dName.toLocaleDateString();
          }
  
          if (xPos >= xPosStart && xPos <= xPosEnd) {
            let val = formatLabel(d.startTime) +  ' - ' + formatLabel(d.endTime);
  
            const data = Object.assign({}, d, {
              value: val,
              series: groupName + ' • ' + dName,
              color: this.colors.getColor(d.name)
            });
  
            results.push(data);
          }
        }
      }
    }

    return results;
  }

  mouseMove(event) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const xPos = event.pageX - event.target.getBoundingClientRect().left;
    this.anchorPos = xPos
    this.anchorPos = Math.max(0, this.anchorPos);
    this.anchorPos = Math.min(this.dims.width, this.anchorPos);

    this.anchorValues = this.getValues(xPos);
    if (this.anchorPos !== this.lastAnchorPos) {
      const ev = createMouseEvent('mouseleave');
      this.tooltipAnchor.nativeElement.dispatchEvent(ev);
      this.anchorOpacity = 0.7;
      this.showTooltip();

      this.lastAnchorPos = this.anchorPos;
    }
  }

  showTooltip(): void {
    const event = createMouseEvent('mouseenter');
    this.tooltipAnchor.nativeElement.dispatchEvent(event);
  }

  hideTooltip(): void {
    const event = createMouseEvent('mouseleave');
    this.tooltipAnchor.nativeElement.dispatchEvent(event);
    this.anchorOpacity = 0;
    this.lastAnchorPos = -1;
  }

  getToolTipText(tooltipItem: Tooltip): string {
    let result: string = '';
    if (tooltipItem.series !== undefined) {
      result += tooltipItem.series;
    } else {
      result += '???';
    }
    result += ': ';
    if (tooltipItem.value !== undefined) {
      result += tooltipItem.value.toLocaleString();
    }
    if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
      result += ' (';
      if (tooltipItem.min !== undefined) {
        if (tooltipItem.max === undefined) {
          result += '≥';
        }
        result += tooltipItem.min.toLocaleString();
        if (tooltipItem.max !== undefined) {
          result += ' - ';
        }
      } else if (tooltipItem.max !== undefined) {
        result += '≤';
      }
      if (tooltipItem.max !== undefined) {
        result += tooltipItem.max.toLocaleString();
      }
      result += ')';
    }
    return result;
  }
}
