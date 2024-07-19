import React, {useEffect, useState} from 'react'
import ProgressBar from "./ProgressBar/ProgressBar.jsx";
import {getHabits, getTasks, getAllHabits} from "../helpers/helpers.jsx";
const calculateOverallProgress = (timesCompleted,totalExpected) => {
    return timesCompleted/totalExpected * 100;
}
const Habit = ({habit}) => {
    const [onTrack, setOnTrack] = useState(false);
    const { timesCompleted, occurrence, name } = habit;
    console.log(habit);
    useEffect(() => {
        setOnTrack(calculateOverallProgress(timesCompleted,occurrence) === 100)
    },[timesCompleted])
    return (
        <>
            <div className='flex justify-between px-2'>
                <div className={`w-[100%] ${onTrack && 'opacity-20'}`}>
                    <div className='flex justify-between'>
                        <h3 className='font-light py-1'>{name}</h3>
                        <p className={`flex items-center  ${onTrack ? 'visible' : 'hidden'}`}>On Track!</p>
                        <p className={`flex items-center  ${!onTrack ? 'visible' : 'hidden'}`}>Keep Going!</p>
                    </div>
                </div>
            </div>
        </>
    )
}
const HabitTracker = () => {
    const [habits, setHabits] = useState();

    useEffect(() => {
        const handleHabits = () => {
            const habits =  getAllHabits();
            if(habits) {
                setHabits(habits)
            }
        }
        handleHabits();
        window.addEventListener('storage', handleHabits)
        return () => window.removeEventListener('storage', handleHabits)
    },[])
    return (
        !!habits && habits.map((habit,index) => {
            return <Habit habit={habit} key={index}/>
        })
    )
}

export default HabitTracker;