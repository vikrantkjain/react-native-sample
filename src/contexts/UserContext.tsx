import React from 'react';
import {contextUserData, updateUserDetails} from '@customTypes';

type userDataType = {
  userData: contextUserData | null;
  updateUserDetails: updateUserDetails;
};

const UserContext = React.createContext<userDataType>({
  userData: null,
  updateUserDetails: () => {},
});
export const useUserData = () => React.useContext(UserContext);
export const UserProvider: React.FC<{children: React.JSX.Element}> = ({
  children,
}) => {
  const [userData, setUserData] = React.useState<contextUserData | null>(null);
  const updateUserDetails = (data: {[key: string]: string}) => {
    const userDetails: contextUserData = {
      name: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      fullName: data?.fullName ?? '',
      email: data?.email ?? '',
      phoneNumber: data?.phoneNumber ?? '',
      token: data?.token ?? '',
      profileImage: data?.image ?? '',
    };
    setUserData({...userDetails});
  };

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        updateUserDetails: updateUserDetails,
      }}>
      {children}
    </UserContext.Provider>
  );
};
