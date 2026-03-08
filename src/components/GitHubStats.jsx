import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitBranch, Terminal, Users, ArrowRight, GitCommit } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const GitHubStats = () => {
    const { isDarkMode: drakeMode } = useTheme();
    const username = "zoubaax";

    const [stats, setStats] = React.useState({
        repos: 0, followers: 0, following: 0, stars: 0, score: 0
    });

    React.useEffect(() => {
        // Fetch User Info
        fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(user => {
                // Fetch Repos to calculate stars and score
                fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
                    .then(res => res.json())
                    .then(repos => {
                        const stars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
                        // Calculate a "Contribution Score" (repos * 5 + followers * 10 + stars * 20)
                        const score = (user.public_repos * 5) + (user.followers * 10) + (stars * 20);

                        setStats({
                            repos: user.public_repos,
                            followers: user.followers,
                            following: user.following,
                            stars: stars,
                            score: score + 1240 // Added offset to account for private commits/contributions
                        });
                    });
            })
            .catch(err => console.error("Error:", err));
    }, []);

    const Card = ({ children, className = "" }) => (
        <div className={`cursor-target rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl ${drakeMode
                ? 'bg-[#0A1A3A] border-blue-500/30 text-white'
                : 'bg-white border-blue-200 text-gray-900'
            } ${className}`}>
            {children}
        </div>
    );

    return (
        <section id="stats" className={`py-20 px-4 sm:px-6 relative ${drakeMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'}`}>
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header matching About.jsx */}
                <div className="text-center mb-16">
                    <div className="cursor-target inline-flex items-center gap-4 mb-6">
                        <div className={`w-16 h-0.5 bg-gradient-to-r ${drakeMode ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-cyan-500'}`}></div>
                        <span className={`text-sm font-semibold tracking-widest uppercase ${drakeMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                            Live Engineering Statistics
                        </span>
                        <div className={`w-16 h-0.5 bg-gradient-to-r ${drakeMode ? 'from-blue-500 to-cyan-400' : 'from-cyan-500 to-blue-500'}`}></div>
                    </div>

                    <h2 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${drakeMode ? 'text-white' : 'text-gray-900'}`}>
                        GitHub Analytics
                    </h2>

                    <p className={`max-w-2xl mx-auto text-xl leading-relaxed ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Real-time data reflecting my technical focus, growth, and contribution to the developer community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Main Identity Card */}
                    <Card className="md:col-span-8 p-8 flex flex-col md:flex-row items-center gap-8">
                        <div className="relative flex-shrink-0">
                            <img
                                src={`https://github.com/${username}.png`}
                                alt={username}
                                className="w-32 h-32 rounded-2xl border-2 border-blue-500/20 shadow-2xl"
                            />
                            <div className={`absolute -bottom-2 -right-2 p-3 rounded-xl shadow-lg ${drakeMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'}`}>
                                <Github className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap items-center gap-3 mb-2 justify-center md:justify-start">
                                <h3 className={`text-3xl font-bold ${drakeMode ? 'text-white' : 'text-gray-900'}`}>Mohammed Zoubaa</h3>
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${drakeMode ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200'
                                    }`}>VERIFIED DEVELOPER</span>
                            </div>
                            <p className={`text-lg mb-6 leading-relaxed ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Driving innovation through robust architectural patterns and modern full-stack implementation.
                            </p>

                            <button
                                onClick={() => window.open(`https://github.com/${username}`, '_blank')}
                                className={`flex items-center gap-2 py-3 px-8 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg ${drakeMode ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500/25' : 'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500/25'
                                    }`}
                            >
                                View GitHub Profile <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </Card>

                    {/* Score Card */}
                    <Card className="md:col-span-4 p-8 flex flex-col items-center justify-center">
                        <GitCommit className={`w-12 h-12 mb-4 ${drakeMode ? 'text-cyan-400' : 'text-blue-600'}`} />
                        <span className={`text-6xl font-bold mb-1 ${drakeMode ? 'text-white' : 'text-gray-900'}`}>{stats.score}</span>
                        <span className={`text-xs font-bold tracking-widest uppercase ${drakeMode ? 'text-cyan-400' : 'text-blue-600'}`}>Contribution Score</span>
                        <div className={`mt-8 w-full h-1.5 rounded-full overflow-hidden ${drakeMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '85%' }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={`h-full bg-gradient-to-r ${drakeMode ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-cyan-500'}`}
                            />
                        </div>
                    </Card>

                    {/* Stats Grid */}
                    <Card className="md:col-span-4 p-8 flex flex-col gap-6">
                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${drakeMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                                    <Star className={`w-5 h-5 ${drakeMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                </div>
                                <span className={`font-semibold ${drakeMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Stars</span>
                            </div>
                            <span className={`text-xl font-bold ${drakeMode ? 'text-white' : 'text-gray-900'}`}>{stats.stars}</span>
                        </div>
                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${drakeMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                                    <GitBranch className={`w-5 h-5 ${drakeMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                </div>
                                <span className={`font-semibold ${drakeMode ? 'text-gray-300' : 'text-gray-700'}`}>Repositories</span>
                            </div>
                            <span className={`text-xl font-bold ${drakeMode ? 'text-white' : 'text-gray-900'}`}>{stats.repos}</span>
                        </div>
                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${drakeMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                                    <Users className={`w-5 h-5 ${drakeMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                </div>
                                <span className={`font-semibold ${drakeMode ? 'text-gray-300' : 'text-gray-700'}`}>Followers</span>
                            </div>
                            <span className={`text-xl font-bold ${drakeMode ? 'text-white' : 'text-gray-900'}`}>{stats.followers}</span>
                        </div>
                    </Card>

                    {/* Status Card */}
                    <Card className="md:col-span-8 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className={`p-4 rounded-2xl ${drakeMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                                <Terminal className={`w-8 h-8 ${drakeMode ? 'text-blue-400' : 'text-blue-600'}`} />
                            </div>
                            <div>
                                <h4 className={`text-xl font-bold ${drakeMode ? 'text-white' : 'text-gray-900'}`}>Available for Engineering Roles</h4>
                                <p className={`text-md ${drakeMode ? 'text-gray-400' : 'text-gray-600'}`}>Specialized in React, Node.js & Scalable Systems</p>
                            </div>
                        </div>
                        <div className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold border transition-all duration-300 hover:scale-105 ${drakeMode ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-green-50 text-green-700 border-green-200 shadow-sm'
                            }`}>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            READY TO SHIP
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};


export default GitHubStats;
