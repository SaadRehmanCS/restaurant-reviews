import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import AddReview from "./components/add-review";
import Header from "./components/header";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import Restaurant from "./components/restaurants";

function App() {
  
  const [user, setUser] = useState(null);
  
  const login = async (user = null) => {
    setUser(user);
  }

  return (
    <>
      <Header user={user} setUser={setUser} />
       
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          <Route
            path="/restaurants/:id/review"
            render={(props) => {
              <AddReview {...props} user={user} />
              }
            }
          />
          <Route 
            path="/restaurants/:id"
            render={(props) => {
              <Restaurant {...props} user={user} />
            }}
           />
           <Route 
              path="/login"
              render={(props) => {
                <Login {...props} login={login} />
              }}
             />
        </Switch>
      </div>
    </>
  )
}

export default App;
