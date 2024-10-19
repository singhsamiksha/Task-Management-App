"use client";

import { useContext, useState } from 'react';
import Header from './components/header';
import { ThemeContext } from './layout';
import TaskCreateDialog from './components/taskCreateDialog';
import TaskList from './components/tasksList';
import useTaskManager from './hooks/tasks';

export default function Home() {

  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [searchValue, setSearchValue] = useState();
  const [taskCreateDialogOpen, setTaskCreateDialogOpen] = useState(false);
  const { tasks, createTask, updateTask, deleteTask } = useTaskManager();

  return (
    <div>
      <Header
        toggleTheme={toggleTheme}
        darkMode={darkMode}
        setTaskCreateDialogOpen={setTaskCreateDialogOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <TaskCreateDialog
        open={taskCreateDialogOpen}
        createTask={createTask}
        handleClose={() => setTaskCreateDialogOpen(false)}
      />
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        searchValue={searchValue}
      />
    </div>
  );
}
