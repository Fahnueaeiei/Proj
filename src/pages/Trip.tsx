import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { db } from '../firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';

interface TripType {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
}

const Trip: React.FC = () => {
  const [trips, setTrips] = useState<TripType[]>([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const q = query(
      collection(db, 'trips'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tripData: TripType[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TripType[];

      setTrips(tripData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Trips</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {loading && <IonSpinner />}

        {!loading && trips.length === 0 && (
          <p>No trips yet. Create one!</p>
        )}

        <IonList>
          {trips.map(trip => (
            <IonItem
              button
              detail={true}
              key={trip.id}
              onClick={() => history.push(`/edit-trip/${trip.id}`)}
            >
              <IonLabel>
                <h2>{trip.name}</h2>
                <p>{trip.startDate} - {trip.endDate}</p>
                <p>Budget: {trip.budget} THB</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Trip;