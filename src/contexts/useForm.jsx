import { createContext, useContext, useReducer } from "react";

const experinceContext = createContext();
const initialState = {
  openexp: false,
  addexp: false,
  showexp: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, openexp: true, addexp: true, showexp: false };
    case "showexp":
      return { ...state, openexp: true, showexp: true, addexp: false };
    case "showANDaddexp":
      return { ...state, showexp: true, addexp: true, openexp: true };
    case "close":
      return { ...state, openexp: false, addexp: false, showexp: false };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
function ExperinceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { openexp, addexp, showexp, close } = state;

  function addexpModal() {
    dispatch({ type: "add" });
  }
  function showexpModal() {
    dispatch({ type: "showexp" });
  }
  function showANDaddexp() {
    dispatch({ type: "showANDaddexp" });
  }
  function closeExpModal() {
    dispatch({ type: "close" });
  }

  return (
    <experinceContext.Provider
      value={{
        openexp,
        addexp,
        showexp,
        close,
        addexpModal,
        showexpModal,
        showANDaddexp,
        closeExpModal,
      }}
    >
      {children}
    </experinceContext.Provider>
  );
}

function useExperince() {
  const context = useContext(experinceContext);
  if (context === undefined)
    throw new Error("experinceContext was used outside the CitiesProvider");
  return context;
}
export { ExperinceProvider, useExperince };
