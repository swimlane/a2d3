import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { formatLabel } from '../common/label.helper';
import { BarOrientation } from '../common/types/bar-orientation.enum';

@Component({
  selector: 'g[ngx-charts-bar-label]',
  template: `
    <svg:text
      class="textDataLabel"
      alignment-baseline="middle"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
      [attr.x]="x"
      [attr.y]="y"
    >
      {{ formatedValue }}
    </svg:text>
  `,
  styleUrls: ['./bar-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarLabelComponent implements OnChanges {
  @Input() value;
  @Input() valueFormatting: any;
  @Input() barX;
  @Input() barY;
  @Input() barWidth;
  @Input() barHeight;
  @Input() orientation: BarOrientation;
  @Input() dataLabelPosition: string;

  @Output() dimensionsChanged: EventEmitter<any> = new EventEmitter();

  element: any;
  x: number;
  y: number;
  horizontalPadding: number = 2;
  verticalPadding: number = 5;
  formatedValue: string;
  transform: string;
  textAnchor: string;
  orginalVal: any;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  getSize(): any {
    const h = this.element.getBoundingClientRect().height;
    const w = this.element.getBoundingClientRect().width;
    return { height: h, width: w, negative: this.value < 0 };
  }

  ngAfterViewInit() {
    this.dimensionsChanged.emit(this.getSize());
  }

  update(): void {
    this.orginalVal = this.value;
    if (this.valueFormatting) {
      this.formatedValue = this.valueFormatting(this.value);
    } else {
      this.formatedValue = formatLabel(this.value);
    }

    var valueWidth = this.calculateWidth(this.value);
    if (valueWidth >= this.barWidth - 4) {
      this.formatedValue = this.shortenNum(this.value);
      valueWidth = this.calculateWidth(this.formatedValue);
    }

    if (this.dataLabelPosition == 'outside') {
      if (this.orientation === 'horizontal') {
        this.x = this.barX + this.barWidth;
        // if the value is negative then it's on the left of the x0.
        // we need to put the data label in front of the bar
        if (this.value < 0) {
          this.x = this.x - this.horizontalPadding;
          this.textAnchor = 'end';
        } else {
          this.x = this.x + this.horizontalPadding;
          this.textAnchor = 'start';
        }
        this.y = this.barY + this.barHeight / 2;
      } else {
        // orientation must be "vertical"
        this.x = this.barX + this.barWidth / 2;
        this.y = this.barY + this.barHeight;

        if (this.value < 0) {
          this.y = this.y + this.verticalPadding;
          this.textAnchor = 'end';
        } else {
          this.y = this.y - this.verticalPadding;
          this.textAnchor = 'start';
        }
        this.transform = `rotate(-45, ${this.x} , ${this.y})`;
      }
    } else {
      if (this.orientation === 'horizontal') {
        this.x = this.barWidth - valueWidth;
        if (this.value < 0) {
          this.x = this.x + this.horizontalPadding * 3;
          this.textAnchor = 'end';
        } else {
          this.x = this.x - this.horizontalPadding * 3;
          this.textAnchor = 'start';
        }
        this.y = this.barY + this.barHeight / 2;
      } else {
        // orientation must be "vertical"
        this.x = this.barX + (this.barWidth - valueWidth) / 2;
        this.y = this.barY + this.barHeight;

        if (this.value < 0) {
          this.y = this.y - this.verticalPadding * 3;
          this.textAnchor = 'end';
        } else {
          this.y = this.y + this.verticalPadding * 3;
          this.textAnchor = 'start';
        }
        this.transform = `rotate(0, ${this.x} , ${this.y})`;
      }
    }
  }

  calculateWidth(value): number {
    //for default font size of 11px, the width of a single digit number is 6.29 and width of comma is 3.21, the width of 'K','B','M' is about 5.66
    const digitWidth = 6.29;
    const commaWidth = 3.21;
    const kbmWidth = 5.66;

    const stringValue = value.toLocaleString();

    let totalWidth = 0;
  
    for (const char of stringValue) {
      // Check if the character is a digit or a comma
      if (/[0-9]/.test(char)) {
        totalWidth += digitWidth;
      } else if (char === ',') {
        totalWidth += commaWidth;
      } else {
        totalWidth += kbmWidth;
      }
    }
  
    return totalWidth;
  }

  shortenNum(value: number): string {
    const abbreviations = [
      { value: 1e9, symbol: 'B' },
      { value: 1e6, symbol: 'M' },
      { value: 1e3, symbol: 'k' },
    ];
  
    for (const abbreviation of abbreviations) {
      if (Math.abs(value) >= abbreviation.value) {
        const formattedValue = value / abbreviation.value;
        return `${Math.floor(formattedValue)}${abbreviation.symbol}`;
      }
    }
  
    return value.toString();
  }
}
