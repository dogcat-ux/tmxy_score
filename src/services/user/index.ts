import _ from 'lodash';
import request from '..';

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    params.append(key, value);
  });
  return request('/api/v1/user/login', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function amendPassword(body: API.AmendPasswordParams, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    params.append(key, value);
  });
  return request<API.CommonRes>('/api/v1/user', {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function showInfo(body: API.AmendPasswordParams, options?: { [key: string]: any }) {
  return request('/api/v1/user', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function changeAvatar(body: API.AmendAvatar, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    params.append(key, value);
  });
  return request('/api/v1/avatar', {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}
