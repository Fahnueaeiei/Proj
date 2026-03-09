import { Redirect, Route, Switch } from 'react-router-dom';
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


import '@ionic/react/css/core.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* ใช้ IonTabs ครอบเฉพาะส่วนที่ต้องการแสดง Tab Bar */}
      <IonTabs>
        <IonRouterOutlet>
          {/* หน้าที่ "ไม่มี" Tab Bar ให้วางไว้นอก IonTabs (ถ้าทำได้) 
              แต่ถ้าอยากใช้ URL ปกติ ให้วางรวมกันแล้วจัดการที่ IonTabBar */}
          <Route exact path="/register" component={Register} />
          
          <Route exact path="/home" component={Home} />
          <Route exact path="/trip" component={Trip} />
          <Route exact path="/save" component={Save} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>

        {/* เทคนิค: ใช้ความสามารถของ CSS ซ่อน Tab Bar ในหน้า Register */}
        <IonTabBar slot="bottom" className="custom-tabbar" 
          style={{ display: window.location.pathname === '/register' ? 'none' : 'flex' }}>
          
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