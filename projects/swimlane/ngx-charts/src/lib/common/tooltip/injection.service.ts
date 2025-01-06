import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  ViewContainerRef,
  EmbeddedViewRef,
  Type
} from '@angular/core';
import { DomPortalOutlet, ComponentPortal } from '@angular/cdk/portal';

function isViewContainerRef(x: any): x is ViewContainerRef {
  return x.element;
}

/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 */
@Injectable({
  providedIn: 'root'
})
export class InjectionService {
  static globalRootViewContainer: ViewContainerRef = null;

  /**
   * Sets a default global root view container. This is useful for
   * things like ngUpgrade that doesn't have a ApplicationRef root.
   *
   * @param container
   */
  static setGlobalRootViewContainer(container: ViewContainerRef): void {
    InjectionService.globalRootViewContainer = container;
  }

  private _container: ViewContainerRef;

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  /**
   * Gets the root view container to inject the component to.
   *
   * @memberOf InjectionService
   */
  getRootViewContainer(): ViewContainerRef | ComponentRef<any> {
    if (this._container) return this._container;
    if (InjectionService.globalRootViewContainer) return InjectionService.globalRootViewContainer;

    if (this.applicationRef.components.length) return this.applicationRef.components[0];

    throw new Error(
      'View Container not found! ngUpgrade needs to manually set this via setRootViewContainer or setGlobalRootViewContainer.'
    );
  }

  /**
   * Overrides the default root view container. This is useful for
   * things like ngUpgrade that doesn't have a ApplicationRef root.
   *
   * @param container
   *
   * @memberOf InjectionService
   */
  setRootViewContainer(container: ViewContainerRef): void {
    this._container = container;
  }

  /**
   * Gets the html element for a component ref.
   *
   * @param componentRef
   *
   * @memberOf InjectionService
   */
  getComponentRootNode(component: ViewContainerRef | ComponentRef<any>): HTMLElement {
    if (isViewContainerRef(component)) {
      return component.element.nativeElement;
    }
    if (component.hostView && (component.hostView as EmbeddedViewRef<any>).rootNodes.length > 0) {
      return (component.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    // the top most component root node has no `hostView`
    return component.location.nativeElement;
  }

  /**
   * Gets the root component container html element.
   *
   * @memberOf InjectionService
   */
  getRootViewContainerNode(component: ViewContainerRef | ComponentRef<any>): HTMLElement {
    return this.getComponentRootNode(component);
  }

  /**
   * Projects the bindings onto the component
   *
   * @param component
   * @param options
   *
   * @memberOf InjectionService
   */
  projectComponentBindings(component: ComponentRef<any>, bindings: any): ComponentRef<any> {
    if (bindings) {
      if (bindings.inputs !== undefined) {
        const bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
        for (const bindingName of bindingKeys) {
          component.instance[bindingName] = bindings.inputs[bindingName];
        }
      }

      if (bindings.outputs !== undefined) {
        const eventKeys = Object.getOwnPropertyNames(bindings.outputs);
        for (const eventName of eventKeys) {
          component.instance[eventName] = bindings.outputs[eventName];
        }
      }
    }

    return component;
  }

  /**
   * Appends a component to a adjacent location
   *
   * @param componentClass
   * @param [options={}]
   * @param [location]
   *
   * @memberOf InjectionService
   */
  appendComponent<T>(componentClass: Type<T>, bindings: any = {}, location?: any): ComponentRef<any> {
    if (!location) location = this.getRootViewContainer();
    const appendLocation = this.getComponentRootNode(location);

    const portalHost = new DomPortalOutlet(
      appendLocation,
      this.componentFactoryResolver,
      this.applicationRef,
      this.injector
    );

    const portal = new ComponentPortal(componentClass);

    const componentRef = portalHost.attach(portal);
    this.projectComponentBindings(componentRef, bindings);
    return componentRef;
  }
}
