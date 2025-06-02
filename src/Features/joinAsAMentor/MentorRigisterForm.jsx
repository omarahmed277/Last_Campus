import { useForm } from "react-hook-form";
import { addMentorRequest } from "../../services/apiMentorRequest";
import { toast } from "react-toastify";
function MentorRigisterForm() {
  const {handleSubmit,register,formState:{errors}}=useForm({
    mode:"onChange"
  })
  const onSubmit=async (data)=>{
    try {
      await addMentorRequest(data);
      // Optionally, redirect or show success message
    } catch (error) {
      // This will catch and display any errors from the API
      toast.error(error.message || "حدث خطأ أثناء تقديم الطلب");
    }
  }
  return (
    <>
      <h1>انضم كموجه مهني</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="speciality">التخصص :</label>
          <select name="speciality" id="speciality" {...register("speciality",{required:true})}>
            <option value="UiUx">Ui Ux Design</option>
            <option value="webDev">Web Development</option>
            <option value="mobileDev">Mobile Development</option>
          </select>
          <p className="error">
            {errors.speciality && <span>{errors.speciality}</span>}
          </p>
        </div>
        <div>
          <label htmlFor="experience">عدد سنوات الخبرة :</label>
          <select name="experience" id="experience" {...register("experience",{required:true})}>
            <option value="1">سنة واحدة</option>
            <option value="2">سنتان</option>
            <option value="3">ثلاث سنوات</option>
            <option value="4">أكثر من ثلاث سنوات</option>
          </select>
          <p className="error">
            {errors.experience && <span>{errors.experience}</span>}
          </p>
        </div>
        <div>
          <label htmlFor="target">الفئه المستهدفه من المتدربين :</label>
          <select name="target" id="target" {...register("target",{required:true})}>
            <option value="beginners">المبتدئين</option>
            <option value="intermediate">المتوسطين</option>
            <option value="advanced">المتقدمين</option>
          </select>
          <p className="error">{errors.target && <span>{errors.target}</span>}</p>
        </div>
        <div>
          <label htmlFor="linkedin">رابط لينكدان :</label>
          <input
            type="text"
            name="linkedin"
            id="linkedin"
            placeholder="*******************"
            {...register("linkedin",{required:true})}
          />
          <p className="error">
            {errors.linkedin && <span>{errors.linkedin}</span>}
          </p>
        </div>
        <div>
          <label htmlFor="about">نبذة عني :</label>
          <textarea
            name="about"
            id="about"
            placeholder="هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق"
            {...register("about",{required:true})}></textarea>
          <p className="error">{errors.about && <span>{errors.about}</span>}</p>
        </div>
        <div className="error">
          {errors.submit && <span>{errors.submit}</span>}
        </div>
        <input type="submit" name="join" id="join" value="انضم" />
      </form>
    </>
  );
}

export default MentorRigisterForm;
