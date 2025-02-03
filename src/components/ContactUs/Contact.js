import { useState } from "react";
import { postRequestJson } from "../../api/api";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(""); // Stores success/error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await postRequestJson("/api/v1/contact", JSON.stringify(formData));

      if (response) {
        toast.success("Thank you for reaching out! We'll get back to you soon.", { position: "top-right" });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(response || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div  id="contact" className="px-5 py-20 relative bg-cover bg-center bg-no-repeat overlay-section"
    style={{
      backgroundImage: `url(/images/mysticalforest.webp)`,
    }}>
      {/* Archer Image */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-start items-center z-10 overflow-hidden">
        <img
          src="/images/char.webp"
          alt="Archer"
          className="max-w-[500px] max-h-[700px] object-contain shadow-xl"
        />
      </div>

      {/* Form Container */}
      <div
        className="relative w-full max-w-xl bg-charcoalGray bg-opacity-50 p-5 md:p-6 rounded-lg shadow-lg z-20 text-burntOrange 
                     md:ml-auto lg:mr-[5%]"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 font-cinzel">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="name"
              className="block text-md md:text-xl focus:outline-none font-cinzel font-bold text-goldenrod"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-1 md:py-2 text-lg border-2 border-goldenrod rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-burntOrange text-goldenrod font-playfair"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-goldenrod text-md md:text-xl focus:outline-none font-cinzel font-bold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-1 md:py-2 text-lg border-2 border-goldenrod rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-burntOrange text-goldenrod font-playfair"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-goldenrod text-md md:text-xl focus:outline-none font-cinzel font-bold"
            >
              Contact
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-1 md:py-2 text-lg border-2 border-goldenrod rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-burntOrange text-goldenrod font-playfair"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-goldenrod text-md md:text-xl focus:outline-none font-cinzel font-bold"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-1 md:py-2 text-lg border-2 border-goldenrod rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-burntOrange text-goldenrod font-playfair"
            ></textarea>
          </div>

          {/* Success/Error Message */}
          {responseMessage && (
            <div
              className={`text-center font-cinzel ${responseMessage.includes("Thank you")
                  ? "text-green-500"
                  : "text-red-500"
                }`}
            >
              {responseMessage}
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-1 md:py-3 bg-black border border-3 border-burntOrange text-white rounded-full 
             transition text-xl shadow-lg shadow-burntOrange/50 hover:shadow-xl hover:shadow-burntOrange 
             hover:bg-burntOrange hover:text-black font-cinzel"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
