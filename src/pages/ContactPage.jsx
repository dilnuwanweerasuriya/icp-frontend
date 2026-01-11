import React, { useState } from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { Phone } from 'lucide-react';
import { BiEnvelope } from 'react-icons/bi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState(''); // 'success', 'error', ''

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending'); // Indicate form is being sent

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus('error');
      alert('Please fill in all fields.');
      return;
    }

    // In a real application, you would send this data to a backend server.
    // For this example, we'll just simulate an API call.
    console.log('Form Data Submitted:', formData);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate a successful response
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      alert('Your message has been sent successfully!');

    } catch (error) {
      // Simulate an error response
      setFormStatus('error');
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800">
      <main>
        {/* Hero Section */}
        <section className="relative bg-cover bg-center h-[550px] flex items-center justify-center text-white py-20 px-4 text-center">
            <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="absolute inset-0 object-cover w-full h-full" alt="Contact Hero" />
          <div className="container mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              We're here to help! Reach out to us for any inquiries.
            </p>
          </div>
        </section>

        <section className="container mx-auto py-16 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-4">
                  Contact Information
                </h2>
                <div className="space-y-6 text-lg text-gray-700">
                  <p className="flex items-center">
                    <FaMapMarkedAlt className="text-blue-500 text-2xl mr-4" />
                    <span>123 Tech Lane, Silicon Valley, CA 90210</span>
                  </p>
                  <p className="flex items-center">
                    <Phone className="text-blue-500 text-2xl mr-4" />
                    <span>+1 (555) 123-4567</span>
                  </p>
                  <p className="flex items-center">
                    <BiEnvelope className="text-blue-500 text-2xl mr-4" />
                    <span>support@bytebazaar.com</span>
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Business Hours:</h3>
                <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
                <p className="text-gray-700">Saturday: 10:00 AM - 4:00 PM (PST)</p>
                <p className="text-gray-700">Sunday: Closed</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-4">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Regarding an order, technical support, etc."
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 px-6 rounded-lg text-lg font-bold text-white transition-colors duration-300 ${
                    formStatus === 'sending'
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {formStatus === 'success' && (
                  <p className="mt-4 text-center text-green-600">Message sent successfully!</p>
                )}
                {formStatus === 'error' && (
                  <p className="mt-4 text-center text-red-600">Failed to send message. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Find Our Location
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63392.36288646287!2d79.88913600000001!3d6.7670886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2450af2b3b63d%3A0x4bd5b87e09abb3c7!2sMoratuwa!5e0!3m2!1sen!2slk!4v1768143500658!5m2!1sen!2slk"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ByteBazaar Location"
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;