import { Injectable } from '@angular/core';
import { InjectionService } from './injection.service';
import { TooltipContentComponent } from './tooltip.component';
import { InjectionRegisteryService } from './injection-registery.service';
@Injectable({
  providedIn: 'root'
})
export class TooltipService extends InjectionRegisteryService<TooltipContentComponent> {
  type: any = TooltipContentComponent;

  constructor(injectionService: InjectionService) {
    super(injectionService);
  }
}
