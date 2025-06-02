function Experience({ experience }) {
  if (!experience) return null;
  const options = { year: "numeric", month: "short" };
  const from = new Date(experience.from).toLocaleDateString("en-US", options);
  const to = new Date(experience.to).toLocaleDateString("en-US", options);
  return (
    <div>
      <div>
        <img src={experience.campanyImage} alt={experience.company} />
        <div>
          <span>{experience.title}</span>
          <p>{experience.company}</p>
        </div>
      </div>
      <p>
        {from} - {experience.stillThere ? "present" : to}
      </p>
    </div>
  );
}

export default Experience;
