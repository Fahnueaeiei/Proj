import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonChip
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
    calendarOutline,
    cashOutline,
    timeOutline,
    locationOutline,
    createOutline,
    walletOutline
} from 'ionicons/icons';

import './TripDetail.css';

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

const FALLBACK = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=60';

const TripDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [trip, setTrip] = useState<TripType | null>(null);

    useEffect(() => {
        const fetchTrip = async () => {
            const snap = await getDoc(doc(db, 'trips', id));
            if (snap.exists()) setTrip(snap.data() as TripType);
        };
        fetchTrip();
    }, [id]);

    if (!trip) return null;

    return (
        <IonPage>
            <IonHeader className="detail-header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/trip" />
                    </IonButtons>
                    <IonTitle>Trip Detail</IonTitle>  
                </IonToolbar>
            </IonHeader>

            <IonContent className="trip-detail-page">

                {/* Hero Image */}
                <div className="hero-wrapper">
                    <img
                        src={trip.image || FALLBACK}
                        alt={trip.name}
                        className="hero-image"
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                    />
                    <div className="hero-overlay" />
                    <div className="hero-text">
                        <h1 className="hero-title">{trip.name}</h1>
                        <div className="hero-chips">
                            <span className="hero-chip">
                                <IonIcon icon={calendarOutline} />
                                {trip.startDate} – {trip.endDate}
                            </span>
                            <span className="hero-chip">
                                <IonIcon icon={walletOutline} />
                                {Number(trip.budget).toLocaleString()} THB
                            </span>
                        </div>
                    </div>
                </div>

                <div className="detail-body">

                    {/* Activities */}
                    <div className="section-header">
                        <h2 className="section-title">Activities</h2>
                        <IonChip color="primary" outline>
                            {trip.activities?.length || 0} total
                        </IonChip>
                    </div>

                    {!trip.activities?.length && (
                        <div className="empty-state">
                            <p>No activities added yet.</p>
                        </div>
                    )}

                    {trip.activities?.map((activity, index) => (
                        <div key={index} className="activity-card">
                            <div className="activity-index">{String(index + 1).padStart(2, '0')}</div>
                            <div className="activity-content">
                                <h3 className="activity-title">{activity.title}</h3>
                                <div className="activity-meta">
                                    {activity.time && (
                                        <span className="meta-item">
                                            <IonIcon icon={timeOutline} />
                                            {activity.time}
                                        </span>
                                    )}
                                    {activity.location && (
                                        <span className="meta-item">
                                            <IonIcon icon={locationOutline} />
                                            {activity.location}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Edit Button */}
                    <IonButton
                        expand="block"
                        className="edit-trip-btn"
                        onClick={() => history.push(`/edit-trip/${id}`)}
                    >
                        <IonIcon slot="start" icon={createOutline} />
                        Edit Trip
                    </IonButton>

                </div>
            </IonContent>
        </IonPage>
    );
};

export default TripDetail;