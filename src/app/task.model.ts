export interface TaskModel {
    id: number;
    name: string;
    status: TaskStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum TaskStatus {
    OPEN = 0,
    IN_PROGRESS = 1,
    CLOSED = 2
}
