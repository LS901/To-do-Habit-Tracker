import React, {useContext, useEffect, useState} from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
import './styles.css';
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import CheckboxIcon from "../CheckboxIcon/CheckboxIcon.jsx";
import {DateContext} from "../../contexts/DateContext.jsx";
import {getHabits, getTasks, getAllHabits} from "../../helpers/helpers.jsx";
import {AnimatePresence, motion} from 'framer-motion'

const filterItems = (items, currentDate, listType) => {
    return !!items && (listType === 'habits' ? items : items.filter((item) => item.date === currentDate));
}
const Task = ({item, listType}) => {
    const updateOccurrence = () => {
        const taskList = listType === 'tasks' ? getTasks() : getHabits();
        taskList.map((x) => { if((x.date === item.date) && (x.name === item.name)){ x.timesCompleted += 1 } });

        if(listType === 'habits') {
            const updateAllList = getAllHabits();
            updateAllList.map((x) => { if((x.date === item.date) && (x.name === item.name)){ x.timesCompleted += 1 } });
            localStorage.setItem('allHabits', JSON.stringify(updateAllList))
        }

        localStorage.setItem(listType, JSON.stringify(taskList))
        window.dispatchEvent(new Event('storage'));
    }

    useEffect(() => {
        if(item['timesCompleted'] === Number(item['occurrence'])){
            const taskList = listType === 'tasks' ? getTasks() : getHabits();
            const newTaskList = taskList.filter((x) => (x.date !== item.date) || (x.name !== item.name) || (x.freq !== item.freq) || (x.occurrence !== item.occurrence));
            localStorage.setItem(listType, JSON.stringify(newTaskList))
                if(listType === 'habits') {
                    const allHabits = JSON.parse(localStorage.getItem('allHabits'));
                    const newHabits = allHabits.map((x) => {
                        if(item.name === x.name) {
                            return {...x, dateRemoved: new Date()}
                        } else {
                            return x
                        }
                    })
                    localStorage.setItem('allHabits', JSON.stringify(newHabits));
                }
            const completedList = JSON.parse(localStorage.getItem(`completed${listType}`))
            localStorage.setItem(`completed${listType}`, JSON.stringify(!!completedList ? [...completedList, item] : [item]));
            window.dispatchEvent(new Event('storage'));
        }
    },[item['timesCompleted']])

    const getProgress = () => {
       return Number((item['timesCompleted']/item['occurrence']) * 100)
    }

    return (
        <AnimatePresence>
            <motion.div className="Item rounded-lg"
                        key={item.name}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
            >
                <div className='ItemMain justify-between items-center'>
                    <div className='flex flex-col'>
                        <span className="flex-wrap">{item['name'] + (listType ==='habits' ? ' - ' + item['freq'] : '')}</span>
                        <span className='ProgressNumber'>{`${item['timesCompleted']}/${item['occurrence']}`}</span>
                    </div>
                    <ProgressBar className='' progressUpdate={getProgress()}/>
                    <CheckboxIcon checked onClick={updateOccurrence}/>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
const TaskList = ({listType, initialState = true, items, className}) => {
    const [open, setOpen] = React.useState(initialState);
    const currentDate = useContext(DateContext);
    const filteredItems = filterItems(items, currentDate, listType);
    return (
    listType !== 'Completed Tasks' ?  (
        <div className={className}>
            <Collapsible.Root className={`CollapsibleRoot overflow-auto`} open={open} onOpenChange={setOpen}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'auto'}}>

                </div>

                <div className="CollapsibleItem flex justify-between !bg-transparent ">
                    <span className="Text !text-[#ba9ffb] capitalize">{listType}</span>
                    <span className="Text !text-[#ba9ffb] ">Progress</span>
                    <Collapsible.Trigger asChild>
                        <button className="IconButton !text-black">{open ? <Cross2Icon /> : <RowSpacingIcon />}</button>
                    </Collapsible.Trigger>
                </div>

                <Collapsible.Content>
                    <ul className=''>
                        {!!filteredItems &&
                            filteredItems.map((item,index) => {
                                return(
                                    <motion.li key={index}
                                               transition={{ ease: "easeOut", duration: 2 }}
                                    >
                                        <Task item={item} listType={listType} />
                                    </motion.li>
                                )
                            })
                        }
                    </ul>
                </Collapsible.Content>
            </Collapsible.Root>
        </div>

    ) : (
        <div className={className}>
            <div className='overflow-auto capitalize border-l border-solid border-gray-700 mt-2 pt-2'>
                <motion.h1 className='text-center p-4 italic text-gray-500'>{listType} &#9989;</motion.h1>
                <ul className=''>
                    {!!filteredItems &&
                        filteredItems.map((item,index) => {
                            return(
                                <li key={index}>
                                    <motion.div className='text-center italic'
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}>{item.name}</motion.div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
      )
    );
};

export default TaskList;