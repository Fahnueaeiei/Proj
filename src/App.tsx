import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, mapOutline, bookmarkOutline, personOutline } from 'ionicons/icons';

import Home from './pages/Home';
import Trip from './pages/Trip';
import Save from './pages/Save';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from "./pages/Login";
import EditProfile from './pages/EditProfile';

import '@ionic/react/css/core.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/home" component={Home} />
          <Route exact path="/trip" component={Trip} />
          <Route exact path="/save" component={Save} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/edit-profile" component={EditProfile} />

          <Redirect exact from="/" to="/home" />

        </IonRouterOutlet>

        <IonTabBar
          slot="bottom"
          className="custom-tabbar"
          style={{ display: window.location.pathname === '/register' ? 'none' : 'flex' }}
        >

          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="trip" href="/trip">
            <IonIcon icon={mapOutline} />
            <IonLabel>Trips</IonLabel>
          </IonTabButton>

          <IonTabButton tab="save" href="/save">
            <IonIcon icon={bookmarkOutline} />
            <IonLabel>Save</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={personOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;