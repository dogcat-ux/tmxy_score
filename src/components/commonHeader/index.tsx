import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Picker, Tag } from 'antd-mobile';
import { Space } from 'antd-mobile';
import { DownFill } from 'antd-mobile-icons';
import { semesterApi, yearApi } from '@/pages/user/model';

interface HeaderProps {
  userInfo: {
    stu_number: string,
    user_name: string,
  }
  gpaMsg: string,
  yearInfo: {
    yearList: Array<string[]>,
    semesterList: Array<string[]>,
    year: string,
    semester: string
  },
  handleYearConfirmProp: (v: any) => void,
  handleSemesterConfirmProp: (v: any) => void,
}

const CommonHeader: React.FC<HeaderProps> = ({userInfo, gpaMsg, yearInfo,handleYearConfirmProp,handleSemesterConfirmProp}) => {
  // const { userInfo, gpaMsg, yearInfo }=props;
  const { yearList, semesterList, year, semester } = yearInfo;
  const [visible, setVisible] = useState(false);
  const [semesterVisible, setSemesterVisible] = useState(false);
  useEffect(() => {
    console.log("yearInfo",yearInfo);
    console.log("userInfo",userInfo);
    console.log("gpaMsg",gpaMsg);
  }, []);
  const handleYearDropClick = () => {
    setVisible(true);
  };
  const handleSemesterDropClick = () => {
    setSemesterVisible(true);
  };
  const handleYearConfirm = (v: any) => {
    setVisible(false);
    handleYearConfirmProp(v);
  };
  const handleSemesterConfirm = (v: any) => {
    setSemesterVisible(false);
    handleSemesterConfirmProp(v);
  };
  // @ts-ignore
  return (
    <div className={styles.scoped}>
      <div className="user_header">
        <div className="stu_num"><span className="username">{userInfo.user_name}</span></div>
        <div className="stu_num">
          <Tag color='primary' fill='outline'>
            {userInfo.stu_number}
          </Tag>
        </div>
      </div>
      <div className="main">
        <Space>
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
      <div className="gpa">{gpaMsg}</div>
    </div>);
};
export default CommonHeader;

