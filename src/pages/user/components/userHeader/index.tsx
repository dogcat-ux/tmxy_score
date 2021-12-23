import { useEffect, useState } from 'react';
import styles from './index.less';
import useUser from '@/hooks/useUser';
import { Button, Divider, Picker, Tag } from 'antd-mobile';
import { Dropdown, Radio, Space } from 'antd-mobile';
import { ArrowDownCircleOutline, DownFill, DownOutline } from 'antd-mobile-icons';
import { semesterList, yearList } from '@/services/student';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/models';
import { semesterApi, setYear, setSemester, yearApi } from '@/pages/user/model';
import index from '@umijs/test';
// interface HeaderProps {
//   msg:string
// }
//
// const UserHeader: React.FC<HeaderProps> = ({ msg }) => {
//   const yearList = useSelector((state: RootState) => state.student.yearList);
//   const semesterList = useSelector((state: RootState) => state.student.semesterList);
//   const year = useSelector((state: RootState) => state.student.year);
//   const semester = useSelector((state: RootState) => state.student.semester);
//   const dispatch = useDispatch();
//   const user = useUser();
//   const [visible, setVisible] = useState(false);
//   const [semesterVisible, setSemesterVisible] = useState(false);
//
//   useEffect(() => {
//     dispatch(yearApi());
//     dispatch(semesterApi({ year }));
//   }, [year]);
//   const handleYearDropClick = () => {
//     setVisible(true);
//   };
//   const handleSemesterDropClick = () => {
//     setSemesterVisible(true);
//   };
//   const handleYearConfirm = (v: any) => {
//     console.log('handleYearConfirm', v[0]);
//     setVisible(false);
//     dispatch(setYear(v[0]));
//   };
//   const handleSemesterConfirm = (v: any) => {
//     console.log('handleSemesterConfirm', v[0]);
//     setSemesterVisible(false);
//     dispatch(setSemester(v[0]));
//   };
//   // @ts-ignore
//   return (
//     <div className={styles.scoped}>
//       <div className="user_header">
//         <div className="stu_num"><span className="username">{user.user_name}</span></div>
//         <div className="stu_num">
//           <Tag color='primary' fill='outline'>
//             {user.stu_number}
//           </Tag>
//         </div>
//       </div>
//       <div className="main">
//         <Space>
//           <div className="adm-dropdown-item" onClick={handleYearDropClick}>
//             <div className="adm-dropdown-item-title">
//               <span className="adm-dropdown-item-title-text">{year}</span>
//               <span className="adm-dropdown-item-title-arrow">
//               <DownFill/>
//             </span></div>
//           </div>
//           <div className="adm-dropdown-item" onClick={handleSemesterDropClick}>
//             <div className="adm-dropdown-item-title"><span
//               className="adm-dropdown-item-title-text">{semester}</span><span
//               className="adm-dropdown-item-title-arrow">
//               <DownFill/>
//             </span></div>
//           </div>
//         </Space>
//         <Picker
//           columns={yearList}
//           visible={visible}
//           onClose={() => {
//             setVisible(false);
//           }}
//           onConfirm={(v) => {
//             handleYearConfirm(v);
//           }}/>
//         <Picker
//           columns={semesterList}
//           visible={semesterVisible}
//           onClose={() => {
//             setSemesterVisible(false);
//           }}
//           onConfirm={v => {
//             handleSemesterConfirm(v);
//           }}/>
//         <div>
//         </div>
//       </div>
//       <div>{msg}</div>
//     </div>);
// };
// export default UserHeader;
//
//----------------------------------
// import React from 'react';
// import CommonHeader from '@/components/commonHeader';
//
// interface MyProps {
//   msg: string
// }
// interface HeaderProps {
//   userInfo: {
//     stu_number: string,
//     user_name: string,
//   }
//   gpaMsg: string,
//   yearInfo: {
//     yearList: Array<string[]>,
//     semesterList: Array<string[]>,
//     year: string,
//     semester: string
//   },
//   handleYearConfirm: (v: any) => void,
//   handleSemesterConfirm: (v: any) => void,
// }
//
// const UserHeader: React.FC<MyProps> = ({msg}) => {
//   const yearList = useSelector((state: RootState) => state.student.yearList);
//   const semesterList = useSelector((state: RootState) => state.student.semesterList);
//   const year = useSelector((state: RootState) => state.student.year);
//   const semester = useSelector((state: RootState) => state.student.semester);
//   const dispatch = useDispatch();
//   const user = useUser();
//   const { user_name, stu_number } = user;
//   const [headerProps,setHeaderProps]=useState<HeaderProps>({
//     gpaMsg: msg,
//     handleSemesterConfirm(v: any): void {
//       dispatch(setYear(v[0]));
//     },
//     handleYearConfirm(v: any): void {
//       dispatch(setSemester(v[0]));
//     },
//     userInfo: { stu_number: user_name || '', user_name: stu_number || '' },
//     yearInfo: { semester, semesterList, year, yearList }
//   })
//
//   useEffect(() => {
//     dispatch(yearApi());
//     dispatch(semesterApi({ year }));
//     setHeaderProps({
//       gpaMsg: msg,
//       handleSemesterConfirm(v: any): void {
//         dispatch(setYear(v[0]));
//       },
//       handleYearConfirm(v: any): void {
//         dispatch(setSemester(v[0]));
//       },
//       userInfo: { stu_number: user_name || '', user_name: stu_number || '' },
//       yearInfo: { semester, semesterList, year, yearList }
//     })
//   }, [year]);
//   // const handleYearConfirm = (v: any) => {
//   //   dispatch(setYear(v[0]));
//   // };
//   // const handleSemesterConfirm = (v: any) => {
//   //   dispatch(setSemester(v[0]));
//   // };
//   return (
//     <>
//       <CommonHeader gpaMsg={headerProps.gpaMsg}
//                     handleSemesterConfirm={headerProps.handleSemesterConfirm}
//                     handleYearConfirm={headerProps.handleYearConfirm}
//                     userInfo={headerProps.userInfo}
//        yearInfo={headerProps.yearInfo}/>
//       {/*<CommonHeader gpaMsg={msg} handleSemesterConfirm={handleSemesterConfirm} handleYearConfirm={handleYearConfirm}*/}
//       {/*              yearInfo={{ year, yearList, semesterList, semester }}*/}
//       {/*              userInfo={{ user_name: user_name || '', stu_number: stu_number || '' }}/>*/}
//     </>
//   );
// };
// export default UserHeader;
//----------------------------------
import React from 'react';
import CommonHeader from '@/components/commonHeader';

interface MyProps {
  msg: string
}

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
  handleYearConfirm: (v: any) => void,
  handleSemesterConfirm: (v: any) => void,
}

const UserHeader: React.FC<MyProps> = ({ msg }) => {
  const yearList = useSelector((state: RootState) => state.student.yearList);
  const semesterList = useSelector((state: RootState) => state.student.semesterList);
  const year = useSelector((state: RootState) => state.student.year);
  const semester = useSelector((state: RootState) => state.student.semester);
  const dispatch = useDispatch();
  const user = useUser();
  const { user_name, stu_number } = user;
  useEffect(() => {
    dispatch(yearApi());
  }, []);
  useEffect(() => {
    console.log(year);
    dispatch(setSemester('全部学期'))
    dispatch(semesterApi({ year }));
  }, [year]);
  const handleYearConfirm = (v: any) => {
    dispatch(setYear(v[0]));
    // dispatch(semesterApi({ year }));
  };
  const handleSemesterConfirm = (v: any) => {
    dispatch(setSemester(v[0]));
  };
  return (
    <>
      <CommonHeader gpaMsg={msg} handleSemesterConfirmProp={handleSemesterConfirm}
                    handleYearConfirmProp={handleYearConfirm}
                    yearInfo={{ year, yearList, semesterList, semester }}
                    userInfo={{ user_name: user_name || '', stu_number: stu_number || '' }}/>
    </>
  );
};
export default UserHeader;
