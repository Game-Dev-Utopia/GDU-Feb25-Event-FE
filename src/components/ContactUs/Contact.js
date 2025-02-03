
import { useState } from "react";
import { postRequestJson } from "../../api/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

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
          address: "",
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
    <div
      id="contact"
      className="px-5 py-20 relative bg-cover bg-center bg-no-repeat overlay-section flex flex-col md:flex-row items-center justify-between"
      style={{
        backgroundImage: `url(/images/dragon_contactus.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",

      }}
    >
      {/* PinLocation Image */}

      <motion.img
        src="/images/PinLocation.png"
        alt="Location Pin"
        className="w-48 h-48 md:w-56 md:h-56 absolute left-10 transform -translate-y-1/2 cursor-pointer"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        onClick={() => window.open("https://maps.app.goo.gl/nPLvGBDaT7JgyEwD7", "_blank")}
      />

      

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-xl p-5 md:p-6 rounded-lg shadow-lg z-20 text-deepCrimson md:ml-auto lg:mr-[5%]"
        style={{
          backgroundImage: `url(/images/parchment.png)`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          minHeight: "500px",
        }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center mt-6 mb-6 font-cinzel">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <motion.input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 text-lg border-2 border-black rounded-xl bg-transparent focus:outline-none 
                      focus:border-burntOrange text-deepCrimson placeholder-deepCrimson font-bold font-playfair"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />

          <motion.input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-2 text-lg border-2 border-black rounded-xl bg-transparent focus:outline-none 
                      focus:border-burntOrange text-deepCrimson placeholder-deepCrimson font-bold font-playfair"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />

          <motion.input
            type="text"
            name="phone"
            minLength={10}
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Contact Number"
            required
            className="w-full px-4 py-2 text-lg border-2 border-black rounded-xl bg-transparent focus:outline-none 
                      focus:border-burntOrange text-deepCrimson placeholder-deepCrimson font-bold font-playfair"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
          <motion.textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows={4}
            className="w-full px-4 py-2 text-lg border-2 border-black rounded-xl bg-transparent focus:outline-none 
                      focus:border-burntOrange text-deepCrimson placeholder-deepCrimson font-bold font-playfair"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          ></motion.textarea>

          {responseMessage && (
            <div
              className={`text-center font-cinzel ${responseMessage.includes("Thank you") ? "text-green-500" : "text-red-500"}`}
            >
              {responseMessage}
            </div>
          )}

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <button
              type="submit"
              className="px-4 py-3 bg-black border border-3 border-burntOrange text-white rounded-full 
                        transition text-xl shadow-lg shadow-burntOrange/50 hover:shadow-xl hover:shadow-burntOrange 
                        hover:bg-burntOrange hover:text-black font-cinzel"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>


  );
};

export default ContactUs;
