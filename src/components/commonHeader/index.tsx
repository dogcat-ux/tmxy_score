import React, { useEffect, useState } from 'react';
import styles from './index.less';
import mainStyles from '@/pages/index.less';
import { Grid, Picker, Tag } from 'antd-mobile';
import { Space } from 'antd-mobile';
import { DownFill } from 'antd-mobile-icons';
import useUser from '@/hooks/useUser';
import { UserLevel } from '@/types';
import { getRankStu } from '@/services/student';
import { getRankTea } from '@/services/teacher';

interface HeaderProps {
  userInfo?: {
    stu_number?: string | null;
    user_name?: string | null;
  };
  gpaMsg?: string;
  rank?: string;
  score?: string;
  yearInfo: {
    yearList: Array<string[]>;
    semesterList: Array<string[]>;
    year: string;
    semester: string;
  };
  handleYearConfirmProp: (v: any) => void;
  handleSemesterConfirmProp: (v: any) => void;
}

const CommonHeader: React.FC<HeaderProps> = ({
  userInfo,
  gpaMsg,
  rank,
  yearInfo,
  score,
  handleYearConfirmProp,
  handleSemesterConfirmProp,
}) => {
  const { yearList, semesterList, year, semester } = yearInfo;
  const [visible, setVisible] = useState(false);
  const [isYearActive, setIsYearActive] = useState(false);
  const [isSemesterActive, setIsSemesterActive] = useState(false);
  const [semesterVisible, setSemesterVisible] = useState(false);
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
    handleYearConfirmProp(v);
  };
  const handleSemesterConfirm = (v: any) => {
    setSemesterVisible(false);
    setIsSemesterActive(false);
    handleSemesterConfirmProp(v);
  };
  return (
    <div className={styles.scoped}>
      <Grid columns={1} gap={8}>
        <Grid.Item>
          <div className="user_header">
            <div className="stu_num">
              <span className="username">{userInfo && userInfo.user_name}</span>
            </div>
            <div className="stu_num">
              <Tag color="primary" fill="outline">
                {userInfo && userInfo.stu_number}
              </Tag>
            </div>
          </div>
        </Grid.Item>
        <Grid.Item className={mainStyles.scoped}>
          <Space>
            <div className="my-adm-dropdown">
              <div className="my-adm-dropdown-nav">
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
        </Grid.Item>
        <Grid.Item>
          <Space>
            {gpaMsg && <div className="gpa">{gpaMsg}</div>}
            {rank && <div className="gpa">总排名：{rank}</div>}
            {score && <div className="gpa">累计分数：{score}</div>}
          </Space>
        </Grid.Item>
      </Grid>
    </div>
  );
};
export default CommonHeader;
