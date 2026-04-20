"use client";

import { useState } from 'react';

// ==========================================
// MAIN APP CONTROLLER
// ==========================================
export default function ADDUNationPortal() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [subView, setSubView] = useState(null);

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  const isAdmin = user.role === 'admin';

  return (
    <div className="flex h-screen w-full bg-[#F8F9FB]">
      <Sidebar 
        isAdmin={isAdmin} 
        activeTab={activeTab} 
        setActiveTab={(tab) => { setActiveTab(tab); setSubView(null); }} 
        onLogout={() => setUser(null)} 
      />
      
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <TopHeader user={user} setSubView={setSubView} setActiveTab={setActiveTab} />
        
        {/* Full-width container to eliminate the "empty" feel */}
        <div className="p-8 pb-24 w-full max-w-[1400px] mx-auto">
          
          {/* SUB-VIEWS */}
          {subView === 'account' && !isAdmin && <AccountDashboard setSubView={setSubView} />}
          {subView === 'passport' && !isAdmin && <UserProfile isStaff={false} setSubView={setSubView} />}
          
          {/* ALUMNI MAIN VIEWS */}
          {!isAdmin && !subView && activeTab === 'home' && <AlumniHome setActiveTab={setActiveTab} setSubView={setSubView} user={user} />}
          {!isAdmin && !subView && activeTab === 'network' && <NetworkDashboard />}
          {!isAdmin && !subView && activeTab === 'career' && <CareerDashboard />}
          {!isAdmin && !subView && activeTab === 'documents' && <DocumentDashboard user={user} />}
          {!isAdmin && (!subView || subView.startsWith('donate')) && activeTab === 'donate' && (
            <DonationController subView={subView} setSubView={setSubView} />
          )}

          {/* ADMIN MAIN VIEWS */}
          {isAdmin && !subView && activeTab === 'home' && <AdminHome setActiveTab={setActiveTab} user={user} />}
          {isAdmin && (!subView || subView.startsWith('queue')) && activeTab === 'queue' && <AdminQueueController subView={subView} setSubView={setSubView} />}
          {isAdmin && !subView && activeTab === 'insights' && <AdminInsights />}
          {isAdmin && !subView && activeTab === 'profile' && <UserProfile isStaff={true} setSubView={setSubView} />}
        </div>
      </main>
    </div>
  );
}

// ==========================================
// EXACT LOGIN SCREEN (WITH AUTO-LOGIN FIX)
// ==========================================
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Auto-login logic: Only admin/admin logs into staff. EVERYTHING else logs into Alumni.
    if (email.toLowerCase() === 'admin' && password === 'admin') {
      onLogin({ name: 'Joo Dan Te', role: 'admin', class: '2018', dept: 'Alumni Coordinator', id: 'ADDU-2018-0921' });
    } else {
      onLogin({ name: 'Alex Johnson', role: 'alumni', class: '2015', dept: 'Engineering Dept.', id: '2020-10485' });
    }
  };

  return (
    <div className="min-h-screen max-h-screen flex items-center justify-center bg-slate-100 p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-y-auto flex flex-col relative">
        <div className="bg-[#050454] pt-16 pb-20 px-8 flex flex-col items-center">
          <img 
            src="/addu-logo.png" 
            alt="ADDU Logo" 
            className="w-30 h-30 object-contain mb-4 drop-shadow-md" 
          />
          <div className="flex items-center gap-4 text-white tracking-widest font-serif text-xl">
            <span>ADDU</span><span>NATION</span>
          </div>
        </div>

        <div className="bg-white rounded-t-[2rem] -mt-10 px-8 py-8 flex-1 flex flex-col z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
          <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:bg-slate-50 mb-8 group transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-2xl group-hover:bg-[#050454] group-hover:text-white transition-colors">☺</div>
              <div className="text-left">
                <p className="font-bold text-[#050454] text-sm">Biometric Login</p>
                <p className="text-xs text-slate-500">Use Biometric Link to retrieve record</p>
              </div>
            </div>
            <span className="text-slate-400">›</span>
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-slate-200 w-full absolute"></div>
            <span className="bg-white px-4 text-[10px] font-bold text-slate-400 tracking-widest uppercase relative">OR LOGIN WITH</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase block mb-1">UNIVERSITY ID / EMAIL</label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-slate-400">✉</span>
                <input 
                  type="text" value={email} onChange={e => setEmail(e.target.value)} 
                  className="w-full bg-slate-50 pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-[#050454] focus:bg-white focus:outline-none text-sm font-bold text-[#050454] transition-colors" 
                  placeholder="Type anything for Alumni..." 
                />
              </div>
            </div>
<div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-[#050454] tracking-widest uppercase">PASSWORD</label>
                <span className="text-xs font-bold text-[#050454] cursor-pointer hover:underline">Forgot?</span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-4 text-slate-400">🔒</span>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="w-full bg-slate-50 pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-[#050454] focus:bg-white focus:outline-none text-xl font-black tracking-[0.2em] transition-colors" 
                  style={{ color: '#050454' }} 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#050454] text-white font-bold py-4 rounded-xl mt-4 hover:bg-blue-900 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-blue-900/20">
              Log In <span className="text-lg leading-none">→</span>
            </button>
          </form>
          
          <div className="flex justify-between items-center mt-auto pt-8 text-sm">
            <span className="text-slate-500 font-medium">Need Help?</span>
            <span className="text-[#050454] font-bold cursor-pointer hover:underline">Create Account</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// DESKTOP LAYOUT SHELL (SIDEBAR / HEADER)
// ==========================================
function Sidebar({ isAdmin, activeTab, setActiveTab, onLogout }) {
  const tabs = isAdmin 
    ? [{ id: 'home', icon: '🏠', label: 'Home' }, { id: 'queue', icon: '📋', label: 'Queue' }, { id: 'insights', icon: '📈', label: 'Insights' }, { id: 'messages', icon: '✉️', label: 'Messages' }]
    : [{ id: 'home', icon: '🏠', label: 'Home' }, { id: 'network', icon: '👥', label: 'Network' }, { id: 'donate', icon: '💙', label: 'Donate' }, { id: 'career', icon: '💼', label: 'Career' }, { id: 'documents', icon: '📄', label: 'Documents' }];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm">
      <div className="p-8 flex items-center gap-4 border-b border-slate-100">
        <div className="w-40 h-37 bg-[#050454] rounded-lg flex items-center justify-center text-white text-xs font-serif shadow-md"> <img 
  src="/addu-logo.png" 
  alt="ADDU Logo" 
  className="w-30 h-30 object-contain mb-4 drop-shadow-md" 
/></div>
        <span className="font-serif tracking-widest text-[#050454] font-bold text-lg">ADDU NATION</span>
      </div>
      <nav className="flex-1 p-6 space-y-2">
        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4 pl-2">Main Menu</p>
        {tabs.map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all text-sm ${activeTab === item.id ? 'bg-[#050454] text-white shadow-md shadow-blue-900/20' : 'text-slate-500 hover:bg-slate-50 hover:text-[#050454]'}`}>
            <span className="text-xl">{item.icon}</span> <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-6 border-t border-slate-100">
        <button onClick={onLogout} className="w-full py-3 text-red-500 hover:bg-red-50 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
          <span>🚪</span> Log Out
        </button>
      </div>
    </aside>
  );
}

function TopHeader({ user, setActiveTab, setSubView }) {
  const isAdmin = user.role === 'admin';
  return (
    <header className="bg-white/80 px-10 py-5 border-b border-slate-200 flex justify-between items-center backdrop-blur-md sticky top-0 z-30">
      <div className="relative w-[400px]">
        <span className="absolute left-5 top-3 text-slate-400">🔍</span>
        <input type="text" placeholder="Search alumni by name, year, or industry..." className="w-full bg-slate-100 border-none pl-12 pr-4 py-3 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#050454] transition-shadow"/>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
          🔔<span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <div className="h-8 w-px bg-slate-200"></div>
        <div onClick={() => isAdmin ? setActiveTab('profile') : setSubView('account')} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-[#050454] rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:ring-4 ring-blue-100 transition-all">
            {user.name.charAt(0)}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-[#050454]">{user.name}</p>
            <p className="text-[10px] text-slate-500 tracking-widest uppercase">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// ==========================================
// ALUMNI HOME (FIXED DESKTOP GRID & OVERLAP)
// ==========================================
function AlumniHome({ setActiveTab, setSubView, user }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Left Column - Hero and Core Stats */}
      <div className="xl:col-span-2 space-y-8 relative">
        
        {/* Fixed Hero Banner */}
        <div className="relative">
          <div className="bg-[#050454] rounded-[2rem] p-12 text-white overflow-hidden flex flex-col justify-end shadow-xl relative z-0">
            {/* Background Graphic */}
            <div className="absolute right-0 top-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <div className="z-10 relative">
              <p className="text-white/80 text-sm font-bold tracking-widest uppercase mb-2">Welcome back,</p>
              <h1 className="text-5xl font-bold mb-10">Hello, {user.name.split(' ')[0]}!</h1>
            </div>
            
            {/* Decorative element substituting the 3D Boy */}
            <div className="absolute right-10 bottom-0 flex items-end">
              <div className="w-48 h-56 bg-white/10 rounded-t-[3rem] border-t border-x border-white/20 flex flex-col items-center justify-center pb-8 backdrop-blur-sm">
                <span className="text-6xl mb-2">👋</span>
                <span className="text-white/50 text-[10px] font-bold tracking-widest">AVATAR SYNCED</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Bar (Fixes the clipped blob issue by living outside the overflow container!) */}
          <div className="relative z-20 -mt-8 mx-8 bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex justify-between px-8">
             {[
               {i: '👥', l: 'Network', t: 'network', c: 'text-blue-600 bg-blue-50'}, 
               {i: '💙', l: 'Donate', t: 'donate', c: 'text-teal-600 bg-teal-50'}, 
               {i: '💼', l: 'Career', t: 'career', c: 'text-purple-600 bg-purple-50'}, 
               {i: '📄', l: 'Docs', t: 'documents', c: 'text-orange-600 bg-orange-50'}, 
               {i: '📊', l: 'Account', v: 'account', c: 'text-rose-600 bg-rose-50'}
             ].map(btn => (
               <button key={btn.l} onClick={() => btn.v ? setSubView(btn.v) : setActiveTab(btn.t)} className="flex flex-col items-center gap-3 group px-4 py-2 hover:bg-slate-50 rounded-2xl transition-all">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform ${btn.c}`}>
                   {btn.i}
                 </div>
                 <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{btn.l}</span>
               </button>
             ))}
          </div>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-2 gap-6 pt-4">
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start mb-6">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">💼</div>
               <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full border border-green-100">Updated</span>
             </div>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Jobs for You</p>
             <p className="text-4xl font-bold text-[#050454]">5 <span className="text-sm text-green-500 font-bold ml-2">new matches</span></p>
           </div>

           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start mb-6">
               <div className="w-14 h-14 bg-yellow-50 text-yellow-500 rounded-2xl flex items-center justify-center text-2xl">🛡</div>
               <span className="bg-yellow-50 text-yellow-600 text-xs font-bold px-3 py-1 rounded-full border border-yellow-100">Action Needed</span>
             </div>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Verified Status</p>
             <div className="flex justify-between items-end mb-2">
                <p className="text-2xl font-bold text-[#050454]">Profile</p>
                <p className="font-bold text-yellow-500">95%</p>
             </div>
             <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-yellow-500 h-full w-[95%]"></div></div>
           </div>
        </div>
      </div>

      {/* Right Column - Fills the empty space on desktop */}
      <div className="space-y-6">
         <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-[#050454]">Recent Activity</h2>
             <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
           </div>
           <div className="space-y-4">
              <ActivityCard icon="💬" color="text-purple-600 bg-purple-50" title="New Mentor Message" desc="Dr. Reyes replied to your inquiry about thesis..." time="15m ago" />
              <ActivityCard icon="🧾" color="text-green-600 bg-green-50" title="Donation Receipt Ready" desc="Thank you for your contribution to the Gen Fund." time="2h ago" />
              <ActivityCard icon="↻" color="text-blue-600 bg-blue-50" title="Job Application Update" desc="Your application for 'Project Manager' was viewed." time="1d ago" />
              <ActivityCard icon="🤝" color="text-orange-600 bg-orange-50" title="New Connection" desc="Sarah Chen accepted your connection request." time="2d ago" />
           </div>
         </div>

         <div className="bg-gradient-to-br from-[#050454] to-blue-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4 backdrop-blur-md border border-white/30">💙</div>
              <h3 className="text-xl font-bold mb-2">Your Impact Summary</h3>
              <p className="text-sm text-blue-200 mb-6">You have supported 15 projects this year. See your detailed report.</p>
              <button onClick={() => setSubView('account')} className="w-full bg-white text-[#050454] font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors shadow-md">View Dashboard</button>
            </div>
         </div>
      </div>
    </div>
  );
}

function ActivityCard({ icon, color, title, desc, time }) {
  return (
    <div className="p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 flex gap-4 items-center transition-colors cursor-pointer">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm ${color}`}>{icon}</div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-bold text-[#050454] text-sm truncate">{title}</h4>
          <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap uppercase tracking-widest">{time}</span>
        </div>
        <p className="text-xs text-slate-500 truncate">{desc}</p>
      </div>
    </div>
  );
}

// ==========================================
// ALUMNI ACCOUNT DASHBOARD (TRANSACTION HISTORY)
// ==========================================
function AccountDashboard({ setSubView }) {
  return (
    <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-full mb-2 flex items-center justify-between">
        <button onClick={() => setSubView(null)} className="text-slate-500 hover:text-[#050454] text-sm font-bold flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          <span className="text-xl leading-none">‹</span> Back to Home
        </button>
      </div>
      
      {/* Left Profile Section */}
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
          <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg">
            <img src="https://ui-avatars.com/api/?name=Alex+Johnson&background=050454&color=fff" alt="Avatar" />
          </div>
          <h1 className="text-3xl font-bold text-[#050454] mb-2">Alex Johnson</h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-1 rounded uppercase tracking-widest">Class of 2015</span>
          </div>
          <span className="text-sm font-medium text-slate-500 block mb-6">Engineering Dept.</span>
          
          <button onClick={() => setSubView('passport')} className="w-full bg-[#050454] text-white font-bold py-3.5 rounded-xl hover:bg-blue-900 transition-colors shadow-md">
            View Academic Passport
          </button>
        </div>

        <div className="bg-[#050454] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-sm font-bold tracking-widest uppercase text-blue-200">Total Impact</h2>
            <span className="text-2xl bg-white/10 p-2 rounded-lg">📊</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
             <p className="text-6xl font-bold">15</p>
             <p className="text-blue-200 font-medium">Projects Funded</p>
          </div>
          
          <div className="flex border-t border-white/20 pt-6 mt-8 gap-8">
            <div>
              <p className="text-[10px] text-white/50 font-bold tracking-widest uppercase mb-1">LIVES TOUCHED</p>
              <p className="font-bold text-2xl">1,240+</p>
            </div>
            <div>
              <p className="text-[10px] text-white/50 font-bold tracking-widest uppercase mb-1">CONTRIBUTED</p>
              <p className="font-bold text-2xl">$2,500</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Grid Section */}
      <div className="lg:col-span-2 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-[#050454] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            <QuickActionCard icon="💡" title="Student Projects" color="text-orange-500 bg-orange-50" onClick={() => setSubView('donate-projects')} />
            <QuickActionCard icon="💼" title="Business Support" color="text-blue-500 bg-blue-50" />
            <QuickActionCard icon="👥" title="Community" color="text-green-500 bg-green-50" />
            <QuickActionCard icon="🛡" title="Emergency Aid" color="text-red-500 bg-red-50" />
            <QuickActionCard icon="🤝" title="Fundraising" color="text-teal-500 bg-teal-50" />
            <QuickActionCard icon="⚙" title="Settings" color="text-slate-500 bg-slate-100" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-[#050454]">Transaction History</h2>
            <button className="text-sm font-bold text-blue-600 hover:underline">Download PDF</button>
          </div>

          <div className="space-y-2">
            <TransactionRow icon="⚗" title="Science Lab Fund" type="Monthly Contribution" amount="-$50.00" date="Oct 24, 2023" status="Completed" />
            <TransactionRow icon="🎓" title="Scholarship Fund" type="One-time Donation" amount="-$1,200.00" date="Oct 15, 2023" status="Completed" />
            <TransactionRow icon="🎟" title="Reunion Ticket" type="Event Purchase" amount="-$125.00" date="Yesterday" status="Processing" sColor="bg-slate-100 text-slate-600 border-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ icon, title, color, onClick }) {
  return (
    <div onClick={onClick} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[#050454] hover:shadow-md transition-all text-center">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${color}`}>{icon}</div>
      <p className="font-bold text-[#050454] text-sm">{title}</p>
    </div>
  );
}

function TransactionRow({ icon, title, type, amount, date, status, sColor="bg-green-50 text-green-600 border-green-200" }) {
  return (
    <div className="p-4 rounded-2xl hover:bg-slate-50 flex justify-between items-center transition-colors">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-2xl text-slate-500 shadow-sm">{icon}</div>
        <div>
          <h4 className="font-bold text-[#050454]">{title}</h4>
          <p className="text-xs font-medium text-slate-500 mb-1.5">{type}</p>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest border ${sColor}`}>{status}</span>
            <span className="text-[10px] font-bold text-slate-400">• {date}</span>
          </div>
        </div>
      </div>
      <span className="font-bold text-lg text-[#050454] bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">{amount}</span>
    </div>
  );
}

// ==========================================
// OTHER ALUMNI TABS (Expands to fill grid)
// ==========================================
function NetworkDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-4xl font-bold text-[#050454] mb-2">Alumni Network</h1>
          <p className="text-slate-500">Discover and connect with peers across the globe.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-[#050454] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md flex items-center gap-2"><span>📍</span> Near Me</button>
           <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 flex items-center gap-2"><span>🏅</span> Industry Experts</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NetworkCard name="Sarah Chen" role="Senior Product Designer" company="TechFlow" degree="BS Computer Science '18" img="bg-slate-300" />
        <NetworkCard name="Marcus Johnson" role="Head of Marketing" company="Global Corp" degree="BA Communications '15" img="bg-slate-800" />
        <NetworkCard name="Elena Rodriguez" role="Civil Engineer" company="BuildRight Inc." degree="BS Civil Eng '19" img="bg-slate-400" />
        <NetworkCard name="David Kim" role="Software Engineer" company="Amazon" degree="BS Computer Science '20" img="bg-slate-500" />
      </div>
    </div>
  );
}

function NetworkCard({ name, role, company, degree, img }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className="relative mb-4">
        <div className={`w-24 h-24 ${img} rounded-full border-4 border-white shadow-md`}></div>
        <span className="absolute -top-2 -right-4 bg-white text-[#050454] border border-slate-200 text-[9px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 uppercase tracking-widest"><span className="text-blue-600 text-xs">✓</span> Verified</span>
      </div>
      <h3 className="font-bold text-[#050454] text-xl mb-1">{name}</h3>
      <p className="text-sm font-medium text-slate-500">{role} at <span className="text-[#050454] font-bold">{company}</span></p>
      <p className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-3 mb-8">{degree}</p>
      <div className="flex gap-3 w-full">
        <button className="flex-1 bg-[#050454] text-white font-bold py-3.5 rounded-xl hover:bg-blue-900 transition shadow-md">Connect</button>
        <button className="flex-1 bg-white border border-slate-200 text-[#050454] font-bold py-3.5 rounded-xl hover:bg-slate-50 transition">Message</button>
      </div>
    </div>
  );
}

function CareerDashboard() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-[#050454] mb-2">Career Opportunities</h1>
          <p className="text-slate-500">Find your next role or guide the next generation.</p>
        </div>
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button className="bg-white text-[#050454] shadow-sm px-6 py-2.5 rounded-lg font-bold text-sm">Job Board</button>
          <button className="text-slate-500 hover:text-[#050454] px-6 py-2.5 rounded-lg font-bold text-sm">Mentorship</button>
          <button className="text-slate-500 hover:text-[#050454] px-6 py-2.5 rounded-lg font-bold text-sm">Workshops</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <JobCard logo="G" title="Senior Product Designer" company="Google • Mountain View, CA" tags={['$140k - $180k', 'Full-time', 'Remote']} color="bg-blue-100 text-blue-600" />
        <JobCard logo="S" title="UX Researcher" company="Spotify • New York, NY" tags={['$110k - $145k', 'Contract']} color="bg-green-100 text-green-600" />
        <JobCard logo="M" title="Data Analyst" company="Microsoft • Seattle, WA" tags={['$130k - $160k', 'Full-time']} color="bg-slate-800 text-white" />
        <JobCard logo="A" title="Frontend Engineer" company="Apple • Austin, TX" tags={['$150k - $190k', 'Remote']} color="bg-orange-100 text-orange-600" />
      </div>
    </div>
  );
}

function JobCard({ logo, title, company, tags, color }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative hover:border-[#050454] transition-colors group">
      <button className="absolute top-6 right-6 w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-[#050454] transition-colors">🔖</button>
      <div className="flex items-center gap-5 mb-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-3xl shadow-sm ${color}`}>{logo}</div>
        <div>
          <h3 className="font-bold text-[#050454] text-xl mb-1">{title}</h3>
          <p className="text-sm font-medium text-slate-500">{company}</p>
        </div>
      </div>
      <div className="flex gap-2 mb-8">
        {tags.map(t => <span key={t} className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg">{t}</span>)}
      </div>
      <button className="w-full bg-white border-2 border-[#050454] text-[#050454] font-bold py-4 rounded-xl group-hover:bg-[#050454] group-hover:text-white transition-colors text-sm">Apply Now</button>
    </div>
  );
}

function DocumentDashboard({ user }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Passport Side */}
      <div>
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-[#050454] mb-2">Academic Records</h1>
          <p className="text-slate-500">Manage and share your verified credentials securely.</p>
        </div>

        <div className="bg-[#050454] text-white rounded-[2rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div className="w-16 h-16 border border-white/20 rounded-2xl flex items-center justify-center text-2xl bg-white/5 backdrop-blur">🎓</div>
            <span className="bg-[#1a2347] text-yellow-400 border border-white/10 text-[10px] font-bold px-3 py-2 rounded-lg flex items-center gap-2 uppercase tracking-widest shadow-sm"><span className="text-yellow-400">✓</span> Verified Record</span>
          </div>
          
          <div className="relative z-10">
            <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-3">DIGITAL ACADEMIC PASSPORT</p>
            <h2 className="text-4xl font-bold mb-6 leading-tight font-serif">Bachelor of Science in<br/>Information Technology</h2>
            <p className="text-white text-lg font-bold">Feature Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Services Side */}
      <div className="space-y-8 lg:pt-16">
        <div>
          <h2 className="text-xl font-bold text-[#050454] mb-6">Document Services</h2>
          <div className="space-y-4">
            <DocRow icon="📄" color="text-green-600 bg-green-50" title="Official Transcript" desc="Sealed & Certified Copy for Employment" action="Request" />
            <DocRow icon="🏅" color="text-purple-600 bg-purple-50" title="e-Diploma" desc="High-resolution Digital Certificate" action="Download" />
            <DocRow icon="🏢" color="text-orange-600 bg-orange-50" title="Degree Verification" desc="Direct send to HR & Employers" action="Request" />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-[#050454]">Request History</h2>
            <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            <HistoryRow title="Official Transcript" refNum="Req #TR-2024-892" date="Oct 12, 2024" status="Processing" sColor="text-yellow-600 bg-yellow-50 border-yellow-200" icon="📄" />
            <HistoryRow title="Cert. of Good Moral" refNum="Req #GM-2024-110" date="Sep 28, 2024" status="Ready" sColor="text-green-600 bg-green-50 border-green-200" icon="🛡" dl={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DocRow({ icon, color, title, desc, action, user }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm hover:border-[#050454] transition-colors group">
      <div className="flex items-center gap-5">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${color}`}>{icon}</div>
        <div>
          <h4 className="font-bold text-[#050454] text-base mb-1">{title}</h4>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4"><span>👤</span> {user?.name || 'Guest'}</p>
        </div>
      </div>
      <button className="bg-slate-50 border border-slate-200 text-[#050454] text-sm font-bold px-6 py-3 rounded-xl group-hover:bg-[#050454] group-hover:text-white transition-colors shadow-sm">{action}</button>
    </div>
  );
}

function HistoryRow({ title, refNum, date, status, sColor, icon, dl }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 shadow-sm text-xl">{icon}</div>
        <div>
          <h4 className="font-bold text-[#050454] text-sm mb-1">{title}</h4>
          <div className="flex gap-2 text-[10px] text-slate-400 font-bold tracking-widest uppercase">
            <span>{refNum}</span> <span>•</span> <span>{date}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-[10px] font-bold px-3 py-1 rounded-md border uppercase tracking-widest ${sColor}`}>{status}</span>
        {dl && <button className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-[#050454] shadow-sm">↓</button>}
      </div>
    </div>
  );
}

// ==========================================
// DONATION HUB (FULL DESKTOP WIDTH)
// ==========================================
function DonationController({ subView, setSubView }) {
  if (subView === 'donate-pledge') return <PledgeAutomateView onBack={() => setSubView(null)} />;
  if (subView === 'donate-create') return <CreateCampaignView onBack={() => setSubView(null)} />;
  if (subView === 'donate-projects') return <StudentProjectList onBack={() => setSubView(null)} onDetail={() => setSubView('donate-project-detail')} />;
  if (subView === 'donate-project-detail') return <ProjectDetailView onBack={() => setSubView('donate-projects')} onDonate={() => setSubView('donate-success')} />;
  if (subView === 'donate-emergency') return <EmergencyDetailView onBack={() => setSubView(null)} onDonate={() => setSubView('donate-success')} />;
  if (subView === 'donate-success') return <DonationSuccessView onBack={() => setSubView(null)} />;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-[#050454] mb-2">Donation Hub</h1>
          <p className="text-slate-500">Support University Initiatives and empower the next generation.</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-center gap-6 cursor-pointer hover:bg-blue-100 transition-colors shadow-sm" onClick={() => setSubView('donate-pledge')}>
          <div>
            <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-2">YOUR TOTAL IMPACT</p>
            <h2 className="text-4xl font-bold text-[#050454]">$1,250.00</h2>
          </div>
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-blue-600/30">💙</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-[#050454]">Make an Impact Today</h2>
            <button onClick={() => setSubView('donate-create')} className="bg-[#050454] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-blue-900 transition flex items-center gap-2 text-sm">
              <span className="text-lg leading-none">+</span> Start Campaign
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ImpactSquare icon="🏪" title="Alumni Business" color="text-blue-500 bg-blue-50" />
            <ImpactSquare icon="🎓" title="Student Projects" color="text-orange-500 bg-orange-50" onClick={() => setSubView('donate-projects')} />
            <ImpactSquare icon="👥" title="Community" color="text-purple-500 bg-purple-50" />
            <ImpactSquare icon="🚑" title="Emergency" color="text-red-500 bg-red-50" />
          </div>

          <h2 className="text-2xl font-bold text-[#050454] pt-4">Verified Appeals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AppealCard img="bg-[#a8b8aa]" title="Class of '24 Scholarship" desc="Helping underprivileged students with tuition and books." raised="$4,500" goal="$5,000" onDonate={() => setSubView('donate-success')}/>
            <AppealCard img="bg-slate-800" title="Medical Aid for Jo..." desc="Urgent assistance for surgery costs. Immediate need." raised="$2,000" goal="$10,000" isEmergency onDonate={() => setSubView('donate-emergency')} />
            <AppealCard img="bg-[#3b4742]" title="Robotics Club Finals" desc="Support our team reaching the international stage." raised="$800" goal="$1,200" onDonate={() => setSubView('donate-success')}/>
            <AppealCard img="bg-orange-900" title="Typhoon Relief" desc="Supporting affected students in the region." raised="$15,000" goal="$20,000" isEmergency onDonate={() => setSubView('donate-emergency')}/>
          </div>
        </div>
        
        {/* Right side promo */}
        <div className="bg-[#050454] rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center text-center">
          <div className="text-6xl mb-6">🤝</div>
          <h3 className="text-2xl font-bold mb-4">Leave a Legacy</h3>
          <p className="text-blue-200 text-sm leading-relaxed mb-8">Set up a recurring pledge today and ensure continuous support for the initiatives that matter most to you. Small, automated gifts make a massive long-term impact.</p>
          <button onClick={() => setSubView('donate-pledge')} className="bg-white text-[#050454] font-bold py-4 rounded-xl hover:bg-slate-100 transition shadow-lg">Setup Automation</button>
        </div>
      </div>
    </div>
  );
}

function ImpactSquare({ icon, title, color, onClick }) {
  return (
    <div onClick={onClick} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center gap-4 cursor-pointer hover:border-[#050454] hover:shadow-md transition-all">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${color}`}>{icon}</div>
      <p className="font-bold text-[#050454] text-sm">{title}</p>
    </div>
  );
}

function AppealCard({ img, title, desc, raised, goal, onDonate, isEmergency }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className={`h-32 w-full rounded-2xl mb-5 relative overflow-hidden ${img}`}>
        {isEmergency && <span className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-widest shadow-sm">Critical Need</span>}
      </div>
      <div className="flex items-center gap-1 mb-2">
        <span className="text-blue-600 bg-blue-50 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-blue-100 flex items-center gap-1"><span className="text-blue-600">✓</span> VERIFIED</span>
      </div>
      <h3 className="font-bold text-[#050454] text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 flex-1">{desc}</p>
      
      <div className="flex justify-between items-end mb-2 border-t border-slate-100 pt-4">
        <div>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">RAISED</p>
           <p className="font-bold text-green-600 text-xl">{raised}</p>
        </div>
        <p className="text-xs font-bold text-slate-400">Goal: {goal}</p>
      </div>
      
      <button onClick={onDonate} className={`w-full font-bold py-3.5 rounded-xl text-sm transition mt-4 ${isEmergency ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/20' : 'bg-[#050454] text-white hover:bg-blue-900'} shadow-md`}>
        Donate Now
      </button>
    </div>
  );
}

// 6a. Student Projects Listing (Fully fleshed out)
function StudentProjectList({ onBack, onDetail }) {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#050454] hover:bg-slate-50 text-2xl transition">‹</button>
          <div>
            <h1 className="text-3xl font-bold text-[#050454] mb-1">Student Projects</h1>
            <p className="text-slate-500 text-sm">Discover and support innovative student-led initiatives across the campus.</p>
          </div>
        </div>
        <div className="flex gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          <button className="bg-white text-[#050454] shadow-sm px-6 py-2.5 rounded-lg font-bold text-sm">All Projects</button>
          <button className="text-slate-500 hover:text-[#050454] px-6 py-2.5 rounded-lg font-bold text-sm">Engineering</button>
          <button className="text-slate-500 hover:text-[#050454] px-6 py-2.5 rounded-lg font-bold text-sm">Social Sciences</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-lg transition-shadow">
          <div className="h-64 bg-slate-800 relative">
            <span className="absolute top-6 left-6 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-widest border border-white/20">ENGINEERING</span>
            <button className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white hover:text-red-500 transition">♥</button>
          </div>
          <div className="p-8">
            <h3 className="font-bold text-2xl text-[#050454] mb-2 group-hover:text-blue-600 transition-colors">Robotics Team Finals</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4"><span>👥</span> Engineering Club</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-8">Building a semi-autonomous rover for the University Rover Challenge. We need funding for the sensor array.</p>
            <div className="flex justify-between items-end mb-3">
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">RAISED</p>
                 <p className="font-bold text-green-600 text-xl">$1,200</p>
              </div>
              <span className="text-sm font-bold text-slate-400">of $2,000 goal</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full mb-8 overflow-hidden"><div className="bg-[#050454] h-full w-[60%]"></div></div>
            <button onClick={onDetail} className="w-full bg-[#050454] text-white font-bold py-4 rounded-xl hover:bg-blue-900 transition text-sm shadow-md">Support Project</button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-lg transition-shadow">
          <div className="h-64 bg-[#3b4742] relative">
            <span className="absolute top-6 left-6 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-widest border border-white/20">AGRICULTURE</span>
            <button className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white hover:text-red-500 transition">♥</button>
          </div>
          <div className="p-8">
            <h3 className="font-bold text-2xl text-[#050454] mb-2 group-hover:text-blue-600 transition-colors">Urban Garden Study</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4"><span>🌿</span> Agriculture Dept.</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-8">Studying the effects of vertical farming in urban environments. Help us set up the irrigation system prototype.</p>
            <div className="flex justify-between items-end mb-3">
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">RAISED</p>
                 <p className="font-bold text-green-600 text-xl">$450</p>
              </div>
              <span className="text-sm font-bold text-slate-400">of $1,500 goal</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full mb-8 overflow-hidden"><div className="bg-[#050454] h-full w-[30%]"></div></div>
            <button className="w-full bg-white border-2 border-[#050454] text-[#050454] font-bold py-3.5 rounded-xl hover:bg-slate-50 transition text-sm">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectDetailView({ onBack, onDonate }) {
  return (
    <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-8">
       <div className="lg:col-span-full mb-2">
        <button onClick={onBack} className="text-slate-500 hover:text-[#050454] text-sm font-bold flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          <span className="text-xl leading-none">‹</span> Back to Projects
        </button>
      </div>

      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-80 bg-slate-800 relative flex items-center justify-center group cursor-pointer">
            <div className="w-20 h-20 bg-[#050454]/80 backdrop-blur rounded-full flex items-center justify-center text-white text-3xl pl-1 shadow-xl group-hover:scale-110 transition-transform border border-white/20">▶</div>
            <span className="absolute bottom-6 right-6 bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10">2:14</span>
          </div>
          
          <div className="p-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="bg-blue-50 text-[#050454] font-bold text-[10px] px-3 py-1.5 rounded-lg tracking-widest uppercase mb-4 inline-block border border-blue-100">ENGINEERING</span>
                <h1 className="text-4xl font-bold text-[#050454] mb-2">Robotics Team Finals</h1>
                <p className="text-slate-500 font-medium flex items-center gap-2"><span>👨‍🏫</span> Class of 2024 • Prof. Alan Turing Advisor</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center shadow-sm">
                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-1">GOAL</p>
                <p className="text-3xl font-bold text-[#050454]">85%</p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-10 text-lg">We are building an autonomous rover to compete in the International Robotics Challenge in Tokyo. Your support helps us finalize our sensor array, purchase spare parts for on-site repairs, and cover team travel logistics.</p>

            <div className="border-t border-slate-100 pt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#050454] text-xl">Meet the Team</h3>
              </div>
              <div className="grid grid-cols-4 gap-4">
                 {[ {n:'Sarah', r:'MECHE'}, {n:'David', r:'CS'}, {n:'Priya', r:'EE'}, {n:'Marcus', r:'PHYSICS'} ].map((m,i) =>(
                   <div key={i} className="text-center bg-slate-50 rounded-2xl p-4 border border-slate-100">
                     <div className="w-16 h-16 bg-slate-300 rounded-full mx-auto mb-3 shadow-sm border-2 border-white"></div>
                     <p className="text-sm font-bold text-[#050454]">{m.n}</p>
                     <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">{m.r}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Support Widget */}
      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-32">
          <div className="flex items-center justify-between mb-6">
             <span className="text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm"><span className="text-lg leading-none">🔒</span> VERIFIED SECURE</span>
          </div>
          
          <h3 className="font-bold text-[#050454] text-2xl mb-2">Your Impact</h3>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed"><strong className="text-[#050454]">$500 needed</strong> to finalize the sensor array and guarantee competition entry.</p>
          
          <button onClick={onDonate} className="w-full bg-[#050454] text-white font-bold py-4 rounded-xl hover:bg-blue-900 transition-colors shadow-lg shadow-blue-900/20 text-lg flex justify-center items-center gap-2">
            Secure Donation →
          </button>
          
          <button className="w-full bg-white border border-slate-200 text-[#050454] font-bold py-4 rounded-xl hover:bg-slate-50 transition-colors text-sm">
            💬 Message the Team
          </button>
        </div>
      </div>
    </div>
  );
}

function EmergencyDetailView({ onBack, onDonate }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-10">
      <button onClick={onBack} className="text-slate-500 hover:text-[#050454] text-sm font-bold flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm mb-4 inline-flex">
          <span className="text-xl leading-none">‹</span> Back to Dashboard
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="h-80 bg-slate-900 relative flex items-end p-10">
          <div className="z-10 w-full">
            <span className="bg-red-600 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg tracking-widest uppercase mb-4 inline-flex items-center gap-2 shadow-sm"><span className="text-sm leading-none">⚠️</span> CRITICAL NEED</span>
            <h1 className="text-4xl font-bold text-white mb-2 font-serif">Fire Recovery Fund</h1>
            <p className="text-slate-300 text-sm flex items-center gap-2"><span>📍</span> Class of '14 • San Francisco, CA</p>
          </div>
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        </div>

        <div className="p-10">
          <div className="bg-red-50/50 border border-red-100 p-6 rounded-2xl flex gap-6 items-center mb-10 shadow-sm">
             <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">✓</div>
             <div>
               <p className="font-bold text-[#050454] text-lg">Verified by Alumni Office</p>
               <p className="text-xs text-red-600 font-bold mt-1 tracking-widest uppercase">Doc ID #9928 • Case Manager: Sarah</p>
             </div>
          </div>

          <div className="mb-10 bg-slate-50 p-8 rounded-3xl border border-slate-100">
             <h2 className="text-5xl font-bold text-[#050454] mb-3">$12,450</h2>
             <div className="flex justify-between text-sm text-slate-500 mb-4 font-medium">
               <span>raised of $20,000 goal</span>
               <span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-lg">62% Funded</span>
             </div>
             <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner"><div className="bg-orange-500 h-full w-[62%]"></div></div>
          </div>

          <h3 className="font-bold text-[#050454] text-2xl mb-4">About the Situation</h3>
          <p className="text-slate-600 text-lg leading-relaxed mb-10">The Johnson family (Class of '14) lost their home in the recent wildfires impacting the northern estate district. While everyone is safe, they have lost all personal belongings and require immediate assistance for temporary housing, clothing, and essential supplies.</p>

          <button onClick={onDonate} className="w-full bg-red-600 text-white font-bold py-5 rounded-2xl hover:bg-red-700 transition-colors shadow-xl shadow-red-600/20 text-xl flex justify-center items-center gap-3">
            <span>♥</span> Direct Support
          </button>
        </div>
      </div>
    </div>
  );
}

function DonationSuccessView({ onBack }) {
  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in py-10">
      <div className="w-24 h-24 bg-green-50 text-green-500 border-4 border-green-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-lg shadow-green-500/20">✓</div>
      <h2 className="text-5xl font-bold text-[#050454] mb-4">Thank You!</h2>
      <p className="text-slate-500 mb-10 text-lg">Your contribution was successful and is making a real difference right now.</p>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 mb-8 text-left relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
        <h4 className="font-bold text-red-500 text-sm mb-4 flex items-center gap-2 uppercase tracking-widest">📢 Your Immediate Impact</h4>
        <p className="text-[#050454] text-xl font-medium leading-relaxed">"You've helped the <strong className="text-red-500">Johnson family</strong> secure <strong className="text-red-500">3 nights</strong> of temporary housing."</p>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 bg-[#ea580c] text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg shadow-orange-600/20 text-lg">
          Share Impact
        </button>
        <button onClick={onBack} className="flex-1 bg-white border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-50 transition text-lg">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

function PledgeAutomateView({ onBack }) {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 text-2xl transition">‹</button>
          <div>
            <h1 className="text-3xl font-bold text-[#050454]">Your Impact</h1>
            <p className="text-sm text-slate-500">Tracking your generosity and automating support.</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chart Side */}
        <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm flex flex-col items-center">
          <div className="w-56 h-56 rounded-full mb-10 relative flex items-center justify-center shadow-inner" style={{ background: 'conic-gradient(#050454 0% 45%, #FBBF24 45% 70%, #F43F5E 70% 90%, #10B981 90% 100%)' }}>
            <div className="w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center shadow-lg">
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">TOTAL</span>
              <span className="text-4xl font-bold text-[#050454]">$1,250</span>
            </div>
          </div>
          <p className="text-center text-slate-600 text-sm mb-10">Your contributions have supported <strong className="text-[#050454]">4 key areas</strong> this year.</p>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-full">
             <LegendItem color="bg-[#050454]" label="Scholarships" amount="$562.50" />
             <LegendItem color="bg-yellow-400" label="Projects" amount="$312.50" />
             <LegendItem color="bg-rose-500" label="Events" amount="$250.00" />
             <LegendItem color="bg-emerald-500" label="Emergency" amount="$125.00" />
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-bold text-[#050454] mb-2">Pledge & Automate</h2>
          
          <div className="space-y-6 mt-8">
            <div className="flex bg-slate-50 border border-slate-200 p-1.5 rounded-2xl shadow-inner">
              <button className="flex-1 py-3 text-sm font-bold text-slate-500 rounded-xl hover:bg-slate-100">One-time</button>
              <button className="flex-1 py-3 text-sm font-bold bg-white text-[#050454] shadow-sm rounded-xl border border-slate-100">Recurring</button>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-3 block">FREQUENCY</label>
              <div className="flex gap-4">
                <button className="flex-1 border-2 border-[#050454] bg-[#050454]/5 text-[#050454] rounded-2xl p-5 font-bold text-xs flex flex-col items-center gap-2 transition-colors"><span>📅</span> Monthly (15th)</button>
                <button className="flex-1 border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-2xl p-5 font-bold text-xs flex flex-col items-center gap-2 transition-colors"><span>🕒</span> Monthly (30th)</button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-3 block">PLEDGE AMOUNT</label>
              <div className="relative">
                <span className="absolute left-6 top-4 text-slate-400 font-bold text-2xl">$</span>
                <input type="text" defaultValue="50.00" className="w-full border border-slate-200 rounded-2xl pl-12 pr-6 py-4 font-bold text-3xl text-[#050454] focus:outline-none focus:border-[#050454] transition-colors" />
              </div>
            </div>

            <button className="w-full bg-[#050454] text-white font-bold py-5 rounded-2xl mt-4 hover:bg-blue-900 transition-colors shadow-lg shadow-blue-900/20 text-lg flex justify-center items-center gap-2">
              ✓ Confirm Pledge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendItem({color, label, amount}) {
  return (
    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
      <div className="flex items-center gap-2 mb-1"><div className={`w-3 h-3 rounded-full shadow-sm ${color}`}></div><span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span></div>
      <p className="font-bold text-[#050454] text-lg">{amount}</p>
    </div>
  )
}

function CreateCampaignView({ onBack }) {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 text-2xl transition">✕</button>
          <div>
            <h1 className="text-3xl font-bold text-[#050454]">Create Campaign</h1>
            <p className="text-sm text-slate-500">Submit a new initiative for verification.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-lg shadow-sm">1</div>
            <h2 className="font-bold text-2xl text-[#050454]">Purpose & Details</h2>
          </div>
          <div className="pl-14 space-y-8">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Campaign Title</label>
              <input type="text" placeholder="e.g. Annual Charity Gala" className="w-full p-5 border border-slate-200 rounded-2xl text-base font-medium focus:outline-none focus:border-[#050454] bg-slate-50 focus:bg-white transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Purpose & Description</label>
              <textarea rows="4" placeholder="Describe what this campaign is about and why it matters..." className="w-full p-5 border border-slate-200 rounded-2xl text-base font-medium focus:outline-none focus:border-[#050454] bg-slate-50 focus:bg-white transition-colors"></textarea>
            </div>
          </div>
        </section>

        <button className="w-full bg-[#050454] text-white font-bold py-5 rounded-2xl shadow-lg hover:bg-blue-900 transition-colors text-lg flex justify-center items-center gap-3">
          Send For Verification 🚀
        </button>
      </div>
    </div>
  );
}


// ==========================================
// 7. ADMIN (STAFF) DASHBOARDS (Full Grid)
// ==========================================
function AdminHome({ user }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-8">
        <div className="bg-[#050454] rounded-[2rem] p-12 text-white relative overflow-hidden flex flex-col justify-end shadow-xl min-h-[350px]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="z-10 relative">
            <p className="text-white/80 text-sm font-bold tracking-widest uppercase mb-2">Welcome back,</p>
            <h1 className="text-5xl font-bold mb-4">Hello, Admin!</h1>
            <p className="text-blue-200">You have 12 pending verifications requiring attention today.</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#050454]">Daily Overview</h2>
          <span className="bg-white shadow-sm text-slate-500 text-xs font-bold px-4 py-2 rounded-lg border border-slate-200 uppercase tracking-widest">Today</span>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
             <div className="absolute -right-4 -top-4 text-8xl opacity-5">💬</div>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></span> Pending Reviews</p>
             <p className="text-5xl font-bold text-[#050454] flex items-end gap-3">12 <span className="text-sm font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg mb-1">↑ 4 new</span></p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
             <div className="absolute -right-4 -top-4 text-8xl opacity-5">🛡</div>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></span> Verifications</p>
             <p className="text-5xl font-bold text-[#050454] flex items-end gap-3">8 <span className="text-sm font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg mb-1">tasks left</span></p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#050454]">Recent Activity</h2>
            <span className="text-sm font-bold text-blue-600 cursor-pointer hover:underline">See All</span>
          </div>
          <div className="space-y-4">
             <ActivityCard icon="💚" color="bg-green-50 text-green-600" title="New Donation Received" desc="Maria C. donated $500 to 'Scholars Fund'" time="2m ago" />
             <ActivityCard icon="💼" color="bg-blue-50 text-blue-600" title="Job Posting Approval" desc="Pending review for 'Senior Dev'" time="1h ago" />
             <ActivityCard icon="👥" color="bg-purple-50 text-purple-600" title="New Registration" desc="Batch 2024 graduate registered" time="3h ago" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminQueueController({ subView, setSubView }) {
  if (subView === 'queue-review') return <ReviewVerificationView onBack={() => setSubView(null)} />;
  
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#050454] mb-2">Moderation Queue</h1>
          <p className="text-slate-500 text-sm">Review and approve pending campaigns and registrations.</p>
        </div>
        <div className="relative w-64">
           <span className="absolute left-4 top-3 text-slate-400">🔍</span>
           <input type="text" placeholder="Search queue..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#050454]"/>
        </div>
      </div>

      <div className="flex gap-3 border-b border-slate-200 pb-4">
        <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50">All Pending</button>
        <button className="bg-[#050454] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md">Donations</button>
        <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50">Network</button>
      </div>

      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>PENDING DONATIONS (3)</span>
        <span className="text-[#050454] cursor-pointer hover:underline flex items-center gap-1">Sort by Date <span>⌄</span></span>
      </div>

      <div className="space-y-6">
        <AdminQueueCard type="New Campaign" title="Annual Charity Gala" author="Sarah Jenkins" time="2 hrs ago" amount="$25,000.00" icon="📢" onReview={() => setSubView('queue-review')} />
        <AdminQueueCard type="Scholarship Fund" title="Class of '98" author="Mark Davis" time="5 hrs ago" amount="$10,000.00" icon="🎓" onReview={() => setSubView('queue-review')} />
      </div>
    </div>
  );
}

function AdminQueueCard({ type, title, author, time, amount, icon, onReview }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm">{icon}</div>
          <div>
            <h3 className="font-bold text-[#050454] text-xl mb-1">{type}: {title}</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4"><span>👤</span> {author} <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span> {time}</p>
          </div>
        </div>
        <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-blue-100 uppercase tracking-widest shadow-sm">Donation</span>
      </div>
      <div className="bg-slate-50 rounded-2xl p-6 mb-6 flex justify-between items-center border border-slate-100 shadow-inner">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Target Goal</span>
        <span className="text-2xl font-bold text-[#050454]">{amount}</span>
      </div>
      <button onClick={onReview} className="w-full bg-[#050454] text-white font-bold py-4 rounded-xl hover:bg-blue-900 transition-colors text-sm flex justify-center items-center gap-2 shadow-md">
        Review Application →
      </button>
    </div>
  );
}

// 7a. Missing Feature: Review Verification Details (Full Width)
function ReviewVerificationView({ onBack }) {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-24">
      <div className="flex items-center gap-6 mb-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <button onClick={onBack} className="w-12 h-12 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 text-2xl transition">‹</button>
        <div>
           <h1 className="text-3xl font-bold text-[#050454]">Reviewing Application</h1>
           <p className="text-sm text-slate-500">Ensure all documents are valid before approval.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl shadow-inner border-2 border-white">👤</div>
        <div>
          <h2 className="text-2xl font-bold text-[#050454] flex items-center gap-3 mb-1">Sarah La <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase tracking-widest border border-blue-100 flex items-center gap-1 shadow-sm"><span className="text-blue-600">✓</span> VERIFIED ALUMNI</span></h2>
          <p className="text-sm font-medium text-slate-500">Class of 2012 • BS Marketing</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10">
        <ReviewStep number="1" title="Purpose & Details" status="VERIFIED">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Campaign Title</p>
              <div className="bg-slate-50 p-5 rounded-2xl text-base text-[#050454] font-bold border border-slate-100">Annual Charity Gala 2024</div>
            </div>
          </div>
        </ReviewStep>

        <div className="border-t border-slate-100 my-8"></div>

        <ReviewStep number="2" title="Set Your Goal" status="VERIFIED">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Target Amount ($)</p>
            <div className="bg-slate-50 p-5 rounded-2xl text-2xl font-bold text-[#050454] border border-slate-100">$ 25,000.00</div>
          </div>
        </ReviewStep>

        <div className="border-t border-slate-100 my-8"></div>

        <ReviewStep number="3" title="Verification Documents" status="UNVERIFIED">
          <div className="bg-white border-2 border-slate-100 p-5 rounded-2xl flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-5">
               <div className="w-14 h-14 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-2xl shadow-sm">📄</div>
               <div>
                 <p className="font-bold text-base text-[#050454]">Organization_Permit.pdf</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">2.4 MB • Uploaded 2 days ago</p>
               </div>
            </div>
            <button className="bg-blue-50 text-blue-600 font-bold px-6 py-3 rounded-xl text-sm hover:bg-blue-100 transition">View PDF</button>
          </div>
        </ReviewStep>
      </div>

      {/* Admin Action Bar */}
      <div className="fixed bottom-0 left-72 right-0 p-6 bg-white/90 backdrop-blur-md border-t border-slate-200 flex justify-end gap-4 z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] pr-10">
        <button onClick={onBack} className="px-8 py-4 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 transition text-sm border border-red-100">Deny with Feedback</button>
        <button onClick={onBack} className="px-10 py-4 rounded-xl font-bold text-white bg-[#050454] hover:bg-blue-900 transition flex items-center gap-2 text-sm shadow-lg">Approve & Publish 🚀</button>
      </div>
    </div>
  );
}

function ReviewStep({ number, title, status, children }) {
  const isVerified = status === 'VERIFIED';
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-5">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-lg shadow-sm">{number}</div>
          <h3 className="text-xl font-bold text-[#050454]">{title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">VERIFIED</span>
          <div className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors shadow-inner ${isVerified ? 'bg-green-500 justify-end' : 'bg-slate-200 justify-start'}`}>
            <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
          </div>
        </div>
      </div>
      <div className="pl-16">{children}</div>
    </div>
  );
}

function AdminInsights() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-[#050454] mb-2">Donation Insights</h1>
          <p className="text-slate-500 text-sm">Track and analyze platform engagement.</p>
        </div>
        <button className="border border-slate-200 rounded-xl px-6 py-3 text-sm font-bold text-[#050454] bg-white shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-colors">
          Last 30 Days ⌄
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl">💵</div>
            <span className="bg-green-50 text-green-600 border border-green-200 text-xs font-bold px-3 py-1.5 rounded-lg">+12%</span>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">TOTAL FUNDS</p>
            <p className="text-5xl font-bold text-[#050454]">$124.5k</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">👥</div>
            <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold px-3 py-1.5 rounded-lg">+5%</span>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">NEW DONORS</p>
            <p className="text-5xl font-bold text-[#050454]">342</p>
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Line Chart: Donation Trends */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-[#050454]">Donation Trends</h2>
            <button className="text-slate-400 hover:text-[#050454] font-bold text-2xl transition-colors">•••</button>
          </div>
          
          <div className="h-72 w-full relative flex items-end pb-8 border-b border-slate-100 mt-4">
            {/* SVG for smooth line chart and gradient fill */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Filled Area below the curve */}
              <path d="M0,150 L0,120 C50,100 100,130 150,90 C200,50 250,30 300,40 C350,50 380,80 400,70 L400,150 Z" fill="url(#trendGradient)" />
              {/* The Blue Line */}
              <path d="M0,120 C50,100 100,130 150,90 C200,50 250,30 300,40 C350,50 380,80 400,70" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
              {/* Data Points */}
              <circle cx="150" cy="90" r="5" fill="#050454" stroke="white" strokeWidth="2" />
              <circle cx="250" cy="30" r="5" fill="#050454" stroke="white" strokeWidth="2" />
            </svg>
            
            {/* Floating Tooltip */}
            <div className="absolute top-[8%] left-[62.5%] bg-[#050454] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md transform -translate-x-1/2 -translate-y-full z-10">
              $42,500
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#050454] rotate-45"></div>
            </div>
          </div>
          
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4 px-4">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>

        {/* Donut Chart: Category Breakdown */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-[#050454]">Category Breakdown</h2>
            <span className="bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest">This Month</span>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center pt-4">
            {/* CSS Conic Gradient Donut */}
            <div className="w-52 h-52 rounded-full mb-10 relative flex items-center justify-center shadow-inner" style={{ background: 'conic-gradient(#3B82F6 0% 35%, #8B5CF6 35% 60%, #F59E0B 60% 80%, #10B981 80% 100%)' }}>
              <div className="w-36 h-36 bg-white rounded-full flex flex-col items-center justify-center shadow-md">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">TOTAL</span>
                <span className="text-3xl font-bold text-[#050454]">100%</span>
              </div>
            </div>
            
            <div className="w-full space-y-5 px-2">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div><span className="font-medium text-slate-600">Student Projects</span></div>
                <span className="font-bold text-[#050454]">35%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-purple-500 shadow-sm"></div><span className="font-medium text-slate-600">Alumni Business</span></div>
                <span className="font-bold text-[#050454]">25%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div><span className="font-medium text-slate-600">Community</span></div>
                <span className="font-bold text-[#050454]">20%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div><span className="font-medium text-slate-600">Emergency Funds</span></div>
                <span className="font-bold text-[#050454]">15%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
// ==========================================
// 8. USER PROFILE (GOLD STAFF & ALUMNI)
// ==========================================
function UserProfile({ isStaff, setSubView }) {
  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-10 animate-fade-in">
       <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
         <button onClick={() => setSubView(null)} className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 text-2xl transition">‹</button>
         <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">PROFILE & SETTINGS</span>
         <button className="w-10 h-10 bg-slate-50 rounded-full text-slate-600 text-xl flex items-center justify-center">⚙</button>
       </div>

       <div className="text-center pt-4 mb-12">
         <div className={`w-32 h-32 rounded-full mx-auto mb-6 relative ${isStaff ? 'ring-4 ring-[#b68f3a]/30' : 'ring-4 ring-blue-100'}`}>
            <div className={`w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-5xl text-white ${isStaff ? 'bg-[#b68f3a]' : 'bg-[#050454]'}`}>
               {isStaff ? '👩‍💼' : '👨‍🎓'}
            </div>
            {isStaff ? (
              <div className="absolute -bottom-3 right-0 left-0 flex justify-center gap-2">
                <span className="bg-white border border-slate-100 text-[#b68f3a] text-[9px] font-bold px-3 py-1 rounded-md shadow-sm flex items-center gap-1 uppercase tracking-widest"><span className="text-lg leading-none">✓</span> VERIFIED</span>
                <span className="bg-[#050454] text-white text-[9px] font-bold px-3 py-1 rounded-md shadow-sm uppercase tracking-widest">STAFF</span>
              </div>
            ) : (
              <div className="absolute -bottom-3 right-0 left-0 flex justify-center">
                <span className="bg-white border border-slate-100 text-[#050454] text-[10px] font-bold px-4 py-1.5 rounded-lg shadow-sm flex items-center gap-2 uppercase tracking-widest"><span className="text-blue-600 text-lg leading-none">✓</span> VERIFIED</span>
              </div>
            )}
         </div>
         <h1 className="text-4xl font-serif text-[#050454] mb-2">{isStaff ? 'Joo Dan Te' : 'Alex Johnson'}</h1>
         {isStaff && <p className="text-[10px] font-bold text-[#b68f3a] tracking-widest uppercase mb-3 bg-yellow-50 inline-block px-3 py-1 rounded border border-yellow-100">ALUMNI COORDINATOR</p>}
         <p className="text-[10px] text-green-600 font-bold flex items-center justify-center gap-2 mt-2 tracking-widest uppercase"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Synced with Registrar</p>
       </div>

       <div className="flex justify-between items-end mb-4">
         <h2 className="text-xs font-bold text-slate-400 tracking-widest uppercase">ACADEMIC PASSPORT</h2>
       </div>

       {/* Passport Card (Navy for Alumni, Gold/Mustard for Staff) */}
       <div className={`${isStaff ? 'bg-gradient-to-br from-[#b68f3a] to-yellow-700' : 'bg-gradient-to-br from-[#050454] to-blue-900'} text-white rounded-[2rem] p-10 shadow-2xl relative overflow-hidden mb-8`}>
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
         <div className="flex justify-between items-start mb-10 relative z-10">
  <img 
  src="/addu-logo.png" 
  alt="ADDU Logo" 
  className="w-30 h-30 object-contain mb-4 drop-shadow-md" 
/>
          <span className={`${isStaff ? 'bg-yellow-800/50 border border-yellow-600' : 'bg-[#1a2347] border border-blue-800'} text-white font-bold text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-2 uppercase tracking-widest shadow-sm`}>
            🔒 Staff & Employers
          </span>
         </div>
         
         <div className="relative z-10">
           <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-2">OFFICIAL DOCUMENT</p>
           <p className="font-serif text-xl text-white mb-8">Ateneo de Davao University</p>

           <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-2">DEGREE CONFERRED</p>
           <h2 className="text-4xl font-serif mb-4 leading-tight">{isStaff ? 'Bachelor of Science\nin Social Work' : 'Bachelor of Science\nin Information Technology'}</h2>
           <p className="text-white text-lg font-bold">Feature Coming Soon</p>
           
           <div className="border-t border-white/20 pt-8 flex justify-between items-end">
              <div>
                <p className="text-[10px] text-white/60 font-bold tracking-widest mb-2 uppercase">CLASS OF</p>
                <p className="font-serif text-3xl">{isStaff ? '2018' : '2024'}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/60 font-bold tracking-widest mb-2 uppercase">PASSPORT ID</p>
                <p className="font-mono text-sm tracking-wider">{isStaff ? 'ADDU-2018-0921' : 'ADDU-2020-10485'}</p>
              </div>
            </div>
         </div>
       </div>
    </div>
  );
}

