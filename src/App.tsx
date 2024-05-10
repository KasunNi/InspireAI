

import { withAuthenticator} from "@aws-amplify/ui-react";
import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from "@aws-amplify/ui-react-core";
import "@aws-amplify/ui-react/styles.css";
import { Route, Routes } from "react-router-dom";
import Todos from "./Todos";
import Home from "./Home";
import Quotes from "./Quotes";
import Profile from "./Profile";



type AppProps = {
  signOut?: UseAuthenticator["signOut"]; //() => void;
  user?: AuthUser;
};

const App: React.FC<AppProps> = ({  }) => {
  

 


  return (
    <Routes>
<Route path="/" element={ <Home></Home> }  />
    {/* Protected route that requires authentication */}
    <Route path="/todos" element={ <Todos></Todos> }  />
    <Route path="/quotes" element={ <Quotes></Quotes> }  />
    <Route path="/profile" element={ <Profile></Profile> }  />
  {/* Redirect to home if route not found */}
</Routes>
 );
};



export default withAuthenticator(App);