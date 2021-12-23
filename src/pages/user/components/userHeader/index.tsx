import { useEffect, useState } from 'react';
import useUser from '@/hooks/useUser';
import { semesterList, yearList } from '@/services/student';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/models';
import { semesterApi, setYear, setSemester, yearApi } from '@/pages/user/model';
import React from 'react';
import CommonHeader from '@/components/commonHeader';

interface MyProps {
  msg: string;
}

const UserHeader: React.FC<MyProps> = ({ msg }) => {
  const yearList = useSelector((state: RootState) => state.student.yearList);
  const semesterList = useSelector(
    (state: RootState) => state.student.semesterList,
  );
  const year = useSelector((state: RootState) => state.student.year);
  const semester = useSelector((state: RootState) => state.student.semester);
  const dispatch = useDispatch();
  const user = useUser();
  const { user_name, stu_number } = user;
  useEffect(() => {
    dispatch(yearApi());
  }, []);
  useEffect(() => {
    dispatch(setSemester('全部学期'));
    dispatch(semesterApi({ year }));
  }, [year]);
  const handleYearConfirm = (v: any) => {
    dispatch(setYear(v[0]));
  };
  const handleSemesterConfirm = (v: any) => {
    dispatch(setSemester(v[0]));
  };
  return (
    <>
      <CommonHeader
        gpaMsg={msg}
        handleSemesterConfirmProp={handleSemesterConfirm}
        handleYearConfirmProp={handleYearConfirm}
        yearInfo={{ year, yearList, semesterList, semester }}
        userInfo={{ user_name: user_name || '', stu_number: stu_number || '' }}
      />
    </>
  );
};
export default UserHeader;
