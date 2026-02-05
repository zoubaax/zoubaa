import { useState, useEffect } from 'react'
import { Award, Calendar, ExternalLink, Download } from 'lucide-react'

import { getCertificates } from '../services/certificatesService'
import Navbar from '../components/Navbar'

function CertificatesPage() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [drakeMode, setDrakeMode] = useState(false)

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true)
      const { data, error } = await getCertificates()
      if (error) {
        console.error('Error fetching certificates:', error)
        setCertificates([])
      } else {
        setCertificates(data || [])
      }
      setLoading(false)
    }

    fetchCertificates()
  }, [])

  return (
    <div style={{
      backgroundColor: drakeMode ? '#1A1A1A' : '#EBE6E0',
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
    }}>
      <Navbar drakeMode={drakeMode} setDrakeMode={setDrakeMode} />

      <div className="relative min-h-screen">

        <div className={`min-h-screen py-20 px-4 sm:px-6 font-sans antialiased ${drakeMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'}`}>
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="cursor-target inline-flex items-center gap-4 mb-6">
                <div className={`w-20 h-0.5 bg-gradient-to-r ${drakeMode ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-cyan-500'}`}></div>
                <span className={`text-sm font-semibold tracking-widest uppercase ${drakeMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                  Achievements
                </span>
                <div className={`w-20 h-0.5 bg-gradient-to-r ${drakeMode ? 'from-blue-500 to-cyan-400' : 'from-cyan-500 to-blue-500'}`}></div>
              </div>

              <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${drakeMode ? 'text-white' : 'text-gray-900'}`}>
                My Certificates
              </h1>

              <p className={`max-w-2xl mx-auto text-xl leading-relaxed ${drakeMode ? 'text-gray-300' : 'text-gray-700'}`}>
                A collection of my professional certifications and achievements
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-20">
                <div className={`text-lg ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Loading certificates...
                </div>
              </div>
            )}

            {/* Certificates Grid */}
            {!loading && (
              <>
                {certificates.length === 0 ? (
                  <div className="text-center py-20">
                    <Award className={`w-20 h-20 mx-auto mb-4 ${drakeMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <h3 className={`text-xl font-semibold mb-2 ${drakeMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      No Certificates Yet
                    </h3>
                    <p className={drakeMode ? 'text-gray-500' : 'text-gray-500'}>
                      Certificates will appear here once they are added.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className={`cursor-target group relative rounded-3xl border overflow-hidden transition-all duration-700 transform hover:-translate-y-2 ${drakeMode
                            ? 'bg-[#050A30] border-blue-500/30 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20'
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10'
                          }`}
                      >
                        {/* Animated Background Gradient */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${drakeMode
                            ? 'bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5'
                            : 'bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-purple-500/5'
                          }`}></div>

                        {/* Certificate Image */}
                        {cert.image_url ? (
                          <div className="relative h-64 overflow-hidden">
                            <img
                              src={cert.image_url}
                              alt={cert.title}
                              className="w-full h-full object-contain bg-white/5 transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${drakeMode ? 'from-[#050A30] via-[#050A30]/80 to-transparent' : 'from-white via-white/80 to-transparent'
                              } transition-all duration-500`}></div>
                          </div>
                        ) : (
                          <div className="relative h-64 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                            <Award className={`w-20 h-20 ${drakeMode ? 'text-cyan-400' : 'text-blue-500'}`} />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6 flex flex-col relative z-10">
                          {/* Title */}
                          <h3 className={`text-xl font-bold mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${drakeMode ? 'text-white group-hover:from-cyan-400 group-hover:to-blue-500' : 'text-gray-900 group-hover:from-blue-500 group-hover:to-cyan-500'
                            } transition-all duration-500`}>
                            {cert.title}
                          </h3>

                          {/* Date */}
                          <div className="flex items-center gap-2 mb-4">
                            <Calendar className={`w-4 h-4 ${drakeMode ? 'text-cyan-400' : 'text-blue-500'}`} />
                            <span className={`text-sm font-semibold ${drakeMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                              {new Date(cert.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            {cert.show_url && (
                              <a
                                href={cert.show_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`cursor-target flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${drakeMode
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
                                  }`}
                              >
                                <ExternalLink className="w-4 h-4" />
                                Verify
                              </a>
                            )}
                            {cert.image_url && (
                              <a
                                href={cert.image_url}
                                download
                                className={`cursor-target flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${drakeMode
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white border border-gray-600 hover:border-gray-500'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 hover:border-gray-400'
                                  }`}
                              >
                                <Download className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Glow Effect */}
                        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${drakeMode
                            ? 'shadow-2xl shadow-cyan-500/10'
                            : 'shadow-2xl shadow-blue-500/5'
                          }`}></div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificatesPage

