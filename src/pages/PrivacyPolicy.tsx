import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./PrivacyPolicy.css";

const PrivacyPolicy: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen className="policy-content">

        <div className="policy-top">
          <IonIcon
            icon={chevronBackOutline}
            className="back-icon"
            onClick={() => history.goBack()}
          />
          <h2>Privacy Policy</h2>
        </div>

        <div className="policy-body">

          <p className="policy-updated">Last updated: March 9, 2026</p>

          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us, such as your name, email address, phone number, and any other information you choose to provide when registering or using our services.</p>

          <h3>2. How We Use Your Information</h3>
          <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices, and respond to your comments and questions.</p>

          <h3>3. Information Sharing</h3>
          <p>We do not share your personal information with third parties except as described in this policy. We may share your information with vendors and service providers that perform services on our behalf.</p>

          <h3>4. Data Security</h3>
          <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>

          <h3>5. Cookies</h3>
          <p>We may use cookies and similar tracking technologies to track activity on our service and hold certain information to improve your experience.</p>

          <h3>6. Changes to This Policy</h3>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

          <h3>7. Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at support@tripplanner.com</p>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default PrivacyPolicy;