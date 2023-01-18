import React from 'react';
import { Box } from '@material-ui/core';
import Profile from './Profile';
import UserProfileTabs from './Tabs';
import TopBar from '../../../layouts/TopBar';

export default function UserProfile() {
  return (
    <Box>
      <TopBar />
      <Profile />
      <UserProfileTabs />
    </Box>
  );
}