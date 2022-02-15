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
  type PersonGrade = {
    status?: number;
    data?: {
      item?: string[];
      total?: number;
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
  type SemesterListResItemQulity = {
    semester: number;
    semester_start_time: number;
    semester_end_time: number;
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
  type SemesterListResQuality = {
    status?: number;
    data?: {
      item?: Array<SemesterListResItemQulity>;
      total?: number;
    };
    msg?: string;
    error?: string;
  };
  type YearListResItemQulity = {
    // stu_number: string;
    year?: string;
    year_end_time?: number;
    year_start_time?: number;
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
  type YearListResQulity = {
    status?: number;
    data?: {
      item?: Array<YearListResItemQulity>;
      total?: number;
    };
    msg?: string;
    error?: string;
  };
  type allScoreResGet = {
    status?: number;
    data?: number;
    error?: string;
    msg?: string;
  };
  type allScoreResPost = {
    status?: number;
    data?: {
      activity: allScoreResPostItem[];
      extra_add: allScoreResPostItem[];
      extra_deduction: allScoreResPostItem[];
    };
    error?: string;
    msg?: string;
  };

  type rankRes = {
    status?: number;
    data?: {
      item?: rankResItem[];
      total?: number;
    };
    error?: string;
    msg?: string;
  };
  type rankResItem = {
    score?: number;
    user_name?: string;
    avatar?: string;
  };
  type allScoreResPostItem = {
    category: string;
    title: string;
    score: number;
  };

  type allScoreResPostParam = {
    year_start_time_stamp?: number;
    year_end_time_stamp?: number;
    semester_start_time_stamp?: number;
    semester_end_time_stamp?: number;
  };
}
