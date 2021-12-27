import React from 'react';
import ProfileHeader from '@/components/profileHeader';
import Auth from '@/wrappers/auth';
import { UserLevel } from '@/types';
const Profile: React.FC = () => {
  return (
    <Auth level={UserLevel.Teacher}>
      <ProfileHeader />
    </Auth>
  );
};

export default Profile;
