import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, LogOut, Search, RefreshCw } from 'lucide-react';

const ADMIN_PASSWORD = 'nakshi2024admin';

const statusColors: Record<string, { bg: string; text: string }> = {
  waitlist: { bg: '#E6DAC8', text: '#6E473B' },
  active: { bg: '#4A7C59', text: '#ffffff' },
  churned: { bg: '#8B1A1A', text: '#ffffff' },
  blocked: { bg: '#291C0E', text: '#ffffff' },
  pending: { bg: '#E6DAC8', text: '#6E473B' },
  qualified: { bg: '#4A7C59', text: '#ffffff' },
  reward_issued: { bg: '#B8860B', text: '#291C0E' },
  rejected: { bg: '#8B1A1A', text: '#ffffff' },
};

const Admin = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('nakshi_admin') === 'true');
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState(false);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF9F6' }}>
        <div className="w-full max-w-[360px] p-8">
          <h1 className="font-heading text-[32px] text-center mb-2" style={{ color: '#291C0E' }}>NAKSHI AI</h1>
          <p className="font-body text-[14px] text-center mb-8" style={{ color: '#A78D78' }}>Admin Panel</p>
          <form onSubmit={(e) => { e.preventDefault(); if (password === ADMIN_PASSWORD) { sessionStorage.setItem('nakshi_admin', 'true'); setAuthed(true); } else { setPwError(true); } }}>
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setPwError(false); }} placeholder="Enter password" className="w-full h-[48px] border px-4 font-body text-[14px] mb-3 focus:outline-none focus:border-[#B8860B]" style={{ borderColor: pwError ? '#8B1A1A' : '#D7C9B8', borderRadius: 4 }} />
            {pwError && <p className="font-body text-[12px] mb-3" style={{ color: '#8B1A1A' }}>Incorrect password</p>}
            <button type="submit" className="w-full h-[48px] font-body text-[14px] font-semibold" style={{ background: '#B8860B', color: '#FFF2DF', borderRadius: 4 }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return <Dashboard onLogout={() => { sessionStorage.removeItem('nakshi_admin'); setAuthed(false); }} />;
};

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [stats, setStats] = useState<any>(null);
  const [signups, setSignups] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [offset, setOffset] = useState(0);

  const fetchData = useCallback(async () => {
    // Stats
    const { count: totalSignups } = await supabase.from('waitlist').select('*', { count: 'exact', head: true });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: todaySignups } = await supabase.from('waitlist').select('*', { count: 'exact', head: true }).gte('created_at', today.toISOString());
    
    const { count: totalReferrals } = await supabase.from('referrals').select('*', { count: 'exact', head: true });
    const { count: qualifiedReferrals } = await supabase.from('referrals').select('*', { count: 'exact', head: true }).eq('status', 'qualified');

    // Top cities
    const { data: cityData } = await supabase.from('waitlist').select('city');
    const cityCounts: Record<string, number> = {};
    cityData?.forEach((r: any) => { cityCounts[r.city] = (cityCounts[r.city] || 0) + 1; });
    const topCities = Object.entries(cityCounts).map(([city, count]) => ({ city, count })).sort((a, b) => b.count - a.count).slice(0, 8);

    // Plan interest
    const { data: planData } = await supabase.from('waitlist').select('plan_interest');
    const planCounts: Record<string, number> = {};
    planData?.forEach((r: any) => { if (r.plan_interest && r.plan_interest !== 'unknown') planCounts[r.plan_interest] = (planCounts[r.plan_interest] || 0) + 1; });
    const planInterest = Object.entries(planCounts).map(([plan_name, count]) => ({ plan_name, count })).sort((a, b) => b.count - a.count);

    // Jewelry types
    const { data: jewelryData } = await supabase.from('waitlist').select('jewelry_types');
    const jewelryCounts: Record<string, number> = {};
    jewelryData?.forEach((r: any) => { r.jewelry_types?.forEach((t: string) => { jewelryCounts[t] = (jewelryCounts[t] || 0) + 1; }); });
    const jewelryTypes = Object.entries(jewelryCounts).map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count);

    setStats({ totalSignups: totalSignups || 0, todaySignups: todaySignups || 0, totalReferrals: totalReferrals || 0, qualifiedReferrals: qualifiedReferrals || 0, topCities, planInterest, jewelryTypes });

    // Signups
    const { data: signupData } = await supabase.from('waitlist').select('*').order('created_at', { ascending: false }).range(0, 49 + offset);
    setSignups(signupData || []);

    // Referrals
    const { data: refData } = await supabase.from('referrals').select('*').order('created_at', { ascending: false }).limit(50);
    setReferrals(refData || []);

    setLastUpdated(new Date());
    setLoading(false);
  }, [offset]);

  useEffect(() => { fetchData(); const id = setInterval(fetchData, 30000); return () => clearInterval(id); }, [fetchData]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('waitlist').update({ status }).eq('id', id);
    setSignups(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const filteredSignups = signups.filter(s => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return s.name?.toLowerCase().includes(q) || s.whatsapp_number?.includes(q) || s.city?.toLowerCase().includes(q);
    }
    return true;
  });

  const planColors: Record<string, string> = { starter: '#CBB9A4', growth: '#B8860B', pro: '#6E473B', studio: '#291C0E' };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF9F6' }}>
      <Loader2 className="animate-spin" size={32} color="#B8860B" />
    </div>
  );

  const maxCityCount = stats?.topCities?.[0]?.count || 1;
  const maxPlanCount = stats?.planInterest?.[0]?.count || 1;
  const maxJewelryCount = stats?.jewelryTypes?.[0]?.count || 1;

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
      {/* Navbar */}
      <div className="h-[56px] border-b flex items-center justify-between px-6" style={{ borderColor: '#D7C9B8' }}>
        <span className="font-heading text-[20px]" style={{ color: '#291C0E' }}>NAKSHI AI</span>
        <div className="flex items-center gap-4">
          <span className="font-body text-[14px]" style={{ color: '#A78D78' }}>Admin Panel</span>
          <span className="font-body text-[11px]" style={{ color: '#A78D78' }}>Updated {Math.round((Date.now() - lastUpdated.getTime()) / 1000)}s ago</span>
          <button onClick={() => fetchData()} className="p-1 hover:opacity-70"><RefreshCw size={14} color="#A78D78" /></button>
          <button onClick={onLogout} className="flex items-center gap-1 font-body text-[13px] hover:opacity-70" style={{ color: '#8B1A1A' }}><LogOut size={14} /> Logout</button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Waitlist" value={stats?.totalSignups} sub={`+${stats?.todaySignups} today`} subColor="#4A7C59" />
          <StatCard label="Total Referrals" value={stats?.totalReferrals} sub={`${stats?.qualifiedReferrals} qualified`} />
          <StatCard label="Most Signups From" value={stats?.topCities?.[0]?.city || '—'} isText />
          <StatCard label="Highest Interest Plan" value={stats?.planInterest?.[0]?.plan_name?.charAt(0).toUpperCase() + (stats?.planInterest?.[0]?.plan_name?.slice(1) || '') || '—'} isText />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* Signups Table */}
          <div className="lg:col-span-3">
            <h3 className="font-body text-[16px] font-semibold mb-4" style={{ color: '#291C0E' }}>Waitlist Signups</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" color="#A78D78" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, number or city..." className="w-full h-[40px] pl-9 pr-4 border font-body text-[13px] focus:outline-none focus:border-[#B8860B]" style={{ borderColor: '#D7C9B8', borderRadius: 4 }} />
              </div>
              <div className="flex gap-1">
                {['all', 'waitlist', 'active', 'churned'].map(f => (
                  <button key={f} onClick={() => setStatusFilter(f)} className="font-body text-[12px] px-3 py-1.5 capitalize" style={{ borderRadius: 4, background: statusFilter === f ? '#B8860B' : '#F4F1EA', color: statusFilter === f ? '#FFF2DF' : '#6E473B' }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="border overflow-auto" style={{ borderColor: '#D7C9B8', borderRadius: 4 }}>
              <table className="w-full text-left">
                <thead>
                  <tr style={{ background: '#F4F1EA' }}>
                    {['Name', 'WhatsApp', 'City', 'Jewelry', 'Plan', 'Joined', 'Status', ''].map(h => (
                      <th key={h} className="font-body text-[11px] uppercase px-3 py-2" style={{ color: '#A78D78' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredSignups.map(s => (
                    <tr key={s.id} className="border-t hover:bg-[#F4F1EA] transition-colors" style={{ borderColor: '#D7C9B8' }}>
                      <td className="px-3 py-2 font-body text-[13px]" style={{ color: '#291C0E' }}>{s.name}</td>
                      <td className="px-3 py-2 font-body text-[13px]" style={{ color: '#291C0E' }}>{s.whatsapp_number}</td>
                      <td className="px-3 py-2 font-body text-[13px]" style={{ color: '#6E473B' }}>{s.city}</td>
                      <td className="px-3 py-2 font-body text-[11px]" style={{ color: '#6E473B' }}>{s.jewelry_types?.join(', ')}</td>
                      <td className="px-3 py-2 font-body text-[12px] capitalize" style={{ color: '#6E473B' }}>{s.plan_interest}</td>
                      <td className="px-3 py-2 font-body text-[11px]" style={{ color: '#A78D78' }}>{new Date(s.created_at).toLocaleDateString()}</td>
                      <td className="px-3 py-2">
                        <span className="font-body text-[11px] px-2 py-0.5 capitalize" style={{ borderRadius: 100, background: statusColors[s.status]?.bg || '#E6DAC8', color: statusColors[s.status]?.text || '#6E473B' }}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        {s.status === 'waitlist' && (
                          <button onClick={() => updateStatus(s.id, 'active')} className="font-body text-[11px] underline" style={{ color: '#4A7C59' }}>Mark Active</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredSignups.length === 0 && (
                    <tr><td colSpan={8} className="px-3 py-8 text-center font-body text-[13px]" style={{ color: '#A78D78' }}>No entries found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <button onClick={() => setOffset(prev => prev + 50)} className="mt-3 font-body text-[13px] underline" style={{ color: '#B8860B' }}>Show 50 more</button>
          </div>

          {/* Analytics */}
          <div className="lg:col-span-2 space-y-6">
            <BarChart title="Top Cities" data={stats?.topCities?.map((c: any) => ({ label: c.city, value: c.count })) || []} max={maxCityCount} color="#B8860B" />
            <BarChart title="Plan Interest" data={stats?.planInterest?.map((p: any) => ({ label: p.plan_name, value: p.count })) || []} max={maxPlanCount} colorMap={planColors} />
            <BarChart title="Jewelry Types" data={stats?.jewelryTypes?.map((j: any) => ({ label: j.type, value: j.count })) || []} max={maxJewelryCount} color="#B8860B" />
          </div>
        </div>

        {/* Referrals Table */}
        <div>
          <h3 className="font-body text-[16px] font-semibold mb-4" style={{ color: '#291C0E' }}>Referrals</h3>
          <div className="border overflow-auto" style={{ borderColor: '#D7C9B8', borderRadius: 4 }}>
            <table className="w-full text-left">
              <thead>
                <tr style={{ background: '#F4F1EA' }}>
                  {['Referrer ID', 'Referee ID', 'Code', 'Status', 'Date'].map(h => (
                    <th key={h} className="font-body text-[11px] uppercase px-3 py-2" style={{ color: '#A78D78' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {referrals.map(r => (
                  <tr key={r.id} className="border-t hover:bg-[#F4F1EA] transition-colors" style={{ borderColor: '#D7C9B8' }}>
                    <td className="px-3 py-2 font-body text-[12px]" style={{ color: '#291C0E' }}>{r.referrer_id?.slice(0, 8)}...</td>
                    <td className="px-3 py-2 font-body text-[12px]" style={{ color: '#291C0E' }}>{r.referee_id?.slice(0, 8)}...</td>
                    <td className="px-3 py-2 font-body text-[13px] font-semibold" style={{ color: '#B8860B' }}>{r.referral_code}</td>
                    <td className="px-3 py-2">
                      <span className="font-body text-[11px] px-2 py-0.5 capitalize" style={{ borderRadius: 100, background: statusColors[r.status]?.bg, color: statusColors[r.status]?.text }}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-body text-[11px]" style={{ color: '#A78D78' }}>{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {referrals.length === 0 && (
                  <tr><td colSpan={5} className="px-3 py-8 text-center font-body text-[13px]" style={{ color: '#A78D78' }}>No referrals yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, sub, subColor, isText }: { label: string; value: any; sub?: string; subColor?: string; isText?: boolean }) => (
  <div className="p-8 border" style={{ borderColor: '#D7C9B8', borderRadius: 4, background: '#FAF9F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
    {isText ? (
      <p className="font-heading text-[28px]" style={{ color: '#291C0E' }}>{value}</p>
    ) : (
      <p className="font-heading text-[48px]" style={{ color: '#291C0E' }}>{value?.toLocaleString?.() ?? value}</p>
    )}
    <p className="font-body text-[12px] uppercase mt-1" style={{ color: '#A78D78' }}>{label}</p>
    {sub && <p className="font-body text-[12px] mt-1" style={{ color: subColor || '#A78D78' }}>{sub}</p>}
  </div>
);

const BarChart = ({ title, data, max, color, colorMap }: { title: string; data: { label: string; value: number }[]; max: number; color?: string; colorMap?: Record<string, string> }) => (
  <div>
    <h4 className="font-body text-[14px] font-semibold mb-3" style={{ color: '#291C0E' }}>{title}</h4>
    <div className="space-y-2">
      {data.map(d => (
        <div key={d.label} className="flex items-center gap-2">
          <span className="font-body text-[12px] w-[100px] truncate capitalize" style={{ color: '#6E473B' }}>{d.label}</span>
          <div className="flex-1 h-[20px] rounded-sm overflow-hidden" style={{ background: '#F4F1EA' }}>
            <div className="h-full rounded-sm transition-all" style={{ width: `${(d.value / max) * 100}%`, background: colorMap?.[d.label] || color || '#B8860B' }} />
          </div>
          <span className="font-body text-[11px] w-[30px] text-right" style={{ color: '#A78D78' }}>{d.value}</span>
        </div>
      ))}
      {data.length === 0 && <p className="font-body text-[12px]" style={{ color: '#A78D78' }}>No data yet</p>}
    </div>
  </div>
);

export default Admin;
