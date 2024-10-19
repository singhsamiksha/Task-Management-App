import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Typography, MenuItem, DialogActions, useTheme, IconButton, TextField, Select } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { TASK_PRIORITY } from '../constants';
import useTaskManager from '../hooks/tasks';

const TaskCreateDialog = (props) => {
  const {
    open,
    handleClose,
  } = props;

  const initialTask = { title: '', description: '', priority: TASK_PRIORITY.LOW };
  const [newTask, setNewTask] = useState({ ...initialTask });

  const { createTask } = useTaskManager();

  const closeDialog = () => {
    setNewTask({ ...initialTask });
    handleClose();
  }

  const handleAddTask = () => {
    createTask(newTask);
    setNewTask({ ...initialTask });
    closeDialog();
  };

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle>
        <Typography variant="h6">Add New Task</Typography>
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

      </DialogTitle>
      <DialogContent>
        {/* Task Title */}
        <Typography variant="subtitle2">
          Task Title
        </Typography>
        <TextField
          fullWidth
          margin="dense"
          size="small"
          sx={{ marginTop: 0 }}
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />

        {/* Task Description */}
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          Task Description
        </Typography>
        <TextField
          fullWidth
          margin="dense"
          multiline
          size="small"
          rows={4}
          sx={{ marginTop: 0 }}
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />

        {/* Priority Select */}
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          Priority
        </Typography>
        <Select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          fullWidth
          size='small'
          margin="dense"
        >
          <MenuItem value={TASK_PRIORITY.HIGH}>High</MenuItem>
          <MenuItem value={TASK_PRIORITY.MEDIUM}>Medium</MenuItem>
          <MenuItem value={TASK_PRIORITY.LOW}>Low</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={handleAddTask} variant="contained" color="primary">Add Task</Button>
      </DialogActions>
    </Dialog >
  );
};

export default TaskCreateDialog;
