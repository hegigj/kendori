import {AppService} from "./app.service";
import {OnInit} from "../../lib/models/on-init.interface";
import {TaskModel} from "./task.model";
import {Component} from "../../lib/decorators/component.decorator";
import {classes} from '../main';

@Component({
    selector: 'app-component',
    template: `
        <h1>Ckemi {{title}}</h1>
        <p>Add new task</p>
        <form onsubmit="classes[0].prototype.addTask(event)">
           <label for="taskName">Task</label>
           <input id="taskName" type="text">
           <button type="submit">Add</button> 
        </form>
    `
})
export class AppComponent implements OnInit {
    title: string;
    tasks: TaskModel[];

    constructor(private appService: AppService) {
        this.title = 'KENDORI'
        this.tasks = [];
    }

    kdOnInit() {
       this.getTasks();
    }

    getTasks(): void {
        this.tasks = this.appService.getTasks();
        console.log(this.tasks);
    }

    addTask(event: any): void {
        event.preventDefault();
        event.stopPropagation();

        console.log(event);
        this.appService.createTask({ name: 'New task' });
        this.getTasks();
    }
}
