import { useSubscription } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageLimit } from "../../constants";
import BackButton from "../../lib/BackButton";
import Button from "../../lib/Button";
import { TaskModel } from "../../models/task.model";
import { QueryTaskList } from "../../queries";
import TaskCreateModal from "./TaskCreateModal";


function SteriListScreen() {
    const [create_task, setCreateTask] = useState(true);
    const navigate = useNavigate();
    const {
        loading,
        data,
    } = useSubscription(QueryTaskList({ sub: true }), {
        variables: {
            limit: PageLimit,
            cursor: 0,
        }
    })

    const onCreateTask = async (task: TaskModel) => {
        setCreateTask(false);
        navigate(`/tasks/${task.id}/edit`)
    }

    const tasks = (data?.task || []) as TaskModel[];

    return <div className='my-6 mx-auto container'>
        <TaskCreateModal
            onClose={() => setCreateTask(false)}
            onCreate={onCreateTask}
            show={create_task}
        />
        <div className='flex items-center mb-4'>
            <BackButton href='/settings' />
            <p className='ml-2 font-bold text-gray-500'>Tasks</p>
            <div className='flex-1' />
            <Button
                className='w-fit'
                onClick={() => setCreateTask(true)}
            >+ Add Task</Button>
        </div>
        {tasks.map(task => <Link
            className="flex items-center border-b-2 p-2 hover:bg-slate-200"
            to={`${task.id}/edit`}
            key={task.id}
        >
            <p className={`flex-1`}>{task.title}</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </Link>)}

    </div>
}

export default SteriListScreen;
