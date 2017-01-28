/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../src/gauge/linear-gauge.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/core/src/linker/element_ref';
import * as import10 from '@angular/core/src/zone/ng_zone';
import * as import11 from '@angular/common/src/location/location';
import * as import12 from '../common/base-chart.component.scss.ngstyle';
import * as import13 from './linear-gauge.component.scss.ngstyle';
import * as import14 from '@angular/core/src/linker/view_container';
import * as import15 from '@angular/core/src/linker/query_list';
import * as import16 from '../../../src/common/charts/chart.component';
import * as import17 from '../../../src/common/tooltip/tooltip.service';
import * as import18 from '../common/charts/chart.component.ngfactory';
import * as import19 from '../../../src/bar-chart/bar.component';
import * as import20 from '../bar-chart/bar.component.ngfactory';
import * as import21 from '../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import22 from '../../../src/services/injection.service';
import * as import23 from '@angular/core/src/linker/template_ref';
import * as import24 from '@angular/common/src/directives/ng_if';
import * as import25 from '@angular/core/src/security';
export class Wrapper_LinearGaugeComponent {
  /*private*/ _eventHandler:Function;
  context:import0.LinearGaugeComponent;
  /*private*/ _changed:boolean;
  /*private*/ _changes:{[key: string]:any};
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  /*private*/ _expr_5:any;
  /*private*/ _expr_6:any;
  /*private*/ _expr_7:any;
  /*private*/ _expr_8:any;
  /*private*/ _expr_9:any;
  subscription0:any;
  constructor(p0:any,p1:any,p2:any,p3:any) {
    this._changed = false;
    this._changes = {};
    this.context = new import0.LinearGaugeComponent(p0,p1,p2,p3);
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
    this._expr_4 = import1.UNINITIALIZED;
    this._expr_5 = import1.UNINITIALIZED;
    this._expr_6 = import1.UNINITIALIZED;
    this._expr_7 = import1.UNINITIALIZED;
    this._expr_8 = import1.UNINITIALIZED;
    this._expr_9 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    this.context.ngOnDestroy();
    (this.subscription0 && this.subscription0.unsubscribe());
  }
  check_results(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.results = currValue;
      this._changes['results'] = new import1.SimpleChange(this._expr_0,currValue);
      this._expr_0 = currValue;
    }
  }
  check_view(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.view = currValue;
      this._changes['view'] = new import1.SimpleChange(this._expr_1,currValue);
      this._expr_1 = currValue;
    }
  }
  check_scheme(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_2,currValue))) {
      this._changed = true;
      this.context.scheme = currValue;
      this._changes['scheme'] = new import1.SimpleChange(this._expr_2,currValue);
      this._expr_2 = currValue;
    }
  }
  check_schemeType(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_3,currValue))) {
      this._changed = true;
      this.context.schemeType = currValue;
      this._changes['schemeType'] = new import1.SimpleChange(this._expr_3,currValue);
      this._expr_3 = currValue;
    }
  }
  check_customColors(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_4,currValue))) {
      this._changed = true;
      this.context.customColors = currValue;
      this._changes['customColors'] = new import1.SimpleChange(this._expr_4,currValue);
      this._expr_4 = currValue;
    }
  }
  check_min(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_5,currValue))) {
      this._changed = true;
      this.context.min = currValue;
      this._changes['min'] = new import1.SimpleChange(this._expr_5,currValue);
      this._expr_5 = currValue;
    }
  }
  check_max(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_6,currValue))) {
      this._changed = true;
      this.context.max = currValue;
      this._changes['max'] = new import1.SimpleChange(this._expr_6,currValue);
      this._expr_6 = currValue;
    }
  }
  check_value(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_7,currValue))) {
      this._changed = true;
      this.context.value = currValue;
      this._changes['value'] = new import1.SimpleChange(this._expr_7,currValue);
      this._expr_7 = currValue;
    }
  }
  check_units(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_8,currValue))) {
      this._changed = true;
      this.context.units = currValue;
      this._changes['units'] = new import1.SimpleChange(this._expr_8,currValue);
      this._expr_8 = currValue;
    }
  }
  check_previousValue(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_9,currValue))) {
      this._changed = true;
      this.context.previousValue = currValue;
      this._changes['previousValue'] = new import1.SimpleChange(this._expr_9,currValue);
      this._expr_9 = currValue;
    }
  }
  ngDoCheck(view:import2.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    if (!throwOnChange) { if (changed) {
      this.context.ngOnChanges(this._changes);
      this._changes = {};
    } }
    return changed;
  }
  checkHost(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any,throwOnChange:boolean):void {
  }
  handleEvent(eventName:string,$event:any):boolean {
    var result:boolean = true;
    return result;
  }
  subscribe(view:import2.AppView<any>,_eventHandler:any,emit0:boolean):void {
    this._eventHandler = _eventHandler;
    if (emit0) { (this.subscription0 = this.context.select.subscribe(_eventHandler.bind(view,'select'))); }
  }
}
var renderType_LinearGaugeComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_LinearGaugeComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.LinearGaugeComponent>;
  _LinearGaugeComponent_0_3:Wrapper_LinearGaugeComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_LinearGaugeComponent_Host0,renderType_LinearGaugeComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'ngx-charts-linear-gauge',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_LinearGaugeComponent0(this.viewUtils,this,0,this._el_0);
    this._LinearGaugeComponent_0_3 = new Wrapper_LinearGaugeComponent(new import9.ElementRef(this._el_0),this.injectorGet(import10.NgZone,this.parentIndex),this.compView_0.ref,this.injectorGet(import11.Location,this.parentIndex));
    this.compView_0.create(this._LinearGaugeComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._LinearGaugeComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.LinearGaugeComponent) && (0 === requestNodeIndex))) { return this._LinearGaugeComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    if (this._LinearGaugeComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange)) { this.compView_0.markAsCheckOnce(); }
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._LinearGaugeComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._LinearGaugeComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const LinearGaugeComponentNgFactory:import8.ComponentFactory<import0.LinearGaugeComponent> = new import8.ComponentFactory<import0.LinearGaugeComponent>('ngx-charts-linear-gauge',View_LinearGaugeComponent_Host0,import0.LinearGaugeComponent);
const styles_LinearGaugeComponent:any[] = [
  import12.styles,
  import13.styles
]
;
class View_LinearGaugeComponent1 extends import2.AppView<any> {
  _el_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import14.ViewContainer) {
    super(View_LinearGaugeComponent1,renderType_LinearGaugeComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),':svg:line',new import3.InlineArray8(8,'x1','0','x2','0','y1','5','y2','15'),(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_1:any = this.parentView.context.transformLine;
    if (import3.checkBinding(throwOnChange,this._expr_1,currVal_1)) {
      this.renderer.setElementAttribute(this._el_0,'transform',((currVal_1 == null)? (null as any): currVal_1.toString()));
      this._expr_1 = currVal_1;
    }
    const currVal_2:any = this.parentView.context.colors.getColor(this.parentView.context.units);
    if (import3.checkBinding(throwOnChange,this._expr_2,currVal_2)) {
      this.renderer.setElementAttribute(this._el_0,'stroke',((currVal_2 == null)? (null as any): currVal_2.toString()));
      this._expr_2 = currVal_2;
    }
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_LinearGaugeComponent2 extends import2.AppView<any> {
  _el_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import14.ViewContainer) {
    super(View_LinearGaugeComponent2,renderType_LinearGaugeComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),':svg:line',new import3.InlineArray8(8,'x1','0','x2','0','y1','-5','y2','-15'),(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_1:any = this.parentView.context.transformLine;
    if (import3.checkBinding(throwOnChange,this._expr_1,currVal_1)) {
      this.renderer.setElementAttribute(this._el_0,'transform',((currVal_1 == null)? (null as any): currVal_1.toString()));
      this._expr_1 = currVal_1;
    }
    const currVal_2:any = this.parentView.context.colors.getColor(this.parentView.context.units);
    if (import3.checkBinding(throwOnChange,this._expr_2,currVal_2)) {
      this.renderer.setElementAttribute(this._el_0,'stroke',((currVal_2 == null)? (null as any): currVal_2.toString()));
      this._expr_2 = currVal_2;
    }
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
var renderType_LinearGaugeComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_LinearGaugeComponent,{});
export class View_LinearGaugeComponent0 extends import2.AppView<import0.LinearGaugeComponent> {
  _viewQuery_valueTextEl_0:import15.QueryList<any>;
  _viewQuery_unitsTextEl_1:import15.QueryList<any>;
  _text_0:any;
  _el_1:any;
  /*private*/ _vc_1:import14.ViewContainer;
  compView_1:import2.AppView<import16.ChartComponent>;
  _TooltipService_1_5:import17.TooltipService;
  _ChartComponent_1_6:import18.Wrapper_ChartComponent;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _el_5:any;
  compView_5:import2.AppView<import19.BarComponent>;
  _BarComponent_5_3:import20.Wrapper_BarComponent;
  _text_6:any;
  _text_7:any;
  _el_8:any;
  compView_8:import2.AppView<import19.BarComponent>;
  _BarComponent_8_3:import20.Wrapper_BarComponent;
  _text_9:any;
  _text_10:any;
  _anchor_11:any;
  /*private*/ _vc_11:import14.ViewContainer;
  _TemplateRef_11_5:any;
  _NgIf_11_6:import21.Wrapper_NgIf;
  _text_12:any;
  _anchor_13:any;
  /*private*/ _vc_13:import14.ViewContainer;
  _TemplateRef_13_5:any;
  _NgIf_13_6:import21.Wrapper_NgIf;
  _text_14:any;
  _el_15:any;
  _text_16:any;
  _el_17:any;
  _text_18:any;
  _el_19:any;
  _text_20:any;
  _text_21:any;
  _text_22:any;
  _el_23:any;
  _text_24:any;
  _el_25:any;
  _text_26:any;
  _text_27:any;
  _text_28:any;
  _text_29:any;
  _text_30:any;
  _text_31:any;
  _arr_48:any;
  /*private*/ _expr_49:any;
  /*private*/ _expr_50:any;
  /*private*/ _expr_51:any;
  /*private*/ _expr_52:any;
  /*private*/ _expr_53:any;
  /*private*/ _expr_54:any;
  /*private*/ _expr_55:any;
  /*private*/ _expr_56:any;
  /*private*/ _expr_57:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_LinearGaugeComponent0,renderType_LinearGaugeComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckOnce);
    this._arr_48 = import3.pureProxy2((p0:any,p1:any):any[] => {
      return [
        p0,
        p1
      ]
      ;
    });
    this._expr_49 = import1.UNINITIALIZED;
    this._expr_50 = import1.UNINITIALIZED;
    this._expr_51 = import1.UNINITIALIZED;
    this._expr_52 = import1.UNINITIALIZED;
    this._expr_53 = import1.UNINITIALIZED;
    this._expr_54 = import1.UNINITIALIZED;
    this._expr_55 = import1.UNINITIALIZED;
    this._expr_56 = import1.UNINITIALIZED;
    this._expr_57 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._viewQuery_valueTextEl_0 = new import15.QueryList<any>();
    this._viewQuery_unitsTextEl_1 = new import15.QueryList<any>();
    this._text_0 = this.renderer.createText(parentRenderNode,'\n    ',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'ngx-charts-chart',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._vc_1 = new import14.ViewContainer(1,(null as any),this,this._el_1);
    this.compView_1 = new import18.View_ChartComponent0(this.viewUtils,this,1,this._el_1);
    this._TooltipService_1_5 = new import17.TooltipService(this.parentView.injectorGet(import22.InjectionService,this.parentIndex));
    this._ChartComponent_1_6 = new import18.Wrapper_ChartComponent(this._vc_1.vcRef,this._TooltipService_1_5);
    this._text_2 = this.renderer.createText((null as any),'\n      ',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,(null as any),':svg:g',new import3.InlineArray2(2,'class','linear-gauge chart'),(null as any));
    this._text_4 = this.renderer.createText(this._el_3,'\n        ',(null as any));
    this._el_5 = import3.createRenderElement(this.renderer,this._el_3,':svg:g',new import3.InlineArray4(4,'class','background-bar','ngx-charts-bar',''),(null as any));
    this.compView_5 = new import20.View_BarComponent0(this.viewUtils,this,5,this._el_5);
    this._BarComponent_5_3 = new import20.Wrapper_BarComponent(new import9.ElementRef(this._el_5),this.parentView.injectorGet(import11.Location,this.parentIndex));
    this._text_6 = this.renderer.createText((null as any),'\n        ',(null as any));
    this.compView_5.create(this._BarComponent_5_3.context);
    this._text_7 = this.renderer.createText(this._el_3,'\n        ',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_3,':svg:g',new import3.InlineArray2(2,'ngx-charts-bar',''),(null as any));
    this.compView_8 = new import20.View_BarComponent0(this.viewUtils,this,8,this._el_8);
    this._BarComponent_8_3 = new import20.Wrapper_BarComponent(new import9.ElementRef(this._el_8),this.parentView.injectorGet(import11.Location,this.parentIndex));
    this._text_9 = this.renderer.createText((null as any),'\n        ',(null as any));
    this.compView_8.create(this._BarComponent_8_3.context);
    this._text_10 = this.renderer.createText(this._el_3,'\n\n        ',(null as any));
    this._anchor_11 = this.renderer.createTemplateAnchor(this._el_3,(null as any));
    this._vc_11 = new import14.ViewContainer(11,3,this,this._anchor_11);
    this._TemplateRef_11_5 = new import23.TemplateRef_(this,11,this._anchor_11);
    this._NgIf_11_6 = new import21.Wrapper_NgIf(this._vc_11.vcRef,this._TemplateRef_11_5);
    this._text_12 = this.renderer.createText(this._el_3,'\n\n        ',(null as any));
    this._anchor_13 = this.renderer.createTemplateAnchor(this._el_3,(null as any));
    this._vc_13 = new import14.ViewContainer(13,3,this,this._anchor_13);
    this._TemplateRef_13_5 = new import23.TemplateRef_(this,13,this._anchor_13);
    this._NgIf_13_6 = new import21.Wrapper_NgIf(this._vc_13.vcRef,this._TemplateRef_13_5);
    this._text_14 = this.renderer.createText(this._el_3,'\n        \n        ',(null as any));
    this._el_15 = import3.createRenderElement(this.renderer,this._el_3,':svg:g',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_16 = this.renderer.createText(this._el_15,'        \n          ',(null as any));
    this._el_17 = import3.createRenderElement(this.renderer,this._el_15,':svg:g',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_18 = this.renderer.createText(this._el_17,'\n            ',(null as any));
    this._el_19 = import3.createRenderElement(this.renderer,this._el_17,':svg:text',new import3.InlineArray4(4,'alignment-baseline','after-edge','class','value'),(null as any));
    this._text_20 = this.renderer.createText(this._el_19,'',(null as any));
    this._text_21 = this.renderer.createText(this._el_17,'        \n          ',(null as any));
    this._text_22 = this.renderer.createText(this._el_15,'\n          \n          ',(null as any));
    this._el_23 = import3.createRenderElement(this.renderer,this._el_15,':svg:g',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_24 = this.renderer.createText(this._el_23,'\n            ',(null as any));
    this._el_25 = import3.createRenderElement(this.renderer,this._el_23,':svg:text',new import3.InlineArray4(4,'alignment-baseline','before-edge','class','units'),(null as any));
    this._text_26 = this.renderer.createText(this._el_25,'',(null as any));
    this._text_27 = this.renderer.createText(this._el_23,'        \n          ',(null as any));
    this._text_28 = this.renderer.createText(this._el_15,'\n        ',(null as any));
    this._text_29 = this.renderer.createText(this._el_3,'\n      ',(null as any));
    this._text_30 = this.renderer.createText((null as any),'\n    ',(null as any));
    this.compView_1.create(this._ChartComponent_1_6.context);
    this._text_31 = this.renderer.createText(parentRenderNode,'\n  ',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_1,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_1));
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_5,new import3.InlineArray4(4,'mouseenter',(null as any),'mouseleave',(null as any)),this.eventHandler(this.handleEvent_5));
    var disposable_2:Function = import3.subscribeToRenderElement(this,this._el_8,new import3.InlineArray4(4,'mouseenter',(null as any),'mouseleave',(null as any)),this.eventHandler(this.handleEvent_8));
    this._viewQuery_valueTextEl_0.reset([new import9.ElementRef(this._el_19)]);
    this.context.valueTextEl = this._viewQuery_valueTextEl_0.first;
    this._viewQuery_unitsTextEl_1.reset([new import9.ElementRef(this._el_25)]);
    this.context.unitsTextEl = this._viewQuery_unitsTextEl_1.first;
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._text_7,
      this._el_8,
      this._text_9,
      this._text_10,
      this._anchor_11,
      this._text_12,
      this._anchor_13,
      this._text_14,
      this._el_15,
      this._text_16,
      this._el_17,
      this._text_18,
      this._el_19,
      this._text_20,
      this._text_21,
      this._text_22,
      this._el_23,
      this._text_24,
      this._el_25,
      this._text_26,
      this._text_27,
      this._text_28,
      this._text_29,
      this._text_30,
      this._text_31
    ]
    ),[
      disposable_0,
      disposable_1,
      disposable_2
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import19.BarComponent) && ((5 <= requestNodeIndex) && (requestNodeIndex <= 6)))) { return this._BarComponent_5_3.context; }
    if (((token === import19.BarComponent) && ((8 <= requestNodeIndex) && (requestNodeIndex <= 9)))) { return this._BarComponent_8_3.context; }
    if (((token === import23.TemplateRef) && (11 === requestNodeIndex))) { return this._TemplateRef_11_5; }
    if (((token === import24.NgIf) && (11 === requestNodeIndex))) { return this._NgIf_11_6.context; }
    if (((token === import23.TemplateRef) && (13 === requestNodeIndex))) { return this._TemplateRef_13_5; }
    if (((token === import24.NgIf) && (13 === requestNodeIndex))) { return this._NgIf_13_6.context; }
    if (((token === import17.TooltipService) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 30)))) { return this._TooltipService_1_5; }
    if (((token === import16.ChartComponent) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 30)))) { return this._ChartComponent_1_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_1_0_0:any = this._arr_48(this.context.width,this.context.height);
    this._ChartComponent_1_6.check_view(currVal_1_0_0,throwOnChange,false);
    const currVal_1_0_1:any = false;
    this._ChartComponent_1_6.check_showLegend(currVal_1_0_1,throwOnChange,false);
    if (this._ChartComponent_1_6.ngDoCheck(this,this._el_1,throwOnChange)) { this.compView_1.markAsCheckOnce(); }
    const currVal_5_0_0:any = import3.EMPTY_MAP;
    this._BarComponent_5_3.check_data(currVal_5_0_0,throwOnChange,false);
    const currVal_5_0_1:any = this.context.dims.width;
    this._BarComponent_5_3.check_width(currVal_5_0_1,throwOnChange,false);
    const currVal_5_0_2:any = 3;
    this._BarComponent_5_3.check_height(currVal_5_0_2,throwOnChange,false);
    const currVal_5_0_3:any = this.context.margin[3];
    this._BarComponent_5_3.check_x(currVal_5_0_3,throwOnChange,false);
    const currVal_5_0_4:any = (((this.context.dims.height / 2) + this.context.margin[0]) - 2);
    this._BarComponent_5_3.check_y(currVal_5_0_4,throwOnChange,false);
    const currVal_5_0_5:any = 'horizontal';
    this._BarComponent_5_3.check_orientation(currVal_5_0_5,throwOnChange,false);
    const currVal_5_0_6:any = true;
    this._BarComponent_5_3.check_roundEdges(currVal_5_0_6,throwOnChange,false);
    if (this._BarComponent_5_3.ngDoCheck(this,this._el_5,throwOnChange)) { this.compView_5.markAsCheckOnce(); }
    const currVal_8_0_0:any = this.context.colors.getColor(this.context.units);
    this._BarComponent_8_3.check_fill(currVal_8_0_0,throwOnChange,false);
    const currVal_8_0_1:any = import3.EMPTY_MAP;
    this._BarComponent_8_3.check_data(currVal_8_0_1,throwOnChange,false);
    const currVal_8_0_2:any = this.context.valueScale(this.context.value);
    this._BarComponent_8_3.check_width(currVal_8_0_2,throwOnChange,false);
    const currVal_8_0_3:any = 3;
    this._BarComponent_8_3.check_height(currVal_8_0_3,throwOnChange,false);
    const currVal_8_0_4:any = this.context.margin[3];
    this._BarComponent_8_3.check_x(currVal_8_0_4,throwOnChange,false);
    const currVal_8_0_5:any = (((this.context.dims.height / 2) + this.context.margin[0]) - 2);
    this._BarComponent_8_3.check_y(currVal_8_0_5,throwOnChange,false);
    const currVal_8_0_6:any = 'horizontal';
    this._BarComponent_8_3.check_orientation(currVal_8_0_6,throwOnChange,false);
    const currVal_8_0_7:any = true;
    this._BarComponent_8_3.check_roundEdges(currVal_8_0_7,throwOnChange,false);
    if (this._BarComponent_8_3.ngDoCheck(this,this._el_8,throwOnChange)) { this.compView_8.markAsCheckOnce(); }
    const currVal_11_0_0:any = this.context.hasPreviousValue;
    this._NgIf_11_6.check_ngIf(currVal_11_0_0,throwOnChange,false);
    this._NgIf_11_6.ngDoCheck(this,this._anchor_11,throwOnChange);
    const currVal_13_0_0:any = this.context.hasPreviousValue;
    this._NgIf_13_6.check_ngIf(currVal_13_0_0,throwOnChange,false);
    this._NgIf_13_6.ngDoCheck(this,this._anchor_13,throwOnChange);
    this._vc_1.detectChangesInNestedViews(throwOnChange);
    this._vc_11.detectChangesInNestedViews(throwOnChange);
    this._vc_13.detectChangesInNestedViews(throwOnChange);
    const currVal_49:any = this.context.transform;
    if (import3.checkBinding(throwOnChange,this._expr_49,currVal_49)) {
      this.renderer.setElementAttribute(this._el_15,'transform',((currVal_49 == null)? (null as any): currVal_49.toString()));
      this._expr_49 = currVal_49;
    }
    const currVal_50:any = this.context.valueTranslate;
    if (import3.checkBinding(throwOnChange,this._expr_50,currVal_50)) {
      this.renderer.setElementAttribute(this._el_17,'transform',((currVal_50 == null)? (null as any): currVal_50.toString()));
      this._expr_50 = currVal_50;
    }
    const currVal_51:any = 'middle';
    if (import3.checkBinding(throwOnChange,this._expr_51,currVal_51)) {
      this.renderer.setElementStyle(this._el_19,'textAnchor',((this.viewUtils.sanitizer.sanitize(import25.SecurityContext.STYLE,currVal_51) == null)? (null as any): this.viewUtils.sanitizer.sanitize(import25.SecurityContext.STYLE,currVal_51).toString()));
      this._expr_51 = currVal_51;
    }
    const currVal_52:any = this.context.valueTextTransform;
    if (import3.checkBinding(throwOnChange,this._expr_52,currVal_52)) {
      this.renderer.setElementAttribute(this._el_19,'transform',((currVal_52 == null)? (null as any): currVal_52.toString()));
      this._expr_52 = currVal_52;
    }
    const currVal_53:any = import3.inlineInterpolate(1,'\n              ',this.context.displayValue,'\n            ');
    if (import3.checkBinding(throwOnChange,this._expr_53,currVal_53)) {
      this.renderer.setText(this._text_20,currVal_53);
      this._expr_53 = currVal_53;
    }
    const currVal_54:any = this.context.unitsTranslate;
    if (import3.checkBinding(throwOnChange,this._expr_54,currVal_54)) {
      this.renderer.setElementAttribute(this._el_23,'transform',((currVal_54 == null)? (null as any): currVal_54.toString()));
      this._expr_54 = currVal_54;
    }
    const currVal_55:any = 'middle';
    if (import3.checkBinding(throwOnChange,this._expr_55,currVal_55)) {
      this.renderer.setElementStyle(this._el_25,'textAnchor',((this.viewUtils.sanitizer.sanitize(import25.SecurityContext.STYLE,currVal_55) == null)? (null as any): this.viewUtils.sanitizer.sanitize(import25.SecurityContext.STYLE,currVal_55).toString()));
      this._expr_55 = currVal_55;
    }
    const currVal_56:any = this.context.unitsTextTransform;
    if (import3.checkBinding(throwOnChange,this._expr_56,currVal_56)) {
      this.renderer.setElementAttribute(this._el_25,'transform',((currVal_56 == null)? (null as any): currVal_56.toString()));
      this._expr_56 = currVal_56;
    }
    const currVal_57:any = import3.inlineInterpolate(1,'\n              ',this.context.units,'\n            ');
    if (import3.checkBinding(throwOnChange,this._expr_57,currVal_57)) {
      this.renderer.setText(this._text_26,currVal_57);
      this._expr_57 = currVal_57;
    }
    this.compView_1.internalDetectChanges(throwOnChange);
    this.compView_5.internalDetectChanges(throwOnChange);
    this.compView_8.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this._vc_1.destroyNestedViews();
    this._vc_11.destroyNestedViews();
    this._vc_13.destroyNestedViews();
    this.compView_1.destroy();
    this.compView_5.destroy();
    this.compView_8.destroy();
    this._BarComponent_5_3.ngOnDestroy();
    this._BarComponent_8_3.ngOnDestroy();
    this._ChartComponent_1_6.ngOnDestroy();
  }
  visitProjectableNodesInternal(nodeIndex:number,ngContentIndex:number,cb:any,ctx:any):void {
    if (((nodeIndex == 1) && (ngContentIndex == 0))) {
      cb(this._text_2,ctx);
      cb(this._el_3,ctx);
      cb(this._text_30,ctx);
    }
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 11)) { return new View_LinearGaugeComponent1(this.viewUtils,this,11,this._anchor_11,this._vc_11); }
    if ((nodeIndex == 13)) { return new View_LinearGaugeComponent2(this.viewUtils,this,13,this._anchor_13,this._vc_13); }
    return (null as any);
  }
  handleEvent_1(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.onClick()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_5(eventName:string,$event:any):boolean {
    this.compView_5.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._BarComponent_5_3.handleEvent(eventName,$event) && result);
    return result;
  }
  handleEvent_8(eventName:string,$event:any):boolean {
    this.compView_8.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._BarComponent_8_3.handleEvent(eventName,$event) && result);
    return result;
  }
}