import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { semesterList, yearList } from '@/services/student';
import { InitialState } from '@@/plugin-initial-state/exports';
import _ from 'lodash';
import { getStuAllGpa, getStuGpa, getStuScore } from '@/services/teacher';
import { CommonString } from '@/types';

export const yearApi = createAsyncThunk(
  'yearList',
  async () => await yearList(),
);
export const yearOneApi = createAsyncThunk(
  'yearOneApi',
  async () => await yearList(),
);
export const semesterOneApi = createAsyncThunk(
  'semesterOneApi',
  async (year: API.SemesterListParam) => await semesterList(year),
);
export const semesterApi = createAsyncThunk(
  'semesterList',
  async (year: API.SemesterListParam) => await semesterList(year),
);
//根据参数获取
export const getStuGpaApi = createAsyncThunk(
  'getStuGpaApi',
  async (body?: API.GetStuGpa) => await getStuGpa(body),
);
//获取所有不传参
export const getAllStuGpaApi = createAsyncThunk(
  'getAllStuGpaApi',
  async () => await getStuGpa(),
);
//只获取一个学生
export const getOneStuGpaApi = createAsyncThunk(
  'getOneStuGpaApi',
  async (body: API.GetStuScoreWithStuName) => await getStuAllGpa(body),
);
export const getStuScoreApi = createAsyncThunk(
  'getStuScoreApi',
  async (body: API.GetStuScoreWithStuName) => {
    console.log('body', body);
    if (body.year === '全部学年') {
      return await getStuScore(body.stu_number);
    } else {
      return await getStuScore(
        body.stu_number,
        body.semester === '全部学期'
          ? { year: body.year }
          : {
              year: body.year,
              semester: body.semester,
            },
      );
    }
  },
);

export const teacherSlice = createSlice({
  name: 'detail',
  initialState: {
    stu_num: '',
    year: '全部学年',
    semester: '全部学期',
    grade: '全部年级',
    yearList: [['全部学年']],
    gradeList: [['全部年级']],
    semesterList: [['全部学期']],
    gpa: [],
    score: [],
    oneStudentGpa: 0,
    oneStudentScore: [],
    yearOne: '全部学年',
    semesterOne: '全部学期',
    yearListOne: [['全部学年']],
    semesterListOne: [['全部学期']],
  },
  reducers: {
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setGrade: (state, action) => {
      state.grade = action.payload;
    },
    setSemester: (state, action) => {
      state.semester = action.payload;
    },
    setStuNum: (state, action) => {
      state.stu_num = action.payload;
    },
    setYearOne: (state, action) => {
      state.yearOne = action.payload;
    },
    setSemesterOne: (state, action) => {
      state.semesterOne = action.payload;
    },
    setSemesterListOne: (state, action) => {
      state.semesterListOne = action.payload;
    },
  },
  extraReducers: {
    [yearApi.fulfilled.type]: (state: InitialState, action: any) => {
      if (action?.payload?.data?.item) {
        let arr = action?.payload?.data?.item.map(
          (value: API.YearListResItem) => value.year_name,
        );
        state.yearList = [['全部学年', ..._.uniq(arr)]];
      } else {
        state.yearList = [['全部学年']];
        state.semesterList = [[CommonString.CommonSemester]];
      }
    },
    [semesterApi.fulfilled.type]: (state: InitialState, action: any) => {
      if (action?.payload?.data?.item) {
        let arr = action?.payload?.data?.item.map(
          (value: API.SemesterListResItem) => value.semester_name,
        );
        state.semesterList = [['全部学期', ..._.uniq(arr)]];
      } else {
        state.semesterList = [[CommonString.CommonSemester]];
      }
    },
    [getStuScoreApi.fulfilled.type]: (state: InitialState, action: any) => {
      state.oneStudentScore = action?.payload?.data?.item;
      // if (!action?.payload?.data?.item) {
      //   state.oneStudentGpa = 0;
      // }
    },
    [getOneStuGpaApi.fulfilled.type]: (state: InitialState, action: any) => {
      state.oneStudentGpa = action?.payload?.data?.gpa || 0;
    },
    [getStuGpaApi.fulfilled.type]: (state: InitialState, action: any) => {
      state.gpa = action?.payload?.data?.item;
    },
    [getAllStuGpaApi.fulfilled.type]: (state: InitialState, action: any) => {
      const arr = action?.payload?.data?.item;
      state.gradeList = [
        [
          '全部年级',
          ..._.uniq(arr?.map((value: API.GetStuGpaResItem) => value.grade)),
        ],
      ];
    },
    [yearOneApi.fulfilled.type]: (state: InitialState, action: any) => {
      if (action?.payload?.data?.item) {
        let arr = action?.payload?.data?.item.filter(
          (value: API.YearListResItem) => value.stu_number === state.stu_num,
        );
        state.yearListOne = [
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
    },
    [semesterOneApi.fulfilled.type]: (state: InitialState, action: any) => {
      if (action?.payload?.data?.item) {
        let arr = action?.payload?.data?.item.filter(
          (value: API.SemesterListResItem) =>
            value.stu_number === state.stu_num,
        );
        state.semesterListOne = [
          [
            CommonString.CommonSemester,
            ..._.uniq(
              arr?.map((value: API.SemesterListResItem) => value.semester_name),
            ),
          ],
        ];
      } else {
        state.semesterListOne = [['全部学期']];
        state.semesterOne = CommonString.CommonSemester;
      }
    },
  },
});

export const {
  setYear,
  setSemester,
  setGrade,
  setStuNum,
  setYearOne,
  setSemesterOne,
  setSemesterListOne,
} = teacherSlice.actions;
export default teacherSlice.reducer;
