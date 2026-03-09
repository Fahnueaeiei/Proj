import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonLoading,
  useIonToast
} from '@ionic/react';

import { calendarOutline, cloudUploadOutline } from 'ionicons/icons';
import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import './Add.css';

const AddTrip: React.FC = () => {
  const history = useHistory();
  const [present] = useIonToast();

  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);

  const isValid =
    tripName.trim() !== '' &&
    startDate !== '' &&
    endDate !== '' &&
    new Date(endDate) >= new Date(startDate);

  const handleAddTrip = async () => {
    if (!isValid) {
      present({
        message: 'Please fill all fields correctly',
        duration: 2000,
        color: 'danger'
      });
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, 'trips'), {
        name: tripName,
        startDate,
        endDate,
        budget: budget || 0,
        createdAt: serverTimestamp()
      });

      present({
        message: 'Trip created successfully!',
        duration: 2000,
        color: 'success'
      });

      history.push('/home');

    } catch (error) {
      present({
        message: 'Error creating trip',
        duration: 2000,
        color: 'danger'
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">
            Create New Trip
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {/* Upload Box */}
        <div className="upload-box">
          <IonIcon icon={cloudUploadOutline} size="large" />
          <p>Upload Trip Cover Image</p>
        </div>

        {/* Trip Name */}
        <IonItem className="custom-item">
          <IonLabel position="stacked">Trip Name</IonLabel>
          <IonInput
            value={tripName}
            placeholder="Enter trip name"
            onIonChange={e => setTripName(e.detail.value!)}
          />
        </IonItem>

        {/* Start Date */}
        <IonItem className="custom-item">
          <IonLabel position="stacked">Start Date</IonLabel>
          <IonInput
            type="date"
            value={startDate}
            onIonChange={e => setStartDate(e.detail.value!)}
          />
        </IonItem>

        {/* End Date */}
        <IonItem className="custom-item">
          <IonLabel position="stacked">End Date</IonLabel>
          <IonInput
            type="date"
            value={endDate}
            onIonChange={e => setEndDate(e.detail.value!)}
          />
        </IonItem>

        {/* Budget */}
        <IonItem className="custom-item">
          <IonLabel position="stacked">Trip Budget</IonLabel>
          <IonInput
            type="number"
            value={budget}
            placeholder="Enter your budget"
            onIonChange={e => setBudget(Number(e.detail.value))}
          />
        </IonItem>

        {/* Buttons */}
        <IonButton
          expand="block"
          className="next-btn"
          onClick={handleAddTrip}
          disabled={!isValid || loading}
        >
          Next
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          routerLink="/home"
        >
          Cancel
        </IonButton>

        <IonLoading isOpen={loading} message="Saving..." />

      </IonContent>
    </IonPage>
  );
};

export default AddTrip;