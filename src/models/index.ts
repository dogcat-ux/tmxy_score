import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '@/pages/user/model';
import teacherReducer from '@/pages/teacher/model';
import userReducer from './user';
import wholeReducer from './whole';

const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
    teacher: teacherReducer,
    whole: wholeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
