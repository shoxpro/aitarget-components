import { Injectable, ViewContainerRef, ApplicationRef, Compiler } from '@angular/core';

/**
 * @see https://github.com/valor-software/ng2-bootstrap/blob/development/components/utils/components-helper.service.ts
 * for more details
 */
@Injectable()
export class ComponentsHelperService {
  public root: ViewContainerRef;

  /**
   * In some cases, like using ngUpgrade,
   * you need to explicitly set view container ref
   * to made this method working you need to add:
   * ```typescript
   *  @Component({
     *   selector: 'my-app',
     *   ...
     *   })
   *  export class MyApp {
     *    constructor(componentsHelper:ComponentsHelper, viewContainerRef: ViewContainerRef) {
     *        // A Default view container ref, usually the app root container ref.
     *        // Has to be set manually until we can find a way to get it automatically.
     *        componentsHelper.setRootViewContainerRef(viewContainerRef)
     *      }
     *  }
   * ```
   */
  public setRootViewContainerRef (value: ViewContainerRef): void {
    this.root = value;
  }

  /**
   * This is a name conventional class to get application root view component ref
   * @returns {ViewContainerRef} - application root view component ref
   */
  public getRootViewContainerRef (): ViewContainerRef {
    // https://github.com/angular/angular/issues/9293
    if (this.root) {
      return this.root;
    }

    const comps = this.applicationRef.components;

    if (!comps.length) {
      throw new Error(`ApplicationRef instance not found`);
    }

    try {
      /* one more ugly hack, read issue above for details */
      const rootComponent = (this.applicationRef as any )._rootComponents[0];
      this.root           = rootComponent._hostElement.vcRef;
      return this.root;
    } catch (e) {
      throw new Error(`ApplicationRef instance not found`);
    }
  }

  public getComponentRef (module, component, inputs = {}) {
    if (!module || !component) {
      return;
    }

    let containerRef = this.getRootViewContainerRef();

    const mod     = this.compiler.compileModuleAndAllComponentsSync(module);
    const factory = mod.componentFactories.find((comp) =>
      comp.componentType === component
    );

    let componentRef = containerRef.createComponent(factory);

    // Set input properties
    for (let property in inputs) {
      if (inputs.hasOwnProperty(property)) {
        componentRef.instance[property] = inputs[property];
      }
    }

    // Detect all changes and update templates
    componentRef.changeDetectorRef.markForCheck();
    componentRef.changeDetectorRef.detectChanges();

    // Remove element from DOM
    componentRef.location.nativeElement.remove();

    return componentRef;
  }

  constructor (private applicationRef: ApplicationRef,
               private compiler: Compiler) {}
}
