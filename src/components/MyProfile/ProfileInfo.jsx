import BackGroundImage from "./BackGroundImage";
import Info from "./Info";

function ProfileInfo({ user, edit, onUpdateImage }) {
  if (!user) return null;

  return (
    <div>
      <BackGroundImage user={user} edit={edit} />
      <Info user={user} edit={edit} onUpdateImage={onUpdateImage} />
    </div>
  );
}

export default ProfileInfo;
