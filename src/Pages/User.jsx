import { Outlet, useParams } from "react-router-dom";
import ProfileInfo from "../components/MyProfile/ProfileInfo";
import NavBar from "../components/NavBar/NavBar";
import SectionsLinks from "../components/Sections/SectionsLinks";
import { useEffect } from "react";

function User({ curAcount, getUser, user }) {
  const { id } = useParams();
  // const user = getUser(id);
  useEffect(
    function () {
      getUser(id);
    },
    [id]
  );
  return (
    <div className="container">
      <NavBar user={curAcount} />
      <ProfileInfo user={user} />
      <SectionsLinks />
      <Outlet />
    </div>
  );
}

export default User;
