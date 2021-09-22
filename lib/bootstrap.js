"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.bootstrapComponents = exports.bootstrap = exports.DOM = void 0;
require("reflect-metadata");
var dependency_injection_container_1 = require("./models/dependency-injection.container");
function bootstrap(module, dom) {
    var moduleInstance = new module();
    if (dom) {
        exports.DOM = dom;
    }
    if (moduleInstance.bootstrap) {
        bootstrapComponents(moduleInstance.bootstrap, true);
    }
    if (moduleInstance.declarations) {
        moduleInstance.declarations.forEach(function (declaration) { return bootstrapComponents(declaration); });
    }
}
exports.bootstrap = bootstrap;
function bootstrapComponents(component, bootstrapComponent) {
    if (bootstrapComponent === void 0) { bootstrapComponent = false; }
    var args = Reflect.getMetadata('design:paramtypes', component);
    var depArgs = args.map(function (dep) {
        if (dependency_injection_container_1.DependencyInjectionContainer.hasDependency(dep)) {
            return dependency_injection_container_1.DependencyInjectionContainer.getDependency(dep);
        }
        return dependency_injection_container_1.DependencyInjectionContainer.addDependency(dep);
    });
    var componentInstance = new (component.bind.apply(component, __spreadArray([void 0], depArgs, false)))();
    // OnInit
    if (componentInstance.kdOnInit) {
        componentInstance.kdOnInit();
    }
    // AfterViewInit
    if (exports.DOM && componentInstance.template) {
        if (bootstrapComponent) {
            var rootEl = exports.DOM.getElementById('root');
            rootEl.innerHTML = componentInstance.template;
        }
        if (componentInstance.kdAfterViewInit) {
            componentInstance.kdAfterViewInit();
        }
    }
}
exports.bootstrapComponents = bootstrapComponents;
