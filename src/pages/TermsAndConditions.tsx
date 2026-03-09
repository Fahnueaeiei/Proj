import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./PrivacyPolicy.css";

const TermsAndConditions: React.FC = () => {
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
          <h2>Terms and Conditions</h2>
        </div>

        <div className="policy-body">

          <p className="policy-updated">Last updated: March 9, 2026</p>

          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using this application, you accept and agree to be bound by the terms and provisions of this agreement.</p>

          <h3>2. Use of Service</h3>
          <p>You agree to use this service only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the service.</p>

          <h3>3. User Accounts</h3>
          <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>

          <h3>4. Intellectual Property</h3>
          <p>The service and its original content, features, and functionality are owned by Trip Planner and are protected by international copyright, trademark, and other intellectual property laws.</p>

          <h3>5. Limitation of Liability</h3>
          <p>In no event shall Trip Planner be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>

          <h3>6. Termination</h3>
          <p>We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or us.</p>

          <h3>7. Contact Us</h3>
          <p>If you have any questions about these Terms, please contact us at support@tripplanner.com</p>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default TermsAndConditions;