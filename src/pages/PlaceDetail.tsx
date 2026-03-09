import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonButton
} from "@ionic/react";

import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import { db, auth } from "../firebase";
import {
  doc,
  getDoc,
  addDoc,
  collection
} from "firebase/firestore";

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
  const history = useHistory();

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

  const handleAddFavorite = async () => {
    if (!place) return;

    const uid = auth.currentUser?.uid;
    if (!uid) return;

    await addDoc(collection(db, "favorites"), {
      uid,
      name: place.name,
      image: place.image,
      location: place.location
    });

    history.push("/save");
  };

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
              style={{
                width: "100%",
                borderRadius: "16px",
                marginBottom: "20px"
              }}
            />

            <h2>{place.name}</h2>

            <p>{place.location}</p>

            <p>{place.description}</p>

            <IonButton
              expand="block"
              onClick={handleAddFavorite}
            >
              Add to Favorite
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              href={`https://www.google.com/maps?q=${place.lat},${place.lng}`}
              target="_blank"
            >
              Open in Maps
            </IonButton>
          </>
        )}

      </IonContent>
    </IonPage>
  );
};

export default PlaceDetail;