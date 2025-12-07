"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calculator, LogIn, LogOut } from "lucide-react"
import { auth } from "@/lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"

export default function Header() {
  const pathname = usePathname()
  const [user, loading] = useAuthState(auth)

  const isActive = (path: string) => pathname === path

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">حاسبة الدرجة الموزونة</h1>
          </Link>

          <nav>
            <ul className="flex gap-6 items-center">
              <li>
                <Link
                  href="/"
                  className={`text-gray-700 hover:text-blue-600 font-semibold transition-colors ${
                    isActive("/") ? "text-blue-600" : ""
                  }`}
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className={`text-gray-700 hover:text-blue-600 font-semibold transition-colors ${
                    isActive("/calculator") ? "text-blue-600" : ""
                  }`}
                >
                  الحاسبة
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className={`text-gray-700 hover:text-blue-600 font-semibold transition-colors ${
                    isActive("/programs") ? "text-blue-600" : ""
                  }`}
                >
                  التخصصات
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`text-gray-700 hover:text-blue-600 font-semibold transition-colors ${
                    isActive("/about") ? "text-blue-600" : ""
                  }`}
                >
                  عن الموقع
                </Link>
              </li>
              {!loading && (
                <li>
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-semibold transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      تسجيل الخروج
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className={`flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors ${
                        isActive("/login") ? "text-blue-600" : ""
                      }`}
                    >
                      <LogIn className="w-5 h-5" />
                      تسجيل الدخول
                    </Link>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
