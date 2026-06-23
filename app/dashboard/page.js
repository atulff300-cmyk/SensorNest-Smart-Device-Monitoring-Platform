import connectToDatabase from '@/lib/mongodb';
import SensorData from '@/models/SensorData';
import AutoRefresh from './AutoRefresh';

// Ensure the page always fetches fresh data from the database
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Fetch data from MongoDB
  await connectToDatabase();
  
  // Get the single latest reading for the main cards
  const latestData = await SensorData.findOne().sort({ timestamp: -1 }).lean();

  // Get the last 24 readings for the history chart
  const recentDataList = await SensorData.find().sort({ timestamp: -1 }).limit(24).lean();
  // Reverse to display chronological order (left to right = oldest to newest)
  const chartData = recentDataList.reverse();

  const currentTemp = latestData ? latestData.temperature : '--';
  const hasMotion = latestData ? latestData.motion === 1 : false;
  const lastUpdate = latestData ? new Date(latestData.timestamp).toLocaleTimeString() : 'No data';

  return (
    <>
      <AutoRefresh interval={2000} />
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-zinc-400 mt-1">Live metrics from your facility zones.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Monitoring
          </div>
        </div>
      </header>

      {/* Data Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Temperature Card */}
        <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-zinc-400 font-medium">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
              Current Temp
            </div>
            <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-zinc-300">ESP32 Sensor</span>
          </div>
          
          <div>
            <div className="text-5xl font-bold tracking-tighter flex items-end gap-1">
              {currentTemp}<span className="text-2xl text-zinc-500 font-medium mb-1">°C</span>
            </div>
            <p className="text-sm text-green-400 mt-2 flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              Optimal Range
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-[50px] rounded-full pointer-events-none" />
        </div>

        {/* Motion Card */}
        <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-zinc-400 font-medium">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={hasMotion ? "text-red-500" : "text-blue-500"}><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
              Motion Status
            </div>
            <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-zinc-300">ESP32 Sensor</span>
          </div>
          
          <div>
            <div className={`text-3xl font-bold tracking-tight mt-2 ${hasMotion ? "text-red-400" : "text-white"}`}>
              {hasMotion ? "Motion Detected!" : "Safe / Clear"}
            </div>
            <p className="text-sm text-zinc-400 mt-2">
              Last update: {lastUpdate}
            </p>
          </div>
           <div className={`absolute -bottom-10 -right-10 w-40 h-40 blur-[50px] rounded-full pointer-events-none ${hasMotion ? "bg-red-600/20" : "bg-blue-600/20"}`} />
        </div>

        {/* System Health */}
        <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-zinc-400 font-medium">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-100"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              System Health
            </div>
          </div>
          
          <div>
            <div className="text-4xl font-bold tracking-tight text-white mt-2">
              {latestData ? "100%" : "Offline"}
            </div>
            <p className="text-sm text-zinc-400 mt-2">
              {latestData ? "Receiving data from ESP32" : "Waiting for sensor data..."}
            </p>
          </div>
        </div>
      </div>

      {/* Temperature Chart/Graph Section */}
      <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl h-80 flex flex-col relative overflow-hidden mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Temperature History (Recent)</h3>
        </div>

        {/* Dynamic Chart mapped from real ESP32 data */}
        <div className="flex-1 w-full flex items-end justify-between gap-2 px-2 relative z-10">
          {chartData.length > 0 ? (
            chartData.map((data, i) => {
              // Calculate height percentage
              const heightPercent = Math.min(100, Math.max(5, (data.temperature / 50) * 100));
              const timeString = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

              return (
                <div key={i} className="w-full bg-cyan-500/20 hover:bg-cyan-400 transition-colors rounded-t-sm relative group" style={{ height: `${heightPercent}%` }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 flex flex-col items-center">
                    <span>{data.temperature}°C</span>
                    <span className="text-zinc-500 text-[8px]">{timeString}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm">
              No historical data available yet.
            </div>
          )}
        </div>

        {/* Chart Grid Lines overlay */}
        <div className="absolute inset-x-8 inset-y-20 border-b border-dashed border-white/10 pointer-events-none" style={{ top: '40%' }} />
        <div className="absolute inset-x-8 inset-y-20 border-b border-dashed border-white/10 pointer-events-none" style={{ top: '70%' }} />
      </div>

      {/* Motion Chart/Graph Section */}
      <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl h-80 flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Motion History (Recent)</h3>
        </div>

        <div className="flex-1 w-full flex items-end justify-between gap-2 px-2 relative z-10">
          {chartData.length > 0 ? (
            chartData.map((data, i) => {
              const hasMotion = data.motion === 1;
              const heightPercent = hasMotion ? 100 : 15;
              const bgColor = hasMotion ? 'bg-red-500/40 hover:bg-red-400' : 'bg-white/5 hover:bg-white/20';
              const timeString = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

              return (
                <div key={i} className={`w-full ${bgColor} transition-colors rounded-t-sm relative group`} style={{ height: `${heightPercent}%` }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 flex flex-col items-center">
                    <span>{hasMotion ? "Motion" : "Clear"}</span>
                    <span className="text-zinc-500 text-[8px]">{timeString}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm">
              No historical data available yet.
            </div>
          )}
        </div>

        {/* Chart Grid Lines overlay */}
        <div className="absolute inset-x-8 inset-y-20 border-b border-dashed border-white/10 pointer-events-none" style={{ top: '50%' }} />
      </div>
    </>
  );
}
