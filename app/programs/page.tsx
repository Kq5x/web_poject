"use client"

import { useState, useEffect } from "react"
import { Search, GraduationCap } from "lucide-react"
import Link from "next/link"

interface University {
  name: string
  minScore: number
}

interface Program {
  id: number
  name: string
  field: string
  minScore: number
  description: string
  jobOpportunities: string
  universities: University[]
}

const universityPrograms: Program[] = [
  {
    id: 1,
    name: "الطب البشري",
    field: "medical",
    minScore: 95,
    description: "دراسة الطب البشري وعلاج الأمراض والإصابات",
    jobOpportunities: "طبيب عام، طبيب متخصص، باحث طبي، أستاذ جامعي",
    universities: [
      { name: "جامعة الملك سعود", minScore: 96 },
      { name: "جامعة الملك عبد العزيز", minScore: 95.5 },
      { name: "جامعة الإمام محمد بن سعود", minScore: 95 },
    ],
  },
  {
    id: 2,
    name: "طب الأسنان",
    field: "medical",
    minScore: 94,
    description: "دراسة صحة الفم والأسنان وعلاج أمراضها",
    jobOpportunities: "طبيب أسنان، أخصائي تقويم، جراح فم وأسنان",
    universities: [
      { name: "جامعة الملك سعود", minScore: 95 },
      { name: "جامعة الملك عبد العزيز", minScore: 94.5 },
      { name: "جامعة الملك فيصل", minScore: 94 },
    ],
  },
  {
    id: 3,
    name: "الصيدلة",
    field: "medical",
    minScore: 92,
    description: "دراسة تركيب وتأثير وتصنيع الأدوية",
    jobOpportunities: "صيدلي، باحث دوائي، مدير مستودع أدوية",
    universities: [
      { name: "جامعة الملك سعود", minScore: 93 },
      { name: "جامعة الملك عبد العزيز", minScore: 92.5 },
      { name: "جامعة الأميرة نورة", minScore: 92 },
    ],
  },
  {
    id: 4,
    name: "هندسة الحاسب",
    field: "computer",
    minScore: 90,
    description: "دراسة تصميم وتطوير أنظمة الحاسب والشبكات",
    jobOpportunities: "مهندس حاسب، مطور أنظمة، مهندس شبكات",
    universities: [
      { name: "جامعة الملك فهد للبترول والمعادن", minScore: 92 },
      { name: "جامعة الملك سعود", minScore: 91 },
      { name: "جامعة الملك عبد العزيز", minScore: 90 },
    ],
  },
  {
    id: 5,
    name: "علوم الحاسب",
    field: "computer",
    minScore: 88,
    description: "دراسة البرمجة وتطوير البرمجيات والخوارزميات",
    jobOpportunities: "مبرمج، محلل نظم، مطور تطبيقات، مدير مشاريع تقنية",
    universities: [
      { name: "جامعة الملك فهد للبترول والمعادن", minScore: 90 },
      { name: "جامعة الملك سعود", minScore: 89 },
      { name: "جامعة الأميرة نورة", minScore: 88 },
    ],
  },
  {
    id: 6,
    name: "الهندسة المدنية",
    field: "engineering",
    minScore: 89,
    description: "دراسة تصميم وتنفيذ المشاريع الإنشائية والبنية التحتية",
    jobOpportunities: "مهندس مدني، مهندس إنشائي، مدير مشاريع",
    universities: [
      { name: "جامعة الملك فهد للبترول والمعادن", minScore: 91 },
      { name: "جامعة الملك سعود", minScore: 90 },
      { name: "جامعة الملك عبد العزيز", minScore: 89 },
    ],
  },
  {
    id: 7,
    name: "الهندسة الكهربائية",
    field: "engineering",
    minScore: 88,
    description: "دراسة الأنظمة الكهربائية والإلكترونية",
    jobOpportunities: "مهندس كهربائي، مهندس اتصالات، مهندس تحكم",
    universities: [
      { name: "جامعة الملك فهد للبترول والمعادن", minScore: 90 },
      { name: "جامعة الملك سعود", minScore: 89 },
      { name: "جامعة الملك عبد العزيز", minScore: 88 },
    ],
  },
  {
    id: 8,
    name: "الهندسة الميكانيكية",
    field: "engineering",
    minScore: 87,
    description: "دراسة تصميم وتطوير الآلات والأنظمة الميكانيكية",
    jobOpportunities: "مهندس ميكانيكي، مهندس صيانة، مهندس تصميم",
    universities: [
      { name: "جامعة الملك فهد للبترول والمعادن", minScore: 89 },
      { name: "جامعة الملك سعود", minScore: 88 },
      { name: "جامعة الملك عبد العزيز", minScore: 87 },
    ],
  },
  {
    id: 9,
    name: "هندسة البترول",
    field: "engineering",
    minScore: 91,
    description: "دراسة استخراج ومعالجة النفط والغاز",
    jobOpportunities: "مهندس بترول، مهندس حقول نفط، مهندس إنتاج",
    universities: [
      { name: "جامعة الملك فهد للبترول والمعادن", minScore: 93 },
      { name: "جامعة الملك سعود", minScore: 92 },
      { name: "جامعة الملك عبد العزيز", minScore: 91 },
    ],
  },
  {
    id: 10,
    name: "الفيزياء",
    field: "science",
    minScore: 84,
    description: "دراسة المادة والطاقة والقوى الطبيعية",
    jobOpportunities: "باحث علمي، فيزيائي، مدرس، أخصائي إشعاع",
    universities: [
      { name: "جامعة الملك سعود", minScore: 86 },
      { name: "جامعة الملك عبد العزيز", minScore: 85 },
      { name: "جامعة الملك فيصل", minScore: 84 },
    ],
  },
  {
    id: 11,
    name: "الكيمياء",
    field: "science",
    minScore: 83,
    description: "دراسة تركيب وخصائص وتفاعلات المواد",
    jobOpportunities: "كيميائي، باحث، فني مختبر، مراقب جودة",
    universities: [
      { name: "جامعة الملك سعود", minScore: 85 },
      { name: "جامعة الملك عبد العزيز", minScore: 84 },
      { name: "جامعة الملك فيصل", minScore: 83 },
    ],
  },
  {
    id: 12,
    name: "إدارة الأعمال",
    field: "business",
    minScore: 80,
    description: "دراسة إدارة المؤسسات والشركات والموارد البشرية",
    jobOpportunities: "مدير أعمال، مستشار إداري، مدير موارد بشرية",
    universities: [
      { name: "جامعة الملك فهد للبترول والمعادن", minScore: 85 },
      { name: "جامعة الملك سعود", minScore: 82 },
      { name: "جامعة الملك عبد العزيز", minScore: 80 },
    ],
  },
]

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [fieldFilter, setFieldFilter] = useState("all")
  const [minScore, setMinScore] = useState(70)
  const [userScore, setUserScore] = useState<number | null>(null)

  useEffect(() => {
    const savedScore = localStorage.getItem("weightedScore")
    if (savedScore) {
      setUserScore(Number.parseFloat(savedScore))
    }
  }, [])

  const filteredPrograms = universityPrograms.filter((program) => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesField = fieldFilter === "all" || program.field === fieldFilter
    const matchesScore = program.minScore >= minScore

    return matchesSearch && matchesField && matchesScore
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-8">التخصصات الجامعية ومتطلبات القبول</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold">استكشف التخصصات المتاحة</h2>
              <p className="text-gray-600">اكتشف التخصصات المناسبة لدرجتك الموزونة</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث عن تخصص..."
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <select
                value={fieldFilter}
                onChange={(e) => setFieldFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">جميع المجالات</option>
                <option value="medical">المجال الطبي</option>
                <option value="engineering">المجال الهندسي</option>
                <option value="computer">علوم الحاسب</option>
                <option value="science">العلوم</option>
                <option value="business">إدارة الأعمال</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">الحد الأدنى للدرجة الموزونة: {minScore}</label>
            <input
              type="range"
              value={minScore}
              onChange={(e) => setMinScore(Number.parseInt(e.target.value))}
              min="70"
              max="98"
              step="1"
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>70</span>
              <span>98</span>
            </div>
          </div>

          {userScore && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-lg">
                درجتك الموزونة: <span className="font-bold text-blue-600">{userScore}</span>
              </p>
              <p className="text-gray-600">التخصصات المتاحة لك مظللة باللون الأخضر</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">لا توجد تخصصات تطابق معايير البحث</div>
            ) : (
              filteredPrograms.map((program) => {
                const isAvailable = userScore !== null && userScore >= program.minScore
                return (
                  <div
                    key={program.id}
                    className={`border-2 rounded-lg p-6 transition-all hover:shadow-lg ${
                      isAvailable ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <GraduationCap className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <h3 className="text-xl font-bold text-gray-900">{program.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">{program.description}</p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">الحد الأدنى للقبول:</p>
                      <p className="text-2xl font-bold text-blue-600">{program.minScore}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">فرص العمل:</p>
                      <p className="text-sm text-gray-600">{program.jobOpportunities}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">الجامعات المتاحة:</p>
                      <ul className="space-y-1">
                        {program.universities.map((uni, idx) => (
                          <li key={idx} className="text-sm text-gray-600">
                            • {uni.name} ({uni.minScore})
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/calculator"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            احسب درجتك الموزونة الآن
          </Link>
        </div>
      </div>
    </div>
  )
}
