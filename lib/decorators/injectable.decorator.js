"use strict";
exports.__esModule = true;
exports.Injectable = exports.INJECTABLE = exports.SPECIFIC_INJECTABLE = exports.GLOBAL_INJECTABLE = void 0;
require("reflect-metadata");
exports.GLOBAL_INJECTABLE = 'design:injectableInRoot';
exports.SPECIFIC_INJECTABLE = 'design:injectableIn';
exports.INJECTABLE = 'design:injectable';
function Injectable(config) {
    return function (singleton) {
        if (config) {
            switch (config.provideIn) {
                case "root":
                    Reflect.defineMetadata(exports.GLOBAL_INJECTABLE, true, singleton);
                    break;
                default:
                    Reflect.defineMetadata(exports.SPECIFIC_INJECTABLE, config.provideIn, singleton);
            }
        }
        else {
            Reflect.defineMetadata(exports.INJECTABLE, true, singleton);
        }
    };
}
exports.Injectable = Injectable;
