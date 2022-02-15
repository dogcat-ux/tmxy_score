import _ from 'lodash';
import request from '..';

// export async function scoreUpload(body: API.ScoreUpload, options?: { [key: string]: any }) {
//   let params = new FormData();
//   params.append('file', body.file);
//   params.append('year', body.year.toString());
//   params.append('semester', body.semester.toString());
//   return request('/api/v1/score-upload', {
//     method: 'POST',
//     data: params,
//     ...(options || {}),
//   });
// }

export async function showScore(
  body?: API.ShowScoreParam,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    params.append(key, value);
  });
  return request<API.ShowScoreRes>('/api/v1/score', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function semesterList(
  body: API.SemesterListParam,
  options?: { [key: string]: any },
) {
  return request<API.SemesterListRes>('/api/v1/semester', {
    method: 'GET',
    params: { ...body },
    ...(options || {}),
  });
}
export async function semesterListQuality(
  body: API.SemesterListParam,
  options?: { [key: string]: any },
) {
  return request<API.SemesterListResQuality>('/api/v1/activity-semester', {
    method: 'GET',
    params: { ...body },
    ...(options || {}),
  });
}

export async function yearList(options?: { [key: string]: any }) {
  return request<API.YearListRes>('/api/v1/year', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function yearListQuilty(options?: { [key: string]: any }) {
  return request<API.YearListResQulity>('/api/v1/activity-year', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getGpa(
  body?: API.ShowScoreParam,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    params.append(key, value);
  });
  return request<API.GetGPARes>('/api/v1/gpa', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function getRankStu(
  body?: API.ShowScoreParam,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    params.append(key, value);
  });
  return request<API.GetRankRes>('/api/v1/rank', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function allScore(options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.allScoreResGet>(`/api/v1/all-score`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function rank(options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.rankRes>(`api/v1/rank`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function allScorePost(
  body?: API.allScoreResPostParam,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.allScoreResPost>(`/api/v1/all-score`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function allScoreTeacher(
  stu_number?: string,
  body?: API.allScoreResPostParam,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.allScoreResPost>(
    `/api/v1/all-score-teacher/${stu_number}`,
    {
      method: 'POST',
      data: params,
      ...(options || {}),
    },
  );
}
