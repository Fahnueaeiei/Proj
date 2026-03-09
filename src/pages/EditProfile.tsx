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

import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

import "./EditProfile.css";

const EditProfile: React.FC = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, "profile", "user1");
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        setUsername(data.username || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setGender(data.gender || "");
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    await setDoc(doc(db, "profile", "user1"), {
      username,
      email,
      phone,
      gender
    });

    alert("Profile saved");
    history.goBack();
  };

  return (
    <IonPage>
      <IonContent fullscreen className="edit-content">

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
            <label className="form-label">Email</label>
            <IonInput
              className="custom-input"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <IonInput
              className="custom-input"
              value={phone}
              onIonChange={(e) => setPhone(e.detail.value!)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <IonInput
              className="custom-input"
              value={gender}
              onIonChange={(e) => setGender(e.detail.value!)}
            />
          </div>

        </div>

        <div className="button-section">

          <IonButton className="save-btn" onClick={handleSave}>
            Save
          </IonButton>

          <IonButton
            fill="outline"
            className="cancel-btn"
            onClick={() => history.goBack()}
          >
            Cancel
          </IonButton>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default EditProfile;