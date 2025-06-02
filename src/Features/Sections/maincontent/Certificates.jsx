import { useCertificate } from "../../../contexts/useCirtificate";
import { useUserData } from "../../../contexts/useUserData";
import Certificate from "./Certificate";
import styles from "./MainContent.module.css";
function Certificates({ edit }) {
  const { addcerModal, showcerModal } = useCertificate();
  const {certificates}=useUserData();
  return (
    <div>
      <div className={styles.title}>
        <span>شهاداتي </span>
        {edit && (
          <div>
            <svg
              onClick={() => addcerModal()}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M8 12.5H16"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16.5V8.5"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22.5H15C20 22.5 22 20.5 22 15.5V9.5C22 4.5 20 2.5 15 2.5H9C4 2.5 2 4.5 2 9.5V15.5C2 20.5 4 22.5 9 22.5Z"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              onClick={() => showcerModal()}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M11.05 3.50002L4.20829 10.7417C3.94996 11.0167 3.69996 11.5584 3.64996 11.9334L3.34162 14.6334C3.23329 15.6084 3.93329 16.275 4.89996 16.1084L7.58329 15.65C7.95829 15.5834 8.48329 15.3084 8.74162 15.025L15.5833 7.78335C16.7666 6.53335 17.3 5.10835 15.4583 3.36668C13.625 1.64168 12.2333 2.25002 11.05 3.50002Z"
                stroke="#606060"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.90833 4.7085C10.2667 7.0085 12.1333 8.76683 14.45 9.00016"
                stroke="#606060"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 18.8335H17.5"
                stroke="#606060"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      {certificates?.map((certificate, index) => (
        <Certificate key={index} certificate={certificate} />
      ))}
      {certificates?.length > 3 && (
        <span className={styles.showMore}>
          عرض المزيد +{certificates.length - 3}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
          >
            <path
              d="M10.6354 12.7708L15.5 17.6354L20.3646 12.7708"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </div>
  );
}

export default Certificates;
