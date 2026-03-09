import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  useIonToast
} from '@ionic/react';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

interface Activity {
  title: string;
  time: string;
  location: string;
}

const AddActivity: React.FC = () => {
  const locationRouter = useLocation<any>();
  const [present] = useIonToast();

  const tripData = locationRouter.state || {};

  const [activities, setActivities] = useState<Activity[]>([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const addActivity = () => {
    if (!title || !time) return;

    setActivities([
      ...activities,
      {
        title,
        time,
        location
      }
    ]);

    setTitle('');
    setTime('');
    setLocation('');
  };

  const saveTrip = async () => {
    try {
      await addDoc(collection(db, 'trips'), {
        name: tripData.tripName,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        budget: tripData.budget,
        activities,
        createdAt: serverTimestamp()
      });

      present({
        message: 'Trip saved successfully!',
        duration: 2000,
        color: 'success'
      });

      setTimeout(() => {
        window.location.href = '/trip';
      }, 300);

    } catch (error) {
      present({
        message: 'Error saving trip',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Activities</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <h2>{tripData.tripName || 'Trip'}</h2>

        <IonItem>
          <IonLabel position="stacked">Activity Name</IonLabel>
          <IonInput
            value={title}
            onIonChange={e => setTitle(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Time</IonLabel>
          <IonInput
            type="time"
            value={time}
            onIonChange={e => setTime(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Location</IonLabel>
          <IonInput
            value={location}
            onIonChange={e => setLocation(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" onClick={addActivity}>
          Add Activity
        </IonButton>

        {activities.map((item, index) => (
          <IonCard key={index}>
            <IonCardContent>
              <h3>{item.title}</h3>
              <p>{item.time}</p>
              <p>{item.location}</p>
            </IonCardContent>
          </IonCard>
        ))}

        <IonButton expand="block" color="warning" onClick={saveTrip}>
          Save Trip
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default AddActivity;