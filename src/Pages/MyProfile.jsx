import { Outlet } from "react-router-dom";
import NavBar from "../Features/NavBar/NavBar";
import SectionsLinks from "../Features/Sections/SectionsLinks";
import ProfileInfo from "../Features/MyProfile/ProfileInfo";
import Spinner from "../Features/Spinner";
import AddExperience from "../Features/forms/AddExperience";
import AddCertificate from "../Features/forms/AddCertificate";
import AddEducation from "../Features/forms/AddEducation";
import { useExperince } from "../contexts/useForm";
import { useCertificate } from "../contexts/useCirtificate";
import { useEducation } from "../contexts/useEducation";
import { useUserData } from "../contexts/useUserData";

function MyProfile() {
  const { currentUser } = useUserData();
  const { openexp } = useExperince();
  const { opencer } = useCertificate();
  const { openedu } = useEducation();
  return (
    <>
      {openexp && <AddExperience />}
      {opencer && <AddCertificate />}
      {openedu && <AddEducation />}
      <ProfileInfo user={currentUser}  />
      <SectionsLinks />
      <Outlet />
    </>
  );
}

export default MyProfile;
