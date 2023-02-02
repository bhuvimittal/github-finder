import { useContext } from "react";
import { GithubContext } from "../context/context";
import Search from "../components/Search";
import Info from "../components/Info";
import User from "../components/User";
import Repos from "../components/Repos";
import loaderImg from "../images/preloader.gif";

function Dashboard() {
  const { isLoading, githubUser } = useContext(GithubContext);

  if (isLoading) {
    return (
      <main>
        <Search />
        <img src={loaderImg} alt="loader" className="loading-img" />
      </main>
    );
  }

  if (!githubUser) {
    return (
      <main>
        <Search />
      </main>
    );
  }

  return (
    <main>
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
}

export default Dashboard;
