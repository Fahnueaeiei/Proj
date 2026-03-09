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
  IonCard,
  IonCardContent
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { db } from '../firebase';
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

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

  useEffect(() => {
    const fetchTrip = async () => {
      const tripRef = doc(db, 'trips', id);
      const tripSnap = await getDoc(tripRef);

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

  const handleActivityChange = (
    index: number,
    field: keyof Activity,
    value: string
  ) => {
    const updated = [...activities];
    updated[index][field] = value;
    setActivities(updated);
  };

  const handleAddActivity = () => {
    setActivities([
      ...activities,
      {
        title: '',
        time: '',
        location: ''
      }
    ]);
  };

  const handleUpdate = async () => {
    await updateDoc(doc(db, 'trips', id), {
      name,
      startDate,
      endDate,
      budget: Number(budget),
      activities
    });

    history.push('/trip');
  };

  const handleDeleteActivity = async (index: number) => {
    const updated = activities.filter((_, i) => i !== index);

    setActivities(updated);

    await updateDoc(doc(db, 'trips', id), {
      activities: updated
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/trip" />
          </IonButtons>

          <IonTitle>Edit Trip</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="edit-page ion-padding">

        <div className="edit-container">

          <IonItem className="edit-input">
            <IonLabel position="stacked">Trip Name</IonLabel>
            <IonInput
              value={name}
              onIonChange={(e) => setName(e.detail.value!)}
            />
          </IonItem>

          <IonItem className="edit-input">
            <IonLabel position="stacked">Start Date</IonLabel>
            <IonInput
              type="date"
              value={startDate}
              onIonChange={(e) => setStartDate(e.detail.value!)}
            />
          </IonItem>

          <IonItem className="edit-input">
            <IonLabel position="stacked">End Date</IonLabel>
            <IonInput
              type="date"
              value={endDate}
              onIonChange={(e) => setEndDate(e.detail.value!)}
            />
          </IonItem>

          <IonItem className="edit-input">
            <IonLabel position="stacked">Budget</IonLabel>
            <IonInput
              type="number"
              value={budget}
              onIonChange={(e) => setBudget(e.detail.value!)}
            />
          </IonItem>

          <div className="activity-header">
            <h2 className="section-title">Activities</h2>

            <IonButton
              size="small"
              fill="clear"
              className="add-activity-btn"
              onClick={handleAddActivity}
            >
              + Add
            </IonButton>
          </div>

          {activities.map((activity, index) => (
            <IonCard key={index} className="activity-card">
              <IonCardContent>

                <IonItem>
                  <IonLabel position="stacked">Title</IonLabel>
                  <IonInput
                    value={activity.title}
                    onIonChange={(e) =>
                      handleActivityChange(index, 'title', e.detail.value!)
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Time</IonLabel>
                  <IonInput
                    type="time"
                    value={activity.time}
                    onIonChange={(e) =>
                      handleActivityChange(index, 'time', e.detail.value!)
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Location</IonLabel>
                  <IonInput
                    value={activity.location}
                    onIonChange={(e) =>
                      handleActivityChange(index, 'location', e.detail.value!)
                    }
                  />
                </IonItem>

                <IonButton
                  color="danger"
                  size="small"
                  fill="outline"
                  className="small-delete"
                  onClick={() => handleDeleteActivity(index)}
                >
                  Delete
                </IonButton>

              </IonCardContent>
            </IonCard>
          ))}

          <div className="action-buttons">

            <IonButton
              expand="block"
              className="save-btn"
              onClick={handleUpdate}
            >
              Save Changes
            </IonButton>

            <IonButton
              expand="block"
              color="danger"
              className="delete-btn"
              onClick={() => setShowAlert(true)}
            >
              Delete Trip
            </IonButton>

          </div>

        </div>

        <IonAlert
          isOpen={showAlert}
          header="Delete Trip?"
          message="Are you sure you want to delete this trip?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Delete',
              role: 'destructive',
              handler: async () => {
                await deleteDoc(doc(db, 'trips', id));
                history.push('/trip');
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