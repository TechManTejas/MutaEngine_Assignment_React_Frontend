import React, {
    createContext,
    useState,
    ReactNode,
    useContext,
  } from "react";
  import { IAuthResponse } from "../types/user.types.ts";
  
  // Create the context
  const MyContext = createContext<any | undefined>(undefined);
  
  // Create a provider component
  export const MyContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [userAuthenticated, setUserAuthenticated] = useState<boolean>(!!localStorage.getItem("mutaengine-access-token"));
  
    const signInUser = (authData: IAuthResponse) => {
      localStorage.setItem("mutaengine-access-token", authData.access);
      localStorage.setItem("mutaengine-refresh-token", authData.refresh);
      setUserAuthenticated(true);
      // You can also store user details if needed
      localStorage.setItem("mutaengine-user-data", JSON.stringify(authData.user));
    };
    
    const signOutUser = () => {
      localStorage.removeItem("mutaengine-access-token");
      localStorage.removeItem("mutaengine-refresh-token");
      localStorage.removeItem("mutaengine-user-data");
      setUserAuthenticated(false);
    };
  
    const contextValue: any = {
      userAuthenticated,
      setUserAuthenticated,
      signInUser,
      signOutUser
    };
  
    return (
      <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
    );
  };
  
  // Create a custom hook to use the context
  export const Context = (): any => {
    const context = useContext(MyContext);
    if (!context) {
      throw new Error("useMyContext must be used within a MyContextProvider");
    }
    return context;
  };
  