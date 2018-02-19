import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { formatLabel } from '../label.helper';

@Component({
  selector: 'ngx-charts-advanced-legend',
  template: `
    <div class="advanced-pie-legend"
      [style.width.px]="width">
      <div
        *ngIf="animations"
        class="total-value"
        ngx-charts-count-up
        [countTo]="roundedTotal">
      </div>
      <div *ngIf="!animations">
        {{roundedTotal}}
      </div>
      <div class="total-label">
        {{label}}
      </div>
      <div class="legend-items-container">
        <div class="legend-items">
          <div
            *ngFor="let legendItem of legendItems; trackBy:trackBy"
            tabindex="-1"
            class="legend-item"
            (mouseenter)="activate.emit(legendItem.label)"
            (mouseleave)="deactivate.emit(legendItem.label)"
            (click)="select.emit({ name: legendItem.label, value: legendItem.value })">
            <div
              class="item-color"
              [style.background]="legendItem.color">
            </div>
            <div *ngIf="animations"
              class="item-value"
              ngx-charts-count-up
              [countTo]="legendItem.value">
            </div>
            <div *ngIf="!animations" class="item-value">
              {{legendItem.value}}
            </div>
            <div class="item-label">{{legendItem.label}}</div>
            <div *ngIf="animations"
              class="item-percent"
              ngx-charts-count-up
              [countTo]="legendItem.percentage"
              [countSuffix]="'%'">
            </div>
            <div *ngIf="!animations"
              class="item-percent">
              {{legendItem.percentage.toLocaleString()}}%
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./advanced-legend.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedLegendComponent implements OnChanges  {

  @Input() width: number;
  @Input() data;
  @Input() colors;
  @Input() label: string = 'Total';
  @Input() animations: boolean = true;

  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  legendItems: any[] = [];
  total: number;
  roundedTotal: number;

  @Input() valueFormatting: (value: number) => any = value => value;
  @Input() labelFormatting: (value: string) => any = label => label;
  @Input() percentageFormatting: (value: number) => any = percentage => percentage;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  getTotal(): number {
    return this.data
      .map(d => d.value)
      .reduce((sum, d) => sum + d, 0);
  }

  update(): void {
    this.total = this.getTotal();
    this.roundedTotal = this.total;

    this.legendItems = this.getLegendItems();
  }

  getLegendItems(): any {
    return this.data.map((d, index) => {
      const label = formatLabel(d.name);
      const value = d.value;
      const color = this.colors.getColor(label);
      const percentage = (this.total > 0) ? value / this.total * 100 : 0;

      return {
        value: this.valueFormatting(value),
        color,
        label: trimLabel(this.labelFormatting(label), 20),
        originalLabel: d.name,
        percentage: this.percentageFormatting(percentage)
      };
    });
  }

  trackBy(item) {
    return item.formattedLabel;
  }

}
