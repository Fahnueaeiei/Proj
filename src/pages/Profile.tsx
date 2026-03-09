import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonIcon,
  IonAvatar,
  IonButton
} from "@ionic/react";

import {
  logOutOutline,
  chevronForwardOutline,
  personCircleOutline,
  informationCircleOutline,
  shieldCheckmarkOutline
} from "ionicons/icons";

import { useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import "./Profile.css";

const Profile: React.FC = () => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'profile', 'user1');
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        setUsername(data.username || '');
        setEmail(data.email || '');
      }
    };

    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    history.replace('/login');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="profile-content">

        <div className="profile-top">
          <h2>Profile</h2>
        </div>

        <div className="profile-card">
          <IonAvatar>
            <img src="https://i.pravatar.cc/150?img=12" alt="avatar" />
          </IonAvatar>

          <div className="profile-info">
            <h3>{username}</h3>
            <p>{email}</p>
          </div>
        </div>

        <div className="profile-menu">

          <IonItem
            button
            detail={false}
            onClick={() => history.push('/edit-profile')}
          >
            <IonIcon slot="start" icon={personCircleOutline} />
            <IonLabel>Edit Profile</IonLabel>
            <IonIcon slot="end" icon={chevronForwardOutline} />
          </IonItem>

          <IonItem button detail={false}>
            <IonIcon slot="start" icon={shieldCheckmarkOutline} />
            <IonLabel>Privacy Policy</IonLabel>
            <IonIcon slot="end" icon={chevronForwardOutline} />
          </IonItem>

          <IonItem button detail={false}>
            <IonIcon slot="start" icon={informationCircleOutline} />
            <IonLabel>Terms and Conditions</IonLabel>
            <IonIcon slot="end" icon={chevronForwardOutline} />
          </IonItem>

        </div>

        <div className="logout-container">
          <IonButton
            expand="block"
            fill="outline"
            color="primary"
            onClick={handleSignOut}
          >
            <IonIcon icon={logOutOutline} slot="start" />
            Sign Out
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Profile;