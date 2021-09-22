"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.AppService = void 0;
var task_model_1 = require("./task.model");
var injectable_decorator_1 = require("../../lib/decorators/injectable.decorator");
var AppService = /** @class */ (function () {
    function AppService(tasks) {
        this.tasks = tasks || [];
    }
    AppService.prototype.getTasks = function (name) {
        if (name) {
            return this.tasks.filter(function (task) { return task.name.localeCompare(name); });
        }
        return __spreadArray([], this.tasks, true);
    };
    AppService.prototype.getTask = function (id) {
        return this.tasks.find(function (task) { return task.id === id; });
    };
    AppService.prototype.createTask = function (task) {
        var newTask = __assign(__assign({ id: Math.random() }, task), { status: task_model_1.TaskStatus.OPEN, createdAt: new Date() });
        this.tasks.push(newTask);
        return __assign({}, newTask);
    };
    AppService.prototype.updateTask = function (task, id) {
        var findById = id || task.id;
        var taskIndex = this.tasks.findIndex(function (t) { return t.id === findById; });
        if (taskIndex !== -1) {
            var existingTask = this.tasks.find(function (t) { return t.id === findById; });
            existingTask = __assign(__assign(__assign({}, existingTask), task), { updatedAt: new Date() });
            this.tasks.splice(taskIndex, 1, existingTask);
        }
        return undefined;
    };
    AppService = __decorate([
        (0, injectable_decorator_1.Injectable)()
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
