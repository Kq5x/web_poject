import Link from "next/link"
import { Calculator, Home, BookOpen } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">حاسبة الدرجة الموزونة للقبول الجامعي</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            احسب درجتك الموزونة وتعرف على التخصصات المتاحة لك في الجامعات السعودية
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Calculator className="w-5 h-5" />
            ابدأ الحساب الآن
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">مميزات الموقع</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">حساب الدرجة الموزونة بدقة</h3>
              <p className="text-gray-600">
                احسب درجتك الموزونة بدقة باستخدام المعادلة المعتمدة في الجامعات السعودية، مع إمكانية تخصيص النسب المئوية
                لكل اختبار.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">عرض التخصصات المتاحة</h3>
              <p className="text-gray-600">
                تعرف على التخصصات الجامعية المتاحة لك بناءً على درجتك الموزونة، مع معلومات تفصيلية عن كل تخصص والجامعات
                التي تقدمه.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">حفظ البيانات في Firebase</h3>
              <p className="text-gray-600">
                يمكنك حفظ بياناتك في قاعدة بيانات Firebase للرجوع إليها لاحقاً، مما يوفر عليك إعادة إدخال البيانات في كل
                مرة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">كيفية حساب الدرجة الموزونة</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-600 mb-8">
              يتم حساب الدرجة الموزونة للقبول في الجامعات السعودية بناءً على ثلاثة عناصر رئيسية:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">الثانوية العامة</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">30%</p>
                <p className="text-gray-600">من الدرجة الموزونة</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">اختبار القدرات</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">30%</p>
                <p className="text-gray-600">من الدرجة الموزونة</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">الاختبار التحصيلي</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">40%</p>
                <p className="text-gray-600">من الدرجة الموزونة</p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">المعادلة المستخدمة:</h3>
              <p className="text-lg text-gray-700">
                الدرجة الموزونة = (نسبة الثانوية × 30%) + (درجة القدرات × 30%) + (درجة التحصيلي × 40%)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
