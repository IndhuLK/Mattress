import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import contactImg from "/src/assets/contact.jpeg";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactUs = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${contactImg})`,
        }}
      >
        <div data-aos="fade-down">
          <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We’re here to bring you closer to nature’s comfort. Whether you have
            questions about our Kapok (Illavam Panju) mattresses and pillows or
            need support with your order — we’d love to assist you.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10">
        {/* Left: Info */}
        <div className="space-y-8" data-aos="fade-right">
          <h2 className="text-3xl font-semibold text-[#3d5f12]">
            Get in Touch with SKV
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Have a question, feedback, or wish to experience the comfort of
            Illavam Panju bedding? Our friendly team is here to help you find
            the perfect natural comfort solution for your home.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-[#3d5f12]" />
              <p>info@skvnaturalbeds.com</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-[#3d5f12]" />
              <p>+91 98432 56789</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-[#3d5f12]" />
              <p>
                SKV Natural Bed, 22/1 Anna Nagar, Chennai, Tamil Nadu, India
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-[#3d5f12]" />
              <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div
          className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200"
          data-aos="fade-left"
        >
          <h3 className="text-2xl font-semibold mb-6 text-[#3d5f12]">
            Send Us a Message
          </h3>
          <form className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d5f12] outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d5f12] outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Subject</label>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d5f12] outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Message</label>
              <textarea
                placeholder="Type your message..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d5f12] outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#3d5f12] text-white font-semibold py-3 rounded-lg 
              hover:bg-[#745e46] transition cursor-pointer shadow-[#4e7265]shadow-xs"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Map or Footer CTA */}
      <section className="bg-[#3d5f12] text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Visit Our Experience Center</h2>
        <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
          Experience the softness of <strong>Kapok (Illavam Panju)</strong> in
          person. Visit our showroom to feel the difference in every mattress
          and pillow — crafted for natural comfort and relaxation.
        </p>
        <a
          href="https://maps.google.com"
          target="_blank"
          className="bg-white text-[#3d5f12] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Find Us on Google Maps
        </a>
      </section>
    </div>
  );
};

export default ContactUs;
