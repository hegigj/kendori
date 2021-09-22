import {ComponentInterface} from "./models/component.interface";

export function bindEvent<T extends Partial<ComponentInterface>>(classInstance: T, template: string): string {
    // @ts-ignore
    return template.replace(/\(\w+\)="\w+"/, `$1="${classInstance['prototype']}.$2"`)
}
