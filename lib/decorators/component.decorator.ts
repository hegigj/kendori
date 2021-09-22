import {ComponentInterface} from "../models/component.interface";

export function Component(config: Pick<ComponentInterface, 'selector' | 'template'>) {
    return (component: Function) => {
        component.prototype.selector = config.selector;
        component.prototype.template = config.template;
    };
}
