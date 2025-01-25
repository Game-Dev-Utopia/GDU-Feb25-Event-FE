import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      contact: "",
      message: "",
    });
  };

  return (
    <div className="p-5">
      {/* Archer Image */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-start items-center z-10 overflow-hidden">
        <img
          src="/images/archer.png"
          alt="Archer"
          className="max-w-[500px] max-h-[700px] object-contain shadow-xl"
        />
      </div>

      {/* Form Container */}
      <div className="relative w-full max-w-xl bg-charcoalGray bg-opacity-50 p-5 md:p-6 rounded-lg shadow-lg z-20 text-goldenrod 
                     md:ml-auto lg:mr-[5%]">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 font-cinzel">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="name" className="block text-xl focus:outline-none">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#333333] border border-burntOrange focus:outline-none text-lg"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xl focus:outline-none">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#333333] border border-burntOrange focus:outline-none text-lg"
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-xl focus:outline-none">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#333333] border border-burntOrange focus:outline-none text-lg"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-xl focus:outline-none">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-[#333333] border border-burntOrange  focus:outline-none text-lg"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-deepCrimson font-bold rounded-lg hover:bg-deepCrimson"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
