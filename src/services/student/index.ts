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

export async function yearList(options?: { [key: string]: any }) {
  return request<API.YearListRes>('/api/v1/year', {
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
