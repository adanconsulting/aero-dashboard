import app from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA5OezXa5bjtKeKSExvhEE5SLz10Mn-9JM",
  authDomain: "areoland.firebaseapp.com",
  projectId: "areoland",
  storageBucket: "areoland.appspot.com",
  messagingSenderId: "866221141709",
  appId: "1:866221141709:web:c771ef77290927d2888384",
};
// Initialize Firebase
app.initializeApp(firebaseConfig);

export default app;
