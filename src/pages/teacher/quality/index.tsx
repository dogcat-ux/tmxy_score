import React, { useEffect, useState } from 'react';
import { Empty, List } from 'antd-mobile';
import TeacherHeader from '@/pages/teacher/components/teacherHeader';
import Auth from '@/wrappers/auth';
import { CommonString, UserLevel } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'umi';
import { RootState } from '@/models';
import { personCenterApi } from '@/pages/teacher/model';
import TeacherQualityHeader from '@/pages/teacher/components/teacherQualityHeader';

const Quality: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const personCenter = useSelector(
    (state: RootState) => state.teacher.personCenter,
  );
  const [data, setData] = useState<API.personCenterResItem[]>(personCenter);
  const [gpaData, setGpaData] =
    useState<API.personCenterResItem[]>(personCenter);
  const grade = useSelector((state: RootState) => state.teacher.grade);
  const year = useSelector((state: RootState) => state.teacher.year);
  const handleClick = (value: API.personCenterResItem) => {
    // @ts-ignore
    history.push({
      pathname: `/teacher/quality/${value.stu_number}`,
      query: { ...value },
    });
  };
  const handleSearch = (search: string) => {
    const items = gpaData?.filter(
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
    dispatch(personCenterApi());
  }, []);
  useEffect(() => {
    setData(personCenter);
    setGpaData(personCenter);
  }, [personCenter]);
  useEffect(() => {
    if (year !== CommonString.CommonYear) {
      handleSearch(year);
    }
  }, [year]);
  useEffect(() => {
    if (grade !== CommonString.CommonGrade) {
      handleSearch(grade);
    }
  }, [grade]);
  return (
    <div>
      <TeacherQualityHeader
        isQuality={true}
        handleSearch={handleSearch}
        handleChange={handleChange}
        handleCancel={handleCancel}
      />
      <List mode="card" style={{}}>
        {data ? (
          data?.map((value: API.personCenterResItem) => {
            return (
              <List.Item
                onClick={() => {
                  handleClick(value);
                }}
                key={value?.stu_number}
                extra={value?.all_score.toFixed(2)}
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

const QualityPage = () => {
  return (
    <Auth level={UserLevel.Teacher}>
      <Quality />
    </Auth>
  );
};

export default QualityPage;
