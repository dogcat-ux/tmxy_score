import React, { useEffect, useState } from 'react';
import { Dropdown, Picker, Radio, SearchBar, Space } from 'antd-mobile';
import { DownFill } from 'antd-mobile-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/models';
import styles from '../../index.less';
import { semesterApi, setGrade, setSemester, setYear, yearApi } from '@/pages/teacher/model';

const TeacherHeader: React.FC = () => {
  const yearList = useSelector((state: RootState) => state.teacher.yearList);
  const semesterList = useSelector((state: RootState) => state.teacher.semesterList);
  const year = useSelector((state: RootState) => state.teacher.year);
  const grade = useSelector((state: RootState) => state.teacher.grade);
  const gradeList = useSelector((state: RootState) => state.teacher.gradeList);
  const semester = useSelector((state: RootState) => state.teacher.semester);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [gradeVisible, setGradeVisible] = useState(false);
  const [semesterVisible, setSemesterVisible] = useState(false);

  useEffect(() => {
    dispatch(yearApi());
    dispatch(semesterApi({ year }));
  }, [year]);
  const handleYearDropClick = () => {
    setVisible(true);
  };
  const handleGradeDropClick = () => {
    setGradeVisible(true);
  };
  const handleSemesterDropClick = () => {
    setSemesterVisible(true);
  };
  const handleYearConfirm = (v: any) => {
    console.log('handleYearConfirm', v[0]);
    setVisible(false);
    dispatch(setYear(v[0]));
  };
  const handleGradeConfirm = (v: any) => {
    setGradeVisible(false);
    dispatch(setGrade(v[0]));
  };
  const handleSemesterConfirm = (v: any) => {
    console.log('handleSemesterConfirm', v[0]);
    setSemesterVisible(false);
    dispatch(setSemester(v[0]));
  };

  return (
    <div className={styles.components}>
      <SearchBar
        clearable
        placeholder='请输入内容'
        className="SearchBar"
        showCancelButton={false}
        style={{
          // '--background': '#ffffff',
          height: 60,
        }}
      />
      <div className="main">
        <Space>
          <div className="adm-dropdown-item" onClick={handleGradeDropClick}>
            <div className="adm-dropdown-item-title">
              <span className="adm-dropdown-item-title-text">{grade}</span>
              <span className="adm-dropdown-item-title-arrow">
              <DownFill/>
            </span></div>
          </div>
          <div className="adm-dropdown-item" onClick={handleYearDropClick}>
            <div className="adm-dropdown-item-title">
              <span className="adm-dropdown-item-title-text">{year}</span>
              <span className="adm-dropdown-item-title-arrow">
              <DownFill/>
            </span></div>
          </div>
          <div className="adm-dropdown-item" onClick={handleSemesterDropClick}>
            <div className="adm-dropdown-item-title"><span
              className="adm-dropdown-item-title-text">{semester}</span><span
              className="adm-dropdown-item-title-arrow">
              <DownFill/>
            </span></div>
          </div>
        </Space>
        <Picker
          columns={gradeList}
          visible={gradeVisible}
          onClose={() => {
            setGradeVisible(false);
          }}
          onConfirm={(v) => {
            handleGradeConfirm(v);
          }}/>
        <Picker
          columns={yearList}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          onConfirm={(v) => {
            handleYearConfirm(v);
          }}/>
        <Picker
          columns={semesterList}
          visible={semesterVisible}
          onClose={() => {
            setSemesterVisible(false);
          }}
          onConfirm={v => {
            handleSemesterConfirm(v);
          }}/>
        <div>
        </div>
      </div>
    </div>
  );
};
export default TeacherHeader;
