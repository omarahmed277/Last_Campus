function MentorRigisterForm() {
  return (
    <>
      <h1>انضم كموجه مهني</h1>
      <form action="">
        <div>
          <label htmlFor="speciality">التخصص :</label>
          <select name="speciality" id="speciality">
            <option value="UiUx">Ui Ux Design</option>
            <option value="webDev">Web Development</option>
            <option value="mobileDev">Mobile Development</option>
          </select>
        </div>
        <div>
          <label htmlFor="experience">عدد سنوات الخبرة :</label>
          <select name="experience" id="experience">
            <option value="1">سنة واحدة</option>
            <option value="2">سنتان</option>
            <option value="3">ثلاث سنوات</option>
            <option value="4">أكثر من ثلاث سنوات</option>
          </select>
        </div>
        <div>
          <label htmlFor="target">الفئه المستهدفه من المتدربين :</label>
          <select name="target" id="target">
            <option value="beginners">المبتدئين</option>
            <option value="intermediate">المتوسطين</option>
            <option value="advanced">المتقدمين</option>
          </select>
        </div>
        <div>
          <label htmlFor="linkedin">رابط لينكدان :</label>
          <input
            type="text"
            name="linkedin"
            id="linkedin"
            placeholder="*******************"
          />
        </div>
        <div>
          <label htmlFor="about">نبذة عني :</label>
          <textarea
            name="about"
            id="about"
            placeholder="هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق"
          ></textarea>
        </div>
        <input type="submit" name="join" id="join" value="انضم" />
      </form>
    </>
  );
}

export default MentorRigisterForm;
