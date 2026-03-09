import { Redirect, Route, useLocation } from 'react-router-dom';
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

import {
  homeOutline,
  mapOutline,
  bookmarkOutline,
  personOutline,
  add
} from 'ionicons/icons';

import Home from './pages/Home';
import Trip from './pages/Trip';
import Save from './pages/Save';
import Profile from './pages/Profile';
import AddTrip from './pages/Add';
import EditTrip from './pages/EditTrip';
import PlaceDetail from './pages/PlaceDetail';
import EditProfile from './pages/EditProfile';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AddActivity from './pages/AddActivity';
import TripDetail from './pages/TripDetail';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const AppContent: React.FC = () => {
  const location = useLocation();

  const hideTabBar =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname.includes('/edit-trip') ||
    location.pathname.includes('/edit-profile') ||
    location.pathname.includes('/add-activity');

  return (
    <IonTabs>

      <IonRouterOutlet>

        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />

        <Route exact path="/home" component={Home} />
        <Route exact path="/trip" component={Trip} />
        <Route exact path="/add" component={AddTrip} />
        <Route exact path="/add-activity" component={AddActivity} />
        <Route exact path="/save" component={Save} />
        <Route exact path="/profile" component={Profile} />

        <Route exact path="/place/:id" component={PlaceDetail} />
        <Route exact path="/edit-trip/:id" component={EditTrip} />
        <Route exact path="/edit-profile" component={EditProfile} />
        <Route exact path="/trip-detail/:id" component={TripDetail} />

        <Redirect exact from="/" to="/login" />

      </IonRouterOutlet>

      {!hideTabBar && (
        <IonTabBar slot="bottom" className="custom-tabbar">

          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="trip" href="/trip">
            <IonIcon icon={mapOutline} />
            <IonLabel>Trips</IonLabel>
          </IonTabButton>

          <IonTabButton tab="add" href="/add">
            <IonIcon icon={add} />
            <IonLabel>Add Trip</IonLabel>
          </IonTabButton>

          <IonTabButton tab="Favorite" href="/save">
            <IonIcon icon={bookmarkOutline} />
            <IonLabel>Favorite</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={personOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>

        </IonTabBar>
      )}

    </IonTabs>
  );
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppContent />
    </IonReactRouter>
  </IonApp>
);

export default App;