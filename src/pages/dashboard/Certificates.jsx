import { Award, Download, Calendar, ExternalLink } from 'lucide-react'
import TargetCursor from '../../hooks/TargetCursor'

function Certificates() {
  // Example certificates data - replace with your actual certificates
  const certificates = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      issuer: 'FreeCodeCamp',
      date: '2024-01-15',
      credentialId: 'FCC-123456',
      url: '#',
      image: null,
    },
    {
      id: 2,
      title: 'React Advanced Patterns',
      issuer: 'Udemy',
      date: '2023-11-20',
      credentialId: 'UD-789012',
      url: '#',
      image: null,
    },
    {
      id: 3,
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2023-09-10',
      credentialId: 'AWS-345678',
      url: '#',
      image: null,
    },
  ]

  return (
    <div className="relative min-h-full">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      <div className="p-6 sm:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="cursor-target inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              <span className="text-sm font-semibold tracking-widest uppercase text-cyan-400">
                Achievements
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">My Certificates</h1>
            <p className="text-gray-300 text-lg">
              A collection of my professional certifications and achievements
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="cursor-target group relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Certificate Icon/Image */}
                <div className="mb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-sm font-medium">Issued by:</span>
                      <span className="text-sm">{cert.issuer}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(cert.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="text-gray-400 text-xs">
                      ID: {cert.credentialId}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-target flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-all group-hover:border-cyan-400/50"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Verify</span>
                    </a>
                  )}
                  <button className="cursor-target flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State (if no certificates) */}
          {certificates.length === 0 && (
            <div className="text-center py-20">
              <Award className="w-20 h-20 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Certificates Yet</h3>
              <p className="text-gray-500">Your certificates will appear here once you add them.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Certificates

