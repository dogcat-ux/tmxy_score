import React, { useEffect } from 'react';
import { List, NavBar, Space } from 'antd-mobile';
import UserHeader from '@/pages/user/components/userHeader';
import { setYearOne, setSemesterOne, setStuNum } from '@/pages/teacher/model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/models';
import { useParams } from 'umi';
import {
  getStuScoreApi,
  semesterOneApi,
  yearOneApi,
} from '@/pages/teacher/model';
import CommonHeader from '@/components/commonHeader';
import { history } from 'umi';

interface ParamsType {
  stu_number: string;
}

const Academic: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<ParamsType>();
  const { query = {} } = history.location;
  const { user_name } = query;
  const { stu_number } = params;
  const gpa = useSelector((state: RootState) => state.teacher.oneStudentGpa);
  const score = useSelector(
    (state: RootState) => state.teacher.oneStudentScore,
  );
  const year = useSelector((state: RootState) => state.teacher.yearOne);
  const semester = useSelector((state: RootState) => state.teacher.semesterOne);
  const yearList = useSelector((state: RootState) => state.teacher.yearListOne);
  const semesterList = useSelector(
    (state: RootState) => state.teacher.semesterListOne,
  );

  useEffect(() => {
    dispatch(setStuNum(stu_number));
    dispatch(
      getStuScoreApi({
        stu_number: stu_number,
        year,
        semester,
      }),
    );
    dispatch(yearOneApi());
  }, []);
  useEffect(() => {
    dispatch(semesterOneApi({ year }));
  }, [year]);
  const handleYearConfirm = (v: any) => {
    dispatch(setYearOne(v[0]));
  };
  const handleSemesterConfirm = (v: any) => {
    dispatch(setSemesterOne(v[0]));
  };
  const back = () => {
    history.push('/teacher/academic');
  };

  return (
    <div>
      <NavBar onBack={back} style={{ fontSize: 12 }}>
        学生个人成绩
      </NavBar>
      <CommonHeader
        gpaMsg={`总绩点：${gpa}`}
        handleSemesterConfirmProp={handleSemesterConfirm}
        handleYearConfirmProp={handleYearConfirm}
        yearInfo={{ year, yearList, semesterList, semester }}
        // @ts-ignore
        userInfo={{ user_name: user_name || '', stu_number: stu_number || '' }}
      />
      <List>
        {score?.map((value: API.ShowScoreResItem) => {
          return (
            <List.Item
              key={value?.score_id}
              extra={value?.score}
              description={`学分:${value?.credit} 绩点：${value?.gpa}`}
              clickable
            >
              {value?.course_name}
            </List.Item>
          );
        })}
      </List>
    </div>
  );
};

export default Academic;
