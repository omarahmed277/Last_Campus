import { createContext, useContext, useReducer } from "react";

const CertificateContext = createContext();
const initialState = {
  opencer: false,
  addcer: false,
  showcer: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, opencer: true, addcer: true, showcer: false };
    case "show":
      return { ...state, opencer: true, showcer: true, addcer: false };
    case "showANDadd":
      return { ...state, showcer: true, addcer: true, opencer: true };
    case "close":
      return { ...state, opencer: false, addcer: false, showcer: false };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
function CertificateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { opencer, addcer, showcer, close } = state;

  function addcerModal() {
    dispatch({ type: "add" });
  }
  function showcerModal() {
    dispatch({ type: "show" });
  }
  function showANDaddcer() {
    dispatch({ type: "showANDadd" });
  }
  function closecerModal() {
    dispatch({ type: "close" });
  }

  return (
    <CertificateContext.Provider
      value={{
        opencer,
        addcer,
        showcer,
        close,
        addcerModal,
        showcerModal,
        showANDaddcer,
        closecerModal,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
}

function useCertificate() {
  const context = useContext(CertificateContext);
  if (context === undefined)
    throw new Error("certificateContext was used outside the CitiesProvider");
  return context;
}
export { CertificateProvider, useCertificate };
