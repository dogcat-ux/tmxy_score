// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetStuGpa = {
    grade?: string;
    year?: string; //学年
    semester?: string; //学期
    info?: string; //学期
  };
  type GetStuScore = {
    year?: string; //学年
    semester?: string; //学期
  };
  type GetStuScoreWithStuName = {
    stu_number: string;
    year?: string; //学年
    semester?: string; //学期
  };
  type GetStuScoreResItem = {
    score_id?: number;
    stu_number?: string;
    user_name?: string;
    course_name?: string;
    credit?: number;
    score?: number;
    gpa?: number;
    grade?: string;
  };
  type GetStuGpaResItem = {
    gpaid?: number;
    grade: string;
    stu_number: string;
    user_name: string;
    all_gpa: number;
    all_gpa_rank?: number;
    year: string;
  };
  type GetStuScoreRes = {
    status?: number;
    data?: {
      item?: Array<GetStuScoreResItem>;
      total?: number;
    };
    msg?: string;
    error?: string;
  };
  type GetStuGpaRes = {
    status?: number;
    data?: {
      item?: Array<GetStuGpaResItem>;
      total?: number;
    };
    msg?: string;
    error?: string;
  };
  type teacherDetailYearParam = {
    stu_number: string;
  };
  type teacherDetailYearResItem = {
    stu_number: string;
    year_name: string;
  };
  type teacherDetailYearRes = {
    status: number;
    data: {
      item: Array<teacherDetailYearResItem>;
      total: number;
    };
    msg: string;
    error: string;
  };
  type teacherDetailSemesterParam = {
    stu_number: string;
    year: string;
  };
  type teacherDetailSemesterResItem = {
    stu_number: string;
    semester_name: string;
  };
  type teacherDetailSemesterRes = {
    status: number;
    data: {
      item: Array<teacherDetailSemesterResItem>;
      total: number;
    };
    msg: string;
    error: string;
  };
}
