import { Outlet } from "react-router-dom";
import ProfileInfo from "../Features/MyProfile/ProfileInfo";
import SectionsLinks from "../Features/Sections/SectionsLinks";
import { useUserData } from "../contexts/useUserData";

function User() {
  const { user } = useUserData();
  return (
    <>
      <ProfileInfo user={user} />
      <SectionsLinks />
      <Outlet />
    </>
  );
}

export default User;
