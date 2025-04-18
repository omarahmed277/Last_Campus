function Education({ edu }) {
  if (!edu) return null;

  return (
    <div className="experience">
      <div>
        <img src={edu.eduImage} alt={edu.eduSpeciality} />
        <div>
          <span>{edu.eduSpeciality}</span>
          <p>{edu.academyName}</p>
        </div>
      </div>
      <p>{edu.eduDate}</p>
    </div>
  );
}

export default Education;
