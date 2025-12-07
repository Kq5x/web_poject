export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">عن موقع حاسبة الدرجة الموزونة</h1>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">نبذة عن الموقع</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            موقع "حاسبة الدرجة الموزونة للقبول الجامعي" هو أداة مساعدة للطلاب في المملكة العربية السعودية لحساب درجاتهم
            الموزونة بدقة، ومعرفة التخصصات الجامعية المتاحة لهم بناءً على هذه الدرجات.
          </p>
          <p className="text-gray-700 leading-relaxed">
            يهدف الموقع إلى تسهيل عملية اختيار التخصص المناسب وتوفير المعلومات اللازمة عن متطلبات القبول في مختلف
            الجامعات السعودية.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">كيفية حساب الدرجة الموزونة</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            تعتمد الجامعات السعودية في قبول الطلاب على الدرجة الموزونة، وهي مجموع درجات الطالب في الثانوية العامة
            واختبار القدرات والاختبار التحصيلي بعد ضرب كل منها في نسبة معينة.
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-3">المعادلة الأساسية للدرجة الموزونة:</h3>
            <p className="text-gray-700 mb-3 text-lg">
              الدرجة الموزونة = (نسبة الثانوية × 30%) + (درجة القدرات × 30%) + (درجة التحصيلي × 40%)
            </p>
            <p className="text-gray-600 text-sm">
              ملاحظة: قد تختلف النسب المئوية حسب الجامعة أو التخصص، ولذلك يوفر موقعنا إمكانية تخصيص هذه النسب.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">مميزات الموقع</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">حساب الدرجة الموزونة بدقة:</strong>
                <p className="text-gray-700">يمكنك إدخال درجاتك وتخصيص النسب المئوية لكل اختبار.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">حفظ البيانات في Firebase:</strong>
                <p className="text-gray-700">يمكنك حفظ بياناتك في قاعدة بيانات سحابية للرجوع إليها لاحقاً.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">تأثيرات بصرية وتحفيزية:</strong>
                <p className="text-gray-700">يعرض الموقع رسائل تحفيزية بناءً على الدرجة الموزونة.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">تصميم متجاوب:</strong>
                <p className="text-gray-700">يعمل الموقع بشكل جيد على جميع الأجهزة.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">فريق العمل</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">خ</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">خالد عبدالله البيشي</h3>
              <p className="text-blue-600 font-semibold">2241740</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">و</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">الوليد خالد الغامدي</h3>
              <p className="text-green-600 font-semibold">2240792</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">ف</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">فواز فهد مسعد</h3>
              <p className="text-purple-600 font-semibold">2240500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
