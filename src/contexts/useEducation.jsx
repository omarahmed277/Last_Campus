import { createContext, useContext, useReducer } from "react";

const EducationContext = createContext();
const initialState = {
  openedu: false,
  addedu: false,
  showedu: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, openedu: true, addedu: true, showedu: false };
    case "show":
      return { ...state, openedu: true, showedu: true, addedu: false };
    case "showANDadd":
      return { ...state, showedu: true, addedu: true, openedu: true };
    case "close":
      return { ...state, openedu: false, addedu: false, showedu: false };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
function EducationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { openedu, addedu, showedu, close } = state;

  function addeduModal() {
    dispatch({ type: "add" });
  }
  function showeduModal() {
    dispatch({ type: "show" });
  }
  function showANDaddedu() {
    dispatch({ type: "showANDadd" });
  }
  function closeEduModal() {
    dispatch({ type: "close" });
  }

  return (
    <EducationContext.Provider
      value={{
        openedu,
        addedu,
        showedu,
        close,
        addeduModal,
        showeduModal,
        showANDaddedu,
        closeEduModal,
      }}
    >
      {children}
    </EducationContext.Provider>
  );
}
function useEducation() {
  const context = useContext(EducationContext);
  if (!context) {
    throw new Error("useEducation must be used within a EducationProvider");
  }
  return context;
}
export { EducationProvider, useEducation };