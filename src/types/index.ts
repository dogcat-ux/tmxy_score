export enum UserLevel {
  // 0 // 权限 0是学生，1是家长，2是老师
  NotLogin = -1,
  Student = 0,
  Patriarch = 1,
  Teacher = 2,
}
export enum Code {
  SuccessCode = 200,
  NullCode = 10003,
  NoMatchCode = 10007,
  TokenExpired = 30001,
}
export enum CommonString {
  CommonYear = '全部学年',
  CommonSemester = '全部学期',
  CommonGrade = '全部年级',
}
export const server = 'http://139.9.196.99:3000/';
export const avatarUrl =
  server + 'static/imgs/avatar/' + localStorage.getItem('stu_number') + '.jpg';
