import connectToDatabase from '@/lib/mongodb';
import SensorData from '@/models/SensorData';
import AutoRefresh from '../AutoRefresh';

export const dynamic = 'force-dynamic';

export default async function DevicesPage() {
  await connectToDatabase();
  const latestData = await SensorData.findOne().sort({ timestamp: -1 }).lean();

  const isOnline = !!latestData;
  // Calculate if the device is recently updated (e.g. within the last 15 minutes)
  const isRecentlyUpdated = latestData && (new Date() - new Date(latestData.timestamp)) < 15 * 60 * 1000;
  
  const status = isOnline ? (isRecentlyUpdated ? 'Online' : 'Warning') : 'Offline';
  
  // We don't have battery data coming from ESP32, so we display N/A or a placeholder
  const battery = 'N/A (Wired)'; 

  return (
    <>
      <AutoRefresh interval={2000} />
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Device Details</h1>
          <p className="text-zinc-400 mt-1">Manage and monitor your connected sensors.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200 transition-colors text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Add Device
        </button>
      </header>

      <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400 text-sm">
              <th className="px-6 py-4 font-medium">Device Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Battery</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isOnline ? (
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">ESP32 Main Node</div>
                  <div className="text-xs text-zinc-500 font-mono">SEN-001</div>
                </td>
                <td className="px-6 py-4 text-zinc-300">
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
                    Temp & Motion
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-300">Server Room</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    status === 'Online' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                    status === 'Warning' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                    'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {status}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-300">{battery}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-zinc-400 hover:text-white transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-zinc-500">
                  No connected devices found. Please ensure your ESP32 is powered on and sending data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
