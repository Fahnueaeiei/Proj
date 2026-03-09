import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonIcon,
  IonAvatar
} from "@ionic/react";

import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import { auth, db } from "../firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

import "./EditProfile.css";

const EditProfile: React.FC = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const docRef = doc(db, "profile", uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        setUsername(data.username || "");
        setFullName(data.fullName || "");
        setEmail(data.email || "");
        setPhoneNumber(data.phoneNumber || "");
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    await setDoc(doc(db, "profile", uid), {
      username,
      fullName,
      email,
      phoneNumber
    });

    history.goBack();
  };

  const handleDelete = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    if (window.confirm("Delete profile?")) {
      await deleteDoc(doc(db, "profile", uid));
      window.location.href = "/login";
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="edit-content">

        <div className="profile-container">

          <div className="edit-top">
            <IonIcon
              icon={chevronBackOutline}
              className="back-icon"
              onClick={() => history.goBack()}
            />
            <h2>Edit Profile</h2>
          </div>

          <div className="avatar-section">
            <IonAvatar className="edit-avatar">
              <img src="https://i.pravatar.cc/200?img=12" alt="profile" />
            </IonAvatar>
          </div>

          <div className="form-section">

            <div className="form-group">
              <label className="form-label">Username</label>
              <IonInput
                className="custom-input"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <IonInput
                className="custom-input"
                value={fullName}
                readonly
                onIonChange={(e) => setFullName(e.detail.value!)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <IonInput
                className="custom-input"
                value={email}
                readonly
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <IonInput
                className="custom-input"
                value={phoneNumber}
                readonly
                onIonChange={(e) => setPhoneNumber(e.detail.value!)}
              />
            </div>

          </div>

          <div className="button-section">

            <IonButton className="save-btn" onClick={handleSave}>
              Save Changes
            </IonButton>

            <IonButton
              fill="outline"
              color="danger"
              className="delete-btn"
              onClick={handleDelete}
            >
              Delete Profile
            </IonButton>

          </div>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default EditProfile;