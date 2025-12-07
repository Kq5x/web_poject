import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">حاسبة الدرجة الموزونة</h3>
            <p className="text-gray-400">أداة مساعدة للطلاب في حساب الدرجة الموزونة للقبول الجامعي</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-gray-400 hover:text-white transition-colors">
                  الحاسبة
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  عن الموقع
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 حاسبة الدرجة الموزونة للقبول الجامعي - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  )
}
