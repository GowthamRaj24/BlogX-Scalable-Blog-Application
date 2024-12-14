import { motion, useScroll, useTransform } from 'framer-motion';
import BlogHeader from '../components/BlogHeader/BlogHeader';


import { FaGithub, FaInstagram, FaGlobe } from 'react-icons/fa';
import { 
    SiTypescript, SiReact, SiNodedotjs, SiMongodb, 
    SiExpress, SiPrisma, SiPostgresql, SiCloudflare,
    SiTailwindcss, SiPython, SiTensorflow, SiOpenai,
    SiLeetcode
} from 'react-icons/si';

const DeveloperSection = () => {
    const techStacks = [
        { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
        { name: 'React', icon: SiReact, color: 'text-cyan-500' },
        { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-600' },
        { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
        { name: 'Express', icon: SiExpress, color: 'text-gray-800' },
        { name: 'Prisma', icon: SiPrisma, color: 'text-indigo-600' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-400' },
        { name: 'Cloudflare', icon: SiCloudflare, color: 'text-orange-500' },
        { name: 'TailwindCSS', icon: SiTailwindcss, color: 'text-teal-500' },
        { name: 'Python', icon: SiPython, color: 'text-yellow-600' },
        { name: 'TensorFlow', icon: SiTensorflow, color: 'text-orange-600' },
        { name: 'OpenAI', icon: SiOpenai, color: 'text-green-700' },
    ];

    const socialLinks = [
        { 
            name: 'GitHub',
            icon: FaGithub,
            url: 'https://github.com/GowthamRaj24',
            color: 'hover:bg-gray-800 hover:text-white'
        },
        { 
            name: 'LeetCode',
            icon: SiLeetcode,
            url: 'https://leetcode.com/Gowtham_Raj24',
            color: 'hover:bg-yellow-500 hover:text-white'
        },
        { 
            name: 'Portfolio',
            icon: FaGlobe,
            url: 'https://gowthamraj24n.netlify.app',
            color: 'hover:bg-blue-600 hover:text-white'
        },
        { 
            name: 'Instagram',
            icon: FaInstagram,
            url: 'https://instagram.com/gowtham_raj24n',
            color: 'hover:bg-pink-600 hover:text-white'
        }
    ];

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl transform rotate-1"></div>
                    <div className="relative bg-white p-8 md:p-12 rounded-3xl shadow-xl">
                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="md:w-1/3">
                                <div className="sticky top-24">
                                    <img 
                                        src="../assets/picture_gowtham.jgp"
                                        alt="Gowtham Raj"
                                        className="w-48 h-48 rounded-2xl shadow-2xl mx-auto mb-6"
                                    />
                                    <h3 className="text-3xl font-bold text-center mb-2">Gowtham Raj</h3>
                                    <p className="text-gray-600 text-center mb-6">Full Stack Developer | ML Engineer</p>
                                    
                                    <div className="flex justify-center gap-4">
                                        {socialLinks.map((link) => (
                                            <a
                                                key={link.name}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`p-3 rounded-lg transition-all duration-300 ${link.color}`}
                                            >
                                                <link.icon className="w-6 h-6" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                <div className="prose prose-lg max-w-none">
                                    <h4 className="text-2xl font-bold mb-4">About Me</h4>
                                    <p className="text-gray-700">
                                        Fourth-year B.Tech student at GITAM University, specializing in CSE - AI & ML. 
                                        Passionate about building scalable applications and exploring the intersection of 
                                        web development and machine learning.
                                    </p>

                                    <h4 className="text-2xl font-bold mt-8 mb-6">Tech Stack & Skills</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {techStacks.map((tech) => (
                                            <motion.div
                                                key={tech.name}
                                                whileHover={{ scale: 1.05 }}
                                                className="flex flex-col items-center p-4 bg-gray-50 rounded-xl"
                                            >
                                                <tech.icon className={`w-8 h-8 ${tech.color} mb-2`} />
                                                <span className="text-sm font-medium">{tech.name}</span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <h4 className="text-2xl font-bold mt-8 mb-4">Current Project</h4>
                                    <div className="bg-gray-50 p-6 rounded-xl">
                                        <h5 className="text-xl font-bold mb-2">Blog:X</h5>
                                        <p className="text-gray-700">
                                            A modern blogging platform built with cutting-edge technologies.
                                            Features serverless architecture using Cloudflare Workers, 
                                            type-safe database operations with Prisma, and a responsive 
                                            React frontend.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};




const About = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 50]);
    const y2 = useTransform(scrollY, [0, 300], [0, -50]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

    return (
        <div className="min-h-screen bg-gray-50">
            <BlogHeader />
            
            {/* Hero Section with Parallax */}
            <motion.div 
                style={{ y: y1, opacity }}
                className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600"
            >
                <div className="text-center text-white px-4">
                    <h1 className="text-6xl font-bold mb-4">Blog:X</h1>
                    <p className="text-xl">A Scalable Modern Blogging Platform</p>
                </div>
            </motion.div>

            {/* Tech Stack Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Our Tech Stack</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-lg shadow-lg"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-blue-600">Frontend</h3>
                            <ul className="space-y-2">
                                <li>⚛️ React with TypeScript</li>
                                <li>🎨 TailwindCSS for styling</li>
                                <li>🔄 React Router for navigation</li>
                                <li>✨ Framer Motion for animations</li>
                            </ul>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-lg shadow-lg"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-purple-600">Backend</h3>
                            <ul className="space-y-2">
                                <li>☁️ Cloudflare Workers</li>
                                <li>🔷 Prisma ORM</li>
                                <li>🐘 PostgreSQL Database</li>
                                <li>🔒 JWT Authentication</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <motion.section 
                style={{ y: y2 }}
                className="py-20 px-4 bg-gray-900 text-white"
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Scalable", desc: "Built on Cloudflare's global network" },
                            { title: "Type-Safe", desc: "End-to-end TypeScript implementation" },
                            { title: "Modern", desc: "Latest web technologies and practices" },
                            { title: "Fast", desc: "Optimized for performance" },
                            { title: "Secure", desc: "JWT-based authentication" },
                            { title: "Responsive", desc: "Works on all devices" }
                        ].map((feature, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Architecture Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Architecture</h2>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="bg-white p-8 rounded-lg shadow-lg prose prose-lg max-w-none"
                    >
                        <p>Blog:X uses a modern, serverless architecture powered by Cloudflare Workers. The application is built with performance and scalability in mind, utilizing edge computing to deliver content faster to users worldwide.</p>
                        <p>The frontend is built with React and TypeScript, providing a type-safe and maintainable codebase. TailwindCSS enables rapid UI development with utility-first CSS.</p>
                        <p>On the backend, Prisma ORM provides type-safe database access, while PostgreSQL ensures reliable data storage. The entire stack is designed to be scalable and maintainable.</p>
                    </motion.div>
                </div>
            </section>
            <DeveloperSection />
        </div>
    );
};

export default About;
