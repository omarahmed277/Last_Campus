import styles from "./AddExperience.module.css";
import { useEducation } from "../../contexts/useEducation";
import { useForm } from "react-hook-form";
import { addEducation } from "../../services/apiEducation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

function AddEducation() {
  const { closeEduModal, addedu, showedu, showANDaddedu, showeduModal } =
    useEducation();
 
    const queryClient=useQueryClient();
    const {mutate,isLoading}=useMutation({
      mutationFn:addEducation,
      onSuccess:()=>{
        toast.success("تمت إضافة التعليم بنجاح!");
        queryClient.invalidateQueries({
          queryKey:["educations"]
        })
          reset();
        closeEduModal();
      },
      onError:(error)=>{
        toast.error(`خطأ في إضافة التعليم: ${error.message}`);
      }
    })

    const { register, handleSubmit, formState: { errors },reset } = useForm({
      mode: "onChange",
    });
    
    function onSubmit(data){
      mutate(data);
      console.log(data)
    }
    

  return (
    <>
      <div class={styles.overlay}></div>
      <div className={`${styles.modal}`}>
        <div className={styles.title}>
          <h2>إضافة تعليم</h2>
          <img
            src="../../../public/images/close-circle.svg"
            alt="x-mark"
            className="close-exp-add-modal"
            onClick={() => closeEduModal()}
          />
        </div>
      {showedu && (
               <>
                 <div className={styles.modalCont}>
                   <div className={styles.content}>
                     <img src="./profile-images/details.svg" alt="ex" />
                     <div class={styles.text}>
                       <span>Product Designer</span>
                       <p>Campus</p>
                     </div>
                   </div>
                   <div className={styles.editing}>
                     <img src="../../../public/images/edit-2.svg" alt="edit" />
                     <p>Jan 2025 - Present</p>
                   </div>
                 </div>
                 <div className={styles.modalCont}>
                   <div className={styles.content}>
                     <img src="./profile-images/details.svg" alt="ex" />
                     <div class={styles.text}>
                       <span>Product Designer</span>
                       <p>Campus</p>
                     </div>
                   </div>
                   <div className={styles.editing}>
                     <img src="../../../public/images/edit-2.svg" alt="" />
                     <p>Jan 2025 - Present</p>
                   </div>
                 </div>
                 {!addedu && (
                   <div className={styles.adding} onClick={() => showANDaddedu()}>
                     <img src="../../../public/images/add-square.svg" alt="add" />
                     <p>أضف خبرة</p>
                   </div>
                 )}
               </>
        )}
        {addedu && (
          <form className={styles.modalContainer} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <label htmlFor="school">جامعة، كلية، مدرسة</label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  placeholder="كلية تربية نوعية جامعة المنيا "
                  disabled={isLoading}
                  {...register("school", {
                    required: "يرجى كتابه اسم الجامعة",
                  })}
                />
                <p className={styles.error}>{errors.school && errors.school}</p>
              </div>
              <div>
                <label htmlFor="degree">الدرجة العلمية و التخصص</label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  placeholder="بكاريليوس تكنولوجيا تعليم"
                  disabled={isLoading}
                  {...register("degree", {
                    required: "يرجى كتابه الدرجة العلمية",
                  })}
                />
                <p className={styles.error}>{errors.degree && errors.degree}</p>
              </div>
              <div className={styles.date}>
                <div>
                  <label htmlFor="from">تاريخ البدء</label>
                  <input
                    type="date"
                    name="from"
                    id="from"
                    placeholder="حﺮﺘﻘﻤﻟا ﺺﻨﻟا"
                    disabled={isLoading}
                    {...register("from", {
                      required: "يرجى كتابه تاريخ البدء",
                    })}
                  />
                  <p className={styles.error}>{errors.from && errors.from}</p>
                </div>
                <div>
                  <label htmlFor="to">تاريخ الإنتهاء</label>
                  <input
                    type="date"
                    name="to"
                    id="to"
                    placeholder="حﺮﺘﻘﻤﻟا ﺺﻨﻟا"
                      disabled={isLoading}
                    {...register("to", {
                      required: "يرجى كتابه تاريخ الانتهاء",
                    })}
                  />
                  <p className={styles.error}>{errors.to && errors.to}</p>
                </div>
              </div>
              {errors.server && <p className={styles.error}>{errors.server}</p>}
            </div>
            <div className={styles.btns}>
              <input type="submit" className="save" value="حفظ" name="save" />
              <input
                type="button"
                className="cancel-edit"
                value="الغاء التعديلات"
                name="cancel-edit"
                onClick={() => showeduModal()}
              />
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default AddEducation;
