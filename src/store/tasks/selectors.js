export const selectList = ({ list }) => list.tasks;

export const selectCompletedList = ({ list }) =>
  list.tasks.filter(({ isCompleted }) => isCompleted);

export const selectNotCompletedList = ({ list }) =>
  list.tasks.filter(({ isCompleted }) => !isCompleted);
