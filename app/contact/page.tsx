"use client";

import { useState, useEffect } from "react";
import { getContactInfo } from "@/lib/sanity/queries";
import AnimatedRobot from "@/components/AnimatedRobot";
import { 
  AiOutlineMail, 
  AiOutlinePhone, 
  AiOutlineEnvironment,
  AiOutlineSend,
  AiOutlineUser,
  AiOutlineMessage
} from "react-icons/ai";

// Fallback data if Sanity has no content yet
const fallbackContact = {
  emails: ["info@kidzofi.com", "support@kidzofi.com"],
  phones: ["+91 123 456 7890", "+91 987 654 3210"],
  address: "123 Learning Street\nEducation City, EC 123456\nIndia",
};

export default function ContactPage() {
  const [contact, setContact] = useState(fallbackContact);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    getContactInfo().then((data) => {
      if (data) setContact({ ...fallbackContact, ...data });
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Robot */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16">
          {/* Animated Robot */}
          <div className="flex-shrink-0">
            <AnimatedRobot />
          </div>
          
          {/* Title */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-4">
              Get in <span className="text-green-600">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
              We&apos;d love to hear from you! Reach out to us for any questions, feedback, or just to say hello.
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-1 gap-6">
              {/* Email Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
                    <AiOutlineMail className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-black mb-2">Email Us</h3>
                    <div className="space-y-1">
                      {contact.emails.map((email, i) => (
                        <a 
                          key={i} 
                          href={`mailto:${email}`}
                          className="block text-gray-600 hover:text-green-600 transition-colors duration-200"
                        >
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
                    <AiOutlinePhone className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-black mb-2">Call Us</h3>
                    <div className="space-y-1">
                      {contact.phones.map((phone, i) => (
                        <a 
                          key={i} 
                          href={`tel:${phone.replace(/\s/g, '')}`}
                          className="block text-gray-600 hover:text-green-600 transition-colors duration-200"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
                    <AiOutlineEnvironment className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-black mb-2">Visit Us</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {contact.address.split("\n").map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-black rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Working Hours
              </h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-white">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <AiOutlineUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none text-black placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <AiOutlineMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none text-black placeholder-gray-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-black mb-2">
                  Your Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-4 flex items-start pointer-events-none">
                    <AiOutlineMessage className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none text-black placeholder-gray-400 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <AiOutlineSend className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
