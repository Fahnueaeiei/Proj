import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonAlert,
  IonIcon
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import {
  addOutline,
  trashOutline,
  saveOutline,
  timeOutline,
  locationOutline,
  textOutline
} from 'ionicons/icons';

import './EditTrip.css';

interface Activity {
  title: string;
  time: string;
  location: string;
}

const EditTrip: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      const tripSnap = await getDoc(doc(db, 'trips', id));
      if (tripSnap.exists()) {
        const data = tripSnap.data();
        setName(data.name || '');
        setStartDate(data.startDate || '');
        setEndDate(data.endDate || '');
        setBudget(String(data.budget || ''));
        setActivities(data.activities || []);
      }
    };
    fetchTrip();
  }, [id]);

  const handleActivityChange = (index: number, field: keyof Activity, value: string) => {
    const updated = [...activities];
    updated[index][field] = value;
    setActivities(updated);
  };

  const handleAddActivity = () => {
    setActivities([...activities, { title: '', time: '', location: '' }]);
  };

  const handleDeleteActivity = async (index: number) => {
    const updated = activities.filter((_, i) => i !== index);
    setActivities(updated);
    await updateDoc(doc(db, 'trips', id), { activities: updated });
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    await updateDoc(doc(db, 'trips', id), {
      name,
      startDate,
      endDate,
      budget: Number(budget),
      activities
    });
    setIsSaving(false);
    history.replace('/trip');
  };

  return (
    <IonPage>
      <IonHeader className="edit-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/trip" />
          </IonButtons>
          <IonTitle>Edit Trip</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="edit-page ion-padding">
        <div className="edit-container">

          {/* Trip Info Section */}
          <div className="section-card">
            <p className="section-label">TRIP INFO</p>

            <div className="field-group">
              <label className="field-label">Trip Name</label>
              <IonItem lines="none" className="styled-item">
                <IonInput
                  value={name}
                  placeholder="e.g. Phuket Summer Trip"
                  onIonChange={(e) => setName(e.detail.value!)}
                />
              </IonItem>
            </div>

            <div className="field-row">
              <div className="field-group half">
                <label className="field-label">Start Date</label>
                <IonItem lines="none" className="styled-item">
                  <IonInput
                    type="date"
                    value={startDate}
                    onIonChange={(e) => setStartDate(e.detail.value!)}
                  />
                </IonItem>
              </div>
              <div className="field-group half">
                <label className="field-label">End Date</label>
                <IonItem lines="none" className="styled-item">
                  <IonInput
                    type="date"
                    value={endDate}
                    onIonChange={(e) => setEndDate(e.detail.value!)}
                  />
                </IonItem>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Budget (THB)</label>
              <IonItem lines="none" className="styled-item">
                <IonInput
                  type="number"
                  value={budget}
                  placeholder="0"
                  onIonChange={(e) => setBudget(e.detail.value!)}
                />
              </IonItem>
            </div>
          </div>

          {/* Activities Section */}
          <div className="activities-header">
            <p className="section-label">ACTIVITIES</p>
            <button className="add-chip" onClick={handleAddActivity}>
              <IonIcon icon={addOutline} />
              Add
            </button>
          </div>

          {activities.length === 0 && (
            <div className="empty-activities">
              <p>No activities yet</p>
            </div>
          )}

          {activities.map((activity, index) => (
            <div key={index} className="activity-card">
              <div className="activity-number">#{index + 1}</div>

              <div className="activity-fields">
                <div className="activity-field">
                  <IonIcon icon={textOutline} className="field-icon" />
                  <IonItem lines="none" className="styled-item activity-item">
                    <IonLabel position="stacked">Title</IonLabel>
                    <IonInput
                      value={activity.title}
                      placeholder="Activity name"
                      onIonChange={(e) => handleActivityChange(index, 'title', e.detail.value!)}
                    />
                  </IonItem>
                </div>

                <div className="activity-row">
                  <div className="activity-field half-field">
                    <IonIcon icon={timeOutline} className="field-icon" />
                    <IonItem lines="none" className="styled-item activity-item">
                      <IonLabel position="stacked">Time</IonLabel>
                      <IonInput
                        type="time"
                        value={activity.time}
                        onIonChange={(e) => handleActivityChange(index, 'time', e.detail.value!)}
                      />
                    </IonItem>
                  </div>

                  <div className="activity-field half-field">
                    <IonIcon icon={locationOutline} className="field-icon" />
                    <IonItem lines="none" className="styled-item activity-item">
                      <IonLabel position="stacked">Location</IonLabel>
                      <IonInput
                        value={activity.location}
                        placeholder="Place"
                        onIonChange={(e) => handleActivityChange(index, 'location', e.detail.value!)}
                      />
                    </IonItem>
                  </div>
                </div>
              </div>

              <button className="delete-activity-btn" onClick={() => handleDeleteActivity(index)}>
                <IonIcon icon={trashOutline} />
              </button>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="action-buttons">
            <IonButton
              expand="block"
              className="save-btn"
              disabled={isSaving}
              onClick={handleUpdate}
            >
              <IonIcon slot="start" icon={saveOutline} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              color="danger"
              className="delete-btn"
              onClick={() => setShowAlert(true)}
            >
              <IonIcon slot="start" icon={trashOutline} />
              Delete Trip
            </IonButton>
          </div>

        </div>

        <IonAlert
          isOpen={showAlert}
          header="Delete Trip?"
          message="This action cannot be undone."
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            {
              text: 'Delete',
              role: 'destructive',
              handler: async () => {
                await deleteDoc(doc(db, 'trips', id));
                history.replace('/trip');
              }
            }
          ]}
          onDidDismiss={() => setShowAlert(false)}
        />

      </IonContent>
    </IonPage>
  );
};

export default EditTrip;