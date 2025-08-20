import React from "react";
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaPlay } from 'react-icons/fa';
import Head from 'next/head';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [modalProject, setModalProject] = useState(null);
  const [search, setSearch] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Fetch projects from JSON file
  useEffect(() => {
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  // Get all unique categories from all projects (multi-category support)
  let allCategories = Array.from(new Set(projects.flatMap(p => p.categories || [])));
  // Ensure 'Featured' is first if present
  if (allCategories.includes('Featured')) {
    allCategories = allCategories.filter(c => c !== 'Featured');
    allCategories.unshift('Featured');
  }
  // Place only 'Featured' and the rest, remove 'All'
  let categories;
  if (allCategories[0] === 'Featured') {
    categories = ['Featured', ...allCategories.slice(1)];
  } else {
    categories = [...allCategories];
  }

  // Filtering: show projects that include the selected category and match the search
  const filteredProjects = (filter === 'Featured'
    ? projects.filter(p => (p.categories || []).includes('Featured'))
    : projects.filter(p => (p.categories || []).includes(filter)))
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  // Calculate paginated projects
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Set default filter to 'Featured' if present, otherwise first category
  useEffect(() => {
    if (categories.includes('Featured')) {
      setFilter('Featured');
    } else if (categories.length > 0) {
      setFilter(categories[0]);
    }
  }, [projects.length]);

  // Parallax state for profile image
  const [parallaxX, setParallaxX] = React.useState(0);
  // Parallax state for project grid
  const [gridParallaxX, setGridParallaxX] = React.useState(0);

  // Handler for mouse movement over the profile image area
  const handleParallax = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width - 0.5) * 2; // -1 (left) to 1 (right)
    setParallaxX(percent * 20); // max 20px translate or 20deg rotate
  };
  const resetParallax = () => setParallaxX(0);

  // Handler for mouse movement over the project grid
  const handleGridParallax = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width - 0.5) * 2; // -1 (left) to 1 (right)
    setGridParallaxX(percent * 3); // max 10px translate or 10deg rotate
  };
  const resetGridParallax = () => setGridParallaxX(0);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'Inter', sans-serif; }
          .heading-font { font-family: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif; }
        `}</style>
      </Head>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-blue-200 antialiased">
        <Navbar />
        {/* Hero/About Section */}
        <section id="home" className="min-h-screen flex items-center justify-center p-8">
          <div className="flex flex-col md:flex-row items-center w-full max-w-5xl">
            <div className="flex-1 text-center md:text-left">
              <h1 className="heading-font text-4xl sm:text-5xl md:text-6xl font-bold text-[#10172a] mb-2 tracking-tight">
                I&apos;m <span className="text-[#3b82f6]">Ehab Ayman</span>
              </h1>
              <h2 className="heading-font text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#10172a] tracking-tight">
                Lead Game & AR/VR Developer
              </h2>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4 max-w-2xl mx-auto md:mx-0">
                Building games and AR/VR experiences with Hands-on experience in <span className="font-semibold text-slate-900">Unity</span>, <span className="font-semibold text-slate-900">Lens Studio</span>, <span className="font-semibold text-slate-900">AR Foundation</span>, and interactive 3D media.
              </p>
              <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                <span className="px-2.5 py-1 text-xs rounded-full bg-white/70 backdrop-blur text-[#0f172a] border border-blue-100">Unity</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-white/70 backdrop-blur text-[#0f172a] border border-blue-100">AR/VR</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-white/70 backdrop-blur text-[#0f172a] border border-blue-100">AR Filters</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-white/70 backdrop-blur text-[#0f172a] border border-blue-100">Lens Studio</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-white/70 backdrop-blur text-[#0f172a] border border-blue-100">AR Foundation</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-white/70 backdrop-blur text-[#0f172a] border border-blue-100">Interactive 3D</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-white/70 backdrop-blur text-[#0f172a] border border-blue-100">WebAR</span>

              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
              <div
                className="p-1 border-2 border-[#3b82f6] rounded-2xl inline-block"
                style={{
                  transform: `perspective(600px) rotateY(${parallaxX / 2}deg) translateX(${parallaxX}px)`,
                  transition: 'transform 0.2s cubic-bezier(.4,2,.6,1)',
                }}
                onMouseMove={handleParallax}
                onMouseLeave={resetParallax}
              >
                <Image
                  src="https://files.catbox.moe/l3v0vu.jpg?text=Profile+Image"
                  alt="Ehab Ayman"
                  width={256}
                  height={320}
                  className="w-64 h-80 object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-[#10172a] mb-2">Projects</h1>
            <p className="text-gray-700 mb-8">Selected projects highlighting AR/VR, game development, and interactive media..</p>
            {/* Search Input */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="Search projects by name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-4 py-2 rounded-xl border border-white/40 bg-white/20 backdrop-blur-lg text-[#10172a] placeholder:text-[#3b82f6]/60 focus:outline-none focus:border-[#3b82f6] w-full sm:w-80 shadow-md transition"
                style={{ boxShadow: '0 4px 24px 0 rgba(59,130,246,0.08)' }}
              />
            </div>
            {/* Category Filter Buttons */}
            <div className="mb-8 flex gap-4 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full border-2 font-semibold transition text-base shadow-sm
                    ${filter === cat
                      ? 'bg-[#3b82f6] text-white border-[#3b82f6] drop-shadow-md'
                      : 'bg-white/80 text-[#10172a] border-blue-200 hover:bg-blue-100 hover:text-[#3b82f6]'}
                `}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              style={{
                transform: `perspective(800px) rotateY(${gridParallaxX / 2}deg) translateX(${gridParallaxX}px)`,
                transition: 'transform 0.25s cubic-bezier(.4,2,.6,1)',
              }}
              onMouseMove={handleGridParallax}
              onMouseLeave={resetGridParallax}
            >
              {paginatedProjects.map((project, idx) => (
                <div key={idx} className="relative group cursor-pointer rounded-2xl h-[500px]" onClick={() => setModalProject(project)}>
                  <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-60 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-sky-400/50 via-white/20 to-indigo-500/50 blur-[1px]"></div>
                  <div className="relative z-10 bg-white/50 backdrop-blur-xl rounded-2xl p-5 flex flex-col items-center border border-white/50 shadow-[0_2px_20px_rgba(2,6,23,0.06),0_12px_40px_-20px_rgba(2,6,23,0.2)] transition-transform duration-300 transform hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(2,6,23,0.12),0_16px_60px_-20px_rgba(59,130,246,0.35)] overflow-hidden h-full">
                    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-[999px] bg-white/40 blur-3xl opacity-30 group-hover:opacity-40 transition"></div>
                    <div className="w-full h-48 mb-4 overflow-hidden rounded-xl flex items-center justify-center bg-gradient-to-br from-[#f0f4ff]/80 via-[#e0f7fa]/70 to-[#f0fff4]/80 relative shadow-md">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={192}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 group-hover:brightness-105 rounded-xl"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-[#0f172a] text-sm font-semibold shadow-md opacity-0 group-hover:opacity-100 transition">
                          <FaPlay className="text-[#3b82f6]" /> Preview
                        </span>
                      </div>
                    </div>
                    <h2 className="heading-font text-xl font-semibold mb-2 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">{project.title}</h2>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2 justify-center">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs rounded-full bg-white/60 backdrop-blur-md text-[#0f172a] border border-white/80 shadow-sm">{tag}</span>
                        ))}
                      </div>
                    )}
                    <p className="text-[#0f172a]/80 text-sm text-center leading-relaxed flex-1">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center mt-8 gap-2 w-full">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base rounded-full bg-white/80 text-[#3b82f6] border border-blue-200 font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-100 transition"
                >
                  Prev
                </button>
                <span className="flex gap-2 flex-wrap justify-center w-full sm:w-auto">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base rounded-full font-semibold border shadow-sm transition
                        ${currentPage === i + 1
                          ? 'bg-[#3b82f6] text-white border-[#3b82f6] drop-shadow-md'
                          : 'bg-white/80 text-[#10172a] border-blue-200 hover:bg-blue-100 hover:text-[#3b82f6]'}
                    `}
                    >
                      {i + 1}
                    </button>
                  ))}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base rounded-full bg-white/80 text-[#3b82f6] border border-blue-200 font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-100 transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
          {/* Modal Video Player */}
          {modalProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setModalProject(null)}>
                             <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-4 sm:p-6 w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl relative flex flex-col items-center border border-white/50 shadow-[0_8px_32px_rgba(2,6,23,0.12),0_16px_60px_-20px_rgba(59,130,246,0.35)]" onClick={e => e.stopPropagation()}>
                 <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-60 bg-gradient-to-br from-sky-400/50 via-white/20 to-indigo-500/50 blur-[1px]"></div>
                <button className="absolute top-3 right-3 text-[#10172a] hover:text-[#3b82f6] text-2xl z-10 transition-colors" onClick={() => setModalProject(null)}>&times;</button>
                                                  <h2 className="heading-font text-lg sm:text-xl font-bold mb-4 text-center px-2 leading-tight text-[#10172a]">{modalProject.title}</h2>
                                                     <div className="w-full flex justify-center items-center mb-4">
                    <div className="relative w-full max-w-2xl mx-auto">
                                            <video
                         src={modalProject.video}
                         controls
                         autoPlay
                         className="w-full h-auto max-h-[70vh] rounded-lg shadow-lg"
                       />
                   </div>
                 </div>
                                 {modalProject.link && modalProject.link.trim() !== "" && (
                   <a 
                     href={modalProject.link} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3b82f6] text-white font-semibold shadow-md hover:bg-[#2563eb] hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                     </svg>
                     View Project
                   </a>
                 )}
              </div>
            </div>
          )}
        </section>
        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center p-8">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-[#10172a] mb-2">Contact Me</h1>
            <p className="text-gray-700 mb-6">Feel free to reach out for collaborations, job opportunities, or just to connect!</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#3b82f6] text-2xl" />
                <div>
                  <span className="block text-gray-500 text-sm">Email</span>
                  <a href="mailto:ehab.ayman.gharib@gmail.com" className="text-[#10172a] text-lg hover:text-[#3b82f6] transition">ehab.ayman.gharib@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#3b82f6] text-2xl" />
                <div>
                  <span className="block text-gray-500 text-sm">Phone</span>
                  <a href="tel:+201285922339" className="text-[#10172a] text-lg hover:text-[#3b82f6] transition">+20 128 5922 339</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaLinkedin className="text-[#3b82f6] text-2xl" />
                <div>
                  <span className="block text-gray-500 text-sm">LinkedIn</span>
                  <a href="https://www.linkedin.com/in/ehab-ayman/" target="_blank" rel="noopener noreferrer" className="flex items-center text-[#10172a] text-lg hover:text-[#3b82f6] transition">
                    linkedin.com/in/ehab-ayman
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}