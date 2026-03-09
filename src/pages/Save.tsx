import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc
} from 'firebase/firestore';

import './Save.css';

interface FavoriteItem {
  id: string;
  placeId: string;
  name: string;
  image: string;
  location: string;
}

const Save: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const q = query(
      collection(db, 'favorites'),
      where('uid', '==', uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FavoriteItem[];

      const unique = data.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.placeId === item.placeId)
      );

      setFavorites(unique);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'favorites', id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="save-page ion-padding">

        {favorites.length === 0 && (
          <p>No favorites yet</p>
        )}

        <IonGrid>
          <IonRow>
            {favorites.map(item => (
              <IonCol size="6" key={item.id}>
                <IonCard className="collection-card">
                  <img src={item.image} alt={item.name} />

                  <IonCardContent>
                    <h3>{item.name}</h3>
                    <p>{item.location}</p>

                    <IonButton
                      color="danger"
                      size="small"
                      expand="block"
                      onClick={() => handleDelete(item.id)}
                    >
                      Remove
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Save;