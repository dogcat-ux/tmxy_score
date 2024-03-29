import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getGpa,
  getRankStu,
  semesterList,
  showScore,
  yearList,
} from '@/services/student';
import { InitialState } from '@@/plugin-initial-state/exports';
import _ from 'lodash';
import { Code } from '@/types';
import { Toast } from 'antd-mobile';

export const yearApi = createAsyncThunk(
  'yearList',
  async () => await yearList(),
);
export const semesterApi = createAsyncThunk(
  'semesterList',
  async (year: API.SemesterListParam) => await semesterList(year),
);
export const showScoreApi = createAsyncThunk(
  'showScoreApi',
  async (body?: API.ShowScoreParam) => await showScore(body),
);
export const getGpaApi = createAsyncThunk(
  'getGpaApi',
  async (body?: API.ShowScoreParam) => await getGpa(body),
);
export const getRankStuApi = createAsyncThunk(
  'getRankStuApi',
  async (body?: API.ShowScoreParam) => await getRankStu(body),
);

export const studentSlice = createSlice({
  name: 'detail',
  initialState: {
    year: '全部学年',
    semester: '全部学期',
    yearList: [['全部学年']],
    semesterList: [['全部学期']],
    gpa: 0,
    rank: 0,
    score: [],
  },
  reducers: {
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setSemester: (state, action) => {
      state.semester = action.payload;
    },
  },
  extraReducers: {
    [yearApi.fulfilled.type]: (state: InitialState, action: any) => {
      if (action?.payload?.status === Code.SuccessCode) {
        if (action?.payload?.data?.item) {
          let arr = action?.payload?.data?.item.filter(
            (value: API.YearListResItem) =>
              localStorage.getItem('stu_number') === value?.stu_number,
          );
          state.yearList = [
            [
              '全部学年',
              ..._.uniq(
                arr?.map((value: API.YearListResItem) => value.year_name),
              ),
            ],
          ];
        } else {
          state.yearList = [['全部学年']];
        }
      } else {
        Toast.show({
          icon: 'fail',
          content: action?.payload?.msg || '出了点小问题',
        });
      }
    },
    [semesterApi.fulfilled.type]: (state: InitialState, action: any) => {
      if (action?.payload?.status === Code.SuccessCode) {
        if (action?.payload?.data?.item) {
          let arr = action?.payload?.data?.item.filter(
            (value: API.SemesterListResItem) =>
              localStorage.getItem('stu_number') === value?.stu_number,
          );
          state.semesterList = [
            [
              '全部学期',
              ..._.uniq(
                arr?.map(
                  (value: API.SemesterListResItem) => value.semester_name,
                ),
              ),
            ],
          ];
        } else {
          state.semesterList = [['全部学期']];
        }
      } else {
        Toast.show({
          icon: 'fail',
          content: action?.payload?.msg || '出了点小问题',
        });
      }
    },
    [showScoreApi.fulfilled.type]: (state: InitialState, action: any) => {
      if (action?.payload?.status === Code.SuccessCode) {
        state.score = action?.payload?.data?.item;
        if (!action?.payload?.data?.item) {
          state.gpa = 0;
        }
      } else {
        Toast.show({
          icon: 'fail',
          content: action?.payload?.msg || '出了点小问题',
        });
      }
    },
    [getGpaApi.fulfilled.type]: (state: InitialState, action: any) => {
      if (action?.payload?.status === Code.SuccessCode) {
        state.gpa = action?.payload?.data?.gpa || 0;
      } else {
        Toast.show({
          icon: 'fail',
          content: action?.payload?.msg || '出了点小问题',
        });
      }
    },
    [getRankStuApi.fulfilled.type]: (state: InitialState, action: any) => {
      if (action?.payload?.status === Code.SuccessCode) {
        state.rank = action?.payload?.data?.rank || 0;
      } else {
        Toast.show({
          icon: 'fail',
          content: action?.payload?.msg || '出了点小问题',
        });
      }
    },
  },
});

export const { setYear, setSemester } = studentSlice.actions;
export default studentSlice.reducer;
