import { createContext, useContext, useEffect, useRef, useState } from "react";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function captureUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const utm = {
    utmSource: params.get("utm_source") || null,
    utmMedium: params.get("utm_medium") || null,
    utmCampaign: params.get("utm_campaign") || null,
  };
  if (utm.utmSource || utm.utmMedium || utm.utmCampaign) {
    sessionStorage.setItem("utm_params", JSON.stringify(utm));
    return utm;
  }
  const stored = sessionStorage.getItem("utm_params");
  return stored ? JSON.parse(stored) : utm;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [leadData, setLeadData] = useState(null);
  const [loading, setLoading] = useState(true);
  const utmParams = useRef(captureUtmParams());

  const isLeadComplete = !!leadData?.nombre;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const leadRef = doc(db, "leads", firebaseUser.uid);
        const leadSnap = await getDoc(leadRef);
        if (leadSnap.exists()) {
          setLeadData(leadSnap.data());
        }
      } else {
        await signInAnonymously(auth);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function saveLead(formData) {
    if (!user) return;
    const utm = utmParams.current;
    const leadRef = doc(db, "leads", user.uid);
    const data = {
      ...formData,
      ...utm,
      createdAt: serverTimestamp(),
    };
    await setDoc(leadRef, data);
    setLeadData(data);
  }

  const value = { user, leadData, isLeadComplete, saveLead, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
