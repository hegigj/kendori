import 'reflect-metadata';
import {Type} from "./types/class.type";
import {ModuleInterface} from "./models/module.interface";
import {ComponentInterface} from "./models/component.interface";
import {DependencyInjectionContainer} from "./models/dependency-injection.container";
import {mustache} from "./mustache";

export let DOM: Document;

export function bootstrap<T extends ModuleInterface>(module: Type<T>, dom?: Document) {
    const moduleInstance: T = new module();

    if (dom) {
        DOM = dom;
    }


    if (moduleInstance.bootstrap) {
        bootstrapComponents(moduleInstance.bootstrap, true);
    }

    if (moduleInstance.declarations) {
        moduleInstance.declarations.forEach(declaration => bootstrapComponents(declaration));
    }
}

export function bootstrapComponents<T extends Partial<ComponentInterface>>(component: Type<T>, bootstrapComponent: boolean = false) {
    const args: any[] = Reflect.getMetadata('design:paramtypes', component);
    const depArgs: any[] = args.map(dep => {
        if (DependencyInjectionContainer.hasDependency(dep)) {
            return DependencyInjectionContainer.getDependency(dep);
        }

        throw Error(`Error: ${dep.name} is not registered in providers`);
    })

    const componentInstance: T = new component(...depArgs);

    // OnInit
    if (componentInstance.kdOnInit) {
        componentInstance.kdOnInit();
    }

    // AfterViewInit
    if (DOM && componentInstance.template) {
        if (bootstrapComponent) {
            const rootEl = DOM.getElementById('root');
            mustache<T>(rootEl!, componentInstance);
        }

        if (componentInstance.kdAfterViewInit) {
            componentInstance.kdAfterViewInit();
        }
    }
}
