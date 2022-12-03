export type TaskModel = {
    id: number;
    created_at: string;
    title: string;
    rrule?: string;
    start_at: string;
    end_at: string;
    items?: TaskItemModel[];
}

export type TaskItemModel = {
    id: number;
    created_at: string;
    content: string;
}

export const TaskFragment = `
    id
    created_at
    title
    rrule
    start_at
    items
`
