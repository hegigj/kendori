"use strict";
exports.__esModule = true;
exports.KdModule = void 0;
require("reflect-metadata");
var injectable_decorator_1 = require("./injectable.decorator");
function KdModule(config) {
    return function (module) {
        var bootstrap = config.bootstrap, declarations = config.declarations, providers = config.providers;
        var name = module.name;
        if (bootstrap) {
            module.prototype.bootstrap = bootstrap;
        }
        else {
            throw Error('Error: Module should contain one component in order to bootstrap');
        }
        if (declarations && declarations.length > 0) {
            module.prototype.declarations = declarations;
        }
        if (providers && providers.length > 0) {
            providers.forEach(function (provider) {
                if (Reflect.hasMetadata(injectable_decorator_1.INJECTABLE, provider) ||
                    Reflect.hasMetadata(injectable_decorator_1.GLOBAL_INJECTABLE, provider) ||
                    Reflect.hasMetadata(injectable_decorator_1.SPECIFIC_INJECTABLE, provider)) {
                    if (Reflect.hasMetadata(injectable_decorator_1.INJECTABLE, provider)) {
                        if (!Reflect.getMetadata(injectable_decorator_1.INJECTABLE, provider)) {
                            throw Error("Error: " + Reflect.getMetadata('design:type', provider) + " is not injected as a dependency");
                        }
                    }
                    else if (Reflect.hasMetadata(injectable_decorator_1.GLOBAL_INJECTABLE, provider)) {
                        if (!Reflect.getMetadata(injectable_decorator_1.GLOBAL_INJECTABLE, provider)) {
                            throw Error("Error: " + Reflect.getMetadata('design:type', provider) + " is not injected as a dependency in the root of this app");
                        }
                    }
                    else {
                        if (Reflect.getMetadata(injectable_decorator_1.SPECIFIC_INJECTABLE, provider) !== name) {
                            throw Error("Error: " + Reflect.getMetadata('design:type', provider) + " is injected as a dependency of " + Reflect.getMetadata(injectable_decorator_1.SPECIFIC_INJECTABLE, provider) + ", but is required also in " + name);
                        }
                    }
                }
                else {
                    throw Error("Error: " + Reflect.getMetadata('design:type', provider) + " is not injected as a dependency");
                }
            });
            module.prototype.providers = config.providers;
        }
    };
}
exports.KdModule = KdModule;
