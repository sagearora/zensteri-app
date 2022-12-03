import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup"
import Button from '../../lib/Button';
import TextInput from '../../lib/form/TextInput';
import { TaskItemModel } from '../../models/task.model';

const schema = yup.object({
    content: yup.string().required('Please enter text for item'),
}).required();

export type TaskItemFormProps = {
    item?: TaskItemModel
}

function TaskItemForm({
    item,
}: TaskItemFormProps) {

    const { control, handleSubmit } = useForm<{
        content: string;
    }>({
        resolver: yupResolver(schema),
        defaultValues: {
            content: item?.content || '',
        }
    })

    const onSubmit: SubmitHandler<{ content: string }> = async (data) => {
        // return onSave({
        //     title: data.title,
        //     rrule: data.rrule,
        //     start_at: data.start_at.toISOString(),
        //     end_at: data.end_at.toISOString(),
        // })
    }

    return (
        <form noValidate
        className='bg-slate-100 rounded-lg p-4 border-2' onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                label='Enter checklist item'
                control={control}
                name='content'
            />
            <div className='flex justify-end'>
                <Button className='w-fit' type='submit'>Save Item</Button>
            </div>
        </form>
    )
}

export default TaskItemForm