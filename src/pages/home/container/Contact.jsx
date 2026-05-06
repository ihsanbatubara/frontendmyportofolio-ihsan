import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS Toastify

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_h6i055h', 'template_r596eum', form.current, 'n2qVOOwl2AhovvL9S')
      .then(
        () => {
          toast.success('✅ Message sent successfully!', {
            position: 'top-right',
            autoClose: 3000, // Notifikasi menghilang dalam 3 detik
          });
          form.current.reset(); // Reset form setelah berhasil
        },
        (error) => {
          toast.error('❌ Failed to send message.', {
            position: 'top-right',
            autoClose: 3000,
          });
          console.error('Error:', error.text);
        }
      );
  };

  return (
    <main>
      <section id="contact" className="w-full py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Left Side: Info */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-6xl md:text-8xl font-black text-black uppercase tracking-tighter leading-[0.9] mb-8">
                Let's<br />Connect.
              </h2>
              <div className="space-y-8">
                <p className="text-xl font-bold text-gray-500 max-w-md leading-relaxed">
                  Have a project in mind? Looking for a partner to build something amazing? Reach out and let's make it happen.
                </p>

                <div className="flex flex-col gap-4">
                  <div className="bg-yellow-300 border-2 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000] inline-block w-fit">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-black mb-1">Email Me At</span>
                    <a href="mailto:hello@example.com" className="text-xl font-black text-black border-b-2 border-black">
                      hello@example.com
                    </a>
                  </div>
                </div>

                {/* Social links can be added here if needed */}
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white border-4 border-black p-8 md:p-12 rounded-[40px] shadow-[16px_16px_0px_rgba(0,0,0,0.1)]">
                <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black px-1">What's your name?</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      name="user_name"
                      className="w-full bg-[#f8f8f8] border-2 border-black p-4 rounded-2xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all placeholder:text-gray-300"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black px-1">Your Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      name="user_email"
                      className="w-full bg-[#f8f8f8] border-2 border-black p-4 rounded-2xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all placeholder:text-gray-300"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black px-1">Tell me about your project</label>
                    <textarea
                      name="message"
                      placeholder="Hello! I have an idea for..."
                      rows="5"
                      className="w-full bg-[#f8f8f8] border-2 border-black p-4 rounded-2xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all placeholder:text-gray-300 resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white font-black uppercase py-5 rounded-2xl border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </section>
    </main>
  );
};

export default Contact;
