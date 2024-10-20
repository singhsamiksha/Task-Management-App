import React, { useState } from 'react';
import { Paper, Card, CardContent, CardActions, Button, Typography, useTheme, Grid2, Box, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import { TASK_PRIORITY, TASK_STATUS } from '../constants';
import TaskCreateDialog from './taskCreateDialog';

const LIST_TYPE = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
}

const TaskTypeList = (props) => {
    const {
        listType,
        tasksList,
        updateTask,
        deleteTask
    } = props;

    const [selectedTask, setSelectedTask] = useState();

    const theme = useTheme();

    const handleToggleTask = (task) => {
        const updatedStatus = task.status === TASK_STATUS.PENDING ? TASK_STATUS.COMPLETED : TASK_STATUS.PENDING;
        updateTask(task.id, { status: updatedStatus });
    };

    const handleEditTask = (task) => {
        setSelectedTask(task);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case TASK_PRIORITY.LOW:
                return { color: theme.palette.success.main, label: 'Low Priority' };
            case TASK_PRIORITY.MEDIUM:
                return { color: theme.palette.warning.main, label: 'Medium Priority' };
            case TASK_PRIORITY.HIGH:
                return { color: theme.palette.error.main, label: 'High Priority' };
            default:
                return { color: theme.palette.grey[500], label: 'No Priority' };
        }
    };

    return (<Grid2 size={{ xs: 12, md: 6 }} sx={{ padding: 4, paddingRight: 2 }}>
        <Paper elevation={0} sx={{ height: '100%', padding: 2, backgroundColor: theme.palette.background.default }}>
            <Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }}>
                {listType === LIST_TYPE.PENDING ? 'Pending Tasks' : 'Completed Tasks'}
            </Typography>
            <Grid2 container spacing={2}>
                {tasksList.length ? (
                    tasksList.map((task) => {
                        const priorityInfo = getPriorityColor(task.priority);
                        return <Grid2 size={{ xs: 12 }} key={task.id}>
                            <TaskCreateDialog
                                open={selectedTask && selectedTask?.id === task?.id}
                                task={task}
                                handleClose={() => setSelectedTask(null)}
                                updateTask={updateTask}
                            />
                            <Card elevation={1} sx={{ p: 1 }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'

                                        }}
                                    >
                                        <Box>
                                            <Typography variant='h6'>{task.title}</Typography>
                                            <Typography variant='body2' color='text.secondary'>
                                                Created At: {new Date(task.createdAt).toLocaleString()}
                                            </Typography>
                                        </Box>
                                        <Tooltip title={priorityInfo.label} arrow>
                                            <div
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%',
                                                    backgroundColor: priorityInfo.color,
                                                    marginLeft: 1,
                                                }}
                                            />
                                        </Tooltip>
                                    </Box>
                                    <Typography variant='subtitle2' color='text.secondary' sx={{ mt: 1 }}>
                                        Description
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        {task.description}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button
                                        onClick={() => handleToggleTask(task)}
                                        variant='contained'
                                        color='primary'
                                        sx={{
                                            whiteSpace: 'nowrap'
                                        }}
                                        startIcon={<CheckCircleIcon />}
                                    >
                                        {listType === LIST_TYPE.PENDING
                                            ? 'Mark as Completed'
                                            : 'Mark as Pending'}
                                    </Button>
                                    {listType === LIST_TYPE.PENDING ? (
                                        <Button
                                            onClick={() => { handleEditTask(task); }}
                                            variant='contained'
                                            color='info'
                                            startIcon={<EditIcon />}
                                        >
                                            Edit
                                        </Button>
                                    ) : ''}
                                    <Button
                                        onClick={() => deleteTask(task.id)}
                                        variant='contained'
                                        color='error'
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid2>
                    })
                ) : (
                    <Typography>No tasks here</Typography>
                )}
            </Grid2>
        </Paper>
    </Grid2>
    );
};


const TaskList = (props) => {

    const {
        tasks,
        updateTask,
        deleteTask,
        searchValue,
    } = props;

    const filterTask = (status) => (
        tasks.filter((task) => (
            task.status === status
            &&
            (
                // Either there is no search value
                !searchValue
                // or if there is search value then task should have search value in title or description
                || task?.title.toLowerCase().includes(searchValue.toLowerCase())
                || task?.description.toLowerCase().includes(searchValue.toLowerCase())
            )
        ))
    )


    return (
        <Grid2 container spacing={2}>
            <TaskTypeList
                listType={LIST_TYPE.PENDING}
                tasksList={filterTask(TASK_STATUS.PENDING)}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />
            <TaskTypeList
                listType={LIST_TYPE.COMPLETED}
                tasksList={filterTask(TASK_STATUS.COMPLETED)}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />

        </Grid2>
    );
};

export default TaskList;
