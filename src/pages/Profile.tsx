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
    chevronBackOutline,
    personCircleOutline,
    informationCircleOutline,
    shieldCheckmarkOutline
} from "ionicons/icons";

import "./Profile.css";
import { useHistory } from 'react-router-dom';


const Profile: React.FC = () => {

    const history = useHistory();
    return (
        <IonPage>
            <IonContent fullscreen className="profile-content">

                {/* Custom Header */}
                <div className="profile-top">
                    <h2>Profile</h2>
                </div>

                {/* Profile Card */}
                <div className="profile-card">
                    <IonAvatar>
                        <img src="https://i.pravatar.cc/150?img=12" alt="avatar" />
                    </IonAvatar>

                    <div className="profile-info">
                        <h3>Ravindu Dilusha</h3>
                        <p>Moratuwa, Sri Lanka</p>
                    </div>
                </div>

                {/* Menu */}
                <div className="profile-menu">

                    <IonItem 
                        button 
                        detail={false}  
                        onClick={() => history.push('/edit-profile')}>
                        <IonIcon slot="start" icon={personCircleOutline} />
                        <IonLabel>Edit Profile</IonLabel>
                        <IonIcon slot="end" icon={chevronForwardOutline} />
                    </IonItem>

                    <IonItem
                        button
                        detail={false}
                    >
                        <IonIcon slot="start" icon={shieldCheckmarkOutline} />
                        <IonLabel>Privacy Policy</IonLabel>
                        <IonIcon slot="end" icon={chevronForwardOutline} />
                    </IonItem>

                    <IonItem 
                        button 
                        detail={false}>
                        <IonIcon slot="start" icon={informationCircleOutline} />
                        <IonLabel>Terms and Conditions</IonLabel>
                        <IonIcon slot="end" icon={chevronForwardOutline} />
                    </IonItem>

                </div>

                {/* Sign Out */}
                <div className="logout-container">
                    <IonButton expand="block" fill="outline" color="parimary">
                        <IonIcon icon={logOutOutline} slot="start" />
                        Sign Out
                    </IonButton>
                </div>

            </IonContent>
        </IonPage>
    );
};

export default Profile;