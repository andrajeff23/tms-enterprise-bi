import React, { useState } from 'react';
import {
  Sparkles, BrainCircuit, AlertTriangle, Zap, TrendingUp,
  TrendingDown, Truck, Fuel, Route, Clock, CheckCircle, Eye
} from 'lucide-react';

interface AIInsight {
  id: string;
  category: string;
  title: string;
  detail: string;
  impact: string;
  confidence: number;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'ACTIVE' | 'APPLIED' | 'DISMISSED';
}

interface PredictionItem {
  vehiclePlate: string;
  vehicleType: string;
  component: string;
  riskPercent: number;
  predictedDate: string;
  estimatedCost: number;
  recommendation: string;
}

const aiInsights: AIInsight[] = [
  { id: 'AI-001', category: 'Optimasi Rute', title: 'Pengalihan Rute Via Cipali Menghemat 14.2% BBM', detail: 'Berdasarkan analisis kemacetan real-time Tol Cipularang & Pantura periode Sept 2026, rute alternatif via Tol Cipali lebih efisien untuk armada Tronton. Proyeksi penghematan: 14.2% konsumsi BBM dan percepatan ETA rata-rata 45 menit.', impact: 'Hemat ~Rp 2.8 Jt/bulan per unit', confidence: 92, priority: 'HIGH', status: 'ACTIVE' },
  { id: 'AI-002', category: 'Efisiensi Armada', title: '3 Unit Dengan Idle Time >40% Perlu Realokasi', detail: 'Unit B 1122 KXE, B 7788 KXH, dan B 2233 KXI tercatat idle >40% dalam 30 hari terakhir. Rekomendasi: realokasi ke rute pendek Jabodetabek atau dioptimalkan dengan penggabungan LCL shipment.', impact: 'Potensi pendapatan tambahan Rp 18 Jt/bulan', confidence: 87, priority: 'HIGH', status: 'ACTIVE' },
  { id: 'AI-003', category: 'Penghematan BBM', title: 'Driver B-Group Konsumsi BBM 23% Lebih Tinggi', detail: 'Driver grup B rata-rata mengonsumsi 23% lebih banyak BBM dibanding grup A. Pola mengemudi: sering akselerasi mendadak dan pengereman keras. Rekomendasi: pelatihan eco-driving terjadwal untuk 4 driver.', impact: 'Potensi hemat Rp 6.2 Jt/bulan', confidence: 85, priority: 'MEDIUM', status: 'ACTIVE' },
  { id: 'AI-004', category: 'Revenue Optimization', title: 'Peningkatan Tarif Rute Makassar Disarankan +8%', detail: 'Analisis pasar menunjukkan tarif rute Jakarta-Makassar kompetitor naik rata-rata 8.5%. Tarif TMS saat ini di bawah pasar. Peningkatan 8% tidak akan mempengaruhi retensi customer berdasarkan model elastisitas harga.', impact: 'Tambahan revenue Rp 45 Jt/bulan', confidence: 78, priority: 'MEDIUM', status: 'ACTIVE' },
  { id: 'AI-005', category: 'Customer Retention', title: '2 Customer Berisiko Churn dalam 60 Hari', detail: 'PT. Motor Bersama (2 komplain aktif, pembayaran terlambat) dan PT. Sukses Makmur (DO dikembalikan 2x) teridentifikasi berisiko churn. Rekomendasi: account manager proaktif dan pemberian diskon loyalitas.', impact: 'Retensi potensi revenue Rp 700 Jt/tahun', confidence: 72, priority: 'CRITICAL', status: 'ACTIVE' },
  { id: 'AI-006', category: 'Optimasi Rute', title: 'Konsolidasi Muatan LCL Jakarta-Cirebon Optimal 3x/Minggu', detail: 'Permintaan FCL Jakarta-Cirebon tidak mencukupi. AI merekomendasikan konsolidasi pengiriman menjadi 3x/minggu dengan LCL untuk 5 customer di jalur yang sama. Utilisasi truk akan naik dari 62% ke 94%.', impact: 'Efisiensi biaya Rp 12 Jt/bulan', confidence: 90, priority: 'HIGH', status: 'APPLIED' },
];

const predictions: PredictionItem[] = [
  { vehiclePlate: 'B 9876 KXB', vehicleType: 'Trailer 40ft Hino 500', component: 'Transmisi Otomatis', riskPercent: 89, predictedDate: '~10-14 hari', estimatedCost: 35000000, recommendation: 'Jadwalkan penggantian transmisi segera sebelum kerusakan total' },
  { vehiclePlate: 'B 4567 KXC', vehicleType: 'CDD Long Box Isuzu', component: 'Sistem Rem Hidrolik', riskPercent: 74, predictedDate: '~21-28 hari', estimatedCost: 8500000, recommendation: 'Cek dan ganti master cylinder + selang rem dalam servis berikutnya' },
  { vehiclePlate: 'B 1289 KXD', vehicleType: 'Tronton Box Volvo FH16', component: 'Timing Belt Mesin', riskPercent: 67, predictedDate: '~30-45 hari', estimatedCost: 6200000, recommendation: 'Ganti timing belt pada servis 75.000 km yang akan datang' },
  { vehiclePlate: 'B 9123 KXA', vehicleType: 'Truck Wingbox Mitsubishi', component: 'Air Compressor AC', riskPercent: 52, predictedDate: '~45-60 hari', estimatedCost: 4800000, recommendation: 'Monitor tekanan kompresor, siapkan spare part dalam inventaris' },
  { vehiclePlate: 'B 1122 KXE', vehicleType: 'CDE Box Canter', component: 'Kopling Utama', riskPercent: 41, predictedDate: '~60-90 hari', estimatedCost: 3200000, recommendation: 'Jadwalkan penggantian kopling pada siklus servis 90 hari' },
];

const fuelTrend = [
  { week: 'W1 Agu', avgKmL: 4.2 }, { week: 'W2 Agu', avgKmL: 4.1 }, { week: 'W3 Agu', avgKmL: 4.4 },
  { week: 'W4 Agu', avgKmL: 4.0 }, { week: 'W1 Sep', avgKmL: 4.3 }, { week: 'W2 Sep', avgKmL: 4.6 },
];

const routeEfficiency = [
  { route: 'Jakarta → Surabaya', avgHours: 14.5, target: 16, efficiency: 91 },
  { route: 'Jakarta → Semarang', avgHours: 8.2, target: 9, efficiency: 89 },
  { route: 'Surabaya → Makassar', avgHours: 38, target: 42, efficiency: 90 },
  { route: 'Jakarta → Medan', avgHours: 52, target: 50, efficiency: 96 },
  { route: 'Jakarta → Bandung', avgHours: 3.8, target: 3.5, efficiency: 92 },
];

export const AnalyticsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'insights' | 'predictive' | 'fuel' | 'route'>('insights');

  const priorityBadge = (p: AIInsight['priority']) => {
    const map = {
      CRITICAL: 'bg-rose-100 text-rose-700',
      HIGH: 'bg-orange-100 text-orange-700',
      MEDIUM: 'bg-amber-100 text-amber-700',
      LOW: 'bg-slate-100 text-slate-600',
    };
    return <span className={`${map[p]} font-bold text-[10px] px-2 py-0.5 rounded`}>{p}</span>;
  };

  const statusBadge = (s: AIInsight['status']) => {
    if (s === 'APPLIED') return <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle size={9} /> Diterapkan</span>;
    if (s === 'DISMISSED') return <span className="bg-slate-100 text-slate-500 font-bold text-[10px] px-2 py-0.5 rounded-full">Diabaikan</span>;
    return <span className="bg-blue-100 text-blue-700 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><Zap size={9} /> Aktif</span>;
  };

  const fmt = (n: number) => `Rp ${(n / 1000000).toFixed(1)} Jt`;

  const tabs = [
    { id: 'insights', label: 'AI Insights', icon: <Sparkles size={14} /> },
    { id: 'predictive', label: 'Predictive Maintenance', icon: <BrainCircuit size={14} /> },
    { id: 'fuel', label: 'Efisiensi BBM', icon: <Fuel size={14} /> },
    { id: 'route', label: 'Rute & SLA', icon: <Route size={14} /> },
  ] as const;

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center shadow-md">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">AI Enterprise Analytics & Predictive</h2>
            <p className="text-xs text-slate-500">Rekomendasi kecerdasan buatan untuk optimasi rute, prediksi kerusakan, dan efisiensi BBM</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-violet-50 border border-violet-200 px-3 py-2 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-xs font-bold text-violet-700">AI Engine v2.1 · Online</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'AI Rekomendasi Aktif', val: aiInsights.filter(i => i.status === 'ACTIVE').length, sub: 'Menunggu tindakan', color: 'text-violet-600', icon: <Sparkles size={18} /> },
          { label: 'Sudah Diterapkan', val: aiInsights.filter(i => i.status === 'APPLIED').length, sub: 'Bulan ini', color: 'text-emerald-600', icon: <CheckCircle size={18} /> },
          { label: 'Potensi Penghematan', val: 'Rp 85 Jt', sub: '/bulan jika diterapkan', color: 'text-blue-600', icon: <TrendingDown size={18} /> },
          { label: 'Akurasi Prediksi AI', val: '91.2%', sub: 'Model accuracy', color: 'text-amber-600', icon: <BrainCircuit size={18} /> },
        ].map(k => (
          <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-bold uppercase text-slate-500">{k.label}</div>
              <div className={`${k.color} opacity-60`}>{k.icon}</div>
            </div>
            <div className={`text-2xl font-extrabold ${k.color}`}>{k.val}</div>
            <div className="text-[10px] text-slate-400 mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveSection(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSection === t.id
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* AI Insights Tab */}
      {activeSection === 'insights' && (
        <div className="space-y-4">
          {aiInsights.map(ins => (
            <div key={ins.id} className={`bg-white border rounded-xl p-5 shadow-xs hover:shadow-md transition-all ${ins.status === 'APPLIED' ? 'border-emerald-200 opacity-80' : 'border-slate-200'}`}>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <BrainCircuit size={20} className="text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="bg-violet-100 text-violet-700 font-bold text-[10px] px-2 py-0.5 rounded">{ins.category}</span>
                    {priorityBadge(ins.priority)}
                    {statusBadge(ins.status)}
                    <span className="text-[10px] text-slate-400 ml-auto">Confidence: <strong className="text-slate-600">{ins.confidence}%</strong></span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{ins.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{ins.detail}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp size={13} className="text-emerald-500" />
                      <span className="text-xs font-bold text-emerald-600">{ins.impact}</span>
                    </div>
                    {ins.status === 'ACTIVE' && (
                      <div className="flex gap-2">
                        <button onClick={() => alert(`Menerapkan: ${ins.title}`)} className="flex items-center gap-1 bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors">
                          <Zap size={11} /> Terapkan
                        </button>
                        <button onClick={() => alert('Rekomendasi diabaikan')} className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                          Abaikan
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-3">
                <div className="text-[10px] text-slate-400 w-24 shrink-0">Tingkat Kepercayaan AI</div>
                <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${ins.confidence >= 85 ? 'bg-violet-500' : ins.confidence >= 70 ? 'bg-amber-500' : 'bg-slate-400'}`}
                    style={{ width: `${ins.confidence}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-600 w-8">{ins.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Predictive Maintenance Tab */}
      {activeSection === 'predictive' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit size={16} className="text-rose-600" />
              <h3 className="font-bold text-slate-900 text-sm">Prediksi Kerusakan Komponen Kendaraan</h3>
              <span className="ml-auto text-[10px] text-slate-400 bg-slate-50 border border-slate-200 px-2 py-1 rounded">Diperbarui: Hari ini 09:00</span>
            </div>
            <div className="space-y-3">
              {predictions.map((p, i) => (
                <div key={i} className={`border rounded-xl p-4 ${p.riskPercent >= 80 ? 'border-rose-200 bg-rose-50/40' : p.riskPercent >= 60 ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-xs">{p.vehiclePlate}</span>
                        <span className="text-[10px] text-slate-500">{p.vehicleType}</span>
                        <span className={`font-bold text-[10px] px-2 py-0.5 rounded ${
                          p.riskPercent >= 80 ? 'bg-rose-600 text-white' : p.riskPercent >= 60 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>Risk {p.riskPercent}%</span>
                      </div>
                      <div className="mt-1.5">
                        <span className="text-xs font-bold text-slate-800">Komponen: </span>
                        <span className="text-xs text-slate-600">{p.component}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">{p.recommendation}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-slate-400">Prediksi Rusak</div>
                      <div className="text-xs font-bold text-slate-700">{p.predictedDate}</div>
                      <div className="text-[10px] text-rose-600 font-bold mt-1">{fmt(p.estimatedCost)}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 bg-white/80 border border-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${p.riskPercent >= 80 ? 'bg-rose-500' : p.riskPercent >= 60 ? 'bg-amber-500' : 'bg-slate-400'}`}
                        style={{ width: `${p.riskPercent}%` }}
                      />
                    </div>
                    {p.riskPercent >= 60 && (
                      <button onClick={() => alert(`Membuat WO untuk ${p.vehiclePlate} - ${p.component}`)} className="text-[10px] font-bold text-white bg-slate-800 px-2 py-1 rounded hover:bg-slate-700 transition-colors">
                        Buat WO
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fuel Efficiency Tab */}
      {activeSection === 'fuel' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
              <Fuel size={15} className="text-emerald-600" /> Tren Konsumsi BBM (km/L)
            </h3>
            <div className="space-y-3">
              {fuelTrend.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-[11px] font-semibold text-slate-500 w-16 shrink-0">{f.week}</div>
                  <div className="flex-1 bg-slate-100 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${f.avgKmL >= 4.5 ? 'bg-emerald-500' : f.avgKmL >= 4.2 ? 'bg-blue-500' : 'bg-amber-500'}`}
                      style={{ width: `${(f.avgKmL / 6) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs font-bold text-slate-800 w-12 text-right">{f.avgKmL} km/L</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
              <div className="font-bold text-emerald-700">Target Efisiensi: 4.5 km/L</div>
              <div className="text-emerald-600 mt-0.5">W2 Sep mencapai target tertinggi 4.6 km/L (+2.2% vs target)</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
              <Truck size={15} className="text-blue-600" /> Konsumsi BBM Per Unit (Sept 2026)
            </h3>
            {[
              { plate: 'B 9123 KXA', km: '4.8 km/L', total: 'Rp 4.2 Jt', vs: '+8%', good: true },
              { plate: 'B 9876 KXB', km: '3.9 km/L', total: 'Rp 8.8 Jt', vs: '-13%', good: false },
              { plate: 'B 4567 KXC', km: '5.1 km/L', total: 'Rp 1.8 Jt', vs: '+13%', good: true },
              { plate: 'B 1289 KXD', km: '4.2 km/L', total: 'Rp 6.5 Jt', vs: '-7%', good: false },
              { plate: 'B 3344 KXF', km: '4.5 km/L', total: 'Rp 5.1 Jt', vs: '0%', good: true },
            ].map(u => (
              <div key={u.plate} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                <div className="font-bold text-slate-800 text-xs">{u.plate}</div>
                <div className="text-xs text-slate-600">{u.km}</div>
                <div className="text-xs font-bold text-slate-900">{u.total}</div>
                <div className={`text-[11px] font-bold ${u.good ? 'text-emerald-600' : 'text-rose-600'} flex items-center gap-0.5`}>
                  {u.good ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {u.vs} vs target
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Route Efficiency Tab */}
      {activeSection === 'route' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center gap-2">
            <Route size={15} className="text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Efisiensi Rute & Pencapaian SLA</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-3.5 text-left">Rute Pengiriman</th>
                  <th className="p-3.5 text-center">Avg. Waktu (Jam)</th>
                  <th className="p-3.5 text-center">Target (Jam)</th>
                  <th className="p-3.5 text-center">On-Time Rate</th>
                  <th className="p-3.5 text-center">Efisiensi</th>
                  <th className="p-3.5 text-center">Rekomendasi AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {routeEfficiency.map(r => (
                  <tr key={r.route} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-800">{r.route}</td>
                    <td className="p-3.5 text-center font-bold text-slate-900">{r.avgHours}h</td>
                    <td className="p-3.5 text-center text-slate-500">{r.target}h</td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${r.efficiency >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${r.efficiency}%` }} />
                        </div>
                        <span className="font-bold text-slate-700">{r.efficiency}%</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-center">
                      <span className={`font-bold text-[11px] px-2 py-0.5 rounded-full ${r.efficiency >= 90 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {r.efficiency >= 90 ? 'Optimal' : 'Perlu Perbaikan'}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <button onClick={() => alert(`AI Rute ${r.route}: Optimalkan jadwal keberangkatan dan penggunaan armada`)} className="inline-flex items-center gap-1 text-violet-600 hover:text-violet-800 font-semibold text-[11px]">
                        <Eye size={11} /> Lihat AI Tips
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
