import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSpinner
} from "@ionic/react";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

interface Place {
  name: string;
  image: string;
  location: string;
  description: string;
  lat: number;
  lng: number;
}

const PlaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      const docRef = doc(db, "places", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPlace(docSnap.data() as Place);
      }

      setLoading(false);
    };

    fetchPlace();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{place?.name || "Place Detail"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {loading && <IonSpinner />}

        {place && (
          <>
            <img
              src={place.image}
              alt={place.name}
              style={{ width: "100%", borderRadius: "12px" }}
            />

            <h2 style={{ marginTop: "16px" }}>{place.name}</h2>
            <p>{place.location}</p>
            <p>{place.description}</p>
          </>
        )}

      </IonContent>
    </IonPage>
  );
};

export default PlaceDetail;