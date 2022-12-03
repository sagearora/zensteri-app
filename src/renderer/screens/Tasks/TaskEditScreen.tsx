import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../../lib/BackButton';
import Button from '../../lib/Button';
import Loading from '../../lib/Loading';
import NotFoundItem from '../../lib/NotFoundItem';
import { TaskFragment, TaskModel } from '../../models/task.model';
import * as yup from "yup"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TaskItemForm from './TaskItemForm';

const QueryTask = gql`
  query task($id: bigint!) {
    task_by_pk(id: $id) {
      ${TaskFragment}
    }
  }
`;


function TaskEditScreen() {
  const task_id = +useParams().task_id
  const { data, loading } = useQuery(QueryTask, {
    variables: {
      id: task_id,
    }
  })

  if (loading) {
    return <Loading />
  }

  const task = data?.task_by_pk as TaskModel;

  if (!task) {
    return <NotFoundItem title='Task not found' />
  }

  return (
    <div className='my-6 mx-auto container'>
      <div className='flex items-center mb-4'>
        <BackButton href='/settings' />
        <p className='ml-2 font-bold text-gray-500'>{task.title}</p>
        <div className='flex-1' />
      </div>
      <div className=''>
        <TaskItemForm />
      </div>
    </div>
  )
}

export default TaskEditScreen