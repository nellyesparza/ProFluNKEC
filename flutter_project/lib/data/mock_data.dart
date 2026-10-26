import '../models/review_item.dart';

final List<String> appCategories = [
  'All Signals',
  'Databases',
  'Runtimes',
  'Infra & Cloud',
  'AI / LLM',
  'Web Frameworks',
];

final List<ReviewItem> mockReviews = [
  const ReviewItem(
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
      MetricData(label: 'p99 Latency', value: '2.8', unit: 'ms'),
      MetricData(label: 'Throughput', value: '480k', unit: 'rows/s'),
      MetricData(label: 'Cold Start', value: '18', unit: 'ms'),
      MetricData(label: 'Memory Base', value: '24', unit: 'MB'),
    ],
  ),
  const ReviewItem(
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
      MetricData(label: 'Req / sec', value: '142k', unit: 'req/s'),
      MetricData(label: 'Install Time', value: '1.4', unit: 'sec'),
      MetricData(label: 'p95 Handshake', value: '1.2', unit: 'ms'),
      MetricData(label: 'Heap Alloc', value: '38', unit: 'MB'),
    ],
  ),
  const ReviewItem(
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
      MetricData(label: 'p99 Query', value: '4.6', unit: 'ms'),
      MetricData(label: 'HNSW recall', value: '98.7', unit: '%'),
      MetricData(label: 'TPS peak', value: '8.4k', unit: 'tps'),
      MetricData(label: 'Conn Limit', value: '10k', unit: 'pooled'),
    ],
  ),
  const ReviewItem(
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
      MetricData(label: 'TTFT p50', value: '28', unit: 'ms'),
      MetricData(label: 'Token Rate', value: '184', unit: 'tok/s'),
      MetricData(label: 'VRAM Usage', value: '92', unit: '%'),
      MetricData(label: 'Batch Depth', value: '128', unit: 'streams'),
    ],
  ),
  const ReviewItem(
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
      MetricData(label: 'Build Time', value: '38', unit: 'ms'),
      MetricData(label: 'Bundle Size', value: '8.2', unit: 'KB'),
      MetricData(label: 'HMR Delta', value: '6', unit: 'ms'),
      MetricData(label: 'Memory', value: '16', unit: 'MB'),
    ],
  ),
];
