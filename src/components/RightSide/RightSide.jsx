import React, {useEffect, useState} from 'react';
import HabitTracker from "../HabitTracker.jsx";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles.css';
import {convertDate, getTasks} from "../../helpers/helpers.jsx";
import {motion} from "framer-motion";


const getDates = () => {
    return !!getTasks() && getTasks().map((item) => item.date)
}
const clearCompletedTasks = () => {
    localStorage.setItem('completedtasks', JSON.stringify([]));
    window.dispatchEvent(new Event('storage'));
}
const RightSide = ({onCalendarChange}) => {
    const [value, onChange] = useState(new Date());
    const [dates, setDates] = useState(getDates());
    useEffect(() => {
        const formattedDate = convertDate(value);
        onCalendarChange(formattedDate);
    }, [value])

    useEffect(() => {
        const handleDates = () => {
            const tasks =  getTasks();
            if(tasks) {
                setDates(getDates())
            }
        }
        window.addEventListener('storage', handleDates)
        return () => window.removeEventListener('storage', handleDates)
    },[])
    return (
        <>
            <div className='navbar-wrapper h-[4%] rounded-lg mb-2 flex justify-between items-center p-2 pr-0'>
                <h2 className='font-bold'>Habit Tracker</h2>
            </div>
            <div className='HabitTracker-section h-1/2 overflow-y-auto border-b-2 mb-2 '>
                <HabitTracker />
            </div>
            <div className='calendar-section h-[46%] items-center flex-col justify-center flex !text-black rounded-lg'>
                <Calendar
                    onChange={onChange}
                    tileClassName={({ date }) => {
                        if(!!dates){
                        if(dates.find(x=>x===convertDate(date))){
                            return 'highlight'
                        }}
                    }}
                    value={value}/>
                <motion.button className="hover:!bg-gray-900 rounded-lg !mx-4 p-2 m-2 !text-[#ba9ffb] font-medium"
                               whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => clearCompletedTasks()}
                >Clear Completed Tasks</motion.button>
            </div>
        </>
    )
}

export default RightSide