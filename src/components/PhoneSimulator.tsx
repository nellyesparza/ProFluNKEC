import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Search,
  Bookmark,
  Share2,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Cpu,
  BarChart3,
  Flame,
  Layers,
  ChevronRight,
  Terminal,
  Activity,
  Check,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface MetricItem {
  label: string;
  value: string;
  unit: string;
}

interface Review {
  id: string;
  title: string;
  version: string;
  category: string;
  score: number;
  consensusVerdict: string;
  aiSummary: string;
  pros: string[];
  cons: string[];
  reviewerName: string;
  reviewerRole: string;
  reviewerCompany: string;
  releaseDate: string;
  metrics: MetricItem[];
}

const mockReviewsData: Review[] = [
  {
    id: 'rev-01',
    title: 'DuckDB Analytic Engine',
    version: 'v1.1.2',
    category: 'Databases',
    score: 9.6,
    consensusVerdict: 'Best-in-class in-process OLAP with zero server operational overhead.',
    aiSummary:
      'Parquet direct vectorization yields 8.4x throughput over SQLite in columnar queries. Seamless WASM compatibility enables browser-native SQL analytics.',
    pros: [
      '+ Zero-copy Apache Arrow integration',
      '+ Microsecond cold-start latency in serverless lambdas',
      '+ Comprehensive window functions and subquery optimization',
    ],
    cons: [
      '- Single-writer concurrency lock constraint',
      '- High RAM consumption on untuned large uncompressed joins',
    ],
    reviewerName: 'Alex Mercer',
    reviewerRole: 'Staff Data Systems Engineer',
    reviewerCompany: 'Datadog',
    releaseDate: 'Oct 2026',
    metrics: [
      { label: 'p99 Latency', value: '2.8', unit: 'ms' },
      { label: 'Throughput', value: '480k', unit: 'rows/s' },
      { label: 'Cold Start', value: '18', unit: 'ms' },
      { label: 'Memory Base', value: '24', unit: 'MB' },
    ],
  },
  {
    id: 'rev-02',
    title: 'Bun Runtime & Toolchain',
    version: 'v1.1.28',
    category: 'Runtimes',
    score: 9.3,
    consensusVerdict: 'Significant throughput acceleration for microservices with native SQLite & bundling.',
    aiSummary:
      'Zig-based architecture provides 3.2x faster package installs than pnpm and 4x faster HTTP parsing than Node 22. Native TS execution eliminates build steps.',
    pros: [
      '+ Native TypeScript & JSX execution with no transpilation step',
      '+ Ultra-fast startup footprint (< 12ms)',
      '+ Built-in bundler and test runner replace complex toolchains',
    ],
    cons: [
      '- Edge Node.js C++ addon edge cases in legacy packages',
      '- Occasional memory profiling tooling disparity vs V8 inspector',
    ],
    reviewerName: 'Kavita Patel',
    reviewerRole: 'Principal Cloud Architect',
    reviewerCompany: 'Vercel Infra',
    releaseDate: 'Oct 2026',
    metrics: [
      { label: 'Req / sec', value: '142k', unit: 'req/s' },
      { label: 'Install Time', value: '1.4', unit: 'sec' },
      { label: 'p95 Handshake', value: '1.2', unit: 'ms' },
      { label: 'Heap Alloc', value: '38', unit: 'MB' },
    ],
  },
  {
    id: 'rev-03',
    title: 'Supabase Vector & Storage',
    version: 'v2.45.0',
    category: 'Databases',
    score: 9.1,
    consensusVerdict: 'The defacto standard for Postgres-first modern architectures and semantic retrieval.',
    aiSummary:
      'pgvector integration with HNSW indexing brings approximate nearest neighbor search to relational schema without needing a separate Pinecone or Milvus instance.',
    pros: [
      '+ Declarative Row-Level Security (RLS) directly in SQL',
      '+ Instant OpenAPI auto-generated endpoints',
      '+ High reliability WAL realtime replication',
    ],
    cons: [
      '- Connection pool exhaustion if pgBouncer is unconfigured on spikes',
      '- Database migrations require strict CI discipline in team scale',
    ],
    reviewerName: 'Marcus Vance',
    reviewerRole: 'Lead Platform Architect',
    reviewerCompany: 'Stripe Ecosystem',
    releaseDate: 'Sep 2026',
    metrics: [
      { label: 'p99 Query', value: '4.6', unit: 'ms' },
      { label: 'HNSW recall', value: '98.7', unit: '%' },
      { label: 'TPS peak', value: '8.4k', unit: 'tps' },
      { label: 'Conn Limit', value: '10k', unit: 'pooled' },
    ],
  },
  {
    id: 'rev-04',
    title: 'vLLM High-Throughput Engine',
    version: 'v0.6.2',
    category: 'AI / LLM',
    score: 9.5,
    consensusVerdict: 'PagedAttention architecture drastically minimizes GPU memory waste in batch inference.',
    aiSummary:
      'Near-zero memory fragmentation allows serving 4x larger concurrent batch sizes on standard NVIDIA H100 clusters with speculative decoding support.',
    pros: [
      '+ PagedAttention eliminates VRAM fragmentation',
      '+ Continuous batching maximizes tensor core utilization',
      '+ Direct OpenAI compatible API server interface',
    ],
    cons: [
      '- Complex multi-GPU tensor-parallel cold initialization',
      '- Strict CUDA toolkit version dependencies',
    ],
    reviewerName: 'Elena Rostova',
    reviewerRole: 'Director of Machine Learning',
    reviewerCompany: 'Weights & Biases',
    releaseDate: 'Oct 2026',
    metrics: [
      { label: 'TTFT p50', value: '28', unit: 'ms' },
      { label: 'Token Rate', value: '184', unit: 'tok/s' },
      { label: 'VRAM Usage', value: '92', unit: '%' },
      { label: 'Batch Depth', value: '128', unit: 'streams' },
    ],
  },
  {
    id: 'rev-05',
    title: 'Tailwind CSS v4 Oxide Engine',
    version: 'v4.0-canary',
    category: 'Web Frameworks',
    score: 9.0,
    consensusVerdict: 'Rust-powered re-write drops compile times by 10x with zero-configuration CSS imports.',
    aiSummary:
      'Replaces PostCSS architecture with lightningcss and a unified Rust compiler. Native container queries and custom CSS property detection work out of the box.',
    pros: [
      '+ 10x faster HMR and initial rebuild cycles',
      '+ CSS-first configuration replaces tailwind.config.js',
      '+ Built-in cascading layer optimization',
    ],
    cons: [
      '- Breaking syntax differences with older v3 plugin ecosystems',
      '- Tooling ecosystem still migrating IDE Intellisense extensions',
    ],
    reviewerName: 'Dmitri Chen',
    reviewerRole: 'Senior Frontend Architect',
    reviewerCompany: 'Linear App',
    releaseDate: 'Sep 2026',
    metrics: [
      { label: 'Build Time', value: '38', unit: 'ms' },
      { label: 'Bundle Size', value: '8.2', unit: 'KB' },
      { label: 'HMR Delta', value: '6', unit: 'ms' },
      { label: 'Memory', value: '16', unit: 'MB' },
    ],
  },
];

const categories = [
  'All Signals',
  'Databases',
  'Runtimes',
  'Infra & Cloud',
  'AI / LLM',
  'Web Frameworks',
];

export const PhoneSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Signals');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['rev-01', 'rev-04']);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredReviews = mockReviewsData.filter((r) => {
    const matchesCat = selectedCategory === 'All Signals' || r.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.consensusVerdict.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reviewerCompany.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 w-full">
      {/* Controls Bar */}
      <div className="w-full max-w-[420px] mb-3 flex items-center justify-between text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
          <span className="font-mono text-[11px] text-[#F8FAFC]">Flutter Runtime Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="px-2.5 py-1 rounded bg-[#1E293B] hover:bg-[#334155] text-[#dfe2ef] transition-colors border border-white/5 flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-[#6366F1]" />
            {isPhoneFrame ? 'Marco de Teléfono' : 'Vista Expandida'}
          </button>
        </div>
      </div>

      {/* Mobile Device Frame */}
      <div
        className={`relative transition-all duration-300 ${
          isPhoneFrame
            ? 'w-[390px] h-[780px] rounded-[48px] p-3.5 bg-[#181B25] shadow-2xl border-4 border-[#334155]/60 ring-1 ring-white/10'
            : 'w-full max-w-[480px] h-[760px] rounded-xl p-0 bg-[#090D16] border border-[#334155]'
        }`}
      >
        {/* Dynamic Island / Speaker Notch (phone frame only) */}
        {isPhoneFrame && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-between px-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E293B]"></span>
          </div>
        )}

        {/* Flutter App Screen Container */}
        <div className="w-full h-full bg-[#090D16] text-[#F8FAFC] flex flex-col overflow-hidden relative rounded-[36px]">
          {/* iOS / Android Status Bar */}
          <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-mono text-[#94A3B8] select-none z-30 shrink-0">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-4 h-2 rounded-sm border border-[#94A3B8] p-0.5 flex items-center">
                <div className="w-2.5 h-full bg-[#10B981] rounded-xs"></div>
              </div>
            </div>
          </div>

          {/* Top App Bar (56px fixed height, frosted backdrop) */}
          <header className="h-14 px-3 flex items-center justify-between border-b border-white/8 bg-[#090D16]/85 backdrop-blur-md shrink-0 z-20">
            <button
              onClick={() => setSelectedCategory('All Signals')}
              className="w-10 h-10 rounded bg-[#0F172A] border border-white/8 flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
              title="Filter"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6366F1] shadow-[0_0_8px_#6366F1]"></span>
              <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-sm tracking-wider text-[#F8FAFC]">
                {activeTab === 0
                  ? 'DEVCRITIQUE'
                  : activeTab === 1
                  ? 'BENCHMARKS'
                  : activeTab === 2
                  ? 'AI CONSENSUS'
                  : 'SAVED SIGNALS'}
              </h1>
            </div>

            <button
              onClick={() => {
                setActiveTab(0);
                const el = document.getElementById('search-input-mock');
                el?.focus();
              }}
              className="w-10 h-10 rounded bg-[#0F172A] border border-white/8 flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </header>

          {/* Body Content by Tab */}
          <main className="flex-1 overflow-y-auto no-scrollbar relative">
            {/* Tab 0: Critiques Feed */}
            {activeTab === 0 && (
              <div className="p-3.5 space-y-3.5">
                {/* Search Bar (44px height, #0F172A, border #334155) */}
                <div className="h-11 px-3 bg-[#0F172A] border border-[#334155] rounded flex items-center gap-2 focus-within:border-[#6366F1] transition-colors">
                  <Search className="w-4 h-4 text-[#64748B] shrink-0" />
                  <input
                    id="search-input-mock"
                    type="text"
                    placeholder="Filter by stack, runtime or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#F8FAFC] placeholder-[#64748B] outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-[#64748B] hover:text-[#94A3B8]"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Category Horizontal Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`h-7 px-2.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors border ${
                          isSelected
                            ? 'bg-[#6366F1] text-white border-[#6366F1]'
                            : 'bg-[#0F172A] text-[#94A3B8] border-white/8 hover:border-[#334155]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Reviews List */}
                {filteredReviews.length === 0 ? (
                  <div className="py-16 text-center text-[#64748B]">
                    <SlidersHorizontal className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-xs font-semibold text-[#94A3B8]">No matching critiques found</p>
                    <p className="text-[11px] text-[#64748B] mt-1">Try broadening your search term</p>
                  </div>
                ) : (
                  filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      onClick={() => setSelectedReview(rev)}
                      className="bg-[#0F172A] border border-white/8 hover:border-[#6366F1]/50 rounded p-4 cursor-pointer transition-all duration-200 group active:scale-[0.99]"
                    >
                      {/* Top Row: Title, Version, Score */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#F8FAFC] group-hover:text-[#c0c1ff] transition-colors">
                              {rev.title}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-[#1E293B] border border-white/8 font-mono text-[10px] text-[#94A3B8]">
                              {rev.version}
                            </span>
                          </div>
                          <span className="text-[9px] font-bold tracking-wider text-[#6366F1] uppercase mt-0.5 inline-block">
                            {rev.category}
                          </span>
                        </div>

                        {/* Score Pill */}
                        <div className="px-2.5 py-1 rounded-full bg-[#1E293B] border border-[#10B981]/30 flex items-center gap-0.5 shrink-0">
                          <span className="font-mono text-xs font-bold text-[#F8FAFC] tabular-nums">
                            {rev.score.toFixed(1)}
                          </span>
                          <span className="text-[9px] text-[#64748B]">/10</span>
                        </div>
                      </div>

                      {/* Consensus Quote */}
                      <p className="mt-2 text-xs italic text-[#94A3B8] leading-relaxed">
                        “{rev.consensusVerdict}”
                      </p>

                      {/* Pros & Cons Fragments */}
                      <div className="mt-2.5 space-y-1 text-[11px]">
                        {rev.pros.slice(0, 2).map((pro, idx) => (
                          <div key={idx} className="text-[#10B981] truncate">
                            {pro}
                          </div>
                        ))}
                        {rev.cons.slice(0, 1).map((con, idx) => (
                          <div key={idx} className="text-[#F43F5E] truncate">
                            {con}
                          </div>
                        ))}
                      </div>

                      {/* Metric Micro-Cards Grid */}
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {rev.metrics.slice(0, 2).map((m, idx) => (
                          <div
                            key={idx}
                            className="bg-[#1E293B] border border-white/8 rounded p-2 flex flex-col"
                          >
                            <span className="text-[8px] font-semibold tracking-wider text-[#64748B] uppercase">
                              {m.label}
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="font-mono text-xs font-bold text-[#F8FAFC] tabular-nums">
                                {m.value}
                              </span>
                              <span className="text-[10px] text-[#94A3B8]">{m.unit}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Hairline Divider & Reviewer Credential */}
                      <div className="mt-3 pt-2.5 border-t border-white/8 flex items-center justify-between text-[10px] text-[#64748B]">
                        <div className="flex items-center gap-1.5 truncate">
                          <div className="w-4 h-4 rounded bg-[#1E293B] border border-white/8 flex items-center justify-center font-bold text-[9px] text-[#6366F1]">
                            {rev.reviewerName[0]}
                          </div>
                          <span className="truncate">
                            {rev.reviewerName} • {rev.reviewerCompany}
                          </span>
                        </div>
                        <span className="font-mono">{rev.releaseDate}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 1: Benchmarks */}
            {activeTab === 1 && (
              <div className="p-3.5 space-y-3.5">
                <div>
                  <span className="text-[10px] font-bold text-[#6366F1] tracking-wider uppercase">
                    Comparative Latency & Throughput
                  </span>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Verified telemetry readouts on dedicated bare-metal nodes.
                  </p>
                </div>

                {/* Matrix 1: OLAP */}
                <div className="bg-[#0F172A] border border-white/8 rounded p-3.5 space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[#F8FAFC]">
                      OLAP Query Engines
                    </span>
                    <span className="text-[9px] font-mono text-[#64748B]">p99 (Lower = Better)</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-[#F8FAFC]">DuckDB v1.1</span>
                        <span className="font-mono text-[#10B981] font-semibold">2.8 ms</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                        <div className="h-full bg-[#10B981] w-[18%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-[#F8FAFC]">ClickHouse Local</span>
                        <span className="font-mono text-[#6366F1] font-semibold">4.1 ms</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                        <div className="h-full bg-[#6366F1] w-[28%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-[#F8FAFC]">Postgres 17 Columnar</span>
                        <span className="font-mono text-[#F59E0B] font-semibold">14.2 ms</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                        <div className="h-full bg-[#F59E0B] w-[65%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-[#F8FAFC]">SQLite v3.45</span>
                        <span className="font-mono text-[#F43F5E] font-semibold">22.0 ms</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                        <div className="h-full bg-[#F43F5E] w-[95%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Matrix 2: Runtimes */}
                <div className="bg-[#0F172A] border border-white/8 rounded p-3.5 space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[#F8FAFC]">
                      HTTP Microservices
                    </span>
                    <span className="text-[9px] font-mono text-[#64748B]">req/s (Higher = Better)</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-[#F8FAFC]">Bun v1.1.28</span>
                        <span className="font-mono text-[#6366F1] font-semibold">142,500 req/s</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                        <div className="h-full bg-[#6366F1] w-[94%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-[#F8FAFC]">Deno v2.0</span>
                        <span className="font-mono text-[#8B5CF6] font-semibold">112,000 req/s</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                        <div className="h-full bg-[#8B5CF6] w-[75%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-[#F8FAFC]">Node.js 22.8</span>
                        <span className="font-mono text-[#94A3B8] font-semibold">98,000 req/s</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                        <div className="h-full bg-[#94A3B8] w-[64%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: AI Verdicts */}
            {activeTab === 2 && (
              <div className="p-3.5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#8B5CF6] tracking-wider uppercase">
                      Automated AI Syntheses
                    </span>
                    <p className="text-xs text-[#94A3B8]">Telemetry + RFC consensus</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[9px] font-bold text-[#8B5CF6]">
                    LIVE AUDIT
                  </span>
                </div>

                {mockReviewsData.map((rev) => (
                  <div key={rev.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[#F8FAFC]">
                        {rev.title}
                      </span>
                      <span className="font-mono text-[10px] text-[#64748B]">{rev.version}</span>
                    </div>

                    {/* AI Summary Card with 2px solid #8B5CF6 left border */}
                    <div className="bg-[#0F172A] border-y border-r border-white/8 border-l-2 border-l-[#8B5CF6] rounded-r p-3 space-y-2 bg-gradient-to-r from-[#8B5CF6]/5 to-transparent">
                      <div className="flex items-center justify-between">
                        {/* AI Verdict Badge */}
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/35 text-[#8B5CF6] text-[9px] font-semibold">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>AI CONSENSUS</span>
                        </div>
                        <span className="font-mono text-[9px] text-[#64748B]">AUTO-TELEMETRY</span>
                      </div>

                      <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#F8FAFC]">
                        {rev.consensusVerdict}
                      </p>
                      <p className="text-[11px] text-[#94A3B8] leading-relaxed">{rev.aiSummary}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Saved / Profile */}
            {activeTab === 3 && (
              <div className="p-3.5 space-y-3.5">
                {/* Profile Card */}
                <div className="bg-[#0F172A] border border-white/8 rounded p-3.5 flex items-center gap-3">
                  <div className="w-11 h-11 rounded bg-[#1E293B] border border-[#6366F1]/40 flex items-center justify-center text-[#6366F1]">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#F8FAFC]">
                        Nicolas Esparza
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#6366F1]" />
                    </div>
                    <p className="text-[11px] text-[#94A3B8]">Systems Architect & Eng Leader</p>
                    <p className="font-mono text-[9px] text-[#64748B]">ID: DC-9842 • 99.4% Signal</p>
                  </div>
                </div>

                {/* Saved Signals */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase">
                    Saved Signals ({bookmarkedIds.length})
                  </span>
                  {mockReviewsData
                    .filter((r) => bookmarkedIds.includes(r.id))
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedReview(item)}
                        className="bg-[#0F172A] border border-white/8 hover:border-[#6366F1]/40 rounded p-2.5 flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#F8FAFC]">
                            {item.title}
                          </p>
                          <span className="text-[10px] text-[#64748B]">
                            {item.version} • {item.category}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#F8FAFC] px-2 py-0.5 rounded bg-[#1E293B] border border-white/8">
                          {item.score.toFixed(1)}/10
                        </span>
                      </div>
                    ))}
                </div>

                {/* Telemetry Toggles */}
                <div className="bg-[#0F172A] border border-white/8 rounded divide-y divide-white/5">
                  <div className="p-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-medium text-[#F8FAFC]">AI Consensus Synthesis</p>
                      <p className="text-[10px] text-[#64748B]">Active (Gemini 2.5 Flash)</p>
                    </div>
                    <Check className="w-4 h-4 text-[#6366F1]" />
                  </div>
                  <div className="p-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-medium text-[#F8FAFC]">Tabular Precision Readouts</p>
                      <p className="text-[10px] text-[#64748B]">Sub-millisecond p99</p>
                    </div>
                    <Check className="w-4 h-4 text-[#6366F1]" />
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Modal / Sheet for Review Detail */}
          {selectedReview && (
            <div className="absolute inset-0 bg-[#090D16] z-50 flex flex-col overflow-y-auto no-scrollbar animate-in fade-in duration-200">
              {/* Detail Top Bar */}
              <div className="h-12 px-3 border-b border-white/8 flex items-center justify-between shrink-0 bg-[#090D16]/90 backdrop-blur">
                <button
                  onClick={() => setSelectedReview(null)}
                  className="w-8 h-8 rounded bg-[#0F172A] border border-white/8 flex items-center justify-center text-[#F8FAFC]"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs truncate max-w-[180px]">
                  {selectedReview.title}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => toggleBookmark(selectedReview.id, e)}
                    className="w-8 h-8 rounded bg-[#0F172A] border border-white/8 flex items-center justify-center text-[#94A3B8] hover:text-[#6366F1]"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        bookmarkedIds.includes(selectedReview.id)
                          ? 'fill-[#6366F1] text-[#6366F1]'
                          : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Detail Content */}
              <div className="p-4 space-y-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#F8FAFC]">
                      {selectedReview.title}
                    </h2>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      {selectedReview.category} • {selectedReview.version} • {selectedReview.releaseDate}
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#0F172A] border border-[#6366F1] font-mono text-sm font-bold text-[#c0c1ff]">
                    {selectedReview.score.toFixed(1)}
                    <span className="text-[10px] text-[#64748B]">/10</span>
                  </div>
                </div>

                {/* AI Summary Card */}
                <div className="bg-[#0F172A] border border-white/8 border-l-2 border-l-[#8B5CF6] rounded-r p-3.5 space-y-2">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/35 text-[#8B5CF6] text-[9px] font-semibold">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>AI CONSENSUS VERDICT</span>
                  </div>
                  <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#F8FAFC]">
                    {selectedReview.consensusVerdict}
                  </p>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                    {selectedReview.aiSummary}
                  </p>
                </div>

                {/* Telemetry Grid */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-[#64748B] tracking-wider uppercase">
                    Telemetry Readouts
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedReview.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-[#1E293B] border border-white/8 rounded p-2.5 flex flex-col"
                      >
                        <span className="text-[8px] font-semibold text-[#64748B] uppercase">
                          {m.label}
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-mono text-base font-bold text-[#F8FAFC] tabular-nums">
                            {m.value}
                          </span>
                          <span className="text-[11px] text-[#94A3B8]">{m.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trade-offs */}
                <div className="bg-[#0F172A] border border-white/8 rounded p-3.5 space-y-2.5">
                  <span className="text-[9px] font-bold text-[#64748B] tracking-wider uppercase">
                    Architectural Trade-offs
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {selectedReview.pros.map((p, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[#dfe2ef]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{p.replace('+ ', '')}</span>
                      </div>
                    ))}
                    {selectedReview.cons.map((c, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[#94A3B8]">
                        <XCircle className="w-3.5 h-3.5 text-[#F43F5E] shrink-0 mt-0.5" />
                        <span>{c.replace('- ', '')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Author Card */}
                <div className="bg-[#1E293B] border border-white/8 rounded p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center font-bold text-xs text-[#6366F1]">
                      {selectedReview.reviewerName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-[#F8FAFC]">
                        {selectedReview.reviewerName}
                      </p>
                      <p className="text-[10px] text-[#94A3B8]">
                        {selectedReview.reviewerRole} • {selectedReview.reviewerCompany}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#10B981]/15 border border-[#10B981]/30 text-[9px] font-bold text-[#10B981]">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation Bar (64px fixed height + indicator bar) */}
          <nav className="h-16 px-2 border-t border-white/8 bg-[#090D16]/95 backdrop-blur shrink-0 flex items-center justify-around z-30">
            {[
              { id: 0, label: 'CRITIQUES', icon: Layers },
              { id: 1, label: 'BENCHMARKS', icon: BarChart3 },
              { id: 2, label: 'AI VERDICTS', icon: Sparkles },
              { id: 3, label: 'SAVED', icon: Bookmark },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedReview(null);
                    setActiveTab(tab.id);
                  }}
                  className="flex-1 h-full flex flex-col items-center justify-center relative group"
                >
                  {/* Top 2px indicator bar */}
                  {isSelected && (
                    <span className="absolute top-0 left-3 right-3 h-[2px] bg-[#6366F1] shadow-[0_0_8px_#6366F1]"></span>
                  )}
                  <IconComp
                    className={`w-4 h-4 transition-colors ${
                      isSelected ? 'text-[#6366F1]' : 'text-[#64748B] group-hover:text-[#94A3B8]'
                    }`}
                  />
                  <span
                    className={`text-[9px] font-semibold mt-1 tracking-wider ${
                      isSelected ? 'text-[#F8FAFC]' : 'text-[#64748B]'
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
