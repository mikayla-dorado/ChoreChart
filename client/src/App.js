import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { tryGetLoggedInUser } from "./managers/authManager";
import { Spinner } from "reactstrap";
import NavBar from "./components/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import "./index.css"
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import "./index.css"

function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode) {
      setIsDarkMode(savedMode === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("dark-mode", newMode);
    console.log("Dark mode toggled:", newMode);
  };
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode) {
      setIsDarkMode(savedMode === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("dark-mode", newMode);
    console.log("Dark mode toggled:", newMode);
  };

  useEffect(() => {
    // user will be null if not authenticated
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);


  // wait to get a definite logged-in state before rendering
  if (loggedInUser === undefined) {
    return <Spinner />;
  }

  const additionalClass = "body";

  //className={isDarkMode ? "dark-mode" : ""}

  const additionalClass = "body";


  return (
    <div className={`${isDarkMode ? "dark-mode" : ""} ${additionalClass}`}>
    <div className={`${isDarkMode ? "dark-mode" : ""} ${additionalClass}`}>
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      {isDarkMode ? (
        <MdDarkMode className="mode-icon" onClick={toggleDarkMode} />
      ) : (
        <MdOutlineDarkMode className="mode-icon" onClick={toggleDarkMode} />
      )}
      {isDarkMode ? (
        <MdDarkMode className="mode-icon" onClick={toggleDarkMode} />
      ) : (
        <MdOutlineDarkMode className="mode-icon" onClick={toggleDarkMode} />
      )}
      <ApplicationViews
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
    </div>
    </div>
  );
}

export default App;
