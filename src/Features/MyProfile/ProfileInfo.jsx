import BackGroundImage from "./BackGroundImage";
import Info from "./Info";
import { useUserData } from "../../contexts/useUserData";

function ProfileInfo({ user }) {
  const { currentUser } = useUserData();
  console.log(user)
  const edit = user.id === currentUser.id;
  if (!user) return null;
  return (
    <div>
      <BackGroundImage user={user} edit={edit} />
      <Info user={user} edit={edit} />
    </div>
  );
}
export default ProfileInfo;
