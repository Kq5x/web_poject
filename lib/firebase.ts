import { initializeApp } from "firebase/app"
import { getDatabase, ref, push, set, get, query, orderByChild } from "firebase/database"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Firebase configuration - using your existing credentials
const firebaseConfig = {
  apiKey: "AIzaSyB5ixv8F9wYW_vNPWlCbQzTzZ7LrHpbBh8",
  authDomain: "weighted-score-calculator.firebaseapp.com",
  databaseURL: "https://weighted-score-calculator-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "weighted-score-calculator",
  storageBucket: "weighted-score-calculator.firebasestorage.app",
  messagingSenderId: "494937395880",
  appId: "1:494937395880:web:9810d5637e81dc29c2a89d",
  measurementId: "G-Q92RJHHQD3",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

// Save calculator data to Firebase
export async function saveCalculatorData(data: any) {
  try {
    if (!data.highSchool || !data.aptitude || !data.achievement) {
      throw new Error("جميع الحقول مطلوبة")
    }

    if (!data.userId) {
      throw new Error("يجب تسجيل الدخول لحفظ البيانات")
    }

    const calculationData = {
      ...data,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString("ar-SA"),
    }

    const userCalculationsRef = ref(database, `calculations/${data.userId}`)
    const newCalculationRef = push(userCalculationsRef)
    await set(newCalculationRef, calculationData)

    return {
      success: true,
      message: "تم حفظ البيانات بنجاح",
      id: newCalculationRef.key || "",
    }
  } catch (error: any) {
    console.error("خطأ في حفظ البيانات:", error)
    return {
      success: false,
      message: "حدث خطأ أثناء حفظ البيانات: " + error.message,
      id: "",
    }
  }
}

// Get calculator data from Firebase
export async function getCalculatorData(userId: string) {
  try {
    const userCalculationsRef = ref(database, `calculations/${userId}`)
    const calculationsQuery = query(userCalculationsRef, orderByChild("timestamp"))
    const snapshot = await get(calculationsQuery)

    if (snapshot.exists()) {
      const data = snapshot.val()
      return {
        success: true,
        data: Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        })),
      }
    } else {
      return {
        success: true,
        data: [],
      }
    }
  } catch (error: any) {
    console.error("خطأ في جلب البيانات:", error)
    return {
      success: false,
      message: "حدث خطأ أثناء جلب البيانات: " + error.message,
      data: [],
    }
  }
}

export { database, auth, googleProvider }
