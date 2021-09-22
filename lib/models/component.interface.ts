import {OnInit} from "./on-init.interface";
import {AfterViewInit} from "./after-view-init.interface";
import {OnDestroy} from "./on-destroy.interface";

export interface ComponentInterface extends OnInit, AfterViewInit, OnDestroy {
    selector: string;
    template: string;
}
