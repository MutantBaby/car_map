import { app } from "../utils/firebase";
import { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "@firebase/auth";

import AuthScreen from "@/components/AuthScreen";
import AuthenticatedScreen from "@/components/AuthenticatedScreen";

export default function Index() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) await signOut(auth);
      else if (isLogin) await signInWithEmailAndPassword(auth, email, password);
      else await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <AuthenticatedScreen
          user={user}
          handleAuthentication={handleAuthentication}
        />
      ) : (
        <AuthScreen
          email={email}
          isLogin={isLogin}
          password={password}
          setEmail={setEmail}
          setIsLogin={setIsLogin}
          setPassword={setPassword}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
});

// [
//   "expo-splash-screen",
//   {
//     image: "./assets/images/splash-icon.png",
//     imageWidth: 200,
//     resizeMode: "contain",
//     backgroundColor: "#ffffff",
//   },
// ];

// "favicon": "./assets/images/favicon.png"

// "adaptiveIcon": {
//         "foregroundImage": "./assets/images/adaptive-icon.png",
//         "backgroundColor": "#ffffff"
//       }

// "icon": "./assets/images/icon.png",
