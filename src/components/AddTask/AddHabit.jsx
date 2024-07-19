import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './styles.css';
import "react-datepicker/dist/react-datepicker.css";
import SelectComponent from "../Select/SelectComponent.jsx";
import { convertDate, getHabits, getAllHabits } from "../../helpers/helpers.jsx";
import { DateContext } from "../../contexts/DateContext.jsx";
import { motion } from 'framer-motion';

const AddHabit = ({ buttonName = 'Add Habit' }) => {
    const selectedDate = useContext(DateContext);
    const [startDate, setStartDate] = useState(selectedDate);
    const [name, setName] = useState('');
    const [freq, setFreq] = useState('daily');
    const [occur, setOccur] = useState(1);

    const handleChange = (setter) => (event) => setter(event.target.value);

    const habitValidation = (habitList, newHabit) => {
        if (!newHabit.name) {
            return { result: false, reason: 'No habit name provided.' };
        }
        if (newHabit.occurrence < 1) {
            return { result: false, reason: 'Please enter a number from 1 upwards for the how many times field.' };
        }
        if (!newHabit.freq) {
            return { result: false, reason: 'Please enter if this habit is either Daily or Weekly.' };
        }
        const isDuplicate = habitList?.some(habit => habit.date === newHabit.date && habit.name === newHabit.name);
        if (isDuplicate) {
            return { result: false, reason: 'Duplicate habit.' };
        }
        return { result: true, reason: undefined };
    };

    const saveChanges = () => {
        const formattedDate = convertDate(startDate);
        const newHabit = {
            date: formattedDate,
            name,
            freq,
            occurrence: occur,
            timesCompleted: 0,
            dateCreated: new Date(),
            totalExpected: occur
        };
        const currentHabits = getHabits();
        const allHabits = getAllHabits();
        const validation = habitValidation(currentHabits, newHabit);

        if (validation.result) {
            const updatedCurrentHabits = currentHabits ? [...currentHabits, newHabit] : [newHabit];
            const updatedAllHabits = allHabits ? [...allHabits, newHabit] : [newHabit];
            localStorage.setItem('habits', JSON.stringify(updatedCurrentHabits));
            localStorage.setItem('allHabits', JSON.stringify(updatedAllHabits));
            window.dispatchEvent(new Event('storage'));
            resetFields();
        } else {
            window.alert(validation.reason);
        }
    };

    const resetFields = () => {
        setName('');
        setFreq('daily');
        setStartDate(new Date());
        setOccur(1);
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <motion.button className="!cursor-pointer TaskButton !text-[#ba9ffb] px-2 !bg-transparent m-4 hover:!bg-[#ba9ffb] hover:!text-black"
                               whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    {buttonName}
                </motion.button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Add Habit</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Add a new habit here. Habits are not fixed to a specific date. Just pick a start date and the frequency and you're good to go!
                    </Dialog.Description>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="habit">Habit</label>
                        <input className="Input" id="habit" type="text" value={name} onChange={handleChange(setName)} />
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="date">Start From</label>
                        <DatePicker selected={startDate} onChange={setStartDate} />
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="freq">Daily or Weekly?</label>
                        <SelectComponent value={freq} change={setFreq} type="habit" />
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="occur">How many times per day/week?</label>
                        <input className="Input" id="occur" type="text" value={occur} onChange={handleChange(setOccur)} />
                    </fieldset>
                    <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                        <Dialog.Close asChild>
                            <button className="Button green" onClick={saveChanges}>Save changes</button>
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
};

export default AddHabit;