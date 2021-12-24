import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '@/pages/user/model';
import teacherReducer from '@/pages/teacher/model';
import userReducer from './user';
const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
    teacher: teacherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
