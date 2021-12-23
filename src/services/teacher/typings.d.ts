// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetStuGpa = {
    grade?: string,
    year?: string,//学年
    semester?: string,//学期
    info?: string//学期
  };
  type GetStuScore = {
    year?: string,//学年
    semester?: string,//学期
  };
  type GetStuScoreWithStuName = {
    stu_number:string,
    year?: string,//学年
    semester?: string,//学期
  };
  type GetStuScoreResItem = {
    score_id?: number,
    stu_number?: string,
    user_name?: string,
    course_name?: string,
    credit?: number,
    score?: number,
    gpa?: number,
    grade?: string
  }
  type GetStuGpaResItem = {
    gpaid?: number,
    grade?: string,
    stu_number: string,
    user_name: string,
    all_gpa?: number,
    all_gpa_rank?: number,
    year?: string
  }
  type GetStuScoreRes = {
    status?: number,
    data?: {
      item?: Array<GetStuScoreResItem>,
      total?: number
    },
    msg?: string,
    error?: string
  }
  type GetStuGpaRes = {
    status?: number,
    data?: {
      item?: Array<GetStuGpaResItem>,
      total?: number
    },
    msg?: string,
    error?: string
  }

}
