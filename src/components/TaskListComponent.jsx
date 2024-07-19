import React, {useEffect, useState} from 'react';
import TaskList from "./TaskList/TaskList.jsx";
import AddTask from "./AddTask/AddTask.jsx";
import {getHabits, getTasks, getAllHabits} from "../helpers/helpers.jsx";
import AddHabit from "./AddTask/AddHabit.jsx";
const TaskListComponent = ({date}) => {
    const [habits, setHabits] = useState();
    const [tasks, setTasks] = useState(getTasks());
    const [completedTasks, setCompletedTasks] = useState(getTasks('completedtasks'))

    useEffect(() => {
        let habitList = [];
        let allHabitList = [];
        const date = new Date();
        const currentAllHabitList = getAllHabits();
        !!currentAllHabitList && getAllHabits().map((x) => {
            const dateCreated = new Date(x.dateCreated);
            if(date.getDay() !== dateCreated.getDay()) {
                if(x.freq === 'Daily') {
                    habitList.push({date, freq: 'Daily', name: x.name, occurrence: x.occurrence, timesCompleted: 0 })
                    allHabitList.push({...x, date, dateCreated: date, timesCompleted: 0, dateRemoved: undefined })
                } else if (dateCreated.setDate(dateCreated.getDate() + 7) <= date.setDate(date.getDate())) {
                    habitList.push({date, freq: 'Weekly', name: x.name, occurrence: x.occurrence, timesCompleted: 0 })
                    allHabitList.push({...x, date, dateCreated: date, timesCompleted: 0, dateRemoved: undefined })
                } else {
                    habitList.push(x);
                    allHabitList.push(x);
                }
            } else {
                allHabitList.push(x);
                if(!x.dateRemoved) {
                    habitList.push(x)
                }
            }
        })
        localStorage.setItem('habits', JSON.stringify(habitList));
        localStorage.setItem('allHabits', JSON.stringify(allHabitList));
        setHabits(JSON.parse(localStorage.getItem('habits')))
    },[])

    useEffect(() => {
        const handleStorage = () => {
            const tasks =  getTasks();
            const habits =  getHabits();
            const completedTasks = getTasks('completedtasks');

            if (tasks) {
                setTasks(tasks);
            }
            if (habits) {
                setHabits(habits);
            }
            if(completedTasks) {
                setCompletedTasks(completedTasks)
            }x
        }
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    },[])

    return (
        <div className='flex flex-col h-[100%]'>
            <div className='navbar-wrapper h-[4%] flex justify-between items-center pl-4 rounded-lg'>
                <h2 className='italic'>Daily Tasks: <strong>{`${date}`}</strong></h2>
                <div>
                    <AddTask />
                    <AddHabit />
                </div>
            </div>
            <div className='default-list h-1/2 grid grid-cols-5'>
                <TaskList className='grid col-span-4' listType='tasks' items={tasks}/>
                <TaskList className='grid col-span-1' listType='Completed Tasks' items={completedTasks} />
            </div>
            <div className='habit-list h-1/2 grid grid-cols-4'>
                <TaskList className='grid col-span-4' listType='habits' items={habits}/>
            </div>
        </div>
    )
}

export default TaskListComponent;