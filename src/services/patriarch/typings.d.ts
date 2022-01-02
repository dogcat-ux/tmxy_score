// @ts-ignore
/* eslint-disable */

declare namespace API {
  type LoginPatriarchParams = {
    account: string;
    password: string;
  };

  type LoginPatriarchRes = {
    status: number;
    data: {
      user: {
        account?: string;
        user_name?: string;
        phone_number?: string;
        stu_number?: string;
        authority?: number;
        avatar?: string;
      };
      token?: string;
    };
    msg?: string;
    error?: string;
  };
}
