import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MyProfile from "./Pages/MyProfile";
import MainContent from "./components/Sections/maincontent/MainContent";
import Rates from "./components/Sections/Rates/Rates";
import Achivements from "./components/Sections/achivements/Achivements";
import User from "./Pages/User";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import SignUp from "./Pages/SignUp";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import EmailVerification from "./components/auth/EmailVerification";
import Explore from "./Pages/Explore";
import SissionsManagement from "./components/sessions/SissionsManagement";
import UpcomingSessions from "./components/sessions/UpcomingSessions";
import SuspendedSessions from "./components/sessions/SuspendedSessions";
import RecordedSessions from "./components/sessions/RecordedSessions";
import MentorRigister from "./components/joinAsAMentor/MentorRigister";
import MentorRigisterForm from "./components/joinAsAMentor/MentorRigisterForm";
import JoinAsMentor from "./Pages/JoinAsMentor";
import Status from "./components/joinAsAMentor/Status";
import Chat from "./Pages/Chat";
import SignUpStepOne from "./components/auth/SignUpStepOne";
import SignUpStepTwo from "./components/auth/SignUpStepTwo";

const BASE_URL = "http://localhost:9000/users";
const edit = true;
// function UserProfile() {
//   const { userName } = useParams();
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     async function fetchUserData() {
//       try {
//         const res = await fetch(`${BASE_URL}`);
//         const data = await res.json();
//         const user = data.find(u => u.userName === userName);
//         setUserData(user);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     }
//     fetchUserData();
//   }, [userName]);

//   if (!userData) return <Spinner />;

//   return (
//     <User curAcount={userData}>
//       <Routes>
//         <Route index element={<Navigate to="about" />} />
//         <Route path="about" element={<MainContent curAcount={userData} />} />
//         <Route path="rates" element={<Rates curAcount={userData} />} />
//         <Route path="achivements" element={<Achivements curAcount={userData} />} />
//       </Routes>
//     </User>
//   );
// }

function App() {
  const [curAcount, setCurAcount] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    image: "",
    specialization: "",
    country: "",
    experienceLevel: "",
    bio: "",
  });
  const [allUsers, setAllUsers] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Get other users excluding current account

  useEffect(function () {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}`);

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        // const curUser = data.find((user) => user.id === "123");

        setAllUsers(data.filter((user) => user.id !== curAcount.id));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  async function handleUpdateImage(image) {
    if (!image || !curAcount) return;

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch(`${BASE_URL}/${curAcount.id}`, {
        method: "PATCH",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to update image");
      }

      const updatedUser = await res.json();

      // Update both current account and in all users list
      setCurAcount(updatedUser);
      setAllUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    } catch (error) {
      alert("Error updating image. Please try again.");
      console.error("Error updating image:", error);
    } finally {
      setIsLoading(false);
    }
  }
  if (isLoading) return <Spinner />;
  if (!curAcount) return <Spinner />;

  async function getUser(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/${id}`);
      const data = await res.json();
      setOtherUser(data);
      console.log(data);
    } catch {
      alert("there is an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }
  console.log(curAcount);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="signUp" element={<SignUp />} />
        {/* <Route path="login" element={<Login setCurAcount={setCurAcount} />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-email" element={<EmailVerification />} />
        <Route path="reset-password" element={<ResetPassword />} /> */}
        <Route path="login" element={<Login setCurAcount={setCurAcount} />} />
        <Route
          path="myprofile"
          element={
            <MyProfile user={curAcount} onUpdateImage={handleUpdateImage} />
          }
        >
          <Route index element={<Navigate to="about" />} />
          <Route
            path="about"
            element={<MainContent user={curAcount} edit={edit} />}
          />
          <Route
            path="rates"
            element={<Rates user={curAcount} edit={edit} />}
          />
          <Route
            path="achivements"
            element={<Achivements user={curAcount} edit={edit} />}
          />
        </Route>
        <Route
          path="/user/:id"
          element={
            <User getUser={getUser} curAcount={curAcount} user={otherUser} />
          }
        >
          <Route index element={<Navigate to="about" />} />
          <Route path="about" element={<MainContent user={otherUser} />} />
          <Route path="rates" element={<Rates user={otherUser} />} />
          <Route
            path="achivements"
            element={<Achivements user={otherUser} />}
          />
        </Route>
        <Route
          path="/"
          element={<Explore curUser={curAcount} users={allUsers} />}
        />
        <Route
          path="sessions"
          element={<SissionsManagement curAcount={curAcount} />}
        >
          <Route index element={<Navigate to="upcomingSessions" />} />{" "}
          <Route
            path="upcomingSessions"
            element={<UpcomingSessions user={curAcount} />}
          />
          <Route
            path="suspendedSessions"
            element={<SuspendedSessions user={curAcount} />}
          />
          <Route
            path="recordedSessions"
            element={<RecordedSessions user={curAcount} />}
          />
        </Route>
        <Route path="join" element={<JoinAsMentor />}>
          <Route index element={<Navigate to={"mentorRegester"} />} />
          <Route path="mentorRegester" element={<MentorRigister />} />
          <Route path="mentorRegisterForm" element={<MentorRigisterForm />} />
          <Route path="status" element={<Status status="review" />} />
        </Route>
        <Route path="chat" element={<Chat curAcount={curAcount} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
