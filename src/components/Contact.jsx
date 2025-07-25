const Contact = ({ drakeMode }) => (
  <div className={`min-h-screen flex flex-col justify-center items-center ${drakeMode ? 'bg-[#1A1A1A] text-[#FFD700]' : ''}`}>
    <h2 className={`text-3xl font-bold mb-4 ${drakeMode ? 'text-[#FFD700]' : ''}`}>Contact</h2>
    <p className={`text-lg mb-4 ${drakeMode ? 'text-[#FFD700]/80' : ''}`}>Feel free to reach out!</p>
    <form className="flex flex-col gap-3 w-full max-w-sm">
      <input className={`border rounded px-3 py-2 ${drakeMode ? 'bg-[#232323] text-[#FFD700] border-[#FFD700]/40' : ''}`} type="text" placeholder="Your Name" />
      <input className={`border rounded px-3 py-2 ${drakeMode ? 'bg-[#232323] text-[#FFD700] border-[#FFD700]/40' : ''}`} type="email" placeholder="Your Email" />
      <textarea className={`border rounded px-3 py-2 ${drakeMode ? 'bg-[#232323] text-[#FFD700] border-[#FFD700]/40' : ''}`} placeholder="Your Message" rows={4} />
      <button className={`rounded px-4 py-2 ${drakeMode ? 'bg-[#FFD700] text-[#1A1A1A]' : 'bg-blue-500 text-white'}`} type="submit">Send</button>
    </form>
  </div>
);

export default Contact;
