function Experience({ experience }) {
  if (!experience) return null;

  return (
    <div>
      <div>
        <img src={experience.campanyImage} alt={experience.campanyName} />
        <div>
          <span>{experience.expSpeciality}</span>
          <p>{experience.campanyName}</p>
          <p>{experience.experienceDate}</p>
        </div>
      </div>
      <p>Jan 2025 - Present</p>
    </div>
  );
}

export default Experience;
