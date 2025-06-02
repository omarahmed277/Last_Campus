import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyProfile from "./Pages/MyProfile";
import MainContent from "./Features/Sections/maincontent/MainContent";
import Rates from "./Features/Sections/Rates/Rates";
import Achivements from "./Features/Sections/achivements/Achivements";
import User from "./Pages/User";
import { useMemo, useState } from "react";
import Spinner from "./Features/Spinner";
import SignUp from "./Pages/SignUp";
import Login from "./Features/auth/Login";
import ForgotPassword from "./Features/auth/ForgotPassword";
import ResetPassword from "./Features/auth/ResetPassword";
import EmailVerification from "./Features/auth/EmailVerification";
import Explore from "./Pages/Explore";
import SissionsManagement from "./Features/sessions/SissionsManagement";
import UpcomingSessions from "./Features/sessions/UpcomingSessions";
import SuspendedSessions from "./Features/sessions/SuspendedSessions";
import RecordedSessions from "./Features/sessions/RecordedSessions";
import MentorRigister from "./Features/joinAsAMentor/MentorRigister";
import MentorRigisterForm from "./Features/joinAsAMentor/MentorRigisterForm";
import JoinAsMentor from "./Pages/JoinAsMentor";
import Status from "./Features/joinAsAMentor/Status";
import Chat from "./Pages/Chat";
import { ExperinceProvider } from "./contexts/useForm";
import { CertificateProvider } from "./contexts/useCirtificate";
import AppLayout from "./Features/Applayout/AppLayout";
import Settings from "./Features/settings/Settings";
import MyServices from "./Features/Sections/myServices/MyServices";
import Addservice from "./Features/Sections/myServices/Addservice";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { EducationProvider } from "./contexts/useEducation";
import PageNotFound from "./Features/PageNotFound";
import { UserDataProvider } from "./contexts/useUserData";

function App() {
  return (
    <>
      <ReactQueryDevtools />
      <UserDataProvider>
        <ExperinceProvider>
          <EducationProvider>
            <CertificateProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route index element={<Navigate replace to="explore" />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="myprofile" element={<MyProfile />}>
                      <Route index element={<Navigate to="about" />} />
                      <Route
                        path="about"
                        element={<MainContent edit={true} />}
                      />
                      <Route path="rates" element={<Rates />} />
                      <Route path="achivements" element={<Achivements />} />
                      <Route path="myServices" element={<MyServices />} />
                    </Route>
                    <Route path="/user" element={<User />}>
                      <Route index element={<Navigate to="about" />} />
                      <Route path="about" element={<MainContent />} />
                      <Route path="rates" element={<Rates />} />
                      <Route path="achivements" element={<Achivements />} />
                    </Route>
                    <Route path="sessions" element={<SissionsManagement />}>
                      <Route
                        index
                        element={<Navigate to="upcomingSessions" />}
                      />{" "}
                      <Route
                        path="upcomingSessions"
                        element={<UpcomingSessions />}
                      />
                      <Route
                        path="suspendedSessions"
                        element={<SuspendedSessions />}
                      />
                      <Route
                        path="recordedSessions"
                        element={<RecordedSessions />}
                      />
                    </Route>
                    <Route path="chat" element={<Chat />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="addservice" element={<Addservice />} />
                  </Route>
                  <Route path="joinAsMentor" element={<JoinAsMentor />}>
                    <Route index element={<Navigate to={"mentorRegester"} />} />
                    <Route path="mentorRegester" element={<MentorRigister />} />
                    <Route
                      path="mentorRegisterForm"
                      element={<MentorRigisterForm />}
                    />
                    <Route path="status" element={<Status status="review" />} />
                  </Route>
                  <Route path="signUp" element={<SignUp />} />
                  <Route path="login" element={<Login />} />
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route path="verify-email" element={<EmailVerification />} />
                  <Route path="reset-password" element={<ResetPassword />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </BrowserRouter>
              <ToastContainer
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                  success: {
                    duration: 2000,
                    theme: {
                      primary: "green",
                      secondary: "black",
                    },
                  },
                  error: {
                    duration: 3000,
                    theme: {
                      primary: "red",
                      secondary: "black",
                    },
                  },
                  style: {
                    fontSize: "16px",
                    maxWidth: "500px",
                    padding: "16px 24px",
                    backgroundColor: "var(--color-grey-0)",
                    color: "var(--color-grey-700)",
                  },
                }}
              />
            </CertificateProvider>
          </EducationProvider>
        </ExperinceProvider>
      </UserDataProvider>
    </>
  );
}

export default App;
