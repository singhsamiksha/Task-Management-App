import { useState, useEffect } from 'react';
import { TASK_STATUS } from '../constants';
import moment from 'moment';

const useTaskManager = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const storedTasks = getTasks();
        if (storedTasks) {
            setTasks(storedTasks);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const saveTasks = (updatedTasks) => {
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const createTask = ({ title, description, priority }) => {
        const newTask = {
            id: Date.now(),
            title,
            description,
            priority,
            status: TASK_STATUS.PENDING,
            createdAt: moment(),
            updatedAt: moment(),
        };

        const updatedTasks = [...getTasks(), newTask];
        saveTasks(sortTasks(updatedTasks));
    };

    const getTasks = () => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        return storedTasks ? sortTasks(storedTasks) : [];
    };

    const sortTasks = (tasks) => {
        return tasks.sort((a, b) => new moment(b.createdAt) - new moment(a.createdAt));
    };

    const updateTask = (taskId, updatedData) => {
        const updatedTasks = getTasks().map(task =>
            task.id === taskId
                ? { ...task, ...updatedData, updatedAt: moment() }
                : task
        );
        saveTasks(sortTasks(updatedTasks));
    };

    const deleteTask = (taskId) => {
        const updatedTasks = getTasks().filter(task => task.id !== taskId);
        saveTasks(sortTasks(updatedTasks));
    };

    return {
        tasks,
        createTask,
        getTasks,
        updateTask,
        deleteTask,
    };
};

export default useTaskManager;
