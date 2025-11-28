import { FolderKanban, ExternalLink, Github, Calendar, Tag } from 'lucide-react'
import TargetCursor from '../../hooks/TargetCursor'

function Projects() {
  // Example projects data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with payment integration and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'Completed',
      date: '2024-02-15',
      githubUrl: '#',
      liveUrl: '#',
      category: 'Web Development',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates.',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      status: 'In Progress',
      date: '2024-01-20',
      githubUrl: '#',
      liveUrl: '#',
      category: 'Web Development',
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication.',
      technologies: ['React Native', 'Node.js', 'PostgreSQL'],
      status: 'Completed',
      date: '2023-12-10',
      githubUrl: '#',
      liveUrl: null,
      category: 'Mobile Development',
    },
    {
      id: 4,
      title: 'AI Chatbot',
      description: 'Intelligent chatbot using natural language processing.',
      technologies: ['Python', 'TensorFlow', 'Flask'],
      status: 'Completed',
      date: '2023-11-05',
      githubUrl: '#',
      liveUrl: '#',
      category: 'AI/ML',
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'In Progress':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'On Hold':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

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
                Portfolio
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">My Projects</h1>
            <p className="text-gray-300 text-lg">
              A showcase of my recent work and development projects
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="cursor-target group relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <FolderKanban className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Tag className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-400">{project.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(project.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-target p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:border-cyan-400/50"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-target p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-all hover:border-cyan-400/50"
                        aria-label="View live site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="text-center py-20">
              <FolderKanban className="w-20 h-20 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Projects Yet</h3>
              <p className="text-gray-500">Your projects will appear here once you add them.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Projects

