import Link from 'next/link';

export default function LandingPage() {
  return (
    <div 
      className="min-h-screen text-white selection:bg-cyan-500 selection:text-black overflow-hidden relative font-sans bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.95)), url('/image (2).png')" }}
    >
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/30 blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse-slow pointer-events-none" style={{animationDelay: '3s'}} />

      {/* Navigation */}
      <nav className="relative z-20 w-full flex justify-between items-center px-6 py-6 md:px-12 max-w-7xl mx-auto backdrop-blur-sm border-b border-white/5">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-5 h-5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Sensor</span>
          <span className="text-cyan-400 -ml-1.5">Nest</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="hidden sm:block px-6 py-2 rounded-full text-zinc-300 hover:text-white transition-all text-sm font-medium">
            Log In
          </Link>
          <Link href="/signup" className="px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] text-sm">
            Sign Up Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-sm mb-10 font-medium backdrop-blur-md hover:bg-white/[0.05] transition-colors cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-400 font-semibold tracking-wide">
            Smart Device Monitoring Platform
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
          Hardware Intelligence,<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            Beautifully Rendered.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-300 mb-12 max-w-2xl leading-relaxed font-light">
          Powered by ESP32 DevKit V1. Monitor real-time temperature, motion, and vibrations instantly using our custom hardware circuit with DHT22 and MPU6050 sensors.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link href="/signup" className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] flex items-center justify-center gap-2">
            Start Monitoring
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
          <a href="#components" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all flex items-center justify-center">
            View Components
          </a>
        </div>
      </main>

      {/* Floating Dashboard Mockup */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mt-10 mb-32">
        <div className="animate-float relative rounded-2xl bg-black border border-white/10 shadow-[0_0_100px_rgba(34,211,238,0.15)] overflow-hidden">
          {/* Mac-style Window Header */}
          <div className="bg-zinc-900/50 border-b border-white/5 px-4 py-3 flex items-center gap-2 backdrop-blur-md">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <div className="mx-auto text-xs text-zinc-500 font-medium">sensornest-dashboard.app</div>
          </div>
          
          {/* Mockup Body */}
          <div className="p-8 bg-gradient-to-br from-zinc-900/50 to-black grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            
            {/* Value Card 1: DHT22 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-zinc-400 text-sm font-medium mb-2 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
                DHT22 Temperature
              </div>
              <div className="text-4xl font-bold text-white flex items-end gap-2">
                24.8<span className="text-xl text-zinc-500 mb-1">°C</span>
              </div>
              <div className="mt-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-[60%]"></div>
              </div>
            </div>

            {/* Value Card 2: MPU6050 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-zinc-400 text-sm font-medium mb-2 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="m22 8-6 4 6 4-6 4v-4l-6-4 6-4V4z"/><path d="M2 12h8"/><path d="M12 2v20"/></svg>
                MPU6050 Vibration
              </div>
              <div className="text-4xl font-bold text-white flex items-end gap-2">
                2.4<span className="text-xl text-zinc-500 mb-1">g</span>
              </div>
              <div className="mt-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-400 w-[30%]"></div>
              </div>
            </div>

            {/* Value Card 3: Status */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-zinc-400 text-sm font-medium mb-2 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Alert Status
              </div>
              <div className="text-3xl font-bold text-white mt-1">
                Normal
              </div>
              <div className="text-sm text-green-400 mt-3 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Green LED Active
              </div>
            </div>

            {/* Graph Area */}
            <div className="md:col-span-3 bg-white/[0.02] border border-white/5 rounded-xl p-6 h-48 flex flex-col">
              <div className="text-zinc-400 text-sm mb-4">Live Hardware Data Stream (ESP32)</div>
              <div className="flex-1 relative w-full flex items-end gap-1">
                {[...Array(40)].map((_, i) => (
                  <div key={i} className="flex-1 bg-cyan-500/20 rounded-t-sm hover:bg-cyan-400/50 transition-colors" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="components" className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Built with Professional Hardware</h2>
          <p className="text-zinc-300 max-w-2xl mx-auto text-lg">SensorNest is powered by industry-standard components for high-accuracy environment monitoring.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Temperature Monitoring</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">Powered by the precise <strong>DHT22 Sensor</strong>, tracking minute temperature variations in real-time.</p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Motion & Vibration</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">Utilizing the <strong>MPU6050 Accelerometer & Gyroscope</strong> to detect any unauthorized motion or critical vibrations.</p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Smart Hardware Alerts</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">Visual feedback via <strong>Red/Green LEDs</strong> and audible alerts through an active <strong>Buzzer</strong>, with physical push-button acknowledgment.</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="border-t border-white/5 bg-black/60 backdrop-blur-md py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">ESP32 DevKit V1 Integration Ready</h2>
          <p className="text-zinc-400 mb-10 text-lg">Fully compatible with your breadboard prototypes, OLED displays, and custom circuits.</p>
          <Link href="/signup" className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Access Dashboard
          </Link>
        </div>
      </footer>
    </div>
  );
}
