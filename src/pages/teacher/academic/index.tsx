import React, { useEffect } from 'react';
import MyTabBar from '@/components/tabBar';
import { List } from 'antd-mobile';
import TeacherHeader from '@/pages/teacher/components/teacherHeader';
import { showScoreApi } from '@/pages/user/model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/models';
import { getStuGpaApi } from '@/pages/teacher/model';
import { useHistory } from 'umi';

const Academic: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const gpa = useSelector((state: RootState) => state.teacher.gpa);
  const score = useSelector((state: RootState) => state.teacher.score);
  const year = useSelector((state: RootState) => state.teacher.year);
  const semester = useSelector((state: RootState) => state.teacher.semester);
  const handleClick = (stu_number: string, user_name: string) => {
    // @ts-ignore
    history.push({
      pathname: `/teacher/academic/${stu_number}`,
      query: { user_name },
    });
  };
  useEffect(() => {
    dispatch(getStuGpaApi());
  }, []);
  return (
    <div>
      <TeacherHeader/>
      <List
        mode="card"
        style={{}}>
        {
          gpa?.map((value: API.GetStuGpaResItem) => {
            return (
              <List.Item
                arrow={false}
                onClick={() => {
                  handleClick(value.stu_number, value.user_name);
                }}
                key={value?.gpaid}
                extra={value?.all_gpa}
                description={`${value?.stu_number}`}
                clickable
              >
                {value?.user_name}
              </List.Item>
            );
          })
        }
      </List>
    </div>
  );
};

export default Academic;
