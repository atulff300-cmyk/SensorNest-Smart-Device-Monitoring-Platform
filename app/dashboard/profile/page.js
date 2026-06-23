"use client";
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          toast.error("Failed to load profile");
        }
      } catch (error) {
        toast.error("Error connecting to server");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div className="text-zinc-400 animate-pulse text-center mt-10">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-red-400 text-center mt-10">Profile not found. Please log in again.</div>;
  }

  return (
    <>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-zinc-400 mt-1">Manage your account settings and preferences.</p>
      </header>

      <div className="max-w-3xl">
        {/* Profile Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 mb-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-4xl font-bold border-4 border-black shadow-[0_0_30px_rgba(34,211,238,0.3)] uppercase">
              {user.fullName ? user.fullName.charAt(0) : '?'}
            </div>
            <button className="absolute bottom-0 right-0 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            </button>
          </div>
          
          <div className="flex-1 space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-zinc-500 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={user.fullName} 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-cyan-500 outline-none transition-colors" 
                  readOnly
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-zinc-500 uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  defaultValue={user.email} 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-zinc-400 focus:border-cyan-500 outline-none transition-colors cursor-not-allowed" 
                  readOnly
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-zinc-500 uppercase tracking-wider">Role</label>
                <input 
                  type="text" 
                  defaultValue={user.role} 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-amber-400 font-semibold focus:border-cyan-500 outline-none transition-colors cursor-not-allowed" 
                  readOnly
                />
              </div>
            </div>
            <button className="bg-white text-black px-6 py-2 rounded-xl font-medium hover:bg-zinc-200 transition-colors" onClick={() => toast.success("Profile saved!")}>
              Save Changes
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-6">Security</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div>
                <div className="font-medium text-white">Password</div>
                <div className="text-sm text-zinc-400">Manage your secure password</div>
              </div>
              <button className="px-4 py-2 rounded-lg border border-white/20 text-sm font-medium hover:bg-white/5 transition-colors" onClick={() => toast("Password update coming soon")}>
                Update Password
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Two-Factor Authentication</div>
                <div className="text-sm text-zinc-400">Add an extra layer of security to your account.</div>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-zinc-700 appearance-none cursor-pointer" />
                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-zinc-700 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
