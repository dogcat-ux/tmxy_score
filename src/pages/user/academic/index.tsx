import React, { useEffect } from 'react';
import MyTabBar from '@/components/tabBar';
import { Empty, List } from 'antd-mobile';
import { semesterList, showScore, yearList } from '@/services/student';
import UserHeader from '@/pages/user/components/userHeader';
import {
  getGpaApi,
  setSemester,
  showScoreApi,
  yearApi,
} from '@/pages/user/model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/models';
import styles from '../../index.less';

const Academic: React.FC = () => {
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
  }, [year, semester]);
  return (
    <div className={styles.academic}>
      <UserHeader msg={`总绩点：${gpa}`} />
      {score && score.length !== 0 ? (
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

export default Academic;
