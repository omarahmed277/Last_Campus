import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Search from "../components/explore/Search";
import styles from "./Explore.module.css";
import Filter from "../components/explore/Filter";
import Catigories from "../components/explore/Catigories";
import ExploredMentors from "../components/explore/ExploredMentors";

function Explore({ curUser, users }) {
  const [query, setQuery] = useState("");
  return (
    <div className="container">
      <NavBar user={curUser} query={query} setQuery={setQuery} />
      <div className={styles.searchBar}>
        <Search />
        <Filter />
      </div>
      <div>
        <Catigories />
      </div>
      <ExploredMentors users={users} />
    </div>
  );
}

export default Explore;
