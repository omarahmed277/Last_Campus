function Certificate({ certificate }) {
  if (!certificate) return null;

  return (
    <div>
      <div>
        <img src={certificate.certificateImage} alt={certificate.academyName} />
        <div>
          <span>{certificate.certificateSpeciality}</span>
          <p>{certificate.academyName}</p>
          <p>{certificate.certificateDate}</p>
        </div>
      </div>
      <a
        href={certificate.certificateUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        عرض الشهادة
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
        >
          <path
            d="M9.16675 9.66683L2.33341 2.8335"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.66675 6.1665V2.1665H5.66675"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}

export default Certificate;
