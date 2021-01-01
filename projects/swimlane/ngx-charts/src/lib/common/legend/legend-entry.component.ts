import { Component, Input, Output, ChangeDetectionStrategy, HostListener, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'ngx-charts-legend-entry',
  template: `
    <ng-container *ngIf="legendEntryTemplate">
      <ng-container *ngTemplateOutlet="legendEntryTemplate;context:{label:label,color:color}"></ng-container>
    </ng-container>
    <ng-container *ngIf="!legendEntryTemplate">
      <span [title]="formattedLabel" tabindex="-1" [class.active]="isActive" (click)="select.emit(formattedLabel)">
      <span class="legend-label-color" [style.background-color]="color" (click)="toggle.emit(formattedLabel)"> </span>
      <span class="legend-label-text">
        {{ trimmedLabel }}
      </span>
    </span>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendEntryComponent {
  @Input() color: string;
  @Input() label: any;
  @Input() formattedLabel: string;
  @Input() isActive: boolean = false;
  @Input() legendEntryTemplate: TemplateRef<any>;

  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  get trimmedLabel(): string {
    return this.formattedLabel || '(empty)';
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.activate.emit({ name: this.label });
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.deactivate.emit({ name: this.label });
  }
}
