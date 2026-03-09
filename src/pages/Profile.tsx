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
import { collection, query, where, getDocs } from 'firebase/firestore';

import "./Profile.css";

const Profile: React.FC = () => {
  const history = useHistory();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const currentEmail = auth.currentUser?.email;
      if (!currentEmail) return;

      const q = query(collection(db, 'profile'), where('email', '==', currentEmail));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const data = snap.docs[0].data();
        setFullName(data.fullName || '');
        setEmail(data.email || '');
      }
    };
    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = '/login';
  };

  const menuItems = [
    { icon: personCircleOutline, label: 'Edit Profile', path: '/edit-profile' },
    { icon: shieldCheckmarkOutline, label: 'Privacy Policy', path: '/privacy-policy' },
    { icon: informationCircleOutline, label: 'Terms and Conditions', path: '/terms-and-conditions' },
  ];

  return (
    <IonPage>
      <IonContent fullscreen className="profile-content">

        <div className="profile-header">
          <h1 className="profile-heading">Profile</h1>
        </div>

        <div className="profile-card">
          <div className="avatar-ring">
            <IonAvatar className="profile-avatar">
              <img src="https://i.pravatar.cc/150?img=12" alt="avatar" />
            </IonAvatar>
          </div>
          <div className="profile-info">
            <h3 className="profile-name">{fullName || '—'}</h3>
            <p className="profile-email">{email || '—'}</p>
          </div>
        </div>

        <div className="menu-section">
          <p className="menu-label">ACCOUNT</p>
          <div className="menu-card">
            {menuItems.map((item, index) => (
              <IonItem
                key={index}
                button
                detail={false}
                lines={index < menuItems.length - 1 ? 'inset' : 'none'}
                className="menu-item"
                onClick={() => history.push(item.path)}
              >
                <div className="menu-icon-wrap" slot="start">
                  <IonIcon icon={item.icon} />
                </div>
                <IonLabel>{item.label}</IonLabel>
                <IonIcon slot="end" icon={chevronForwardOutline} className="chevron-icon" />
              </IonItem>
            ))}
          </div>
        </div>

        <div className="logout-container">
          <IonButton
            expand="block"
            fill="outline"
            color="danger"
            className="logout-btn"
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