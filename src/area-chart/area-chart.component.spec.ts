import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { multi } from '../../demo/data';
import { APP_BASE_HREF } from '@angular/common';

import { AreaChartModule } from './area-chart.module';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  data: any = multi;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

describe('<ngx-charts-area-chart>', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, AreaChartModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    });
  });

  describe('basic setup', () => {

    beforeEach(async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <ngx-charts-area-chart
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="data">
              </ngx-charts-area-chart>`
        }
      }).compileComponents();
    }));

    it('should set the svg width and height', async(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('svg');

      expect(svg.getAttribute('width')).toBe('400');
      expect(svg.getAttribute('height')).toBe('800');
    }));

    it('should render 4 area elements', async(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('path.area').length).toEqual(4);
    }));
  });
});
