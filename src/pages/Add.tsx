import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonNote,
  useIonToast
} from '@ionic/react';

import { cloudUploadOutline, calendarOutline, cashOutline, airplaneOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Add.css';

const AddTrip: React.FC = () => {
  const history = useHistory();
  const [present] = useIonToast();

  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState<number | ''>('');
  const [preview, setPreview] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const isValid = tripName.trim() && startDate && endDate && endDate >= startDate;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      const MAX = 800;
      let { width, height } = img;

      if (width > MAX || height > MAX) {
        if (width > height) {
          height = (height / width) * MAX;
          width = MAX;
        } else {
          width = (width / height) * MAX;
          height = MAX;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);

      const compressed = canvas.toDataURL('image/jpeg', 0.7);
      setPreview(compressed);
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(file);
  };

  const handleNext = () => {
    if (!isValid) {
      present({
        message: !tripName.trim()
          ? 'Please enter a trip name.'
          : !startDate || !endDate
          ? 'Please select start and end dates.'
          : 'End date must be after start date.',
        duration: 2000,
        color: 'warning'
      });
      return;
    }

    // ✅ เก็บรูปใน sessionStorage แยกต่างหาก
    if (preview) {
      sessionStorage.setItem('tripImage', preview);
    } else {
      sessionStorage.removeItem('tripImage');
    }

    history.push('/add-activity', {
      tripName: tripName.trim(),
      startDate,
      endDate,
      budget: budget || 0
      // ไม่ส่ง image ผ่าน state
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create New Trip</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <label className="upload-box" style={{ cursor: 'pointer' }}>
          {preview ? (
            <img
              src={preview}
              alt="preview"
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '14px' }}
            />
          ) : (
            <>
              <IonIcon icon={cloudUploadOutline} size="large" />
              <p>Upload Trip Cover Image</p>
              <IonNote>Tap to choose a photo</IonNote>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </label>

        <IonItem>
          <IonLabel position="stacked">
            <IonIcon icon={airplaneOutline} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Trip Name *
          </IonLabel>
          <IonInput
            placeholder="e.g. Phuket Summer Trip"
            value={tripName}
            onIonChange={(e) => setTripName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            <IonIcon icon={calendarOutline} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Start Date *
          </IonLabel>
          <IonInput
            type="date"
            min={today}
            value={startDate}
            onIonChange={(e) => {
              setStartDate(e.detail.value!);
              if (endDate && e.detail.value! > endDate) setEndDate('');
            }}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            <IonIcon icon={calendarOutline} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            End Date *
          </IonLabel>
          <IonInput
            type="date"
            min={startDate || today}
            value={endDate}
            onIonChange={(e) => setEndDate(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            <IonIcon icon={cashOutline} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Budget (THB)
          </IonLabel>
          <IonInput
            type="number"
            placeholder="0"
            min={0}
            value={budget}
            onIonChange={(e) => setBudget(e.detail.value ? Number(e.detail.value) : '')}
          />
        </IonItem>

        <IonButton
          expand="block"
          style={{ marginTop: 24 }}
          disabled={!isValid}
          onClick={handleNext}
        >
          Next →
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default AddTrip;