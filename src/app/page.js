"use client";

import { useContext, useState } from 'react';
import Header from './components/header';
import { ThemeContext } from './layout';
import TaskCreateDialog from './components/taskCreateDialog';

export default function Home() {

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const initialTasks = [
    { id: 1, title: "Task 1", description: "High priority task", priority: "high", completed: false },
    { id: 2, title: "Task 2", description: "Medium priority task", priority: "medium", completed: false },
    { id: 3, title: "Task 3", description: "Low priority task", priority: "low", completed: false },
  ];

  const [taskCreateDialogOpen, setTaskCreateDialogOpen] = useState(false);

  return (
    <div>
      <Header
        toggleTheme={toggleTheme}
        darkMode={darkMode}
        setTaskCreateDialogOpen={setTaskCreateDialogOpen}
      />
      <TaskCreateDialog
        open={taskCreateDialogOpen}
        handleClose={() => setTaskCreateDialogOpen(false)}
      />
    </div>
  );
}
