import React from 'react'
import { classNames } from '../../lib/form/classNames'

const TaskList = [{
    id: 1,
    repeat_interval: 'd',
    repeat_on_day: 0,
    group: 'Open Clinic',
    task: 'X-Ray Log (Suite 1)',
    checked: true,
}, {
    id: 2,
    repeat_interval: 'd',
    repeat_on_day: 0,
    group: 'Open Clinic',
    task: 'X-Ray Log (Suite 2)'
}, {
    id: 2,
    repeat_interval: 'd',
    repeat_on_day: 0,
    group: 'Open Clinic',
    task: 'Load garbage bags in all rooms'
}, {
    id: 2,
    repeat_interval: 'w',
    repeat_on_day: 3,
    group: 'Open Clinic',
    task: 'Take garbage out to Curb'
}, {
    id: 3,
    repeat_interval: 'd',
    repeat_on_day: 0,
    task: 'Run all cavi lines. Unplug Cavi pedals'
}, {
    id: 4,
    repeat_interval: 'd',
    repeat_on_day: 0,
    task: 'Turn on all TVs at front'
}, {
    id: 2,
    repeat_interval: 'd',
    repeat_on_day: 0,
    group: 'Open Clinic',
    task: 'Turn on all under cabinet lights'
}, {
    id: 4,
    repeat_interval: 'd',
    repeat_on_day: 0,
    task: 'End of Day: Run Suction Lines'
}, {
    id: 5,
    repeat_interval: 'w',
    repeat_on_day: 2,
    task: 'Clean steri gasket'
}]

function TasksWidget() {
    return (
        <div className='border-b-2 py-6'>
            <p className='text-lg font-bold mb-2'>Today's Tasks</p>
            {TaskList.map(task => <div
                key={task.id} className='flex items-center py-2'>
                <span className='font-bold mr-2'>
                    {task.checked ? <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                            <g fill="#212121" fillRule="nonzero">
                                <path d="M18.25 3A2.75 2.75 0 0121 5.75v12.5A2.75 2.75 0 0118.25 21H5.75A2.75 2.75 0 013 18.25V5.75A2.75 2.75 0 015.75 3h12.5zm0 1.5H5.75c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25zM10 14.44l6.47-6.47a.75.75 0 011.133.976l-.073.084-7 7a.75.75 0 01-.976.073l-.084-.073-3-3a.75.75 0 01.976-1.133l.084.073L10 14.44l6.47-6.47L10 14.44z"></path>
                            </g>
                        </g>
                    </svg> :
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                            <g fill="#212121" fillRule="nonzero">
                                <path d="M5.75 3h12.5A2.75 2.75 0 0121 5.75v12.5A2.75 2.75 0 0118.25 21H5.75A2.75 2.75 0 013 18.25V5.75A2.75 2.75 0 015.75 3zm0 1.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25H5.75z"></path>
                            </g>
                        </g>
                    </svg>}
                </span>

                <p className={classNames(task.checked && 'line-through', 'text-lg')}>{task.task}</p>


            </div>)}

        </div>
    )
}

export default TasksWidget