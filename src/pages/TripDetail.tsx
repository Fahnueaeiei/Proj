import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Activity {
  title: string;
  time: string;
  location: string;
}

interface TripType {
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  image?: string;
  activities?: Activity[];
}

const TripDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [trip, setTrip] = useState<TripType | null>(null);

  useEffect(() => {
    const fetchTrip = async () => {
      const tripRef = doc(db, 'trips', id);
      const tripSnap = await getDoc(tripRef);

      if (tripSnap.exists()) {
        setTrip(tripSnap.data() as TripType);
      }
    };

    fetchTrip();
  }, [id]);

  if (!trip) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/trip" />
          </IonButtons>

          <IonTitle>Trip Detail</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonCard>
          <img
            src={
              trip.image ||
              'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
            }
            alt={trip.name}
          />

          <IonCardContent>
            <h2>{trip.name}</h2>

            <p>
              {trip.startDate} - {trip.endDate}
            </p>

            <p>{trip.budget} THB</p>
          </IonCardContent>
        </IonCard>

        <h2>Activities</h2>

        {trip.activities?.map((activity, index) => (
          <IonCard key={index}>
            <IonCardContent>
              <h3>{activity.title}</h3>
              <p>{activity.time}</p>
              <p>{activity.location}</p>
            </IonCardContent>
          </IonCard>
        ))}

        <IonButton
          expand="block"
          onClick={() => history.push(`/edit-trip/${id}`)}
        >
          Edit Trip
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default TripDetail;