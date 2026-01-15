"use client";

import React, { useState } from "react";
import { Navigation } from "@/src/components/Navigation";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFD]">
      <Navigation />

      <main className="w-full flex-1 py-12">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-5xl font-bold text-[#1F2937] mb-8 text-center">
            Contact Us
          </h1>

          <div className="text-center mb-12">
            <p className="text-xl text-[#4B5563]">
              We'd love to hear from you! Send us a message and we'll respond as
              soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E7EB]">
              <h3 className="text-2xl font-bold text-[#1F2937] mb-4">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-medium text-[#1F2937]">Email</p>
                    <p className="text-[#4B5563]">hello@soaphaven.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-medium text-[#1F2937]">Phone</p>
                    <p className="text-[#4B5563]">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-medium text-[#1F2937]">Address</p>
                    <p className="text-[#4B5563]">
                      123 Soap Street
                      <br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E7EB]">
              <h3 className="text-2xl font-bold text-[#1F2937] mb-4">
                Business Hours
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#4B5563]">Monday - Friday</span>
                  <span className="font-medium text-[#1F2937]">9am - 6pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4B5563]">Saturday</span>
                  <span className="font-medium text-[#1F2937]">10am - 4pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4B5563]">Sunday</span>
                  <span className="font-medium text-[#1F2937]">Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#E5E7EB]">
            <h2 className="text-3xl font-bold text-[#1F2937] mb-6">
              Send us a Message
            </h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
                <p className="text-xl font-bold mb-2">✓ Thank you!</p>
                <p>Your message has been sent successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#1F2937] mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C084FC]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#1F2937] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C084FC]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[#1F2937] mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C084FC]"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Question</option>
                    <option value="product">Product Information</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#1F2937] mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C084FC]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C084FC] text-white py-4 rounded-full font-bold text-lg hover:bg-[#A855F7] transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full bg-[#1F2937] text-[#FDFDFD] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-sm">© 2026 Soap Haven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
