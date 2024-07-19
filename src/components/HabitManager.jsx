import React, {useEffect, useState} from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { Table, Button } from '@radix-ui/themes'
import { Cross1Icon, Cross2Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

const getData = () => {
    return JSON.parse(localStorage.getItem('allHabits'))
}
const HabitManager = () => {
    const [habits, setHabits] = useState(getData());

    useEffect(() => {
        const handleStorage = () => {
            const allHabits = getData();

            if (allHabits) {
                setHabits(allHabits);
            }
        }
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    },[]);

    const removeHabit = (habit,index) => {
        const habitList = JSON.parse(localStorage.getItem('habits'))
        const names = habitList.map((x) => x.name);
        const indexOfHabit = names.indexOf(habit.name)
        habitList.splice(indexOfHabit,1)
        habits.splice(index,1);
        localStorage.setItem('habits', JSON.stringify(habitList))
        localStorage.setItem('allHabits', JSON.stringify(habits))
        window.dispatchEvent(new Event('storage'));
        setHabits([...habits]);
    }
    const clearAll = () => {
        localStorage.setItem('habits', JSON.stringify([]))
        localStorage.setItem('allHabits', JSON.stringify([]))
        window.dispatchEvent(new Event('storage'));
        setHabits([]);

    }

    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <motion.button className="hover:!bg-gray-900 rounded-lg !mx-4 p-2 !bg-transparent !text-[#ba9ffb] font-medium"
                               whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                >Habit Manager</motion.button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent flex flex-col text-center">
                    <Dialog.Title className="DialogTitle">Habit Manager</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Select a Habit you want to remove. Or clear all.
                    </Dialog.Description>
                    <fieldset>
                        <Table.Root>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell className='text-center'>Habit</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className='text-center'>Daily/Weekly</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className='text-center'>Frequency</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className='text-center'>Delete</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {!!habits && habits.map((x,index) => {
                                    return(
                                        <Table.Row key={index}>
                                            <Table.RowHeaderCell className='text-center'>{x.name}</Table.RowHeaderCell>
                                            <Table.Cell className='text-center'>{x.freq}</Table.Cell>
                                            <Table.Cell className='text-center'>{x.occurrence}</Table.Cell>
                                            <Table.Cell className='text-center'><Button className='!align-middle !cursor-pointer' onClick={() => removeHabit(x,index)}><Cross1Icon /></Button></Table.Cell>
                                        </Table.Row>
                                    )
                                })}

                            </Table.Body>
                        </Table.Root>
                    </fieldset>
                    <div className='flex-row flex justify-between'>
                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                            <Dialog.Close asChild>
                              <button className="Button bg-[#ba9ffb] text-white border-solid border-[#7a5af5] !cursor-pointer hover:bg-[#7a5af5]" onClick={() => clearAll()}>Clear All</button>
                            </Dialog.Close>
                        </div>
                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-start' }}>
                            <Dialog.Close asChild>
                                <button className="Button bg-[#ba9ffb] text-white border-solid border-[#7a5af5] hover:bg-[#7a5af5] !cursor-pointer">Done</button>
                            </Dialog.Close>
                        </div>
                    </div>
                    <Dialog.Close asChild>
                        <button className="AddTaskButton" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default HabitManager;