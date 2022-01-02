import _ from 'lodash';
import request from '..';

export async function PatriarchLogin(
  body: API.LoginPatriarchParams,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    params.append(key, value);
  });
  return request<API.LoginPatriarchRes>('/api/v1/parent/login', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function PatriarchChangeAvatar(
  body: API.AmendAvatar,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    params.append(key, value);
  });
  return request('/api/v1/parent/avatar', {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}
export async function PatriarchAmendPassword(
  body: API.AmendPasswordParams,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    params.append(key, value);
  });
  return request<API.CommonRes>('/api/v1/parent', {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}
