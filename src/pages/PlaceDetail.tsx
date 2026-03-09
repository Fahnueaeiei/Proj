import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonSpinner
} from '@ionic/react';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { locationOutline, starOutline, pricetagOutline } from 'ionicons/icons';

import './PlaceDetail.css';

interface Place {
  name: string;
  image: string;
  location: string;
  description: string;
  category?: string;
  rating?: number;
}

const PlaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      const snap = await getDoc(doc(db, 'places', id));
      if (snap.exists()) setPlace(snap.data() as Place);
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
          <IonTitle>{place?.name || 'Place Detail'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="place-detail-page">

        {loading && (
          <div className="spinner-wrap">
            <IonSpinner />
          </div>
        )}

        {place && (
          <>
            {/* Hero */}
            <div className="hero-wrapper">
              <img src={place.image} alt={place.name} className="hero-image" />
              <div className="hero-overlay" />
              <div className="hero-text">
                <h1 className="hero-title">{place.name}</h1>
                <span className="hero-chip">
                  <IonIcon icon={locationOutline} />
                  {place.location}
                </span>
              </div>
            </div>

            <div className="detail-body">

              {/* Badges */}
              <div className="badge-row">
                {place.category && (
                  <div className="detail-badge">
                    <IonIcon icon={pricetagOutline} />
                    {place.category}
                  </div>
                )}
                {place.rating && (
                  <div className="detail-badge highlight">
                    <IonIcon icon={starOutline} />
                    {place.rating} / 5
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="info-section">
                <h2 className="section-title">About this place</h2>
                <p className="description-text">{place.description}</p>
              </div>

            </div>
          </>
        )}

      </IonContent>
    </IonPage>
  );
};

export default PlaceDetail;