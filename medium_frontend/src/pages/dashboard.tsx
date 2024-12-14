import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const navigate = useNavigate();

    const features = [
        { 
            title: "Rich Text Editor", 
            description: "Create and format your blogs with our powerful editor",
            icon: "✍️"
        },
        { 
            title: "Secure Authentication", 
            description: "JWT-based authentication keeps your account safe",
            icon: "🔐"
        },
        { 
            title: "Cloud Infrastructure", 
            description: "Built on Cloudflare Workers for lightning-fast performance",
            icon: "⚡"
        },
        { 
            title: "Cloud Storage", 
            description: "Your content, secure and accessible anywhere",
            icon: "☁️"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Floating Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <span className="text-3xl">📝</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Blog:X
                            </span>
                        </div>
                        <div className="space-x-4">
                            <button 
                                onClick={() => navigate('/signin')}
                                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                            >
                                Sign In
                            </button>
                            <button 
                                onClick={() => navigate('/signup')}
                                className="px-6 py-2.5 border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 text-center px-6">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                >
                    Express Your Ideas
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
                >
                    Where creativity meets technology. Start your blogging journey with our next-gen platform.
                </motion.p>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <span className="text-4xl mb-4 block">{feature.icon}</span>
                            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Tech Stack */}
            <div className="container mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center mb-12">Powered By</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {['TypeScript', 'React', 'Cloudflare', 'PostgreSQL', 'Prisma'].map((tech, index) => (
                        <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {tech}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 mt-20">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">Let's Connect!</h3>
                    <a 
                        href="mailto:mgowthamraj9491@gmail.com"
                        className="text-xl hover:underline"
                    >
                        mgowthamraj9491@gmail.com
                    </a>
                    <p className="mt-6 text-white/80">
                        Crafted with 💜 by Gowtham Raj
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
