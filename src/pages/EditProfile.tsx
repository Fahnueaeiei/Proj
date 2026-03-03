import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonIcon,
    IonAvatar
} from "@ionic/react";

import {chevronBackOutline} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./EditProfile.css";

const EditProfile: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage>
            <IonContent fullscreen className="edit-content">

                {/* Custom Header */}
                <div className="edit-top">
                    <IonIcon
                        icon={chevronBackOutline}
                        className="back-icon"
                        onClick={() => history.goBack()}
                    />
                    <h2>Edit Profile</h2>
                </div>

                {/* Avatar Section */}
                <div className="avatar-section">
                    <IonAvatar className="edit-avatar">
                        <img src="https://i.pravatar.cc/200?img=12" alt="profile" />
                    </IonAvatar>
                </div>
                <div className="form-section">

                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <IonInput className="custom-input" value="Ravindudilusha1" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <IonInput className="custom-input" value="Ravindudilusha1@gmail.com" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <IonInput className="custom-input" value="+94 77 110 0242" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Gender</label>
                        <IonInput className="custom-input" value="Male" />
                    </div>

                </div>

                {/* Buttons */}
                <div className="button-section">

                    <IonButton className="save-btn">
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