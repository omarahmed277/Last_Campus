import { useEffect } from "react";
import Search from "../Features/explore/Search";
import styles from "./Explore.module.css";
import Filter from "../Features/explore/Filter";
import Catigories from "../Features/explore/Catigories";
import ExploredMentors from "../Features/explore/ExploredMentors";
import { useNavigate } from "react-router-dom";

function Explore() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [localStorage.length]);

  return (
    <>
      <div className={styles.searchBar}>
        <Search />
        <Filter />
      </div>
      <div>
        <Catigories />
      </div>
      <ExploredMentors />
    </>
  );
}

export default Explore;
