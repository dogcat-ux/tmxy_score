import React, { useEffect, useState } from 'react';
import { Picker, SearchBar, Space } from 'antd-mobile';
import { DownFill } from 'antd-mobile-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/models';
import styles from '../../index.less';
import mainStyles from '@/pages/index.less';
import { semesterListQuality, yearListQuilty } from '@/services/student';
import { personCenterApi, personGradeApi } from '../../model';

interface TeacherHeaderProps {
  handleSearch: (search: string) => void;
  handleChange: (search: string) => void;
  handleCancel: () => void;
  isQuality?: boolean;
}

const TeacherQualityHeader: React.FC<TeacherHeaderProps> = ({
  handleSearch,
  handleChange,
  handleCancel,
}) => {
  const gradeList = useSelector(
    (state: RootState) => state.teacher.gradeListQuality,
  );
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [gradeVisible, setGradeVisible] = useState(false);
  const [semesterVisible, setSemesterVisible] = useState(false);
  const [isYearActive, setIsYearActive] = useState(false);
  const [isSemesterActive, setIsSemesterActive] = useState(false);
  const [isGradeActive, setIsGradeActive] = useState(false);
  const [years, setYears] = useState<string[]>();
  const [grade, setGrade] = useState<string>('全部年级');
  const map = new Map();
  const [yearsMap, setYearsMap] = useState<any>(map);
  const [semestersMap, setSemestersMap] = useState<any>(map);
  const [semesters, setSemesters] = useState<string[]>();
  const [year, setYear] = useState<string>('全部学年');
  const [semester, setSemester] = useState<string>('全部学期');
  const sendApi = async (gradeTemp?: string) => {
    let years = await yearListQuilty();
    const map = new Map();
    let res = null;
    let res1 = null;
    let res2 = null;
    if (yearsMap.has(year)) {
      res = {
        year_start_time_stamp: yearsMap.get(year)?.year_start_time,
        year_end_time_stamp: yearsMap.get(year)?.year_end_time,
      };
    }
    if (semestersMap.has(semester)) {
      res1 = {
        semester_start_time_stamp:
          semestersMap?.get(semester)?.semester_start_time,
        semester_end_time_stamp: semestersMap?.get(semester)?.semester_end_time,
      };
    }
    if (grade !== '全部年级') {
      res2 = { grade };
    }
    dispatch(personCenterApi({ ...res, ...res1, ...res2 }));
    if (years?.data?.item && years?.data?.item?.length > 0) {
      // @ts-ignore
      setYears([
        '全部学年',
        ...years.data.item.map((value: API.YearListResItemQulity) =>
          value?.year?.toString(),
        ),
      ]);
    }
    // @ts-ignore
    years?.data?.item?.map((value: API.YearListResItemQulity) => {
      map.set(value?.year?.toString(), {
        year_start_time: value?.year_start_time,
        year_end_time: value?.year_end_time,
      });
      return map;
    });
    setYearsMap(map);
  };

  useEffect(() => {
    dispatch(personGradeApi());
  }, []);
  useEffect(() => {
    if (year !== '全部学年') {
      year &&
        semesterListQuality({ year }).then((res) => {
          // @ts-ignore
          setSemesters(
            ['全部学期'].concat(
              res?.data?.item?.map((value: API.SemesterListResItemQulity) =>
                value?.semester?.toString(),
              ),
            ),
          );
          const map = new Map();
          res?.data?.item?.map((value: API.SemesterListResItemQulity) => {
            map.set(value?.semester?.toString(), {
              semester_start_time: value?.semester_start_time,
              semester_end_time: value?.semester_end_time,
            });
            return map;
          });
          setSemestersMap(map);
        });
    } else {
      setSemesters(['全部学期']);
    }
    sendApi();
  }, [year, grade, semester]);

  const onSearch = (search: string) => {
    handleSearch(search);
  };
  const onChange = (search: string) => {
    handleChange(search);
  };
  const onCancel = () => {
    handleCancel();
  };
  const handleYearDropClick = () => {
    setVisible(true);
    setIsYearActive(true);
  };
  const handleSemesterDropClick = () => {
    setSemesterVisible(true);
    setIsSemesterActive(true);
  };
  const handleYearConfirm = (v: any) => {
    setVisible(false);
    setIsYearActive(false);
    setYear(v[0]);
  };
  const handleGradeDropClick = () => {
    setGradeVisible(true);
    setIsGradeActive(true);
  };
  const handleSemesterConfirm = (v: any) => {
    setSemesterVisible(false);
    setIsSemesterActive(false);
    setSemester(v[0]);
  };
  const handleGradeConfirm = (v: any) => {
    setGradeVisible(false);
    setIsGradeActive(false);
    setGrade(v[0]);
  };

  // @ts-ignore
  return (
    <div className={styles.components}>
      <SearchBar
        clearable
        placeholder="请输入内容"
        className="SearchBar"
        showCancelButton={false}
        clearOnCancel
        onClear={onCancel}
        onSearch={onSearch}
        onChange={onChange}
        style={{
          // '--background': '#ffffff',
          height: 60,
        }}
      />
      <div className="main">
        <div className={mainStyles.scoped}>
          <Space className="drop-bar">
            <div className="my-adm-dropdown">
              <div className="my-adm-dropdown-nav">
                <div
                  className={
                    isGradeActive
                      ? 'my-adm-dropdown-item my-adm-dropdown-item-active'
                      : 'my-adm-dropdown-item'
                  }
                  onClick={handleGradeDropClick}
                >
                  <div
                    className={
                      isGradeActive
                        ? 'my-adm-dropdown-item-title my-adm-dropdown-item-highlight'
                        : 'my-adm-dropdown-item-title'
                    }
                  >
                    <span className="my-adm-dropdown-item-title-text">
                      {grade}
                    </span>
                    <span
                      className={
                        isGradeActive
                          ? 'my-adm-dropdown-item-title-arrow my-adm-dropdown-item-title-arrow-active'
                          : 'my-adm-dropdown-item-title-arrow'
                      }
                    >
                      <DownFill fontSize={8} />
                    </span>
                  </div>
                </div>
                <div
                  className={
                    isYearActive
                      ? 'my-adm-dropdown-item my-adm-dropdown-item-active'
                      : 'my-adm-dropdown-item'
                  }
                  onClick={handleYearDropClick}
                >
                  <div
                    className={
                      isYearActive
                        ? 'my-adm-dropdown-item-title my-adm-dropdown-item-highlight'
                        : 'my-adm-dropdown-item-title'
                    }
                  >
                    <span className="my-adm-dropdown-item-title-text">
                      {year || '全部学年'}
                    </span>
                    <span
                      className={
                        isYearActive
                          ? 'my-adm-dropdown-item-title-arrow my-adm-dropdown-item-title-arrow-active'
                          : 'my-adm-dropdown-item-title-arrow'
                      }
                    >
                      <DownFill fontSize={8} />
                    </span>
                  </div>
                </div>
                <div
                  className={
                    isSemesterActive
                      ? 'my-adm-dropdown-item my-adm-dropdown-item-active'
                      : 'my-adm-dropdown-item'
                  }
                  onClick={handleSemesterDropClick}
                >
                  <div
                    className={
                      isSemesterActive
                        ? 'my-adm-dropdown-item-title my-adm-dropdown-item-highlight'
                        : 'my-adm-dropdown-item-title'
                    }
                  >
                    <span className="my-adm-dropdown-item-title-text">
                      {semester}
                    </span>
                    <span
                      className={
                        isSemesterActive
                          ? 'my-adm-dropdown-item-title-arrow my-adm-dropdown-item-title-arrow-active'
                          : 'my-adm-dropdown-item-title-arrow'
                      }
                    >
                      <DownFill fontSize={8} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Space>
        </div>
        <Picker
          columns={gradeList}
          visible={gradeVisible}
          onClose={() => {
            setGradeVisible(false);
            setIsGradeActive(false);
          }}
          onConfirm={(v) => {
            handleGradeConfirm(v);
          }}
        />
        <Picker
          columns={[years || []]}
          visible={visible}
          onClose={() => {
            setVisible(false);
            setIsYearActive(false);
          }}
          onConfirm={(v) => {
            handleYearConfirm(v);
          }}
        />
        <Picker
          columns={[semesters || []]}
          visible={semesterVisible}
          onClose={() => {
            setSemesterVisible(false);
            setIsSemesterActive(false);
          }}
          onConfirm={(v) => {
            handleSemesterConfirm(v);
          }}
        />
        <div></div>
      </div>
    </div>
  );
};
export default TeacherQualityHeader;
