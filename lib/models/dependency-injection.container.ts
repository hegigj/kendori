import 'reflect-metadata';
import {Type} from "../types/class.type";

export class DependencyInjectionContainer {
    private static instancesOfDependencies: Type<any>[] = [];

    public static addDependency(instance: Type<any>): Type<any> {
        const newInstance = new instance();
        this.instancesOfDependencies.push(newInstance);
        return newInstance;
    }

    public static hasDependency(instance: Type<any>): boolean {
        return this.instancesOfDependencies
            .some(
                dependency =>
                    Reflect.getMetadata('design:type', dependency) === Reflect.getMetadata('design:type', instance)
            );
    }

    public static getDependency(instance: Type<any>): Type<any> | undefined {
        return this.instancesOfDependencies
            .find(
                dependency =>
                    Reflect.getMetadata('design:type', dependency) === Reflect.getMetadata('design:type', instance)
            );
    }
}
