import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export function usePageTracking() {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    addDoc(collection(db, "leads", user.uid, "pageViews"), {
      path: location.pathname,
      timestamp: serverTimestamp(),
    });
  }, [location.pathname, user]);
}
