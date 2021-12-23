import React, { useEffect, useState } from 'react';
import MyTabBar from '@/components/tabBar';
import { Empty, List } from 'antd-mobile';
import TeacherHeader from '@/pages/teacher/components/teacherHeader';
import { showScoreApi } from '@/pages/user/model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/models';
import { getStuGpaApi } from '@/pages/teacher/model';
import { useHistory } from 'umi';
import { CommonString } from '@/types';

const Academic: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const gpa = useSelector((state: RootState) => state.teacher.gpa);
  const [data, setData] = useState<API.GetStuGpaResItem[]>(gpa);
  const [gpaData, setGpaData] = useState<API.GetStuGpaResItem[]>(gpa);
  const score = useSelector((state: RootState) => state.teacher.score);
  const grade = useSelector((state: RootState) => state.teacher.grade);
  const year = useSelector((state: RootState) => state.teacher.year);
  const semester = useSelector((state: RootState) => state.teacher.semester);
  const handleClick = (stu_number: string, user_name: string) => {
    // @ts-ignore
    history.push({
      pathname: `/teacher/academic/${stu_number}`,
      query: { user_name },
    });
  };
  const handleSearch = (search: string) => {
    console.log('gpaData', gpaData);
    const items = gpaData.filter(
      (value) =>
        !search ||
        value?.stu_number.toLowerCase().includes(search.toLowerCase()) ||
        value?.user_name.toLowerCase().includes(search.toLowerCase()),
    );
    setData(items);
  };
  const handleChange = (search: string) => {
    if (search) {
      setTimeout(() => {
        handleSearch(search);
      }, 100);
    }
    if (!search) {
      setData(gpaData);
    }
  };
  const handleCancel = () => {
    setData(gpaData);
  };
  useEffect(() => {
    dispatch(getStuGpaApi());
  }, []);
  useEffect(() => {
    setData(gpa);
    setGpaData(gpa);
  }, [gpa]);
  useEffect(() => {
    if (year !== CommonString.CommonYear) {
      handleSearch(year);
    } else {
      console.log(212);
    }
  }, [year]);
  useEffect(() => {
    if (grade !== CommonString.CommonGrade) {
      handleSearch(grade);
    }
  }, [grade]);
  return (
    <div>
      <TeacherHeader
        handleSearch={handleSearch}
        handleChange={handleChange}
        handleCancel={handleCancel}
      />
      <List mode="card" style={{}}>
        {data ? (
          data?.map((value: API.GetStuGpaResItem) => {
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
        ) : (
          <Empty
            style={{ padding: '64px 0' }}
            imageStyle={{ width: 128 }}
            description="暂无数据"
          />
        )}
      </List>
    </div>
  );
};

export default Academic;
