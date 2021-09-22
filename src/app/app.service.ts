import {TaskModel, TaskStatus} from "./task.model";
import {Injectable} from "../../lib/decorators/injectable.decorator";

@Injectable()
export class AppService {
    private readonly tasks: Array<TaskModel>;

    constructor(tasks?: TaskModel[]) {
        this.tasks = tasks || [];
    }

    getTasks(name?: string): TaskModel[] {
        if (name) {
            return this.tasks.filter(task => task.name.localeCompare(name));
        }

        return [...this.tasks];
    }

    getTask(id: number): TaskModel | undefined {
        return this.tasks.find(task => task.id === id);
    }

    createTask(task: Pick<TaskModel, 'name'>): TaskModel {
        const newTask: TaskModel = {
            id: Math.random(),
            ...task,
            status: TaskStatus.OPEN,
            createdAt: new Date()
        };

        this.tasks.push(newTask);

        return {...newTask};
    }

    updateTask(task: TaskModel, id?: number): TaskModel | undefined {
        const findById: number = id || task.id;
        const taskIndex: number = this.tasks.findIndex(t => t.id === findById);

        if (taskIndex !== -1) {
            let existingTask: TaskModel = this.tasks.find(t => t.id === findById) as TaskModel;
            existingTask = {
                ...existingTask,
                ...task,
                updatedAt: new Date()
            };

            this.tasks.splice(taskIndex, 1, existingTask)
        }

        return undefined;
    }
}
