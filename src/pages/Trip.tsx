import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonSpinner
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

interface Activity {
  title: string;
  time: string;
  location: string;
}

interface TripType {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  image?: string;
  activities?: Activity[];
}

const Trip: React.FC = () => {
  const [trips, setTrips] = useState<TripType[]>([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    const q = query(collection(db, 'trips'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tripData = snapshot.docs.map(doc => ({
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

        {trips.map(trip => (
          <IonCard
            key={trip.id}
            onClick={() => history.push(`/trip-detail/${trip.id}`)}
          >
            <img
              src={trip.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'}
              alt={trip.name}
            />

            <IonCardContent>
              <h2>{trip.name}</h2>
              <p>{trip.startDate} - {trip.endDate}</p>
              <span>{trip.budget} THB</span>
              <p>{trip.activities?.length || 0} Activities</p>
            </IonCardContent>
          </IonCard>
        ))}

      </IonContent>
    </IonPage>
  );
};

export default Trip;