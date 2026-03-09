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
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { useHistory } from "react-router-dom";
import { getWeather } from "../services/weatherServices";

import "./Home.css";

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
  const [weather, setWeather] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const history = useHistory();

  const handleAddFavorite = async (place: Place) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const q = query(
      collection(db, "favorites"),
      where("uid", "==", uid),
      where("placeId", "==", place.id)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      history.push("/save");
      return;
    }

    await addDoc(collection(db, "favorites"), {
      uid,
      placeId: place.id,
      name: place.name,
      image: place.image,
      location: place.location
    });

    history.push("/save");
  };

  const getCustomIcon = () => {
    const temp = weather?.list?.[0]?.main?.temp;
    const condition = weather?.list?.[0]?.weather?.[0]?.main;

    if (temp >= 33) {
      return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
    }

    if (condition === "Rain") {
      return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
    }

    if (condition === "Clouds") {
      return "https://cdn-icons-png.flaticon.com/512/414/414927.png";
    }

    return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather();
      setWeather(data);
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    const uid = auth.currentUser?.uid;

    let unsubscribeFavorites = () => {};
    let unsubscribePlaces = () => {};

    if (uid) {
      const q = query(
        collection(db, "favorites"),
        where("uid", "==", uid)
      );

      unsubscribeFavorites = onSnapshot(q, (snapshot) => {
        const ids = snapshot.docs.map(doc => doc.data().placeId);
        setFavorites(ids);
      });

      const fetchProfile = async () => {
        const snap = await getDoc(doc(db, "profile", uid));

        if (snap.exists()) {
          const data = snap.data();
          setUsername(data.username || "");
        }
      };

      fetchProfile();
    }

    unsubscribePlaces = onSnapshot(
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

    return () => {
      unsubscribeFavorites();
      unsubscribePlaces();
    };
  }, []);

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader className="home-header">
        <IonToolbar>

          <div className="header-container">
            <div className="user-info">
              <IonAvatar>
                <img src="https://i.pravatar.cc/150?img=12" alt="avatar" />
              </IonAvatar>

              <div>
                <h4>Welcome, {username}</h4>
                <p>Khon Kaen, Thailand</p>
              </div>
            </div>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Destination"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {/* WEATHER */}
        <section className="weather-section">
          <h2>Today's Weather</h2>

          <div className="weather-card">

            <div className="weather-left">
              <h1>
                {weather?.list?.[0]?.main?.temp
                  ? Math.round(weather.list[0].main.temp)
                  : "--"}°C
              </h1>

              <p>
                {weather?.list?.[0]?.weather?.[0]?.main || "Loading..."}
              </p>

              <span>
                Humidity: {weather?.list?.[0]?.main?.humidity ?? "--"}%
              </span>
            </div>

            <div className="weather-right">
              <img src={getCustomIcon()} alt="weather" />
            </div>

          </div>
        </section>

        {/* PLACES */}
        <section>
          <div className="section-header">
            <h2>Recommended Places</h2>
          </div>

          {loading && <p>Loading...</p>}

          {!loading && filteredPlaces.length === 0 && (
            <p>No places found</p>
          )}

          <div className="card-row">
            {filteredPlaces.map(place => (
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
                    disabled={favorites.includes(place.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddFavorite(place);
                    }}
                  >
                    {favorites.includes(place.id)
                      ? "Saved"
                      : "Add to Favorite"}
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