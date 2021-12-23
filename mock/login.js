import mockjs from 'mockjs';

const proxy = {
  'POST /mock/api/v1/user/login': mockjs.mock(
  JSON.parse('{\n' +
    '    "status": 200,\n' +
    '    "data": {\n' +
    '        "user": {\n' +
    '            "user_name": "FanOne", \n' +
    '            "nick_name": "FanOne404",\n' +
    '            "stu_number": "031904102", \n' +
    '            "authority": 0 \n' +
    '        },\n' +
    '        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjAzMTkwNDEwMiIsInN0dV9udW1iZXIiOiIiLCJhdXRob3JpdHkiOjAsImV4cCI6MTYzOTU3MTg1NSwiaXNzIjoidzJvbmxpbmUtY2l2aWwifQ.y8ApzznPM2JzBVHSHpQVFePzW25sln0K6ZzDI7is7TA"\n' +
    '    },\n' +
    '    "msg": "ok",\n' +
    '    "error": ""\n' +
    '}'))
};
export default proxy;
