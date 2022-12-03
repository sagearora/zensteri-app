import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup"
import Button from '../../lib/Button'
import DateInput from '../../lib/form/DateInput'
import TextInput from '../../lib/form/TextInput'
import { TaskModel } from '../../models/task.model'

export type TaskFormProps = {
    task?: TaskModel;
    onSave: (v: {
        title: string;
        rrule?: string;
        start_at: string;
        end_at: string;
    }) => Promise<void>;
}

const schema = yup.object({
    title: yup.string().required('Please enter a task title'),
    rrule: yup.string().required('Please enter a recurrence rule'),
    start_at: yup.date().required('Please select a start date'),
    end_at: yup.date().required('Please select an end date'),
}).required();

type TaskFields = {
    title: string;
    rrule?: string;
    start_at: Date;
    end_at: Date;
}

function TaskForm({
    task,
    onSave,
}: TaskFormProps) {
    const { control, handleSubmit } = useForm<TaskFields>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: task?.title || '',
            rrule: task?.rrule || '',
            start_at: task ? new Date(`${task.start_at}T00:00:00`) : dayjs().startOf('day').toDate(),
            end_at: task ? new Date(`${task.end_at}T00:00:00`) : dayjs().startOf('day').add(1, 'month').toDate(),
        }
    })

    const onSubmit: SubmitHandler<TaskFields> = async (data) => {
        return onSave({
            title: data.title,
            rrule: data.rrule,
            start_at: data.start_at.toISOString(),
            end_at: data.end_at.toISOString(),
        })
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                label='Task title (e.g. Open Room 1)'
                control={control}
                name='title'
            />
            <TextInput 
                control={control}
                name='rrule'
                label='Recurrence Rule'
            />
            <DateInput
                label='Starts On'
                control={control}
                name='start_at'
            />
            <DateInput
                label='Ends On'
                control={control}
                name='end_at'
            />
            <Button type='submit'>Save Task</Button>
        </form>
    )
}

export default TaskForm