import Link from 'next/link';

const Navbar = () => (
  <nav className="bg-white/80 backdrop-blur-md px-4 sm:px-6 py-4 shadow-md border-b border-blue-200 sticky top-0 z-50">
    <div className="flex flex-wrap items-center gap-3 sm:gap-6">
      <a href="#home" className="text-[#10172a] hover:text-[#3b82f6] font-medium transition">Home</a>
      <a href="#projects" className="text-[#10172a] hover:text-[#3b82f6] font-medium transition">Projects</a>
      <a href="#contact" className="text-[#10172a] hover:text-[#3b82f6] font-medium transition">Contact</a>
      <a href="/EHAB-AYMAN-CV.pdf" target="_blank" rel="noopener noreferrer" className="text-[#10172a] hover:text-[#3b82f6] font-medium transition">CV</a>
      <a href="https://www.linkedin.com/in/ehab-ayman/" target="_blank" rel="noopener noreferrer" className="sm:ml-4 ml-0 px-4 py-2 border-2 border-[#3b82f6] rounded-full text-[#3b82f6] font-semibold bg-white hover:bg-[#3b82f6] hover:text-white transition">LinkedIn</a>
    </div>
  </nav>
);

export default Navbar;
