import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { UserProfileList } from "./userProfiles/userProfileList";
import { Home } from "./Home"
import { UserProfileDetails } from "./userProfiles/userProfileDetails";
import { CreateNewUser } from "./userProfiles/CreateNewUser";
import { ChoreList } from "./chores/ChoreList";
import { ChoreDetails } from "./chores/ChoreDetails";



export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<AuthorizedRoute loggedInUser={loggedInUser}>
            <Home />
          </AuthorizedRoute>
          }
        />
        <Route path="userprofiles">
          <Route index 
          element={<AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <UserProfileList loggedInUser={loggedInUser} />
          </AuthorizedRoute>
          }
          />
          <Route path=":id"
            element={<AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <UserProfileDetails />
            </AuthorizedRoute>
            }
          />
          <Route path="create"
            element={<AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <CreateNewUser loggedInUser={loggedInUser} />
            </AuthorizedRoute>
            }
          />
        </Route>

        <Route path="chores">

          <Route index 
          element={<AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <ChoreList loggedInUser={loggedInUser} />
          </AuthorizedRoute>
          }
          />
          <Route path=":id"
          element={<AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser} >
            <ChoreDetails  />
          </AuthorizedRoute>
          }
          />
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}