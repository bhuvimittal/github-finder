import { useContext } from "react";
import { GithubContext } from "../context/context";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import styled from "styled-components";

function Info() {
  const { githubUser } = useContext(GithubContext);
  const { following, followers, public_repos, public_gists } = githubUser;

  const items = [
    {
      id: 1,
      color: "pink",
      value: public_repos,
      label: "repos",
      icon: <FileCopyIcon className="icon" />
    },
    {
      id: 2,
      color: "yellow",
      value: followers,
      label: "followers",
      icon: <PeopleAltIcon className="icon" />
    },
    {
      id: 3,
      color: "purple",
      value: following,
      label: "following",
      icon: <PersonAddIcon className="icon" />
    },
    {
      id: 4,
      color: "green",
      value: public_gists,
      label: "Gists",
      icon: <DeveloperModeIcon className="icon" />
    }
  ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        {items.map(item => (
          <article className="item" key={item.id}>
            <span className={item.color}>{item.icon}</span>
            <div>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          </article>
        ))}
      </Wrapper>
    </section>
  );
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--clr-primary-10);
      color: var(--clr-primary-5);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  }
`;

export default Info;
