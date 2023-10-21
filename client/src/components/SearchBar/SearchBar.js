import React from "react";
import { Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import "./SearchBar.css";

const styles = `.search-background {
  background-color: whitesmoke;
  position: sticky;
  top: 4rem;
  z-index: 100;
}
.brewhubSearch-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.brewhubSearch-flex-title {
  color: #00704a;
  font-weight: 700;
}
.brewhubSearch-flex-searchText {
  flex: 0 1 50%;
}
.input-group {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #006241;
}
input[type="text"]#searchText {
  border: 0;
  background-color: transparent;
}
input[type="text"] {
  display: inline-lock;
  width: 100%;
  height: calc(2.4rem);
  padding: 0 0.4em;
  border: 1px solid #006241;
  font-size: 1.2rem;
}
input:focus {
  outline: none;
}
input::placeholder {
  text-align: center;
  font-size: 1rem;
}

/* for phones */
@media screen and (max-width: 450px) {
  .search-background {
    font-size: 1.3rem; /* Adjust as needed */
    height: 3rem;
  }
}

/* for tablets */
@media screen and (min-width: 415px) and (max-width: 1000px) {
  .search-background {
    font-size: 1.38rem; /* Adjust as needed */
    height: 3.5rem;
  }
}

/* for laptops */
@media screen and (min-width: 1000px) and (max-width: 1279px) {
  .search-background {
    font-size: 1.55rem; /* Adjust as needed */
    height: 3.9rem;
  }
}

/* for desktops (1280px and above) */
@media screen and (min-width: 1280px) {
  .search-background {
    font-size: 1.6rem; /* Adjust as needed */
    height: 5rem;
  }
}
`;
const SearchBar = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="search-background">
        <Container maxWidth="lg" className="brewhubSearch-flex">
          <div className="brewhubSearch-flex-title">Menu</div>
          <div className="brewhubSearch-flex-searchText">
            <div className="input-group">
              <input
                placeholder="Search menu"
                className="textbox"
                id="searchText"
                name="searchtext"
                type="text"
              />
              <SearchIcon sx={{ fontSize: "32px" }} />
            </div>
          </div>
          <div className="brewhubSearch-flex-empty"></div>
        </Container>
      </div>
    </>
  );
};

export default SearchBar;
