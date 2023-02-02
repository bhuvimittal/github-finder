import React, { useState, useEffect } from "react";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

function GithubProvider({ children }) {
  const [githubUser, setGithubUser] = useState();
  const [repos, setRepos] = useState();
  const [followers, setFollowers] = useState();

  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ msg: "", show: false });

  async function searchGithubUser(user) {
    handleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch(err =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { repos_url, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${repos_url}?per_page=100`),
        axios(`${followers_url}?per_page=100`)
      ])
        .then(results => {
          const [repos, followers] = results;
          if (repos.status === "fulfilled") {
            setRepos(repos.value.data);
          }
          if (followers.status === "fulfilled") {
            setFollowers(followers.value.data);
          }
        })
        .catch(err => console.log(err));
    } else {
      handleError(true, "User not found");
    }
    checkRequests();
    setIsLoading(false);
  }

  function checkRequests() {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining }
        } = data;
        setRequests(remaining);
        if (!remaining) {
          handleError(true, "Request Limit exceeded");
        }
      })
      .catch(err => console.log(err));
  }

  function handleError(show = false, msg = "") {
    setError({ show, msg });
  }

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading
      }}>
      {children}
    </GithubContext.Provider>
  );
}

export { GithubContext, GithubProvider };
