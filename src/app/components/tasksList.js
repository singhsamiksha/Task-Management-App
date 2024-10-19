import React from 'react';
import { Paper, Card, CardContent, CardActions, Button, Typography, useTheme, Grid2 } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import useTaskManager from '../hooks/tasks';
import { TASK_STATUS } from '../constants';

const LIST_TYPE = {
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
}

const TaskTypeList = (props) => {
    const {
        listType,
        tasksList,
        updateTask,
        deleteTask
    } = props;

    const theme = useTheme();

    // Toggle task completion
    const handleToggleTask = (task) => {
        const updatedStatus = task.status === TASK_STATUS.PENDING ? TASK_STATUS.COMPLETED : TASK_STATUS.PENDING;
        updateTask(task.id, { status: updatedStatus });
    };


    return (<Grid2 size={{ xs: 12, md: 6 }} sx={{ padding: 4, paddingRight: 2 }}>
        <Paper elevation={0} sx={{ height: '100%', padding: 2, backgroundColor: theme.palette.background.default }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                {listType === LIST_TYPE.PENDING ? 'Pending Tasks' : 'Completed Tasks'}
            </Typography>
            <Grid2 container spacing={2}>
                {tasksList.length ? (
                    tasksList.map((task) => (
                        <Grid2 size={{ xs: 12 }} key={task.id}>
                            <Card elevation={1} sx={{ p: 1 }}>
                                <CardContent>
                                    <Typography variant="h6">{task.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Created At: {new Date(task.createdAt).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {task.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        onClick={() => handleToggleTask(task)}
                                        variant="contained"
                                        color="primary"
                                        startIcon={<CheckCircleIcon />}
                                    >
                                        {listType === LIST_TYPE.PENDING
                                            ? 'Mark as Completed'
                                            : 'Mark as Pending'}
                                    </Button>
                                    {listType === LIST_TYPE.PENDING ?
                                        <>
                                            <Button
                                                onClick={() => { }}
                                                variant="contained"
                                                color="info"
                                                startIcon={<EditIcon />}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => deleteTask(task.id)}
                                                variant="contained"
                                                color="error"
                                                startIcon={<DeleteIcon />}
                                            >
                                                Delete
                                            </Button>
                                        </>

                                        : ''}
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))
                ) : (
                    <Typography>No tasks here</Typography>
                )}
            </Grid2>
        </Paper>
    </Grid2>);
}

const TaskList = () => {

    const { tasks, updateTask, deleteTask } = useTaskManager();

    return (
        <Grid2 container spacing={2}>
            <TaskTypeList
                listType={LIST_TYPE.PENDING}
                tasksList={tasks.filter((task) => task.status === TASK_STATUS.PENDING)}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />
            <TaskTypeList
                listType={LIST_TYPE.COMPLETED}
                tasksList={tasks.filter((task) => task.status === TASK_STATUS.COMPLETED)}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />

        </Grid2>
    );
};

export default TaskList;
