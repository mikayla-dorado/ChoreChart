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
import { CreateChore } from "./chores/CreateChore";
import { EditChore } from "./chores/EditChore";
import { EditUserProfile } from "./userProfiles/EditUserProfile";
import { CreateComments } from "./chores/CreateComments";


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
            element={<AuthorizedRoute loggedInUser={loggedInUser}>
              <UserProfileList loggedInUser={loggedInUser} />
            </AuthorizedRoute>
            }
          />
          <Route path=":id"
            element={<AuthorizedRoute loggedInUser={loggedInUser}>
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
          <Route path=":id/edit"
            element={<AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <EditUserProfile loggedInUser={loggedInUser} />
            </AuthorizedRoute>
            }
          />
        </Route>

        <Route path="chores">

          <Route index
            element={<AuthorizedRoute loggedInUser={loggedInUser}>
              <ChoreList loggedInUser={loggedInUser} />
            </AuthorizedRoute>
            }
          />
          <Route path=":id"
            element={<AuthorizedRoute loggedInUser={loggedInUser} >
              <ChoreDetails />
            </AuthorizedRoute>
            }
          />
          <Route path="create"
            element={<AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <CreateChore loggedInUser={loggedInUser} />
            </AuthorizedRoute>
            }
          />
          <Route path=":id/edit"
            element={<AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <EditChore loggedInUser={loggedInUser} />
            </AuthorizedRoute>
            }
          />
          <Route path=":id/comment"
            element={<AuthorizedRoute loggedInUser={loggedInUser}>
              <CreateComments loggedInUser={loggedInUser} />
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