import {Type} from "../types/class.type";
import {ComponentInterface} from "./component.interface";

export interface ModuleInterface {
    bootstrap: Type<ComponentInterface>;
    providers: Type<any>[];
    declarations: Type<ComponentInterface>[]
}
