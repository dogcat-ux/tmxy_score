// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    email?: string;
  };

  type LoginResult = {
    status?: string;
  };

  type LoginParams = {
    stu_number: string;
    password: string;
  };

  type AmendPasswordParams = {
    old_password: string;
    new_password: string;
  };

  type AmendAvatar = {
    file: string
  };
  type CommonRes = {
    status?: number,
    data?: string,
    msg?: string,
    error?: string
  }
}
