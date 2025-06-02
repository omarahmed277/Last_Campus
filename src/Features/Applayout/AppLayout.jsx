import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../NavBar/NavBar";
import { useUserData } from "../../contexts/useUserData";
const StyledAppLayout = styled.div`
  padding: 2.5vw 4.3vw;
  position: relative;
` 

function AppLayout() {
const {currentUser}=useUserData();

  return (
    <StyledAppLayout>
      <NavBar user={currentUser} />
      <main>
        <Outlet />
      </main>
    </StyledAppLayout>
  );
}

export default AppLayout;
