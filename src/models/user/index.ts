import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_name: localStorage.getItem('user_name'),
    account: localStorage.getItem('account'),
    phone_number: localStorage.getItem('phone_number'),
    stu_number: localStorage.getItem('stu_number'),
    authority: parseInt(localStorage.getItem('authority') || '-1'),
    token: localStorage.getItem('token'),
    avatar: localStorage.getItem('avatar'),
    // 0 // 权限 0是学生，1是家长，2是老师
    // NotLogin = -1,
    //   Student = 0,
    //   Patriarch = 1,
    //   Teacher = 2,
  },
  reducers: {
    save: (state, action) => {
      const {
        account,
        user_name,
        phone_number,
        avatar,
        stu_number,
        authority,
        token,
      } = action.payload;
      state.account = account || stu_number;
      state.user_name = user_name;
      state.phone_number = phone_number;
      state.stu_number = stu_number;
      state.authority = authority;
      state.token = token;
      state.avatar = avatar + '?ran=' + Math.random();
      localStorage.setItem('user_name', user_name);
      localStorage.setItem('account', account);
      localStorage.setItem('stu_number', stu_number);
      localStorage.setItem('authority', authority);
      localStorage.setItem('token', token);
      localStorage.setItem('avatar', avatar);
    },
    updateAvatar: (state, action) => {
      const avatar = action.payload;
      state.avatar = avatar;
      localStorage.setItem('avatar', avatar);
    },
    logout: (state) => {
      state.user_name = null;
      state.phone_number = null;
      state.stu_number = null;
      state.authority = -1;
      state.token = null;
      state.avatar = null;
      state.account = null;

      localStorage.removeItem('account');
      localStorage.removeItem('user_name');
      localStorage.removeItem('phone_number');
      localStorage.removeItem('stu_number');
      localStorage.removeItem('authority');
      localStorage.removeItem('avatar');
      localStorage.removeItem('token');
    },
  },
});

export const { save, logout, updateAvatar } = userSlice.actions;
export default userSlice.reducer;
