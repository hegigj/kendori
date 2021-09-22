import 'reflect-metadata';
import {ModuleInterface} from "../models/module.interface";
import {GLOBAL_INJECTABLE, INJECTABLE, SPECIFIC_INJECTABLE} from "./injectable.decorator";

export function KdModule(config: ModuleInterface) {
    return (module: Function) => {
        const {
            bootstrap,
            declarations,
            providers
        } = config;

        const name: string = module.name;

        if (bootstrap) {
            module.prototype.bootstrap = bootstrap;
        } else {
            throw Error('Error: Module should contain one component in order to bootstrap');
        }

        if (declarations && declarations.length > 0) {
            module.prototype.declarations = declarations;
        }

        if (providers && providers.length > 0) {
            providers.forEach(provider => {
              if (
                  Reflect.hasMetadata(INJECTABLE, provider) ||
                  Reflect.hasMetadata(GLOBAL_INJECTABLE, provider) ||
                  Reflect.hasMetadata(SPECIFIC_INJECTABLE, provider)
              ) {
                  if (Reflect.hasMetadata(INJECTABLE, provider)) {
                      if (!Reflect.getMetadata(INJECTABLE, provider)) {
                          throw Error(`Error: ${Reflect.getMetadata('design:type', provider)} is not injected as a dependency`);
                      }
                  } else if (Reflect.hasMetadata(GLOBAL_INJECTABLE, provider)) {
                      if (!Reflect.getMetadata(GLOBAL_INJECTABLE, provider)) {
                          throw Error(`Error: ${Reflect.getMetadata('design:type', provider)} is not injected as a dependency in the root of this app`);
                      }
                  } else {
                      if (Reflect.getMetadata(SPECIFIC_INJECTABLE, provider) !== name) {
                          throw Error(`Error: ${Reflect.getMetadata('design:type', provider)} is injected as a dependency of ${Reflect.getMetadata(SPECIFIC_INJECTABLE, provider)}, but is required also in ${name}`);
                      }
                  }
              } else {
                  throw Error(`Error: ${Reflect.getMetadata('design:type', provider)} is not injected as a dependency`);
              }
            });

            module.prototype.providers = config.providers;
        }
    };
}
