export const selectList = (state) => state.list.tasks;

export const selectCompletedList = (state) =>
  state.list.tasks.filter(({ completed }) => completed);

export const selectNotCompletedList = (state) =>
  state.list.tasks.filter(({ completed }) => !completed);
