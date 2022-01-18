import React, { useEffect } from 'react';
import MyTabBar from '@/components/tabBar';
import { List } from 'antd-mobile';
import { semesterList, showScore, yearList } from '@/services/student';
import UserHeader from '@/pages/user/components/userHeader';
import { getGpaApi, showScoreApi, yearApi } from '@/pages/user/model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/models';

const OneAcademic: React.FC = () => {
  const dispatch = useDispatch();
  const gpa = useSelector((state: RootState) => state.student.gpa);
  const score = useSelector((state: RootState) => state.student.score);
  const year = useSelector((state: RootState) => state.student.year);
  const semester = useSelector((state: RootState) => state.student.semester);

  useEffect(() => {
    dispatch(
      showScoreApi(
        year !== '全部学年'
          ? semester === '全部学期'
            ? { year }
            : { year, semester }
          : undefined,
      ),
    );
    dispatch(
      getGpaApi(
        year !== '全部学年'
          ? semester === '全部学期'
            ? { year }
            : { year, semester }
          : undefined,
      ),
    );
    // if (year==='全部学年'){
    //   dispatch(showScoreApi());
    //   dispatch(getGpaApi());
    // }else{
    //   if(semester==='全部学期'){
    //     dispatch(showScoreApi({year}));
    //     dispatch(getGpaApi({year}));
    //   }else{
    //     dispatch(showScoreApi({year}));
    //     dispatch(getGpaApi({year}));
    //   }
    // }
  }, [year, semester]);
  return (
    <div>
      <UserHeader msg={`总绩点：${gpa.toFixed(2)}`} />
      <List>
        {score?.map((value: API.ShowScoreResItem) => {
          return (
            <List.Item
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

export default OneAcademic;
