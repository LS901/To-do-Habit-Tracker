import React, {useContext, useState} from "react";
import DatePicker from "react-datepicker";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './styles.css';
import "react-datepicker/dist/react-datepicker.css";
import SelectComponent from "../Select/SelectComponent.jsx";
import {convertDate, getHabits, getAllHabits} from "../../helpers/helpers.jsx";
import {DateContext} from "../../contexts/DateContext.jsx";
import { motion } from 'framer-motion';
const AddHabit = ({buttonName='Add Habit'}) => {
    const selectedDate = useContext(DateContext);
    const [startDate, setStartDate] = useState(selectedDate);
    const [name, setName] = useState('');
    const [freq, setFreq] = useState('daily');
    const [occur, setOccur] = useState(1);
    const handleOccurChange = (event) => {
        setOccur(event.target.value);
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleFreqChange = (event) => {
        setFreq(event)
    }
    const habitValidation = (habitList, newHabit) => {
        let result = { result: true, reason: undefined }
        !!habitList && habitList.map((x) =>{ if((x.date === newHabit.date) && (x.name === newHabit.name)) {
            result = { result: false, reason: 'Duplicate habit.' }}})
        if (!newHabit.name) {
            result = { result: false, reason: 'No habit name provided.' }
        } else if (newHabit.occurrence < 1) {
            result = { result: false, reason: 'Please enter a number from 1 upwards for the how many times field.' }
        } else if (!newHabit.freq) {
            result = { result: false, reason: 'Please enter if this habit is either Daily or Weekly.' }
        }
        return result;
    }

    const saveChanges = () => {
        const formattedDate = convertDate(startDate);
        const formattedHabitInfo = {
            date: formattedDate,
            name,
            freq,
            occurrence: occur,
            timesCompleted: 0,
            dateCreated: new Date(),
            totalExpected: occur
        }
        const currentHabitList = getHabits();
        const allHabitList = getAllHabits();
        const isValidHabit = habitValidation(currentHabitList,formattedHabitInfo)
        if(!!isValidHabit.result) {
            const newHabitList = !!currentHabitList ? [
                ...currentHabitList,
                formattedHabitInfo,
            ] : [formattedHabitInfo]
            localStorage.setItem('habits', JSON.stringify(newHabitList))
            localStorage.setItem('allHabits', JSON.stringify(!!allHabitList ? [...allHabitList, formattedHabitInfo] : [formattedHabitInfo]))
            window.dispatchEvent(new Event('storage'));
            resetFields();
        } else {
            window.alert(isValidHabit.reason);
        }
    }

    const resetFields = () => {
        setName('');
        setFreq(undefined);
        setStartDate(new Date());
        setOccur(1);
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <motion.button className="!cursor-pointer TaskButton !text-[#ba9ffb] px-2 !bg-transparent m-4 hover:!bg-[#ba9ffb] hover:!text-black"
                               whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    {buttonName}</motion.button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Add Habit</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Add a new habit here. Habits are not fixed to a specific date. Just pick a start date and the frequency and you're good to go!
                    </Dialog.Description>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="Habit">
                            Habit
                        </label>
                        <input className="Input" id="habit" type='text' value={name} onChange={handleNameChange}/>
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="Date">
                            Start From
                        </label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="Task">
                            Daily or Weekly?
                        </label>
                        <SelectComponent value={freq} change={handleFreqChange} type="habit"/>
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="Occurrence">
                            How many times per day/week?
                        </label>
                        <input className="Input" id="occurrence" type='text' value={occur} onChange={handleOccurChange}/>
                    </fieldset>
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

export default AddHabit;