import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin, Globe, HelpCircle, Zap, ShieldCheck, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FaGithub, FaTwitter, FaDiscord, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { Badge } from '../components/common/Badge';

export function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { addToast } = useToast();
  const [selectedTopic, setSelectedTopic] = useState('Vibe Coding Support');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const topics = [
    'Vibe Coding Support',
    'System Rule Request',
    'Prompt Engineering',
    'General Inquiry'
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    addToast(`Message sent! Thank you, ${data.name}. We will get back to you shortly.`, 'success');
    reset();
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none -z-10 opacity-30 dark:opacity-20">
        <div className="absolute top-10 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-20 right-1/3 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/25 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto"
        >
          <Badge variant="emerald" className="px-3.5 py-1 text-xs">
            <Zap className="w-3.5 h-3.5 mr-1" /> Get In Touch
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Contact 15 Product <span className="text-emerald-500 dark:text-emerald-400">Prompts Team</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Have a question about system rules, custom AI templates, or vibe coding prompt engineering? We're here to help.
          </p>
        </motion.div>

        {/* Feature Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: "Lightning Fast Reply",
              desc: "Average response in under 2 hours",
              icon: Clock,
              color: "text-emerald-500 bg-emerald-500/10"
            },
            {
              title: "Global Remote Team",
              desc: "San Francisco, CA & Remote Worldwide",
              icon: Globe,
              color: "text-cyan-500 bg-cyan-500/10"
            },
            {
              title: "Community Driven",
              desc: "100% Free & Open Vibe Prompts",
              icon: ShieldCheck,
              color: "text-purple-500 bg-purple-500/10"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3.5 shadow-xs"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Grid: Form vs Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Form Pane */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-500" />
                Send Us a Direct Message
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Fill out the fields below and our prompt engineering team will respond shortly.
              </p>
            </div>

            {/* Topic Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Select Inquiry Topic
              </label>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedTopic(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedTopic === t
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/40'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  />
                  {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                    placeholder="jane@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  />
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  {...register('subject', { required: 'Subject is required' })}
                  placeholder={`Question about ${selectedTopic}`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                />
                {errors.subject && <p className="text-[11px] text-rose-500 mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Message Content *
                </label>
                <textarea
                  rows={4}
                  {...register('message', { required: 'Message cannot be empty' })}
                  placeholder="Tell us how we can assist with your AI workflow..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 resize-none transition-all"
                />
                {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    Sending Message...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message Now
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Virtual Headquarters Map */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  Virtual HQ & AI Hub
                </h4>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Live Remote
                </span>
              </div>

              <div className="w-full h-52 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 border border-slate-800 relative flex items-center justify-center text-center overflow-hidden shadow-inner">
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="space-y-2 relative z-10 p-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="font-extrabold text-white text-sm">San Francisco, CA & Remote</p>
                  <p className="text-xs text-slate-400">Serving Developers & AI Engineers Worldwide</p>
                </div>
              </div>
            </div>

            {/* Quick Community Channels Card */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-lg">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-500" />
                Community & Social Hub
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Join our developer channels to discuss prompt techniques and vibe coding workflows.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'GitHub', icon: FaGithub, href: 'https://github.com/bunnyvalluri' },
                  { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com' },
                  { name: 'Discord', icon: FaDiscord, href: 'https://discord.com' },
                  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/syntaxrahul/' }
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={idx}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 hover:text-emerald-500 text-slate-700 dark:text-slate-300 transition-all text-xs font-semibold gap-1.5"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{s.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* FAQ Teaser Card */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-lg">
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  Have Quick Questions?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Read answers about prompt usage, privacy, and custom rules.
                </p>
              </div>
              <Link
                to="/faq"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 shrink-0 transition-colors"
              >
                FAQ <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
