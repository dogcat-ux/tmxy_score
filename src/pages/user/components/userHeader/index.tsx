import { useEffect, useState } from 'react';
import useUser from '@/hooks/useUser';
import { getRankStu, semesterList, yearList } from '@/services/student';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/models';
import {
  semesterApi,
  setYear,
  setSemester,
  yearApi,
  getRankStuApi,
} from '@/pages/user/model';
import React from 'react';
import CommonHeader from '@/components/commonHeader';

interface MyProps {
  msg: string;
}

const UserHeader: React.FC<MyProps> = ({ msg }) => {
  const { yearList, semesterList, year, semester, rank } = useSelector(
    (state: RootState) => state.student,
  );
  // const yearList = useSelector((state: RootState) => state.student.yearList);
  // const semesterList = useSelector(
  //   (state: RootState) => state.student.semesterList,
  // );
  // const year = useSelector((state: RootState) => state.student.year);
  // const semester = useSelector((state: RootState) => state.student.semester);
  // const [rank, setRank] = useState<number>();
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
  useEffect(() => {
    const yearTemp = year === '全部学年' ? null : year;
    const semesterTemp = semester === '全部学期' ? null : semester;
    if (yearTemp && semesterTemp) {
      dispatch(getRankStuApi({ year: yearTemp, semester: semesterTemp }));
    } else if (yearTemp) {
      dispatch(getRankStuApi({ year: yearTemp }));
    } else {
      dispatch(getRankStuApi({}));
    }
  }, []);
  return (
    <>
      <CommonHeader
        gpaMsg={msg}
        handleSemesterConfirmProp={handleSemesterConfirm}
        handleYearConfirmProp={handleYearConfirm}
        yearInfo={{ year, yearList, semesterList, semester }}
        userInfo={{ user_name: user_name || '', stu_number: stu_number || '' }}
        rank={rank?.toString() || ''}
      />
    </>
  );
};
export default UserHeader;
