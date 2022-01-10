// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ShowScoreParam = {
    year?: string; //学年
    semester?: string;
  };

  type ShowScoreResItem = {
    score_id?: number; // 这条成绩的id
    stu_number?: string; // 学号
    user_name?: string; // 姓名
    course_name?: string;
    credit?: number; // 学分
    score?: number; // 分数
    gpa?: number; // 绩点
  };

  type ShowScoreRes = {
    status?: number;
    data?: {
      item?: Array<ShowScoreResItem>;
      total?: number;
    };
    msg?: string;
    error?: string;
  };

  type GetGPARes = {
    status?: number;
    data?: {
      gpa: number;
    };
    msg?: string;
    error?: string;
  };

  type GetRankRes = {
    status?: number;
    data?: {
      rank: number;
    };
    msg?: string;
    error?: string;
  };

  type SemesterListParam = {
    year: string; //学年
  };
  type SemesterListResItem = {
    stu_number?: string;
    semester_name?: string;
  };
  type SemesterListRes = {
    status?: number;
    data?: {
      item?: Array<SemesterListResItem>;
      total?: number;
    };
    msg?: string;
    error?: string;
  };
  type YearListResItem = {
    stu_number: string;
    year_name?: string;
  };
  type YearListRes = {
    status?: number;
    data?: {
      item?: Array<YearListResItem>;
      total?: number;
    };
    msg?: string;
    error?: string;
  };
}
