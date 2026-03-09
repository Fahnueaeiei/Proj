import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  collection,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';

import './Save.css';

interface FavoriteItem {
  id: string;
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

      setFavorites(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <IonPage>
      <IonContent className="save-page">

        <h2 className="title">Favorite Places</h2>

        <IonSearchbar placeholder="Search Favorite Places" />

        <IonGrid>
          <IonRow>
            {favorites.map(item => (
              <IonCol size="6" key={item.id}>
                <IonCard className="collection-card">
                  <img src={item.image} alt={item.name} />

                  <IonCardContent>
                    <h3>{item.name}</h3>
                    <p>{item.location}</p>
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