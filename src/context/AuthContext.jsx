import { createContext, useReducer, useContext } from "react";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, isLoggedIn: true, profile: action.payload.profile };
    }
    case "LOGOUT": {
      localStorage.removeItem("token");
      return { ...state, isLoggedIn: false, profile: null };
    }
    case "UPDATE": {
      return { ...state, profile: action.payload.profile };
    }
    default: {
      return { ...state };
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, {
    isLoggedIn: false,
    profile: null,
  });
  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
