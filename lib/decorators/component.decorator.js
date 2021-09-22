"use strict";
exports.__esModule = true;
exports.Component = void 0;
function Component(config) {
    return function (component) {
        component.prototype.selector = config.selector;
        component.prototype.template = config.template;
    };
}
exports.Component = Component;
