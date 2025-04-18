import styles from "./MainContent.module.css";
function Vedio({ video }) {
  return (
    <div className={styles.vedio}>
      <span>فيديو تعريفي</span>
      {!video && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M7.16663 13.3333L10.5 10M10.5 10L13.8333 13.3333M10.5 10V17.5M17.1666 13.9524C18.1845 13.1117 18.8333 11.8399 18.8333 10.4167C18.8333 7.88536 16.7813 5.83333 14.25 5.83333C14.0679 5.83333 13.8975 5.73833 13.8051 5.58145C12.7183 3.73736 10.712 2.5 8.41663 2.5C4.96485 2.5 2.16663 5.29822 2.16663 8.75C2.16663 10.4718 2.86283 12.0309 3.98908 13.1613"
              stroke="#666677"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>إضغظ لتحميل ملف الفيديو</span>
          <p>MP4, 4:3 (حد اقصى 25 ميجا)</p>
        </>
      )}
    </div>
  );
}

export default Vedio;
