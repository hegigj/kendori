"use strict";
exports.__esModule = true;
exports.DependencyInjectionContainer = void 0;
require("reflect-metadata");
var DependencyInjectionContainer = /** @class */ (function () {
    function DependencyInjectionContainer() {
    }
    DependencyInjectionContainer.addDependency = function (instance) {
        var newInstance = new instance();
        this.instancesOfDependencies.push(newInstance);
        return newInstance;
    };
    DependencyInjectionContainer.hasDependency = function (instance) {
        return this.instancesOfDependencies
            .some(function (dependency) {
            return Reflect.getMetadata('design:type', dependency) === Reflect.getMetadata('design:type', instance);
        });
    };
    DependencyInjectionContainer.getDependency = function (instance) {
        return this.instancesOfDependencies
            .find(function (dependency) {
            return Reflect.getMetadata('design:type', dependency) === Reflect.getMetadata('design:type', instance);
        });
    };
    DependencyInjectionContainer.instancesOfDependencies = [];
    return DependencyInjectionContainer;
}());
exports.DependencyInjectionContainer = DependencyInjectionContainer;
