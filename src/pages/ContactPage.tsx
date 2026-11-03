import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('error', 'Please fill in all required fields.');
      return;
    }
    setSubmitted(true);
    showToast('success', 'Your support ticket has been received! We will reply within 2 hours.', 'Message Sent');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const faqs = [
    {
      q: 'How long does delivery take across India?',
      a: 'Orders placed before 2:00 PM are dispatched on the same day from our Bengaluru fulfillment center. Metro cities (Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Chennai) typically receive orders within 24 to 48 hours. Other tier-2 and tier-3 regions are fulfilled within 2 to 4 business days.',
    },
    {
      q: 'How does the 7-Day Easy Return policy work?',
      a: 'If your item has any defect, mismatch, or performance issue, you can initiate a return or exchange within 7 days of delivery through your Order History or by contacting our support team. We schedule a free doorstep pickup and initiate an immediate replacement or full refund.',
    },
    {
      q: 'What payment modes are accepted on SmartBiz Store?',
      a: 'We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm, BHIM), Credit and Debit Cards (Visa, MasterCard, RuPay), Net Banking across 50+ Indian banks, and Cash on Delivery (COD) with zero extra surcharge.',
    },
    {
      q: 'Are all products authentic with manufacturer warranty?',
      a: 'Yes, 100%. SmartBiz Store operates with direct brand partnerships. Every device, headphone, watch, or kitchen appliance is accompanied by an official brand warranty valid across certified service centers pan-India.',
    },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand-dark text-xs font-bold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>24/7 Customer Care</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            We're Here to Help You
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Have questions regarding an order, shipment, warranty, or product specifications? Reach out to our team.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Direct Helpline / Mobile</h4>
            <a href="tel:+918072545558" className="text-xs text-brand-dark hover:underline mt-1 font-mono font-bold block">
              +91 80725 45558
            </a>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Call or WhatsApp &bull; Mon - Sat, 9 AM - 8 PM</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-brand flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Email Helpdesk</h4>
            <p className="text-xs text-slate-600 mt-1 font-mono font-bold">support@smartbizstore.in</p>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Average response time: &lt; 2 hours</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Fulfillment Center</h4>
            <p className="text-xs text-slate-600 mt-1">Outer Ring Road, Bellandur</p>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Bengaluru, Karnataka 560103</span>
          </div>
        </div>

        {/* Contact Form & Office Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form: 7 cols */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Send Us a Direct Message</h3>
            <p className="text-xs text-slate-500">Fill in the form below and our support staff will assist you promptly.</p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Message Received!</h4>
                <p className="text-xs text-emerald-700">
                  Thank you for reaching out. We have created a priority support ticket for your inquiry and will email you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-emerald-800 underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Order inquiry, product question, or feedback"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your query or mention your Order ID if applicable..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-brand hover:bg-brand-hover text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Interactive FAQ: 5 cols */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-5 h-5 text-brand" /> Frequently Asked Questions
            </h3>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-2 transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

