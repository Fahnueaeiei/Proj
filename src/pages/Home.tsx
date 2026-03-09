import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonButton
} from "@ionic/react";

import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  addDoc
} from "firebase/firestore";

import "./Home.css";
import { useHistory } from "react-router-dom";

interface Place {
  id: string;
  name: string;
  image: string;
  location: string;
}

const Home: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  const history = useHistory();

  const handleAddFavorite = async (place: Place) => {
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

  useEffect(() => {
    const fetchProfile = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const snap = await getDoc(doc(db, "profile", uid));

      if (snap.exists()) {
        const data = snap.data();
        setUsername(data.username || "");
      }
    };

    fetchProfile();

    const unsubscribe = onSnapshot(
      collection(db, "places"),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Place[];

        setPlaces(data);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <IonPage>
      <IonHeader className="home-header">
        <IonToolbar>

          <div className="header-container">
            <div className="user-info">
              <IonAvatar>
                <img src="https://i.pravatar.cc/100" alt="avatar" />
              </IonAvatar>

              <div>
                <h4>Welcome, {username}</h4>
                <p>Khon Kaen, Thailand</p>
              </div>
            </div>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Search Destination" />
          </div>

        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <section className="weather-section">
          <h2>Today's Weather</h2>

          <div className="weather-card">
            <div className="weather-left">
              <h1>28°C</h1>
              <p>Partly Cloudy</p>
              <span>Humidity: 65%</span>
            </div>

            <div className="weather-right">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
                alt="weather"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="section-header">
            <h2>Recommended Places</h2>
          </div>

          {loading && <p>Loading...</p>}

          <div className="card-row">
            {places.map(place => (
              <IonCard
                key={place.id}
                onClick={() => history.push(`/place/${place.id}`)}
              >
                <img src={place.image} alt={place.name} />

                <IonCardContent>
                  <h3>{place.name}</h3>
                  <p>{place.location}</p>

                  <IonButton
                    expand="block"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddFavorite(place);
                    }}
                  >
                    Add to Favorite
                  </IonButton>

                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </section>

      </IonContent>
    </IonPage>
  );
};

export default Home;