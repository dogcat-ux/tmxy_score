import React, { useEffect, useState } from 'react';
import { Empty, List, NavBar } from 'antd-mobile';
import {
  setYearOne,
  setSemesterOne,
  setStuNum,
  setSemesterListOne,
  getOneStuGpaApi,
  getRankTeaApi,
} from '@/pages/teacher/model';
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
import { CommonString, UserLevel } from '@/types';
import Auth from '@/wrappers/auth';
import { getRankStu } from '@/services/student';
import { getRankTea } from '@/services/teacher';
import { getRankStuApi } from '@/pages/user/model';

interface ParamsType {
  stu_number: string;
}

const AcademicDetail: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<ParamsType>();
  const { query = {} } = history.location;
  const { user_name, all_gpa } = query;
  const { stu_number } = params;
  const {
    oneStudentGpa,
    oneStudentScore,
    yearOne,
    semesterOne,
    yearListOne,
    semesterListOne,
    rank,
  } = useSelector((state: RootState) => state.teacher);
  const year = yearOne;
  const semester = semesterOne;
  const yearList = yearListOne;
  const semesterList = semesterListOne;
  const score = oneStudentScore;
  const getRank = () => {
    const yearTemp = year === '全部学年' ? null : year;
    const semesterTemp = semester === '全部学期' ? null : semester;
    if (yearTemp && semesterTemp) {
      dispatch(
        getRankTeaApi({ stu_number, year: yearTemp, semester: semesterTemp }),
      );
    } else if (yearTemp) {
      dispatch(getRankTeaApi({ stu_number, year: yearTemp }));
    } else {
      dispatch(getRankTeaApi({ stu_number }));
    }
  };
  useEffect(() => {
    dispatch(yearOneApi({ stu_number }));
    dispatch(setStuNum(stu_number));
    dispatch(setSemesterOne(CommonString.CommonSemester));
    dispatch(setYearOne(CommonString.CommonYear));
    dispatch(
      getStuScoreApi({
        stu_number: stu_number,
      }),
    );
  }, []);

  useEffect(() => {
    if (year === CommonString.CommonYear) {
      dispatch(setSemesterListOne([[CommonString.CommonSemester]]));
      dispatch(setSemesterOne(CommonString.CommonSemester));
      dispatch(getStuScoreApi({ stu_number }));
      dispatch(getOneStuGpaApi({ stu_number }));
    } else {
      dispatch(semesterOneApi({ stu_number, year }));
      if (semester === CommonString.CommonSemester) {
        dispatch(getStuScoreApi({ stu_number, year }));
        dispatch(getOneStuGpaApi({ stu_number, year }));
      } else {
        dispatch(getStuScoreApi({ stu_number, year, semester }));
        dispatch(getOneStuGpaApi({ stu_number, year, semester }));
      }
    }
    getRank();
  }, [year, semester]);
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
        gpaMsg={`总绩点：${oneStudentGpa || all_gpa}`}
        handleSemesterConfirmProp={handleSemesterConfirm}
        handleYearConfirmProp={handleYearConfirm}
        yearInfo={{ year, yearList, semesterList, semester }}
        //        @ts-ignore
        userInfo={{ user_name: user_name || '', stu_number: stu_number || '' }}
        rank={rank?.toString() || ''}
      />
      {score && score.length !== 0 ? (
        <List>
          {score?.map((value: API.ShowScoreResItem) => {
            return (
              <List.Item
                arrow={false}
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
      ) : (
        <Empty
          style={{ padding: '64px 0' }}
          imageStyle={{ width: 128 }}
          description="暂无数据"
        />
      )}
    </div>
  );
};

const AcademicDetailPage = () => {
  return (
    <Auth level={UserLevel.Teacher}>
      <AcademicDetail />
    </Auth>
  );
};

export default AcademicDetailPage;
