import React from 'react';

export const convertDate = (value, type= undefined, increment= undefined, index) => {
    let convertedDate;
    let newDate;
    switch (type) {
        case 'day':
            convertedDate = value.setDate(value.getDate() + (increment * index));
            break;
        case 'week':
            convertedDate = value.setDate(value.getDate() + (increment * index) * 7)
            break;
        case 'month':
            convertedDate = value.setDate(value.getMonth() + 1 + (increment * index))
            break;
        case 'year':
            convertedDate = value.setDate(value.getFullYear() + (increment * index));
            break;
        default:
            convertedDate = value.setDate(value.getDate());
    }
    newDate = new Date(convertedDate);
    return newDate.getDate() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getFullYear()
}

export const setupRecurringTaskArray = (item, date, repeat) => {
    const taskArray = [];
    const splitFreq = item.freq.split(" ")
    const type = splitFreq[1];
    const increment = splitFreq[0];
    for(let i = 0; i < repeat; i++) {
        taskArray.push({...item, date: convertDate(new Date(date), type, increment, i+1) })
    }
    return taskArray;
}

export const getTasks = (type= 'tasks') => {
    return JSON.parse(localStorage.getItem(type))
}

export const getHabits = (type = 'habits') => {
    return JSON.parse(localStorage.getItem(type))
}

export const getAllHabits = () => {
    return JSON.parse(localStorage.getItem('allHabits'))
}