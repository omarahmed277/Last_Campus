import { useCertificate } from "../../contexts/useCirtificate";
import styles from "./AddExperience.module.css";
import { useForm } from "react-hook-form";
import { addCertification,  } from "../../services/apiCertifications";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useQueryClient,  } from "@tanstack/react-query";


function AddCertificate({user}) {
  const { closecerModal, addcer, showcer, showANDaddcer, showcerModal } =
    useCertificate();

    const queryClient=useQueryClient();
    const {mutate,isLoading}=useMutation({
      mutationFn:addCertification,
      onSuccess:()=>{
        toast.success("تمت إضافة الشهادة بنجاح!");
        queryClient.invalidateQueries({
          queryKey:["certificates"]
        })
          reset();
        closecerModal();
      },
      onError:(error)=>{
        toast.error(`خطأ في إضافة الشهادة: ${error.message}`);
      }
    })

    const { register, handleSubmit, formState: { errors },reset } = useForm({
      mode: "onChange",
    });
    
    function onSubmit(data){
      mutate(data);
    }
    const {certificates}=useCertificate();  
  return (
    <>
      <div class={styles.overlay}></div>
      <div className={`${styles.modal}`}>
        <div className={styles.title}>
          <h2>إضافة الشهادة</h2>
          <img
            onClick={() => closecerModal()}
            src="../../../public/images/close-circle.svg"
            alt="x-mark"
            className="close-exp-add-modal"
          />
        </div>
        {showcer && (
          <>
           {certificates?.map((Certificate,index)=>(
            <Certificate key={index} {...Certificate}/>
           ))}
            {!addcer && (
              <div className={styles.adding} onClick={() => showANDaddcer()}>
                <img src="../../../public/images/add-square.svg" alt="add" />
                <p>أضف شهادة</p>
              </div>
            )}
            </>
        )}
        {addcer && (
          <form className={styles.modalContainer} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <label htmlFor="name">اسم الشهادة </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="AI in UX/UI Design"
                  disabled={isLoading}
                  {...register("name", {
                    required: "يرجى كتابه اسم الشهادة",
                  })}
                />
                {errors.name && (
                  <p className="error-message">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="donor">الجهة المانحة للشهادة </label>
                <input
                  type="text"
                  id="donor"
                  name="donor"
                  placeholder="Uxcel"
                  disabled={isLoading}
                  {...register("donor", {
                    required: "يرجى كتابه اسم الشهادة",
                  })}
                />
                {errors.donor && (
                  <p className="error-message">{errors.donor.message}</p>
                )}
              </div>
              <div className={styles.date}>
                <div>
                  <label htmlFor="date">تاريخ البدء</label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    placeholder="حﺮﺘﻘﻤﻟا ﺺﻨﻟا"
                    disabled={isLoading}
                    {...register("date", {
                      required: "يرجى كتابه تاريخ البدء",
                    })}
                  />
                  {errors.date && (
                    <p className="error-message">{errors.date.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="expireAt">تاريخ الإنتهاء</label>
                  <input
                    type="date"
                    name="expireAt"
                    id="expireAt"
                    placeholder="حﺮﺘﻘﻤﻟا ﺺﻨﻟا"
                    disabled={isLoading}
                    {...register("expireAt", {
                      required: "يرجى كتابه تاريخ الانتهاء",
                    })}
                  />
                  {errors.expireAt && (
                    <p className="error-message">{errors.expireAt.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="number">رقم الشهادة </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  placeholder="AI in UX/UI Design"
                  disabled={isLoading}
                  {...register("number", {
                    required: "يرجى كتابه رقم الشهاده ",
                  })}
                />
                {errors.number && (
                  <p className="error-message">{errors.number.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="link"> رابط الشهادة </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  placeholder="https://app.uxcel.com/certificates/F6T8H05JM9JI"
                    disabled={isLoading}
                  {...register("link", {
                    required: "يرجى كتابه رابط الشهاده ",
                  })}
                />
                {errors.link && (
                  <p className="error-message">{errors.link.message}</p>
                )}
              </div>
            </div>
            <div className={styles.btns}>
              {/* <p className="error-message">{errors}</p> */}

              <input type="submit" className="save" value="حفظ" name="save" />
              <input
                onClick={() => showcerModal()}
                type="button"
                className="cancel-edit"
                value="الغاء التعديلات"
                name="cancel-edit"
              />
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default AddCertificate;
