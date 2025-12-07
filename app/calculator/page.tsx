"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AlertCircle, Save, Sparkles } from "lucide-react"
import { saveCalculatorData } from "@/lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"
import confetti from "canvas-confetti"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CalculatorPage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  const [highSchool, setHighSchool] = useState("")
  const [aptitude, setAptitude] = useState("")
  const [achievement, setAchievement] = useState("")
  const [highSchoolWeight, setHighSchoolWeight] = useState(30)
  const [aptitudeWeight, setAptitudeWeight] = useState(30)
  const [achievementWeight, setAchievementWeight] = useState(40)

  const [result, setResult] = useState<number | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  const totalWeight = highSchoolWeight + aptitudeWeight + achievementWeight
  const weightValid = Math.abs(totalWeight - 100) < 0.01

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const saved = localStorage.getItem("calculatorData")
    if (saved) {
      const data = JSON.parse(saved)
      setHighSchool(data.highSchool || "")
      setAptitude(data.aptitude || "")
      setAchievement(data.achievement || "")
      setHighSchoolWeight(data.highSchoolWeight || 30)
      setAptitudeWeight(data.aptitudeWeight || 30)
      setAchievementWeight(data.achievementWeight || 40)
      if (data.score) setResult(data.score)
    }
  }, [])

  const validateInputs = () => {
    const newErrors: Record<string, string> = {}

    if (!highSchool || Number.parseFloat(highSchool) < 0 || Number.parseFloat(highSchool) > 100) {
      newErrors.highSchool = "يجب إدخال قيمة بين 0 و 100"
    }
    if (!aptitude || Number.parseFloat(aptitude) < 0 || Number.parseFloat(aptitude) > 100) {
      newErrors.aptitude = "يجب إدخال قيمة بين 0 و 100"
    }
    if (!achievement || Number.parseFloat(achievement) < 0 || Number.parseFloat(achievement) > 100) {
      newErrors.achievement = "يجب إدخال قيمة بين 0 و 100"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateInputs() || !weightValid) return

    const score =
      (Number.parseFloat(highSchool) * highSchoolWeight) / 100 +
      (Number.parseFloat(aptitude) * aptitudeWeight) / 100 +
      (Number.parseFloat(achievement) * achievementWeight) / 100

    setResult(Number.parseFloat(score.toFixed(2)))

    const data = {
      highSchool: Number.parseFloat(highSchool),
      aptitude: Number.parseFloat(aptitude),
      achievement: Number.parseFloat(achievement),
      highSchoolWeight,
      aptitudeWeight,
      achievementWeight,
      score: Number.parseFloat(score.toFixed(2)),
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("calculatorData", JSON.stringify(data))
    localStorage.setItem("weightedScore", score.toFixed(2))

    if (score >= 90) {
      const duration = 3000
      const animationEnd = Date.now() + duration

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()
        if (timeLeft <= 0) return clearInterval(interval)

        const particleCount = 50 * (timeLeft / duration)
        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
        })
      }, 250)
    }

    setTimeout(() => {
      document.getElementById("result")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleSaveToFirebase = async () => {
    if (!result) return

    if (!user) {
      alert("يجب تسجيل الدخول أولاً لحفظ البيانات في Firebase")
      return
    }

    setSaving(true)
    try {
      const data = JSON.parse(localStorage.getItem("calculatorData") || "{}")
      const dataWithUser = {
        ...data,
        userEmail: user.email,
        userId: user.uid,
        userName: user.displayName || "غير محدد",
      }
      const saveResult = await saveCalculatorData(dataWithUser)

      if (saveResult.success) {
        alert("تم حفظ النتيجة بنجاح في Firebase!")
        localStorage.setItem("lastSavedId", saveResult.id)
      } else {
        alert("حدث خطأ: " + saveResult.message)
      }
    } catch (error) {
      alert("حدث خطأ أثناء الحفظ")
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const getScoreMessage = (score: number) => {
    if (score >= 95) return "ممتاز! يمكنك التقديم على معظم التخصصات المرموقة"
    if (score >= 90) return "رائع جداً! فرصك كبيرة في القبول بالتخصصات المطلوبة"
    if (score >= 85) return "جيد جداً! يمكنك التقديم على العديد من التخصصات الجيدة"
    if (score >= 80) return "جيد! لديك فرص جيدة في العديد من التخصصات"
    if (score >= 75) return "لا بأس! يمكنك التقديم على بعض التخصصات المناسبة"
    if (score >= 70) return "مقبول، حاول تحسين درجاتك للحصول على فرص أفضل"
    return "نشجعك على مضاعفة جهودك للحصول على درجة أعلى"
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200"
    if (score >= 80) return "text-blue-600 bg-blue-50 border-blue-200"
    if (score >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">حاسبة الدرجة الموزونة للقبول الجامعي</h1>
          <p className="text-gray-600">مرحباً {user.displayName || user.email}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">أدخل بياناتك</h2>

          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  النسبة المئوية للثانوية العامة <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={highSchool}
                  onChange={(e) => setHighSchool(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: 95.5"
                  step="0.01"
                  min="0"
                  max="100"
                />
                {errors.highSchool && <p className="text-red-500 text-sm mt-1">{errors.highSchool}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  وزن الثانوية العامة (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={highSchoolWeight}
                  onChange={(e) => setHighSchoolWeight(Number.parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  درجة اختبار القدرات <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={aptitude}
                  onChange={(e) => setAptitude(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: 85"
                  step="0.01"
                  min="0"
                  max="100"
                />
                {errors.aptitude && <p className="text-red-500 text-sm mt-1">{errors.aptitude}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  وزن اختبار القدرات (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={aptitudeWeight}
                  onChange={(e) => setAptitudeWeight(Number.parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  درجة الاختبار التحصيلي <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: 90"
                  step="0.01"
                  min="0"
                  max="100"
                />
                {errors.achievement && <p className="text-red-500 text-sm mt-1">{errors.achievement}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  وزن الاختبار التحصيلي (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={achievementWeight}
                  onChange={(e) => setAchievementWeight(Number.parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            {!weightValid && (
              <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <span className="text-yellow-800">
                  يجب أن يكون مجموع الأوزان يساوي 100%. المجموع الحالي: {totalWeight}%
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={!weightValid}
              className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              احسب الدرجة الموزونة
            </button>
          </form>
        </div>

        {result !== null && (
          <div id="result" className={`rounded-lg shadow-md p-8 border-2 ${getScoreColor(result)}`}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-2xl font-bold">نتيجة الحساب</h3>
              </div>
              <p className="text-gray-700 mb-4">الدرجة الموزونة الخاصة بك هي:</p>
              <p className="text-6xl font-bold mb-4">{result}</p>
              <p className="text-lg mb-6">{getScoreMessage(result)}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleSaveToFirebase}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  {saving ? "جاري الحفظ..." : "احفظ في Firebase"}
                </button>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  استكشف التخصصات المتاحة
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
