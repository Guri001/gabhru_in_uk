export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold font-poppins mb-2">Gabhru in UK</h3>
          <p className="text-gray-400 text-sm">Building Careers, Shaping Futures.</p>
        </div>
        
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          <a href="https://www.instagram.com/gabhru_in_uk" className="hover:text-accent transition-colors">Instagram</a>
        </div>
        
        <div className="text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Gabhru in UK. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
