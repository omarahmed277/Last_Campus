import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import SectionsLinks from "../components/Sections/SectionsLinks";
import ProfileInfo from "../components/MyProfile/ProfileInfo";
import Spinner from "../components/Spinner";

function MyProfile({ user, edit = true, onUpdateImage }) {
  if (!user) return <Spinner />;

  return (
    <div className="container">
      <NavBar user={user} />
      <ProfileInfo user={user} edit={edit} onUpdateImage={onUpdateImage} />
      <SectionsLinks />
      <Outlet />
    </div>
  );
}

export default MyProfile;
