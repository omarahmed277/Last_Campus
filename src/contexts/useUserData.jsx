import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser, fetchUsers } from "../services/apiUsers";
import { useMemo } from "react";
import { getAllCertifications } from "../services/apiCertifications";
import { getAllEducation } from "../services/apiEducation";
import { getAllExperiences } from "../services/apiExperiences";
import { fetchUserById } from "../services/apiUsers";
import { getUserChatsById } from "../services/apiChat";
import { getChatMessages } from "../services/apiChat";
const UserDataContext = createContext();

function UserDataProvider({ children }) {
  ///////////////////////////////////////
  const { data: currentUser = {} } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => fetchCurrentUser(),
  });
  const userId = currentUser.id;
  ///////////////////////////////////////
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    enabled: !!currentUser,
  });
  const filteredUsers = useMemo(() => {
    if (!users || !currentUser) return [];
    return users.filter((user) => user.id !== currentUser.id);
  }, [users, currentUser]);
  ///////////////////////////////////////
  const { data: certificates } = useQuery({
    queryKey: ["certificates", userId],
    queryFn: () => getAllCertifications(userId),
    enabled: !!userId,
  });
  ///////////////////////////////////////
  const { data: educations } = useQuery({
    queryKey: ["educations"],
    queryFn: () => getAllEducation(userId),
    enabled: !!userId,
  });
  ///////////////////////////////////////
  const { data: experiences } = useQuery({
    queryKey: ["experiences", userId],
    queryFn: () => getAllExperiences(userId),
    enabled: !!userId,
  });
  ///////////////////////////////////////
  const [user, setUser] = useState({});
  function getUser(id) {
    const { data: otherUser } = useQuery({
      queryKey: ["userById"],
      queryFn: () => fetchUserById(id),
    });
    useEffect(() => {
      setUser(otherUser);
    }, [otherUser]);
  }
  // console.log(user)
  ///////////////////////////////////////
  const { data: userChats } = useQuery({
    queryKey: ["userChats", userId],
    queryFn: () => getUserChatsById(userId),
    enabled: !!userId,
  });
  ///////////////////////////////////////
  const [chatId, setChatId] = useState(null);
  function getChatId(id) {
    setChatId(id);
  }
  const {
    data: userChat,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userById", chatId],
    queryFn: () => getChatMessages(chatId),
    enabled: !!chatId,
  });
  useEffect(() => {
    if (chatId) {
      refetch();
    }
  }, [chatId, refetch]);

  return (
    <UserDataContext.Provider
      value={{
        currentUser,
        filteredUsers,
        certificates,
        educations,
        experiences,
        getUser,
        user,
        userChats,
        userChat,
        getChatId,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined)
    throw new Error("useUserData must be used within a UserDataProvider");
  return context;
}
export { UserDataProvider, useUserData };
