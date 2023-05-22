import { useEffect, useContext, useState, createContext } from "react";

import { NotificationManager } from "react-notifications";
import { UserApi } from "../client/backendapi/user.js";
const UserContext = createContext({
  user: null,
  loginUser: () => {},
});

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(user && user.role === "admin");
  }, [user]);

  // useEffect(() => {
  //   BookApi.getProfile()
  //     .then(({ user, error }) => {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         setUser(user);
  //       }
  //     })
  //     .catch(console.error);
  // }, []);
  const loginUser = async (username, password) => {
    const { user, error } = await UserApi.login(username, password);
    if (error) {
      NotificationManager.error(error);
    } else {
      NotificationManager.success("Logged in successfully");
      setUser(user);
    }
  };
  const logoutUser = async () => {
    setUser(null);
    await UserApi.user.logout();
  };
  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, isAdmin }}>
        {children}
    </UserContext.Provider>
)
};
export { useUser, UserProvider }
