import {ComponentInterface} from "./models/component.interface";
import {bindEvent} from "./bind-event";

export let mustacheIntervalRef: any;
export const mustacheIntervalDuration = 100;

export function mustache<T extends Partial<ComponentInterface>>(element: HTMLElement, classInstance: T) {
    const propertyNames: string[] = Object.getOwnPropertyNames(classInstance);
    // @ts-ignore
    let oldProps: Record<string, any> = propertyNames.reduce((acc, curr) => ({...acc, [curr]: classInstance[curr]}), {});
    let template = classInstance.template!;

    propertyNames.forEach(propName => {
        // @ts-ignore
        oldProps = { ...oldProps, [propName]: classInstance[propName] };
        const replaceRegexp: RegExp = new RegExp(`{{${propName}}}`);
        // @ts-ignore
        template = bindEvent<T>(classInstance, template?.replace(replaceRegexp, classInstance[propName]));
    });

    element.innerHTML = template;

    mustacheIntervalRef = setInterval(() => {
        let changeDetected = false;
        template = classInstance.template!;
        propertyNames.forEach(propName => {
            // @ts-ignore
            if (classInstance[propName] !== oldProps[propName]) {
                // @ts-ignore
                oldProps = { ...oldProps, [propName]: classInstance[propName] };
                const replaceRegexp: RegExp = new RegExp(`{{${propName}}}`);
                // @ts-ignore
                template = bindEvent<T>(classInstance, template?.replace(replaceRegexp, classInstance[propName]));
                changeDetected = true;
            }
        });

        if (changeDetected) {
            changeDetected = false;
            element.innerHTML = template;
        }
    }, mustacheIntervalDuration);
}
