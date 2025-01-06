import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { formatLabel } from '../label.helper';
import { ColorHelper } from '../color.helper';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface LegendEntry {
  color: string;
  formattedLabel: string;
  label: string;
}
// <header class="legend-title" *ngIf="title?.length > 0" [ngStyle]="{'font-size': fontSize}">
// <span class="legend-title-text">{{ title }}</span>
// </header>
@Component({
  selector: 'ngx-charts-legend',
  template: `
    <div [style.width.px]="width">
    <header class="legend-title" *ngIf="title?.length > 0" [ngStyle]="{'font-size': fontSize}">
      <div [innerHTML]="sanitizedLegendTitle"></div>
    </header>
      <div class="legend-wrap">
        <ul class="legend-labels" [class.horizontal-legend]="horizontal" [style.max-height.px]="height - 45">
          <li *ngFor="let entry of legendEntries; trackBy: trackBy" class="legend-label">
            <ngx-charts-legend-entry
              [label]="entry.label"
              [formattedLabel]="entry.formattedLabel"
              [color]="entry.color"
              [isActive]="isActive(entry)"
              (select)="labelClick.emit($event)"
              (activate)="activate($event)"
              (deactivate)="deactivate($event)"
            >
            </ngx-charts-legend-entry>
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./legend.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendComponent implements OnChanges {
  @Input() data: string[];
  @Input() title: string;
  @Input() size: string;
  @Input() colors: ColorHelper;
  @Input() height: number;
  @Input() width: number;
  @Input() activeEntries;
  @Input() horizontal = false;

  @Output() labelClick: EventEmitter<string> = new EventEmitter();
  @Output() labelActivate: EventEmitter<{ name: string }> = new EventEmitter();
  @Output() labelDeactivate: EventEmitter<{ name: string }> = new EventEmitter();

  legendEntries: LegendEntry[] = [];
  fontSize: string;

  constructor(private cd: ChangeDetectorRef, private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.cd.markForCheck();
    this.legendEntries = this.getLegendEntries();

    switch (this.size) {
      case 'large':
        this.fontSize = '18px';
        break;
      case 'small':
        this.fontSize = '12px';
        break;
      case 'middle':
      default:
        this.fontSize = '14px';
        break;
    }
  }

  getLegendEntries(): LegendEntry[] {
    const items = [];
    for (const label of this.data) {
      const formattedLabel = formatLabel(label);

      const idx = items.findIndex(i => {
        return i.label === formattedLabel;
      });

      if (idx === -1) {
        items.push({
          label,
          formattedLabel,
          color: this.colors.getColor(label)
        });
      }
    }

    return items;
  }

  get sanitizedLegendTitle(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.title);
  }

  isActive(entry: LegendEntry): boolean {
    if (!this.activeEntries) return false;
    const item = this.activeEntries.find(d => {
      return entry.label === d.name;
    });
    return item !== undefined;
  }

  activate(item: { name: string }) {
    this.labelActivate.emit(item);
  }

  deactivate(item: { name: string }) {
    this.labelDeactivate.emit(item);
  }

  trackBy(index: number, item: LegendEntry): string {
    return item.label;
  }
}
