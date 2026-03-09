import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonFab,
  IonFabButton,
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

/* CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';
import PlaceDetail from './pages/PlaceDetail';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>

        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/trip" component={Trip} />
          <Route exact path="/add" component={AddTrip} />
          <Route exact path="/save" component={Save} />
          <Route exact path="/profile" component={Profile} />
          <Redirect exact from="/" to="/home" />
          <Route exact path="/place/:id" component={PlaceDetail} />
        </IonRouterOutlet>

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