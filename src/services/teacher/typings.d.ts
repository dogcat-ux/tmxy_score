// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetStuGpa = {
    grade?: string;
    year?: string; //学年
    semester?: string; //学期
    info?: string; //学期
  };
  type personCenterParam = {
    grade?: string;
    year_start_time_stamp?: number;
    year_end_time_stamp?: number;
    semester_start_time_stamp?: number;
    semester_end_time_stamp?: number;
    //info?:031904102
    page_size?: number;
    page_num?: number;
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
  type personCenterResItem = {
    stu_number: string;
    user_name: string;
    phone_number: number;
    all_score: number;
    activity_score: number;
    extra_add_score: number;
    extra_deduction_score: number;
    created_at: number;
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
  type personCenterRes = {
    status?: number;
    data?: {
      item?: Array<personCenterResItem>;
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
