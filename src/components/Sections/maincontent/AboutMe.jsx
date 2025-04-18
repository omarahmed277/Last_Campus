function AboutMe({ user }) {
  if (!user) return null;

  return <p>{user.bio || "لا يوجد نبذة حالياً"}</p>;
}

export default AboutMe;
