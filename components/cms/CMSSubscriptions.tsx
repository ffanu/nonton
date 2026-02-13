
import React, { useState, useMemo } from 'react';
import { Subscriber } from '../../types';

interface CMSSubscriptionsProps {
  subscribers: Subscriber[];
  onUnsubscribe: (id: string) => void;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  desc: string;
  accent: string;
}

const CMSSubscriptions: React.FC<CMSSubscriptionsProps> = ({ subscribers, onUnsubscribe }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'templates'>('list');
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Test Email States
  const [testRecipient, setTestRecipient] = useState('admin@streampulse.com');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testSentSuccess, setTestSentSuccess] = useState(false);

  const [localTemplates, setLocalTemplates] = useState<EmailTemplate[]>([
    {
      id: 'welcome',
      name: 'Welcome Template',
      subject: 'Welcome to the StreamPulse Family! 🍿',
      accent: '#E50914',
      desc: 'Sent immediately after a user subscribes from the homepage.',
      content: `
<h1 style="color: #E50914; font-size: 24px;">Welcome to StreamPulse!</h1>
<p>Thanks for joining our community of film enthusiasts.</p>
<p>You'll now be the first to know when we add new blockbusters, hidden gems, and exclusive series.</p>
<div style="background: #333; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
  <p style="margin-bottom: 15px;">Get started by browsing our latest trending titles.</p>
  <a href="#" style="background: #E50914; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 4px;">Browse Movies</a>
</div>
<p style="font-size: 12px; color: #666;">You received this because you signed up at streampulse.com</p>
      `.trim()
    },
    {
      id: 'new-movie',
      name: 'New Release Notification',
      subject: 'Now Playing: {movie_title} 🎬',
      accent: '#E50914',
      desc: 'Automatic blast sent when content is added via CMS Movies.',
      content: `
<div style="border-left: 4px solid #E50914; padding-left: 15px;">
   <h2 style="margin: 0;">New Arrival!</h2>
   <p style="font-size: 18px; font-weight: bold;">{movie_title}</p>
</div>
<p>A new thrill awaits you on StreamPulse. Check out the latest addition to our {category} collection.</p>
<img src="https://picsum.photos/id/20/600/300" style="width: 100%; border-radius: 8px; margin: 15px 0;" />
<p>Log in now to watch the trailer and add it to your list.</p>
<a href="#" style="background: #E50914; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">Watch Now</a>
      `.trim()
    },
    {
      id: 'unsubscribe',
      name: 'Unsubscribe Confirmation',
      subject: 'We’re sorry to see you go... 👋',
      accent: '#666',
      desc: 'Sent automatically when a user clicks the unsubscribe link.',
      content: `
<h2 style="color: #666;">Subscription Cancelled</h2>
<p>This email confirms that you have been unsubscribed from our newsletter.</p>
<p>We're sad to see you go, but we understand. You won't receive any more promotional emails from us.</p>
<div style="margin: 30px 0; border-top: 1px solid #333; padding-top: 20px;">
   <p style="font-size: 14px;">Changed your mind?</p>
   <a href="#" style="color: #E50914; font-weight: bold;">Resubscribe here</a>
</div>
      `.trim()
    }
  ]);

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter(sub => 
      sub.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [subscribers, searchQuery]);

  const handleSaveTemplate = () => {
    if (!editingTemplate) return;
    setLocalTemplates(prev => prev.map(t => t.id === editingTemplate.id ? editingTemplate : t));
    setEditingTemplate(null);
    alert('Template saved successfully!');
  };

  const insertTag = (tag: string) => {
    if (!editingTemplate) return;
    const content = editingTemplate.content + tag;
    setEditingTemplate({ ...editingTemplate, content });
  };

  const handleSendTest = () => {
    if (!testRecipient) return;
    setIsSendingTest(true);
    // Simulate API Delay
    setTimeout(() => {
      setIsSendingTest(false);
      setTestSentSuccess(true);
      setTimeout(() => setTestSentSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Newsletter & Subscriptions</h1>
          <p className="text-gray-400">Manage your audience and automated engagement templates.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/5 p-1 rounded-xl flex border border-white/10 h-fit">
            <button 
              onClick={() => { setActiveTab('list'); setEditingTemplate(null); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeTab === 'list' ? 'bg-[#E50914] text-white shadow-lg shadow-red-500/20' : 'text-gray-400 hover:text-white'}`}
            >
              <i className="fa-solid fa-users-line"></i>
              Audience
            </button>
            <button 
              onClick={() => { setActiveTab('templates'); setEditingTemplate(null); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeTab === 'templates' ? 'bg-[#E50914] text-white shadow-lg shadow-red-500/20' : 'text-gray-400 hover:text-white'}`}
            >
              <i className="fa-solid fa-envelope-open-text"></i>
              Templates
            </button>
          </div>
          {activeTab === 'list' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2"
            >
              <i className="fa-solid fa-plus text-[#E50914]"></i>
              Add Subscriber
            </button>
          )}
        </div>
      </header>

      {editingTemplate ? (
        /* Rich Template Editor View */
        <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setEditingTemplate(null)}
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <div>
                <h2 className="text-2xl font-bold">Edit {editingTemplate.name}</h2>
                <p className="text-sm text-gray-500">Customizing email visual and dynamic logic.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setPreviewTemplate(editingTemplate)}
                className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-bold transition text-sm flex items-center gap-2"
              >
                <i className="fa-solid fa-eye"></i>
                Preview Full Screen
              </button>
              <button 
                onClick={() => setEditingTemplate(null)}
                className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-bold transition text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveTemplate}
                className="bg-[#E50914] hover:bg-red-700 px-8 py-2.5 rounded-xl font-bold transition text-sm shadow-lg shadow-red-500/20"
              >
                Save Changes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Sidebar */}
            <div className="space-y-6 bg-[#141414] p-6 rounded-2xl border border-white/5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Subject</label>
                <input 
                  type="text"
                  value={editingTemplate.subject}
                  onChange={e => setEditingTemplate({...editingTemplate, subject: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition text-sm"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Content Editor (HTML)</label>
                  <div className="flex gap-1">
                    <button onClick={() => insertTag('<b></b>')} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs" title="Bold"><i className="fa-solid fa-bold"></i></button>
                    <button onClick={() => insertTag('<i></i>')} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs" title="Italic"><i className="fa-solid fa-italic"></i></button>
                    <button onClick={() => insertTag('<br/>')} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs" title="Line Break"><i className="fa-solid fa-paragraph"></i></button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  <button 
                    onClick={() => insertTag('{movie_title}')}
                    className="px-3 py-1 rounded bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 hover:bg-red-500/20"
                  >
                    + Movie Title
                  </button>
                  <button 
                    onClick={() => insertTag('{category}')}
                    className="px-3 py-1 rounded bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 hover:bg-red-500/20"
                  >
                    + Category
                  </button>
                  <button 
                    onClick={() => insertTag('{user_email}')}
                    className="px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 hover:bg-blue-500/20"
                  >
                    + User Email
                  </button>
                </div>

                <textarea 
                  rows={15}
                  value={editingTemplate.content}
                  onChange={e => setEditingTemplate({...editingTemplate, content: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-red-500 transition text-sm font-mono resize-none custom-scrollbar"
                />
              </div>
            </div>

            {/* Live Preview Side */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live Desktop Preview</label>
              <div className="bg-[#f5f5f5] rounded-2xl border border-white/5 overflow-hidden shadow-2xl h-[600px] flex flex-col">
                <div className="bg-[#141414] p-4 flex justify-between items-center shrink-0">
                  <div className="text-[#E50914] font-black text-lg tracking-tighter">STREAMPULSE</div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold px-2 py-1 bg-white/5 rounded">Email Preview</div>
                </div>
                <div className="flex-1 overflow-y-auto p-8">
                  <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-8 text-gray-800 font-sans leading-relaxed text-sm">
                       <div dangerouslySetInnerHTML={{ 
                         __html: editingTemplate.content
                           .replace(/{movie_title}/g, '<span style="color: #E50914; font-weight: bold;">Inception</span>')
                           .replace(/{category}/g, 'Sci-Fi')
                           .replace(/{user_email}/g, 'viewer@example.com') 
                       }} />
                    </div>
                    <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                       <p className="text-[10px] text-gray-400">© 2024 StreamPulse Inc. Sent to viewer@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'list' ? (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-[#141414] p-6 rounded-2xl border border-white/5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <i className="fa-solid fa-users"></i>
                  </div>
                  <p className="text-gray-400 text-sm">Total Audience</p>
                </div>
                <h3 className="text-3xl font-bold">{subscribers.length}</h3>
                <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
                  <i className="fa-solid fa-arrow-up"></i>
                  12% this month
                </p>
             </div>
             <div className="bg-[#141414] p-6 rounded-2xl border border-white/5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <i className="fa-solid fa-check-circle"></i>
                  </div>
                  <p className="text-gray-400 text-sm">Active Subs</p>
                </div>
                <h3 className="text-3xl font-bold">{subscribers.filter(s => s.status === 'Active').length}</h3>
                <p className="text-xs text-gray-500 mt-2">Delivering updates</p>
             </div>
             <div className="bg-[#141414] p-6 rounded-2xl border border-white/5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                    <i className="fa-solid fa-user-xmark"></i>
                  </div>
                  <p className="text-gray-400 text-sm">Churn Rate</p>
                </div>
                <h3 className="text-3xl font-bold">2.4%</h3>
                <p className="text-xs text-gray-500 mt-2">Below industry average</p>
             </div>
          </div>

          <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <h4 className="font-bold text-sm">Subscriber Directory</h4>
              <div className="flex gap-2">
                <div className="relative">
                  <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]"></i>
                  <input 
                    type="text" 
                    placeholder="Filter emails..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black/20 border border-white/10 rounded-lg pl-8 pr-3 py-1 text-xs focus:outline-none focus:border-red-500 w-48 transition-colors" 
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                    >
                      <i className="fa-solid fa-xmark text-[10px]"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <table className="w-full text-left">
              <thead className="bg-white/[0.03] border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Subscriber Email</th>
                  <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredSubscribers.length > 0 ? (
                  filteredSubscribers.map(sub => (
                    <tr key={sub.id} className="hover:bg-white/[0.02] transition group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white transition">
                            <i className="fa-solid fa-envelope text-xs"></i>
                          </div>
                          <span className="font-medium text-sm">{sub.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">{sub.subscribedAt}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] uppercase font-black px-2 py-1 rounded-full border ${sub.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {sub.status === 'Active' ? (
                          <button 
                            onClick={() => onUnsubscribe(sub.id)}
                            className="text-gray-500 hover:text-red-500 text-xs font-bold flex items-center gap-2 transition ml-auto bg-white/5 px-3 py-1.5 rounded-lg hover:bg-red-500/10"
                          >
                            <i className="fa-solid fa-user-slash"></i>
                            Manual Unsubscribe
                          </button>
                        ) : (
                           <span className="text-xs text-gray-600 italic">No actions</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <i className="fa-solid fa-inbox text-2xl opacity-20"></i>
                        <p className="text-sm">No subscribers found matching "{searchQuery}"</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
          {localTemplates.map(tmp => (
            <div key={tmp.id} className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden flex flex-col group hover:border-white/20 transition-all shadow-lg">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#1c1c1c] to-black p-8 relative flex flex-col items-center justify-center overflow-hidden">
                 {/* Email Mockup */}
                 <div className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl p-4 shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500 relative z-10">
                    <div className="w-12 h-3 bg-[#E50914] rounded-full mb-4"></div>
                    <div className="w-full h-32 bg-white/5 rounded-lg mb-4 flex items-center justify-center border border-white/5">
                       <i className="fa-solid fa-clapperboard text-gray-800 text-4xl group-hover:text-red-900/20 transition-colors"></i>
                    </div>
                    <div className="h-2 w-3/4 bg-gray-700/50 rounded-full mb-2"></div>
                    <div className="h-2 w-1/2 bg-gray-700/50 rounded-full mb-6"></div>
                    <div className={`w-full h-10 rounded-lg flex items-center justify-center text-[10px] font-black uppercase tracking-widest`} style={{ backgroundColor: tmp.accent }}>
                       {tmp.id === 'welcome' ? 'Start Watching' : tmp.id === 'new-movie' ? 'Watch Trailer' : 'Resubscribe'}
                    </div>
                 </div>

                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors"></div>

                 <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 gap-4 backdrop-blur-sm z-20">
                    <button 
                      onClick={() => setPreviewTemplate(tmp)}
                      className="bg-white text-black w-12 h-12 rounded-full hover:scale-110 transition active:scale-95 flex items-center justify-center shadow-xl"
                      title="Preview Template"
                    >
                      <i className="fa-solid fa-eye text-lg"></i>
                    </button>
                    <button 
                      onClick={() => setEditingTemplate(tmp)}
                      className="bg-[#E50914] text-white w-12 h-12 rounded-full hover:scale-110 transition active:scale-95 flex items-center justify-center shadow-xl"
                      title="Edit Template"
                    >
                      <i className="fa-solid fa-pen-nib text-lg"></i>
                    </button>
                 </div>
              </div>
              <div className="p-6 space-y-3 bg-white/[0.01]">
                 <div className="flex items-center justify-between">
                   <h3 className="font-bold text-lg">{tmp.name}</h3>
                   <span className="text-[10px] font-black px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase">Auto</span>
                 </div>
                 <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Subject Line</p>
                    <p className="text-xs text-[#E50914] font-medium italic line-clamp-1">"{tmp.subject}"</p>
                 </div>
                 <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">{tmp.desc}</p>
                 
                 {/* Explicit Action Buttons */}
                 <div className="flex gap-2">
                    <button 
                      onClick={() => setPreviewTemplate(tmp)}
                      className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2"
                    >
                      <i className="fa-solid fa-eye text-[10px]"></i>
                      Preview
                    </button>
                    <button 
                      onClick={() => setEditingTemplate(tmp)}
                      className="flex-1 bg-[#E50914]/10 hover:bg-[#E50914]/20 text-[#E50914] py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2"
                    >
                      <i className="fa-solid fa-pen text-[10px]"></i>
                      Edit
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-[#1c1c1c] w-full max-w-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E50914]/10 flex items-center justify-center text-[#E50914] text-xl">
                       <i className="fa-solid fa-magnifying-glass-chart"></i>
                    </div>
                    <div>
                       <h2 className="text-xl font-bold">Template Preview</h2>
                       <p className="text-xs text-gray-500">{previewTemplate.name}</p>
                    </div>
                 </div>
                 <button onClick={() => setPreviewTemplate(null)} className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition">
                    <i className="fa-solid fa-xmark text-xl"></i>
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 bg-[#f5f5f5]">
                 <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <div className="bg-[#141414] p-6 flex justify-between items-center">
                       <div className="text-[#E50914] font-black text-xl tracking-tighter">STREAMPULSE</div>
                       <div className="text-gray-500 text-[10px] uppercase font-bold">Email Notification</div>
                    </div>
                    <div className="p-8 text-gray-800 font-sans leading-relaxed text-sm">
                       <div dangerouslySetInnerHTML={{ __html: previewTemplate.content.replace(/{movie_title}/g, 'The Midnight Horizon').replace(/{category}/g, 'Sci-Fi') }} />
                    </div>
                    <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                       <p className="text-[10px] text-gray-400">© 2024 StreamPulse Inc. All rights reserved.</p>
                       <div className="mt-2 flex justify-center gap-4 text-gray-400">
                          <i className="fa-brands fa-facebook"></i>
                          <i className="fa-brands fa-twitter"></i>
                          <i className="fa-brands fa-instagram"></i>
                       </div>
                    </div>
                 </div>
              </div>
              
              {/* Enhanced Test Email Footer */}
              <div className="p-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between bg-white/[0.02] gap-4">
                 <div className="flex-1 flex flex-col gap-1 w-full">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Test Recipient</label>
                    <div className="flex gap-2">
                       <input 
                        type="email" 
                        value={testRecipient}
                        onChange={(e) => setTestRecipient(e.target.value)}
                        placeholder="test@example.com"
                        className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-red-500 transition"
                       />
                       <button 
                        disabled={isSendingTest || !testRecipient}
                        onClick={handleSendTest}
                        className={`px-6 py-2 rounded-lg font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg ${testSentSuccess ? 'bg-green-500 text-white' : 'bg-[#E50914] hover:bg-red-700 text-white shadow-red-500/20'} disabled:opacity-50 min-w-[140px]`}
                      >
                        {isSendingTest ? (
                          <>
                            <i className="fa-solid fa-spinner animate-spin"></i>
                            Sending...
                          </>
                        ) : testSentSuccess ? (
                          <>
                            <i className="fa-solid fa-circle-check"></i>
                            Sent!
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-paper-plane"></i>
                            Send Test Email
                          </>
                        )}
                      </button>
                    </div>
                 </div>
                 <p className="text-[10px] text-gray-600 max-w-[150px] leading-tight text-right hidden md:block">
                   Sent as a one-time test. No subscribers will be affected.
                 </p>
              </div>
           </div>
        </div>
      )}

      {/* Manual Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in zoom-in duration-300">
           <div className="bg-[#1c1c1c] w-full max-w-md rounded-2xl border border-white/10 p-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-2">Register Subscriber</h2>
              <p className="text-gray-400 text-sm mb-6">Manually add an email address to the newsletter distribution list.</p>
              
              <div className="space-y-4">
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition"
                    />
                 </div>
                 <div className="pt-4 flex gap-3">
                    <button 
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold transition"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        // Simple simulation
                        if(newEmail) alert(`Manually added ${newEmail}. They will receive a Welcome email.`);
                        setShowAddModal(false);
                        setNewEmail('');
                      }}
                      className="flex-1 px-4 py-3 rounded-xl bg-[#E50914] hover:bg-red-700 font-bold transition shadow-lg shadow-red-500/20"
                    >
                      Add & Notify
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CMSSubscriptions;
