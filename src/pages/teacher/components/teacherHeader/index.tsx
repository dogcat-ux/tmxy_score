import React, { useEffect, useState } from 'react';
import { Dropdown, Grid, Picker, Radio, SearchBar, Space } from 'antd-mobile';
import { DownFill } from 'antd-mobile-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/models';
import styles from '../../index.less';
import {
  getAllStuGpaApi,
  getStuGpaApi,
  semesterApi,
  setGrade,
  setSemester,
  setYear,
  yearApi,
} from '@/pages/teacher/model';
import mainStyles from '@/pages/index.less';
import { CommonString } from '@/types';

interface TeacherHeaderProps {
  handleSearch: (search: string) => void;
  handleChange: (search: string) => void;
  handleCancel: () => void;
}

const TeacherHeader: React.FC<TeacherHeaderProps> = ({
  handleSearch,
  handleChange,
  handleCancel,
}) => {
  const yearList = useSelector((state: RootState) => state.teacher.yearList);
  const semesterList = useSelector(
    (state: RootState) => state.teacher.semesterList,
  );
  const year = useSelector((state: RootState) => state.teacher.year);
  const grade = useSelector((state: RootState) => state.teacher.grade);
  const gradeList = useSelector((state: RootState) => state.teacher.gradeList);
  const semester = useSelector((state: RootState) => state.teacher.semester);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [gradeVisible, setGradeVisible] = useState(false);
  const [semesterVisible, setSemesterVisible] = useState(false);
  const [isYearActive, setIsYearActive] = useState(false);
  const [isSemesterActive, setIsSemesterActive] = useState(false);
  const [isGradeActive, setIsGradeActive] = useState(false);
  useEffect(() => {
    dispatch(yearApi());
    dispatch(getAllStuGpaApi());
  }, []);
  useEffect(() => {
    if (year !== CommonString.CommonYear) {
      dispatch(semesterApi({ year }));
      dispatch(setSemester(CommonString.CommonSemester));
    } else {
      dispatch(setSemester(CommonString.CommonSemester));
    }
  }, [year]);
  useEffect(() => {
    dispatch(yearApi());
  }, [grade]);
  useEffect(() => {
    if (grade === CommonString.CommonGrade) {
      if (year === CommonString.CommonYear) {
        dispatch(getStuGpaApi());
      } else {
        if (semester === CommonString.CommonSemester) {
          dispatch(getStuGpaApi({ year }));
        } else {
          dispatch(getStuGpaApi({ year, semester }));
        }
      }
    } else {
      if (year === CommonString.CommonYear) {
        dispatch(getStuGpaApi({ grade }));
      } else {
        if (semester === CommonString.CommonSemester) {
          dispatch(getStuGpaApi({ grade, year }));
        } else {
          dispatch(getStuGpaApi({ grade, year, semester }));
        }
      }
    }
  }, [grade, year, semester]);
  const handleYearDropClick = () => {
    setVisible(true);
    setIsYearActive(true);
  };
  const handleGradeDropClick = () => {
    setGradeVisible(true);
    setIsGradeActive(true);
  };
  const handleSemesterDropClick = () => {
    setSemesterVisible(true);
    setIsSemesterActive(true);
  };
  const handleYearConfirm = (v: any) => {
    setIsYearActive(false);
    setVisible(false);
    dispatch(setYear(v[0]));
  };
  const handleGradeConfirm = (v: any) => {
    setGradeVisible(false);
    setIsGradeActive(false);
    dispatch(setGrade(v[0]));
  };
  const handleSemesterConfirm = (v: any) => {
    setSemesterVisible(false);
    setIsSemesterActive(false);
    dispatch(setSemester(v[0]));
  };
  const onSearch = (search: string) => {
    handleSearch(search);
  };
  const onChange = (search: string) => {
    handleChange(search);
  };
  const onCancel = () => {
    handleCancel();
  };

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
                      {year}
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
          columns={yearList}
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
          columns={semesterList}
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
export default TeacherHeader;
