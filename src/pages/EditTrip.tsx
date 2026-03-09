import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonAlert
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { db } from '../firebase';
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

import './EditTrip.css';

const EditTrip: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      const tripRef = doc(db, 'trips', id);
      const tripSnap = await getDoc(tripRef);

      if (tripSnap.exists()) {
        const data = tripSnap.data();

        setName(data.name || '');
        setStartDate(data.startDate || '');
        setEndDate(data.endDate || '');
        setBudget(String(data.budget || ''));
      }
    };

    fetchTrip();
  }, [id]);

  const handleUpdate = async () => {
    await updateDoc(doc(db, 'trips', id), {
      name,
      startDate,
      endDate,
      budget: Number(budget)
    });

    history.push('/trip');
  };

  const handleDelete = () => {
    setShowAlert(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/trip" />
          </IonButtons>
          <IonTitle>Edit Trip</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="edit-page">

        <IonItem className="edit-input">
          <IonLabel position="stacked">Trip Name</IonLabel>
          <IonInput
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>

        <IonItem className="edit-input">
          <IonLabel position="stacked">Start Date</IonLabel>
          <IonInput
            type="date"
            value={startDate}
            onIonChange={(e) => setStartDate(e.detail.value!)}
          />
        </IonItem>

        <IonItem className="edit-input">
          <IonLabel position="stacked">End Date</IonLabel>
          <IonInput
            type="date"
            value={endDate}
            onIonChange={(e) => setEndDate(e.detail.value!)}
          />
        </IonItem>

        <IonItem className="edit-input">
          <IonLabel position="stacked">Budget</IonLabel>
          <IonInput
            type="number"
            value={budget}
            onIonChange={(e) => setBudget(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" className="save-btn" onClick={handleUpdate}>
          Save Changes
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete Trip
        </IonButton>

        <IonAlert
          isOpen={showAlert}
          header="Delete Trip?"
          message="Are you sure you want to delete this trip?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Delete',
              role: 'destructive',
              handler: async () => {
                await deleteDoc(doc(db, 'trips', id));
                history.push('/trip');
              }
            }
          ]}
          onDidDismiss={() => setShowAlert(false)}
        />

      </IonContent>
    </IonPage>
  );
};

export default EditTrip;