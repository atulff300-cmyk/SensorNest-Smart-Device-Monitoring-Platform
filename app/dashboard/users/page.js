"use client";
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch current user details to check role
      const meRes = await fetch('/api/auth/me');
      if (meRes.ok) {
        const meData = await meRes.json();
        setCurrentUser(meData.user);
      }

      // Fetch all users
      const usersRes = await fetch('/api/users');
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users);
      }
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Check for admin or owner
  const isAdmin = ['admin', 'owner', 'OWNER'].includes(currentUser?.role);

  const handleDelete = async (userId, name) => {
    if (!isAdmin) return toast.error('Only admin can delete users');
    
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
        if (res.ok) {
          toast.success('User deleted');
          setUsers(users.filter(u => u._id !== userId));
        } else {
          const data = await res.json();
          toast.error(data.message || 'Delete failed');
        }
      } catch (e) {
        toast.error('Delete failed');
      }
    }
  };

  const handleEditClick = (user) => {
    if (!isAdmin) return toast.error('Only admin can edit users');
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`/api/users/${editingUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: editingUser.role,
          accountStatus: editingUser.accountStatus
        })
      });

      if (res.ok) {
        toast.success('User updated');
        setIsEditModalOpen(false);
        fetchData(); // refresh list
      } else {
        const data = await res.json();
        toast.error(data.message || 'Update failed');
      }
    } catch (error) {
      toast.error('Update failed');
    }
  };

  if (loading) {
    return <div className="text-zinc-400 animate-pulse text-center mt-10">Loading users...</div>;
  }

  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-zinc-400 mt-1">Manage access control for your facility sensors.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200 transition-colors text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
          Invite User
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/30 uppercase">
                {user.fullName.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-white text-lg flex items-center gap-2">
                  {user.fullName}
                  {user._id === currentUser?._id && <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">You</span>}
                </div>
                <div className="text-sm text-zinc-400">{user.email}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="hidden sm:block min-w-[100px]">
                <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Role</div>
                <div className={`font-medium ${['admin', 'owner', 'OWNER'].includes(user.role) ? 'text-amber-400' : 'text-zinc-200'}`}>{user.role}</div>
              </div>
              <div className="hidden sm:block min-w-[100px]">
                <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Status</div>
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${user.accountStatus === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                  {user.accountStatus}
                </div>
              </div>

              {isAdmin && user._id !== currentUser?._id && (
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEditClick(user)} className="text-zinc-400 hover:text-cyan-400 p-2 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                  </button>
                  <button onClick={() => handleDelete(user._id, user.fullName)} className="text-zinc-400 hover:text-red-400 p-2 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-10">No users found.</div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Edit User: {editingUser.fullName}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400 block mb-1">Role</label>
                <select 
                  className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-zinc-400 block mb-1">Status</label>
                <select 
                  className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
                  value={editingUser.accountStatus}
                  onChange={(e) => setEditingUser({...editingUser, accountStatus: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-zinc-400 hover:text-white transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
