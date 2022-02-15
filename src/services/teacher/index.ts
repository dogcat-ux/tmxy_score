import request from '..';
import _ from 'lodash';

export async function personCenter(
  body?: API.personCenterParam,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    params.append(key, value);
  });
  return request<API.personCenterRes>('/api/v1/person-center', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function getStuGpa(
  body?: API.GetStuGpa,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    params.append(key, value);
  });
  return request<API.GetStuGpaRes>('/api/v1/gpa-teacher', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function getStuScore(
  stu_number: string,
  body?: API.GetStuScore,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    params.append(key, value);
  });
  return request<API.GetStuScoreRes>(`/api/v1/score-teacher/${stu_number}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function getStuAllGpa(
  body: API.GetStuScoreWithStuName,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    if (value) params.append(key, value);
  });
  return request<API.GetGPARes>(`/api/v1/gpa-student`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function teacherDetailYear(
  body: API.teacherDetailYearParam,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    if (value) {
      // @ts-ignore
      params.append(key, value);
    }
  });
  return request<API.teacherDetailYearRes>(`/api/v1/teacher-detail-year`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function teacherDetailSemester(
  body: API.teacherDetailSemesterParam,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    if (value) {
      // @ts-ignore
      params.append(key, value);
    }
  });
  return request<API.teacherDetailSemesterRes>(
    `/api/v1/teacher-detail-semester`,
    {
      method: 'POST',
      data: params,
      ...(options || {}),
    },
  );
}
export async function getRankTea(
  body?: API.GetStuScoreWithStuName,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    params.append(key, value);
  });
  return request<API.GetRankRes>('/api/v1/rank-student', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function personGrade(options?: { [key: string]: any }) {
  return request<API.PersonGrade>('/api/v1/grade', {
    method: 'GET',
    ...(options || {}),
  });
}
