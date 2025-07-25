const Contact = () => (
  <div className="min-h-screen flex flex-col justify-center items-center">
    <h2 className="text-3xl font-bold mb-4">Contact</h2>
    <p className="text-lg mb-4">Feel free to reach out!</p>
    <form className="flex flex-col gap-3 w-full max-w-sm">
      <input className="border rounded px-3 py-2" type="text" placeholder="Your Name" />
      <input className="border rounded px-3 py-2" type="email" placeholder="Your Email" />
      <textarea className="border rounded px-3 py-2" placeholder="Your Message" rows={4} />
      <button className="bg-blue-500 text-white rounded px-4 py-2" type="submit">Send</button>
    </form>
  </div>
);

export default Contact;
