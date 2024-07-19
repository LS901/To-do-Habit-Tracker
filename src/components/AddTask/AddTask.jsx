import React, {useContext, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './styles.css';
import "react-datepicker/dist/react-datepicker.css";
import CheckboxIcon from "../CheckboxIcon/CheckboxIcon.jsx";
import SelectComponent from "../Select/SelectComponent.jsx";
import {convertDate, getTasks, setupRecurringTaskArray} from "../../helpers/helpers.jsx";
import {DateContext} from "../../contexts/DateContext.jsx";
import { motion } from 'framer-motion';
const AddTask = ({buttonName='Add Task'}) => {
    const selectedDate = useContext(DateContext);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        if(!!selectedDate.length){
            const splitDate = selectedDate.split('-');
            const newDate = splitDate[1] + '-' + splitDate[0] + '-' + splitDate[2]
            setStartDate(new Date(newDate));
        }
    },[selectedDate])

    const [isRecurringOpen, setIsRecurringOpen] = useState(false);
    const [name, setName] = useState('');
    const [freq, setFreq] = useState();
    const [occur, setOccur] = useState(1);
    const [repeat, setRepeat] = useState(1);
    const showRecurringMenu = () => {
        setIsRecurringOpen(!isRecurringOpen);
    }

    const handleOccurChange = (event) => {
        setOccur(event.target.value);
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleFreqChange = (event) => {
        setFreq(event)
    }
    const handleRepeatChange = (event) => {
        setRepeat(event.target.value)
    }

    const taskValidation = (taskList, newTask) => {
        let result = { result: true, reason: undefined }
        !!taskList && taskList.map((x) =>{ if((x.date === newTask.date) && (x.name === newTask.name)) {
            result = { result: false, reason: 'Duplicate task.' }}})
        if (!newTask.name) {
            result = { result: false, reason: 'No task name provided.' }
        } else if (newTask.occurrence < 1) {
            result = { result: false, reason: 'Please enter a number from 1 upwards for the how many times field.' }
        }
        return result;
    }

    const saveChanges = () => {
        const formattedDate = convertDate(startDate);
        const formattedTaskInfo = {
            date: formattedDate,
            name,
            freq,
            occurrence: occur,
            timesCompleted: 0
        }
        const currentTaskList = getTasks();
        const isValidTask = taskValidation(currentTaskList,formattedTaskInfo)
        if(!!isValidTask.result) {
            const recurringTaskInfo = !!freq && setupRecurringTaskArray(formattedTaskInfo, startDate, repeat)
            let newTaskList;
            if (recurringTaskInfo) {
                newTaskList = !!currentTaskList ? [
                    ...currentTaskList,
                    formattedTaskInfo,
                    ...recurringTaskInfo
                ] : [formattedTaskInfo, ...recurringTaskInfo]
            } else {
                newTaskList = !!currentTaskList ? [
                    ...currentTaskList,
                    formattedTaskInfo,
                ] : [formattedTaskInfo]
            }
            localStorage.setItem('tasks', JSON.stringify(newTaskList))
            window.dispatchEvent(new Event('storage'));
            resetFields();
        } else {
            window.alert(isValidTask.reason);
        }
    }

    const resetFields = () => {
        setName('');
        setFreq(undefined);
        setStartDate(new Date());
        setIsRecurringOpen(false)
        setOccur(1);
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <motion.button className="!cursor-pointer TaskButton !text-[#ba9ffb] px-2 !bg-transparent m-4 hover:!bg-[#ba9ffb] hover:!text-black"
                               whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                >{buttonName}</motion.button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Add Task</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Add a new task here. If you want to repeat the task, click recurring
                    </Dialog.Description>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="Task">
                            Task
                        </label>
                        <input className="Input" id="task" type='text' value={name} onChange={handleNameChange}/>
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="Date">
                            Date
                        </label>
                      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="Task">
                            How many times?
                        </label>
                        <input className="Input" id="occurrence" type='text' value={occur} onChange={handleOccurChange}/>
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="RecurringTask">
                            Is this Recurring?
                        </label>
                        <input type='checkbox' className='inline-flex border-blue-400 border-solid rounded-lg h-[15px] w-[15px] hover:bg-blue-300' id='recurring' onChange={() => showRecurringMenu()} />
                    </fieldset>
                    {isRecurringOpen &&
                        <div className='recurring-wrapper border-2 p-4 pt-6'>
                            <fieldset className="Fieldset">
                                <label className="Label" htmlFor="Repeat Every">
                                    Repeat every...
                                </label>
                                <SelectComponent value={freq} change={handleFreqChange}/>
                            </fieldset>
                            <fieldset className="Fieldset">
                                <label className="Label" htmlFor="How many times?">
                                    How many times?
                                </label>
                                <input className="Input" id="repeat" type='text' value={repeat} onChange={handleRepeatChange}/>
                            </fieldset>
                        </div>
                    }
                    <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                        <Dialog.Close asChild>
                            <button className="Button green" onClick={() => saveChanges()}>Save changes</button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button className="AddTaskButton" aria-label="Close" onClick={resetFields}>
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default AddTask;