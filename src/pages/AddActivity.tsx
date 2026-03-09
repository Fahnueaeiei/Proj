import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonBadge,
  IonNote,
  useIonToast,
  useIonAlert
} from '@ionic/react';

import { trash, addCircleOutline, checkmarkCircleOutline, calendarOutline, locationOutline, timeOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface Activity {
  id: string;
  title: string;
  time: string;
  location: string;
}

const AddActivity: React.FC = () => {
  const locationRouter = useLocation<any>();
  const history = useHistory();
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();

  const tripData = locationRouter.state;

  // ✅ ดึงรูปจาก sessionStorage
  const tripImage = sessionStorage.getItem('tripImage') || '';

  const [activities, setActivities] = useState<Activity[]>([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!tripData) {
    history.replace('/add');
    return null;
  }

  const isFormValid = title.trim().length > 0 && time.length > 0;

  const addActivity = () => {
    if (!isFormValid) {
      present({ message: 'Please enter an activity name and time.', duration: 1500, color: 'warning' });
      return;
    }

    setActivities(prev => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        title: title.trim(),
        time,
        location: location.trim()
      }
    ]);

    setTitle('');
    setTime('');
    setLocation('');
  };

  const removeActivity = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  const handleSaveTrip = () => {
    if (activities.length === 0) {
      presentAlert({
        header: 'No Activities',
        message: "You haven't added any activities. Save the trip anyway?",
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          { text: 'Save Anyway', handler: saveTrip }
        ]
      });
      return;
    }
    saveTrip();
  };

  const saveTrip = async () => {
    try {
      setIsSaving(true);
      const uid = auth.currentUser?.uid;

      if (!uid) {
        present({ message: 'You must be logged in.', duration: 2000, color: 'danger' });
        return;
      }

      const activitiesToSave = activities.map(({ id, ...rest }) => rest);

      await addDoc(collection(db, 'trips'), {
        uid,
        name: tripData.tripName,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        budget: tripData.budget,
        image: tripImage, // ✅ ดึงจาก sessionStorage
        activities: activitiesToSave,
        createdAt: serverTimestamp()
      });

      sessionStorage.removeItem('tripImage'); // ✅ ล้างหลัง save

      present({ message: 'Trip saved successfully!', duration: 1000, color: 'success' });
      setTimeout(() => { window.location.href = '/trip'; }, 800);

    } catch (error: any) {
      console.error(error);
      present({ message: `Save failed: ${error.message}`, duration: 3000, color: 'danger' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Activities</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {/* ✅ แสดงรูปจาก sessionStorage */}
        {tripImage && (
          <img
            src={tripImage}
            alt="trip"
            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '16px', marginBottom: '12px' }}
          />
        )}

        <h2 style={{ margin: '0 0 4px' }}>{tripData.tripName}</h2>
        <IonNote>
          <IonIcon icon={calendarOutline} style={{ verticalAlign: 'middle', marginRight: 4 }} />
          {tripData.startDate} – {tripData.endDate}
        </IonNote>
        <p style={{ marginTop: 4 }}>{Number(tripData.budget).toLocaleString()} THB</p>

        <hr style={{ margin: '16px 0', borderColor: 'var(--ion-color-light)' }} />

        <h3 style={{ marginBottom: 8 }}>New Activity</h3>

        <IonItem>
          <IonLabel position="stacked">Activity Name *</IonLabel>
          <IonInput
            placeholder="e.g. Visit Grand Palace"
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            <IonIcon icon={timeOutline} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Time *
          </IonLabel>
          <IonInput
            type="time"
            value={time}
            onIonChange={(e) => setTime(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            <IonIcon icon={locationOutline} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Location
          </IonLabel>
          <IonInput
            placeholder="e.g. Bangkok Old City"
            value={location}
            onIonChange={(e) => setLocation(e.detail.value!)}
          />
        </IonItem>

        <IonButton
          expand="block"
          style={{ marginTop: 12 }}
          disabled={!isFormValid}
          onClick={addActivity}
        >
          <IonIcon slot="start" icon={addCircleOutline} />
          Add Activity
        </IonButton>

        {activities.length > 0 ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 8px' }}>
              <h3 style={{ margin: 0, flex: 1 }}>Activities</h3>
              <IonBadge color="primary">{activities.length}</IonBadge>
            </div>

            {activities.map((item) => (
              <IonCard key={item.id}>
                <IonCardHeader style={{ paddingBottom: 0 }}>
                  <IonCardTitle style={{ fontSize: '1rem' }}>{item.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      {item.time && (
                        <p style={{ margin: '4px 0' }}>
                          <IonIcon icon={timeOutline} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                          {item.time}
                        </p>
                      )}
                      {item.location && (
                        <p style={{ margin: '4px 0' }}>
                          <IonIcon icon={locationOutline} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                          {item.location}
                        </p>
                      )}
                    </div>
                    <IonButton fill="clear" color="danger" size="small" onClick={() => removeActivity(item.id)}>
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--ion-color-medium)', marginTop: 24 }}>
            No activities yet — add one above.
          </p>
        )}

        <IonButton
          expand="block"
          color="warning"
          style={{ marginTop: 16 }}
          disabled={isSaving}
          onClick={handleSaveTrip}
        >
          <IonIcon slot="start" icon={checkmarkCircleOutline} />
          {isSaving ? 'Saving...' : 'Save Trip'}
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default AddActivity;