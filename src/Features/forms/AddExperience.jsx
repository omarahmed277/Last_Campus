import { useExperince } from "../../contexts/useForm";
import styles from "./AddExperience.module.css";
import { useForm } from "react-hook-form";
import { addExperience } from "../../services/apiExperiences";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Experience from "../Sections/maincontent/Experience";

function AddExperience() {
  const { closeExpModal, addexp, showexp, showANDaddexp, showexpModal } =
    useExperince();

    const queryClient=useQueryClient();
    const {mutate,isLoading}=useMutation({
      mutationFn:addExperience,
      onSuccess:()=>{
        toast.success("تمت إضافة الخبرة بنجاح!");
        queryClient.invalidateQueries({
          queryKey:["experiences"]
        })
          reset();
        closeExpModal();
      },
      onError:(error)=>{
        toast.error(`خطأ في إضافة الخبرة: ${error.message}`);
      }
    })

  const { register, handleSubmit, formState: { errors },reset } = useForm({
    mode: "onChange",
  });
  function onSubmit(data) {
    mutate(data);
  }
  const {experiences}=useExperince();
  return (
    <>
      <div class={styles.overlay}></div>
      <div className={`${styles.modal}`}>
        <div className={styles.title}>
          <h2>إضافه خبره</h2>
          <img
            onClick={() => {
              closeExpModal();
              reset();
            }}
            src="../../../public/images/close-circle.svg"
            alt="x-mark"
            className="close-exp-add-modal"
          />
        </div>
        {showexp && (
          <>
          {
            experiences?.map((experience,index)=>(
              <Experience key={index} {...experience}/>
            ))
          }
            {!addexp && (
              <div className={styles.adding} onClick={() => showANDaddexp()}>
                <img src="../../../public/images/add-square.svg" alt="add" />
                <p>أضف خبرة</p>
              </div>
            )}
          </>
        )}
        {addexp && (
          <form
            className={styles.modalContainer}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div>
                <label htmlFor="title">المسمى الوظيفي</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  disabled={isLoading}
                  placeholder="Senior Product Designer"
                  {...register("title", {
                    required: "يرجى كتابه اسم الشهادة",
                  })}
                />
                {errors.title && (
                  <p className="error-message">{errors.title.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="company">اسم الشركة او المؤسسة</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  disabled={isLoading}
                  placeholder="Aaseya"
                  {...register("company", {
                    required: "يرجى كتابه اسم الشركة",
                  })}
                />
                {errors.company && (
                  <p className="error-message">{errors.company.message}</p>
                )}
              </div>
              <div className={styles.date}>
                <div>
                  <label htmlFor="from">تاريخ البدء</label>
                  <input
                    type="date"
                    name="from"
                    id="from"
                    disabled={isLoading}
                    placeholder="حﺮﺘﻘﻤﻟا ﺺﻨﻟا"
                    {...register("from", {
                      required: "يرجى كتابه تاريخ البدء",
                    })}
                  />
                  {errors.from && (
                    <p className="error-message">{errors.from.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="to">تاريخ الإنتهاء</label>
                  <input
                    type="date"
                    name="to"
                    id="to"
                    disabled={isLoading}
                    placeholder="حﺮﺘﻘﻤﻟا ﺺﻨﻟا"
                    {...register("to", {
                      required: "يرجى كتابه تاريخ الانتهاء",
                    })}
                  />
                  {errors.to && <p className="error-message">{errors.to.message}</p>}
                </div>
              </div>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  id="stillThere"
                  name="stillThere"
                  {...register("stillThere")}
                />
                <label htmlFor="stillThere">مازلت اعمل في الشركة </label>
              </div>
              <div>
                <label htmlFor="summary">اكتب ملخصًا عن مساهمتك</label>
                <textarea
                  name="summary"
                  id="summary"
                  disabled={isLoading}
                  placeholder="نبذة عني"
                  {...register("summary", {
                    // validation
                    required: "يرجى كتابه ملخص",
                    minLength: {
                      value: 10,
                      message: "يرجى كتابه ملخص اطول من 10 حرف",
                    },
                  })}
                ></textarea>
                {errors.summary && (
                  <p className="error-message">{errors.summary.message}</p>
                )}
              </div>
            </div>
            <div className={styles.btns}>
              <input type="submit" className="save" value="حفظ" name="save" />
              <input
                onClick={() => showexpModal()}
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

export default AddExperience;
