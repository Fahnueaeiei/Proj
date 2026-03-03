import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonButton,
  IonFab,
  IonFabButton
} from "@ionic/react";
import { add } from "ionicons/icons";
import "./Home.css";

const Home: React.FC = () => {
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
                <h4>Welcome, Ravindu</h4>
                <p>Moratuwa, Sri Lanka</p>
              </div>
            </div>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Search Destination" />
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {/* WEATHER SECTION */}
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

        {/* TOP PLACES */}
        <section>
          <div className="section-header">
            <h2>Top Places</h2>
            <span>See More</span>
          </div>

          <div className="card-row">
            <IonCard>
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" />
              <IonCardContent>
                <h3>Nine Arch Bridge</h3>
                <p>Ella, Sri Lanka</p>
                <IonButton expand="block">Add to trip</IonButton>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" />
              <IonCardContent>
                <h3>Ella Rock</h3>
                <p>Ella, Sri Lanka</p>
                <IonButton expand="block">Add to trip</IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        </section>

        {/* TOP HOTELS */}
        <section>
          <div className="section-header">
            <h2>Top Hotels</h2>
            <span>See More</span>
          </div>

          <div className="card-row">
            <IonCard>
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945" />
            </IonCard>

            <IonCard>
              <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa" />
            </IonCard>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Home;