import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  useIonToast
} from '@ionic/react';

import { cloudUploadOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddTrip: React.FC = () => {
  const history = useHistory();
  const [present] = useIonToast();

  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState<number>(0);

  const handleNext = () => {
    if (!tripName || !startDate || !endDate) {
      present({
        message: 'Please fill all fields',
        duration: 2000,
        color: 'danger'
      });
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      present({
        message: 'End date must be after start date',
        duration: 2000,
        color: 'danger'
      });
      return;
    }

    history.push('/add-activity', {
      tripName,
      startDate,
      endDate,
      budget
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create New Trip</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <div className="upload-box">
          <IonIcon icon={cloudUploadOutline} size="large" />
          <p>Upload Trip Cover Image</p>
        </div>

        <IonItem>
          <IonLabel position="stacked">Trip Name</IonLabel>
          <IonInput value={tripName} onIonChange={e => setTripName(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Start Date</IonLabel>
          <IonInput type="date" value={startDate} onIonChange={e => setStartDate(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">End Date</IonLabel>
          <IonInput type="date" value={endDate} onIonChange={e => setEndDate(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Budget</IonLabel>
          <IonInput type="number" value={budget} onIonChange={e => setBudget(Number(e.detail.value || 0))} />
        </IonItem>

        <IonButton expand="block" onClick={handleNext}>
          Next
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default AddTrip;