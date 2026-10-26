import os
import json
import zipfile

BASE_DIR = "flutter_project"

files = {}

# 1. pubspec.yaml
files["pubspec.yaml"] = """name: devcritique_minimal
description: "DevCritique Minimal - Ultra-minimalist, high-signal developer critique mobile app built with Flutter."
publish_to: "none"
version: 1.0.0+1

environment:
  sdk: ">=3.2.0 <4.0.0"
  flutter: ">=3.16.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  google_fonts: ^6.2.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
"""

# 2. analysis_options.yaml
files["analysis_options.yaml"] = """include: package:flutter_lints/flutter.yaml

linter:
  rules:
    prefer_const_constructors: true
    prefer_const_declarations: true
    avoid_print: true
"""

# 3. README.md
files["README.md"] = """# DevCritique Minimal (Flutter App)

An ultra-minimalist, editorial-tech mobile application for software engineers, product architects, and engineering leaders seeking high-signal technical appraisals without marketing fluff.

## Design Highlights
- **Obsidian Dark Mode Base**: `#090D16` and `#0F172A`
- **Electric Indigo & Violet Accents**: `#6366F1` and `#8B5CF6`
- **Strict Hairline Boundaries**: 1px subtle outlines (`rgba(255, 255, 255, 0.08)`)
- **Tabular Figures & Metrics**: Micro-cards for p99 latency, throughput, memory footprints
- **AI Synthesis Badges**: Inset AI verdicts with spark icon and violet left border accent
- **Frosted Top & Bottom Navigation**: 56px Top App Bar and 64px Bottom Navigation Bar

## Getting Started

1. Ensure you have Flutter 3.16+ installed:
   ```bash
   flutter doctor
   ```

2. Install dependencies:
   ```bash
   flutter pub get
   ```

3. Run the app:
   ```bash
   flutter run
   ```

## Project Structure
- `lib/theme/`: Theme tokens, exact color definitions, and Google Fonts typography.
- `lib/models/`: Strongly-typed data models for reviews, telemetry benchmarks, and AI verdicts.
- `lib/data/`: Curated benchmark and critique datasets (Databases, Runtimes, Infra, AI/LLM, Frameworks).
- `lib/widgets/`: Modular UI widgets (SoftwareReviewCard, MetricMicroCard, AiVerdictBadge, AiSummaryCard, TopAppBar, BottomNavBar).
- `lib/screens/`: Critiques feed, Benchmark comparisons, AI Verdicts, Profile/Saved, and Review Detail Sheet.
"""

# 4. lib/theme/app_colors.dart
files["lib/theme/app_colors.dart"] = """import 'package:flutter/material.dart';

class AppColors {
  // Canvas & Surfaces
  static const Color canvasBase = Color(0xFF090D16);
  static const Color surfaceElevation1 = Color(0xFF0F172A);
  static const Color surfaceElevation2 = Color(0xFF1E293B);
  static const Color surfaceElevation3 = Color(0xFF334155);
  static const Color borderDefault = Color(0xFF334155);
  static const Color borderHairline = Color(0x14FFFFFF); // rgba(255, 255, 255, 0.08)

  // Typography
  static const Color textPrimary = Color(0xFFF8FAFC);
  static const Color textSecondary = Color(0xFF94A3B8);
  static const Color textTertiary = Color(0xFF64748B);

  // Accents
  static const Color accentPrimary = Color(0xFF6366F1); // Electric Indigo
  static const Color accentSecondary = Color(0xFF8B5CF6); // Electric Violet
  static const Color accentVioletBg = Color(0x1F8B5CF6); // rgba(139, 92, 246, 0.12)
  static const Color accentVioletBorder = Color(0x598B5CF6); // rgba(139, 92, 246, 0.35)

  // Functional Semantics
  static const Color semanticError = Color(0xFFF43F5E);
  static const Color semanticSuccess = Color(0xFF10B981);
  static const Color semanticWarning = Color(0xFFF59E0B);
}
"""

# 5. lib/theme/app_theme.dart
files["lib/theme/app_theme.dart"] = """import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

class AppTheme {
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.canvasBase,
      primaryColor: AppColors.accentPrimary,
      colorScheme: const ColorScheme.dark(
        surface: AppColors.surfaceElevation1,
        primary: AppColors.accentPrimary,
        secondary: AppColors.accentSecondary,
        error: AppColors.semanticError,
        onSurface: AppColors.textPrimary,
        onPrimary: Colors.white,
      ),
      dividerColor: AppColors.borderDefault,
      textTheme: TextTheme(
        displayLarge: GoogleFonts.plusJakartaSans(
          fontSize: 36,
          fontWeight: FontWeight.w700,
          color: AppColors.textPrimary,
          height: 1.22,
        ),
        headlineLarge: GoogleFonts.plusJakartaSans(
          fontSize: 24,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
          height: 1.25,
        ),
        headlineMedium: GoogleFonts.plusJakartaSans(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
          height: 1.3,
        ),
        headlineSmall: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
          height: 1.37,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: 16,
          fontWeight: FontWeight.w400,
          color: AppColors.textPrimary,
          height: 1.5,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: AppColors.textSecondary,
          height: 1.42,
        ),
        bodySmall: GoogleFonts.inter(
          fontSize: 12,
          fontWeight: FontWeight.w400,
          color: AppColors.textTertiary,
          height: 1.33,
        ),
        labelLarge: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
        ),
        labelMedium: GoogleFonts.inter(
          fontSize: 12,
          fontWeight: FontWeight.w500,
          color: AppColors.textSecondary,
        ),
        labelSmall: GoogleFonts.inter(
          fontSize: 10,
          fontWeight: FontWeight.w600,
          color: AppColors.textTertiary,
        ),
      ),
      cardTheme: CardTheme(
        color: AppColors.surfaceElevation1,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
          side: const BorderSide(color: AppColors.borderHairline, width: 1),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.accentPrimary,
          foregroundColor: Colors.white,
          elevation: 0,
          minimumSize: const Size(double.infinity, 44),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
          textStyle: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w600),
        ),
      ),
    );
  }
}
"""

# 6. lib/models/review_item.dart
files["lib/models/review_item.dart"] = """class MetricData {
  final String label;
  final String value;
  final String unit;
  final bool isPositive;

  const MetricData({
    required this.label,
    required this.value,
    this.unit = '',
    this.isPositive = true,
  });
}

class ReviewItem {
  final String id;
  final String title;
  final String version;
  final String category;
  final double score; // e.g. 9.4
  final String consensusVerdict;
  final String aiSummary;
  final List<String> pros;
  final List<String> cons;
  final String reviewerName;
  final String reviewerRole;
  final String reviewerCompany;
  final List<MetricData> metrics;
  final String releaseDate;
  final bool isBookmarked;

  const ReviewItem({
    required this.id,
    required this.title,
    required this.version,
    required this.category,
    required this.score,
    required this.consensusVerdict,
    required this.aiSummary,
    required this.pros,
    required this.cons,
    required this.reviewerName,
    required this.reviewerRole,
    required this.reviewerCompany,
    required this.metrics,
    required this.releaseDate,
    this.isBookmarked = false,
  });
}
"""

# 7. lib/data/mock_data.dart
files["lib/data/mock_data.dart"] = """import '../models/review_item.dart';

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
"""

# 8. lib/widgets/ai_verdict_badge.dart
files["lib/widgets/ai_verdict_badge.dart"] = """import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';

class AiVerdictBadge extends StatelessWidget {
  final String label;

  const AiVerdictBadge({
    super.key,
    this.label = 'AI CONSENSUS VERDICT',
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: AppColors.accentVioletBg,
        borderRadius: BorderRadius.circular(9999),
        border: Border.all(color: AppColors.accentVioletBorder, width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(
            Icons.auto_awesome,
            size: 11,
            color: AppColors.accentSecondary,
          ),
          const SizedBox(width: 4),
          Text(
            label,
            style: GoogleFonts.inter(
              fontSize: 10,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.5,
              color: AppColors.accentSecondary,
            ),
          ),
        ],
      ),
    );
  }
}
"""

# 9. lib/widgets/ai_summary_card.dart
files["lib/widgets/ai_summary_card.dart"] = """import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';
import 'ai_verdict_badge.dart';

class AiSummaryCard extends StatelessWidget {
  final String text;
  final String? verdict;

  const AiSummaryCard({
    super.key,
    required this.text,
    this.verdict,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: AppColors.surfaceElevation1,
        borderRadius: BorderRadius.only(
          topRight: Radius.circular(4),
          bottomRight: Radius.circular(4),
        ),
        border: Border(
          left: BorderSide(color: AppColors.accentSecondary, width: 2),
          top: BorderSide(color: AppColors.borderHairline, width: 1),
          right: BorderSide(color: AppColors.borderHairline, width: 1),
          bottom: BorderSide(color: AppColors.borderHairline, width: 1),
        ),
      ),
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const AiVerdictBadge(),
              Text(
                'AUTO-TELEMETRY',
                style: GoogleFonts.inter(
                  fontSize: 10,
                  fontWeight: FontWeight.w500,
                  color: AppColors.textTertiary,
                ),
              ),
            ],
          ),
          if (verdict != null) ...[
            const SizedBox(height: 8),
            Text(
              verdict!,
              style: GoogleFonts.plusJakartaSans(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary,
                height: 1.35,
              ),
            ),
          ],
          const SizedBox(height: 6),
          Text(
            text,
            style: GoogleFonts.inter(
              fontSize: 12,
              fontWeight: FontWeight.w400,
              color: AppColors.textSecondary,
              height: 1.45,
            ),
          ),
        ],
      ),
    );
  }
}
"""

# 10. lib/widgets/metric_micro_card.dart
files["lib/widgets/metric_micro_card.dart"] = """import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';
import '../models/review_item.dart';

class MetricMicroCard extends StatelessWidget {
  final MetricData metric;

  const MetricMicroCard({
    super.key,
    required this.metric,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevation2,
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: AppColors.borderHairline, width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            metric.label.toUpperCase(),
            style: GoogleFonts.inter(
              fontSize: 9,
              fontWeight: FontWeight.w500,
              letterSpacing: 0.4,
              color: AppColors.textTertiary,
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 3),
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                metric.value,
                style: GoogleFonts.jetBrainsMono(
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
              if (metric.unit.isNotEmpty) ...[
                const SizedBox(width: 3),
                Text(
                  metric.unit,
                  style: GoogleFonts.inter(
                    fontSize: 10,
                    fontWeight: FontWeight.w500,
                    color: AppColors.textSecondary,
                  ),
                ),
              ],
            ],
          ),
        ],
      ),
    );
  }
}
"""

# 11. lib/widgets/software_review_card.dart
files["lib/widgets/software_review_card.dart"] = """import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';
import '../models/review_item.dart';
import 'metric_micro_card.dart';

class SoftwareReviewCard extends StatelessWidget {
  final ReviewItem review;
  final VoidCallback? onTap;

  const SoftwareReviewCard({
    super.key,
    required this.review,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevation1,
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: AppColors.borderHairline, width: 1),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(4),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header: Title, Version, Consensus Score Pill
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Flexible(
                              child: Text(
                                review.title,
                                style: GoogleFonts.plusJakartaSans(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w600,
                                  color: AppColors.textPrimary,
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(
                                color: AppColors.surfaceElevation2,
                                borderRadius: BorderRadius.circular(4),
                                border: Border.all(color: AppColors.borderHairline, width: 1),
                              ),
                              child: Text(
                                review.version,
                                style: GoogleFonts.jetBrainsMono(
                                  fontSize: 11,
                                  fontWeight: FontWeight.w500,
                                  color: AppColors.textSecondary,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          review.category.toUpperCase(),
                          style: GoogleFonts.inter(
                            fontSize: 10,
                            fontWeight: FontWeight.w600,
                            letterSpacing: 0.6,
                            color: AppColors.accentPrimary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  // Consensus Score Pill
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceElevation2,
                      borderRadius: BorderRadius.circular(9999),
                      border: Border.all(
                        color: review.score >= 9.0
                            ? AppColors.semanticSuccess.withOpacity(0.4)
                            : AppColors.accentPrimary.withOpacity(0.4),
                        width: 1,
                      ),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          review.score.toStringAsFixed(1),
                          style: GoogleFonts.jetBrainsMono(
                            fontSize: 13,
                            fontWeight: FontWeight.w700,
                            color: AppColors.textPrimary,
                            fontFeatures: const [FontFeature.tabularFigures()],
                          ),
                        ),
                        Text(
                          '/10',
                          style: GoogleFonts.inter(
                            fontSize: 10,
                            fontWeight: FontWeight.w500,
                            color: AppColors.textTertiary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 12),
              // Consensus quote
              Text(
                '“${review.consensusVerdict}”',
                style: GoogleFonts.inter(
                  fontSize: 13,
                  fontWeight: FontWeight.w400,
                  fontStyle: FontStyle.italic,
                  color: AppColors.textSecondary,
                  height: 1.4,
                ),
              ),

              const SizedBox(height: 12),
              // Pros / Cons Fragments
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ...review.pros.take(2).map(
                        (pro) => Padding(
                          padding: const EdgeInsets.only(bottom: 3),
                          child: Text(
                            pro,
                            style: GoogleFonts.inter(
                              fontSize: 12,
                              color: AppColors.semanticSuccess,
                              fontWeight: FontWeight.w400,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ),
                  ...review.cons.take(1).map(
                        (con) => Padding(
                          padding: const EdgeInsets.only(bottom: 3),
                          child: Text(
                            con,
                            style: GoogleFonts.inter(
                              fontSize: 12,
                              color: AppColors.semanticError,
                              fontWeight: FontWeight.w400,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ),
                ],
              ),

              const SizedBox(height: 12),
              // Metrics Micro-Cards Grid
              if (review.metrics.isNotEmpty)
                Row(
                  children: [
                    Expanded(child: MetricMicroCard(metric: review.metrics[0])),
                    const SizedBox(width: 8),
                    Expanded(child: MetricMicroCard(metric: review.metrics[1])),
                  ],
                ),

              const SizedBox(height: 14),
              // Hairline divider
              const Divider(color: AppColors.borderHairline, height: 1),
              const SizedBox(height: 10),

              // Reviewer Credential Tag & Release
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 18,
                        height: 18,
                        decoration: BoxDecoration(
                          color: AppColors.surfaceElevation2,
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(color: AppColors.borderHairline, width: 1),
                        ),
                        child: Center(
                          child: Text(
                            review.reviewerName.substring(0, 1),
                            style: GoogleFonts.inter(
                              fontSize: 10,
                              fontWeight: FontWeight.w700,
                              color: AppColors.accentPrimary,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        '${review.reviewerName} • ${review.reviewerRole} @ ${review.reviewerCompany}',
                        style: GoogleFonts.inter(
                          fontSize: 11,
                          fontWeight: FontWeight.w500,
                          color: AppColors.textTertiary,
                        ),
                      ),
                    ],
                  ),
                  Text(
                    review.releaseDate,
                    style: GoogleFonts.inter(
                      fontSize: 10,
                      color: AppColors.textTertiary,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
"""

# 12. lib/widgets/top_app_bar.dart
files["lib/widgets/top_app_bar.dart"] = """import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';

class DevCritiqueTopBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final VoidCallback? onFilterTap;
  final VoidCallback? onSearchTap;

  const DevCritiqueTopBar({
    super.key,
    this.title = 'DEVCRITIQUE',
    this.onFilterTap,
    this.onSearchTap,
  });

  @override
  Size get preferredSize => const Size.fromHeight(56);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56 + MediaQuery.of(context).padding.top,
      padding: EdgeInsets.only(
        top: MediaQuery.of(context).padding.top,
        left: 12,
        right: 12,
      ),
      decoration: const BoxDecoration(
        color: Color(0xD9090D16), // 85% opacity
        border: Border(
          bottom: BorderSide(color: AppColors.borderHairline, width: 1),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Left Action Button (40x40)
          InkWell(
            onTap: onFilterTap,
            borderRadius: BorderRadius.circular(4),
            child: Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: AppColors.surfaceElevation1,
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: AppColors.borderHairline, width: 1),
              ),
              child: const Center(
                child: Icon(Icons.tune_rounded, size: 18, color: AppColors.textSecondary),
              ),
            ),
          ),

          // Centered Brand Title
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 7,
                height: 7,
                margin: const EdgeInsets.only(right: 6),
                decoration: const BoxDecoration(
                  color: AppColors.accentPrimary,
                  shape: BoxShape.circle,
                ),
              ),
              Text(
                title,
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 1.2,
                  color: AppColors.textPrimary,
                ),
              ),
            ],
          ),

          // Right Action Button (40x40)
          InkWell(
            onTap: onSearchTap,
            borderRadius: BorderRadius.circular(4),
            child: Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: AppColors.surfaceElevation1,
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: AppColors.borderHairline, width: 1),
              ),
              child: const Center(
                child: Icon(Icons.search_rounded, size: 19, color: AppColors.textSecondary),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
"""

# 13. lib/widgets/bottom_nav_bar.dart
files["lib/widgets/bottom_nav_bar.dart"] = """import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';

class DevCritiqueBottomBar extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTabSelected;

  const DevCritiqueBottomBar({
    super.key,
    required this.currentIndex,
    required this.onTabSelected,
  });

  @override
  Widget build(BuildContext context) {
    final bottomPadding = MediaQuery.of(context).padding.bottom;

    final tabs = [
      {'label': 'CRITIQUES', 'icon': Icons.article_outlined, 'activeIcon': Icons.article_rounded},
      {'label': 'BENCHMARKS', 'icon': Icons.insights_outlined, 'activeIcon': Icons.insights_rounded},
      {'label': 'AI VERDICTS', 'icon': Icons.auto_awesome_outlined, 'activeIcon': Icons.auto_awesome_rounded},
      {'label': 'SAVED', 'icon': Icons.bookmark_border_rounded, 'activeIcon': Icons.bookmark_rounded},
    ];

    return Container(
      height: 64 + bottomPadding,
      padding: EdgeInsets.only(bottom: bottomPadding),
      decoration: const BoxDecoration(
        color: Color(0xF2090D16), // 95% opacity frosted
        border: Border(
          top: BorderSide(color: AppColors.borderHairline, width: 1),
        ),
      ),
      child: Row(
        children: List.generate(tabs.length, (index) {
          final isSelected = currentIndex == index;
          final tab = tabs[index];

          return Expanded(
            child: InkWell(
              onTap: () => onTabSelected(index),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  // Top 2px active indicator bar
                  if (isSelected)
                    Positioned(
                      top: 0,
                      left: 16,
                      right: 16,
                      child: Container(
                        height: 2,
                        decoration: BoxDecoration(
                          color: AppColors.accentPrimary,
                          borderRadius: BorderRadius.circular(1),
                          boxShadow: const [
                            BoxShadow(
                              color: Color(0x666366F1),
                              blurRadius: 4,
                              spreadRadius: 1,
                            ),
                          ],
                        ),
                      ),
                    ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        (isSelected ? tab['activeIcon'] : tab['icon']) as IconData,
                        size: 20,
                        color: isSelected ? AppColors.accentPrimary : AppColors.textTertiary,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        tab['label'] as String,
                        style: GoogleFonts.inter(
                          fontSize: 10,
                          fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                          letterSpacing: 0.4,
                          color: isSelected ? AppColors.textPrimary : AppColors.textTertiary,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        }),
      ),
    );
  }
}
"""

# 14. lib/screens/review_detail_screen.dart
files["lib/screens/review_detail_screen.dart"] = """import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';
import '../models/review_item.dart';
import '../widgets/ai_summary_card.dart';
import '../widgets/metric_micro_card.dart';

class ReviewDetailScreen extends StatelessWidget {
  final ReviewItem review;

  const ReviewDetailScreen({super.key, required this.review});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.canvasBase,
      appBar: AppBar(
        backgroundColor: AppColors.canvasBase,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 18, color: AppColors.textPrimary),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          review.title,
          style: GoogleFonts.plusJakartaSans(fontSize: 16, fontWeight: FontWeight.w600),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.bookmark_border_rounded, size: 20, color: AppColors.textSecondary),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.share_outlined, size: 19, color: AppColors.textSecondary),
            onPressed: () {},
          ),
        ],
        bottom: const PreferredSize(
          preferredSize: Size.fromHeight(1),
          child: Divider(color: AppColors.borderHairline, height: 1),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Title & Meta
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      review.title,
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 22,
                        fontWeight: FontWeight.w700,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${review.category} • Version ${review.version} • ${review.releaseDate}',
                      style: GoogleFonts.inter(
                        fontSize: 12,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceElevation1,
                    borderRadius: BorderRadius.circular(9999),
                    border: Border.all(color: AppColors.accentPrimary.withOpacity(0.5), width: 1),
                  ),
                  child: Row(
                    children: [
                      Text(
                        review.score.toStringAsFixed(1),
                        style: GoogleFonts.jetBrainsMono(
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                          color: AppColors.accentPrimary,
                        ),
                      ),
                      Text(
                        '/10',
                        style: GoogleFonts.inter(fontSize: 11, color: AppColors.textTertiary),
                      ),
                    ],
                  ),
                ),
              ],
            ),

            const SizedBox(height: 20),
            // AI Summary Block
            AiSummaryCard(
              verdict: review.consensusVerdict,
              text: review.aiSummary,
            ),

            const SizedBox(height: 24),
            // Benchmark Telemetry Grid
            Text(
              'TELEMETRY READOUTS',
              style: GoogleFonts.inter(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                letterSpacing: 0.8,
                color: AppColors.textTertiary,
              ),
            ),
            const SizedBox(height: 8),
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              crossAxisSpacing: 8,
              mainAxisSpacing: 8,
              childAspectRatio: 2.2,
              children: review.metrics.map((m) => MetricMicroCard(metric: m)).toList(),
            ),

            const SizedBox(height: 24),
            // Pros & Cons Detailed Section
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.surfaceElevation1,
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: AppColors.borderHairline, width: 1),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'ARCHITECTURAL TRADE-OFFS',
                    style: GoogleFonts.inter(
                      fontSize: 11,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 0.8,
                      color: AppColors.textTertiary,
                    ),
                  ),
                  const SizedBox(height: 12),
                  ...review.pros.map(
                    (p) => Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Icon(Icons.check_circle_outline, size: 16, color: AppColors.semanticSuccess),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              p.replaceFirst('+ ', ''),
                              style: GoogleFonts.inter(
                                fontSize: 13,
                                color: AppColors.textPrimary,
                                height: 1.35,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 6),
                  ...review.cons.map(
                    (c) => Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Icon(Icons.remove_circle_outline, size: 16, color: AppColors.semanticError),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              c.replaceFirst('- ', ''),
                              style: GoogleFonts.inter(
                                fontSize: 13,
                                color: AppColors.textSecondary,
                                height: 1.35,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),
            // Reviewer Section
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppColors.surfaceElevation2,
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: AppColors.borderHairline, width: 1),
              ),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 20,
                    backgroundColor: AppColors.surfaceElevation1,
                    child: Text(
                      review.reviewerName[0],
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: AppColors.accentPrimary,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          review.reviewerName,
                          style: GoogleFonts.inter(
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                            color: AppColors.textPrimary,
                          ),
                        ),
                        Text(
                          '${review.reviewerRole} • ${review.reviewerCompany}',
                          style: GoogleFonts.inter(
                            fontSize: 11,
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: AppColors.semanticSuccess.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(9999),
                      border: Border.all(color: AppColors.semanticSuccess.withOpacity(0.3), width: 1),
                    ),
                    child: Text(
                      'VERIFIED',
                      style: GoogleFonts.inter(
                        fontSize: 9,
                        fontWeight: FontWeight.w600,
                        color: AppColors.semanticSuccess,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}
"""

# 15. lib/screens/critiques_screen.dart
files["lib/screens/critiques_screen.dart"] = """import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';
import '../models/review_item.dart';
import '../data/mock_data.dart';
import '../widgets/software_review_card.dart';
import 'review_detail_screen.dart';

class CritiquesScreen extends StatefulWidget {
  const CritiquesScreen({super.key});

  @override
  State<CritiquesScreen> createState() => _CritiquesScreenState();
}

class _CritiquesScreenState extends State<CritiquesScreen> {
  String _selectedCategory = 'All Signals';
  String _searchQuery = '';
  final TextEditingController _searchController = TextEditingController();

  List<ReviewItem> get _filteredReviews {
    return mockReviews.where((item) {
      final matchesCategory = _selectedCategory == 'All Signals' || item.category == _selectedCategory;
      final matchesQuery = _searchQuery.isEmpty ||
          item.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          item.consensusVerdict.toLowerCase().contains(_searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Search & Filter header
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          color: AppColors.canvasBase,
          child: Column(
            children: [
              // Search Input Field (44px height)
              Container(
                height: 44,
                decoration: BoxDecoration(
                  color: AppColors.surfaceElevation1,
                  borderRadius: BorderRadius.circular(4),
                  border: Border.all(color: AppColors.borderDefault, width: 1),
                ),
                child: TextField(
                  controller: _searchController,
                  style: GoogleFonts.inter(fontSize: 13, color: AppColors.textPrimary),
                  onChanged: (val) => setState(() => _searchQuery = val),
                  decoration: InputDecoration(
                    hintText: 'Filter by stack, runtime or author...',
                    hintStyle: GoogleFonts.inter(fontSize: 13, color: AppColors.textTertiary),
                    prefixIcon: const Icon(Icons.search, size: 18, color: AppColors.textTertiary),
                    border: InputBorder.none,
                    contentPadding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                ),
              ),
              const SizedBox(height: 10),
              // Category filter pills
              SizedBox(
                height: 32,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: appCategories.length,
                  separatorBuilder: (_, __) => const SizedBox(width: 8),
                  itemBuilder: (context, index) {
                    final cat = appCategories[index];
                    final isSelected = cat == _selectedCategory;
                    return InkWell(
                      onTap: () => setState(() => _selectedCategory = cat),
                      borderRadius: BorderRadius.circular(4),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12),
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          color: isSelected ? AppColors.accentPrimary : AppColors.surfaceElevation1,
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(
                            color: isSelected ? AppColors.accentPrimary : AppColors.borderHairline,
                            width: 1,
                          ),
                        ),
                        child: Text(
                          cat,
                          style: GoogleFonts.inter(
                            fontSize: 12,
                            fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                            color: isSelected ? Colors.white : AppColors.textSecondary,
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),

        const Divider(color: AppColors.borderHairline, height: 1),

        // List of software review cards
        Expanded(
          child: _filteredReviews.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.filter_list_off_rounded, size: 36, color: AppColors.textTertiary),
                      const SizedBox(height: 12),
                      Text(
                        'No matching critiques found',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                          color: AppColors.textSecondary,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Try broadening your filter criteria.',
                        style: GoogleFonts.inter(fontSize: 12, color: AppColors.textTertiary),
                      ),
                    ],
                  ),
                )
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: _filteredReviews.length,
                  itemBuilder: (context, index) {
                    final review = _filteredReviews[index];
                    return SoftwareReviewCard(
                      review: review,
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => ReviewDetailScreen(review: review),
                          ),
                        );
                      },
                    );
                  },
                ),
        ),
      ],
    );
  }
}
"""

# 16. lib/screens/benchmarks_screen.dart
files["lib/screens/benchmarks_screen.dart"] = """import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';
import '../data/mock_data.dart';

class BenchmarksScreen extends StatelessWidget {
  const BenchmarksScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Headline
        Text(
          'LATENCY & THROUGHPUT BENCHMARKS',
          style: GoogleFonts.inter(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.8,
            color: AppColors.accentPrimary,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          'Comparative telemetry matrices across verified production clusters.',
          style: GoogleFonts.inter(fontSize: 13, color: AppColors.textSecondary),
        ),
        const SizedBox(height: 16),

        // Comparative Table Card
        Container(
          decoration: BoxDecoration(
            color: AppColors.surfaceElevation1,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: AppColors.borderHairline, width: 1),
          ),
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'OLAP / Query Engines',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  Text(
                    'p99 LATENCY (LOWER IS BETTER)',
                    style: GoogleFonts.inter(
                      fontSize: 9,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textTertiary,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),
              _buildMetricBar('DuckDB v1.1', '2.8 ms', 0.95, AppColors.semanticSuccess),
              const SizedBox(height: 10),
              _buildMetricBar('ClickHouse Local', '4.1 ms', 0.82, AppColors.accentPrimary),
              const SizedBox(height: 10),
              _buildMetricBar('PostgreSQL 17 Columnar', '14.2 ms', 0.40, AppColors.semanticWarning),
              const SizedBox(height: 10),
              _buildMetricBar('SQLite v3.45', '22.0 ms', 0.22, AppColors.semanticError),
            ],
          ),
        ),

        const SizedBox(height: 16),

        // Runtime HTTP throughput
        Container(
          decoration: BoxDecoration(
            color: AppColors.surfaceElevation1,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: AppColors.borderHairline, width: 1),
          ),
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'JavaScript/TypeScript Runtimes',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  Text(
                    'REQ / SEC (HIGHER IS BETTER)',
                    style: GoogleFonts.inter(
                      fontSize: 9,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textTertiary,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),
              _buildMetricBar('Bun v1.1.28', '142,500 req/s', 0.92, AppColors.accentPrimary),
              const SizedBox(height: 10),
              _buildMetricBar('Node.js 22.8 (with uWebSockets)', '98,000 req/s', 0.65, AppColors.textSecondary),
              const SizedBox(height: 10),
              _buildMetricBar('Deno v2.0', '112,000 req/s', 0.74, AppColors.accentSecondary),
            ],
          ),
        ),

        const SizedBox(height: 16),

        // LLM Inference Token Rate
        Container(
          decoration: BoxDecoration(
            color: AppColors.surfaceElevation1,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: AppColors.borderHairline, width: 1),
          ),
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'LLM Serving Architectures',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  Text(
                    'STREAMING TOKENS / SEC',
                    style: GoogleFonts.inter(
                      fontSize: 9,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textTertiary,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),
              _buildMetricBar('vLLM (PagedAttention)', '184 tok/s', 0.94, AppColors.accentSecondary),
              const SizedBox(height: 10),
              _buildMetricBar('TGI (HuggingFace)', '132 tok/s', 0.68, AppColors.textSecondary),
              const SizedBox(height: 10),
              _buildMetricBar('Ollama Standard', '76 tok/s', 0.42, AppColors.semanticWarning),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildMetricBar(String label, String value, double ratio, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w500, color: AppColors.textPrimary),
            ),
            Text(
              value,
              style: GoogleFonts.jetBrainsMono(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: color,
                fontFeatures: const [FontFeature.tabularFigures()],
              ),
            ),
          ],
        ),
        const SizedBox(height: 5),
        ClipRRect(
          borderRadius: BorderRadius.circular(2),
          child: LinearProgressIndicator(
            value: ratio,
            minHeight: 5,
            backgroundColor: AppColors.surfaceElevation2,
            valueColor: AlwaysStoppedAnimation<Color>(color),
          ),
        ),
      ],
    );
  }
}
"""

# 17. lib/screens/ai_verdicts_screen.dart
files["lib/screens/ai_verdicts_screen.dart"] = """import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';
import '../data/mock_data.dart';
import '../widgets/ai_summary_card.dart';

class AiVerdictsScreen extends StatelessWidget {
  const AiVerdictsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Header
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'SYNTHESIZED AI VERDICTS',
                  style: GoogleFonts.inter(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.8,
                    color: AppColors.accentSecondary,
                  ),
                ),
                const SizedBox(height: 3),
                Text(
                  'Automated telemetry aggregation & code audits',
                  style: GoogleFonts.inter(fontSize: 12, color: AppColors.textSecondary),
                ),
              ],
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: AppColors.accentVioletBg,
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: AppColors.accentVioletBorder, width: 1),
              ),
              child: Text(
                'LIVE TELEMETRY',
                style: GoogleFonts.inter(
                  fontSize: 9,
                  fontWeight: FontWeight.w700,
                  color: AppColors.accentSecondary,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),

        ...mockReviews.map(
          (rev) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      rev.title,
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      rev.version,
                      style: GoogleFonts.jetBrainsMono(
                        fontSize: 11,
                        color: AppColors.textTertiary,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                AiSummaryCard(
                  verdict: rev.consensusVerdict,
                  text: rev.aiSummary,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
"""

# 18. lib/screens/profile_screen.dart
files["lib/screens/profile_screen.dart"] = """import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Engineer Profile Header
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppColors.surfaceElevation1,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: AppColors.borderHairline, width: 1),
          ),
          child: Row(
            children: [
              Container(
                width: 52,
                height: 52,
                decoration: BoxDecoration(
                  color: AppColors.surfaceElevation2,
                  borderRadius: BorderRadius.circular(4),
                  border: Border.all(color: AppColors.accentPrimary.withOpacity(0.5), width: 1),
                ),
                child: const Center(
                  child: Icon(Icons.terminal_rounded, size: 28, color: AppColors.accentPrimary),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          'Nicolas Esparza',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                            color: AppColors.textPrimary,
                          ),
                        ),
                        const SizedBox(width: 6),
                        const Icon(Icons.verified_rounded, size: 16, color: AppColors.accentPrimary),
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'Systems Architect & Software Engineer',
                      style: GoogleFonts.inter(fontSize: 12, color: AppColors.textSecondary),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Member ID: DC-9842 • Rep: 99.4%',
                      style: GoogleFonts.jetBrainsMono(fontSize: 10, color: AppColors.textTertiary),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 20),

        // Section: Saved Stacks & Benchmarks
        Text(
          'SAVED ARCHITECTURAL SIGNALS',
          style: GoogleFonts.inter(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.8,
            color: AppColors.textTertiary,
          ),
        ),
        const SizedBox(height: 10),

        _buildSavedItem('DuckDB Analytic Engine', 'v1.1.2', 'Databases', '9.6/10'),
        const SizedBox(height: 8),
        _buildSavedItem('vLLM High-Throughput Engine', 'v0.6.2', 'AI / LLM', '9.5/10'),
        const SizedBox(height: 8),
        _buildSavedItem('Bun Runtime & Toolchain', 'v1.1.28', 'Runtimes', '9.3/10'),

        const SizedBox(height: 24),

        // System Configuration
        Text(
          'TELEMETRY CONFIGURATION',
          style: GoogleFonts.inter(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.8,
            color: AppColors.textTertiary,
          ),
        ),
        const SizedBox(height: 10),

        Container(
          decoration: BoxDecoration(
            color: AppColors.surfaceElevation1,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: AppColors.borderHairline, width: 1),
          ),
          child: Column(
            children: [
              _buildSettingTile('AI Consensus Synthesis', 'Active (Gemini 2.5 Flash)', true),
              const Divider(color: AppColors.borderHairline, height: 1),
              _buildSettingTile('Tabular Precision Readouts', 'Sub-millisecond p99', true),
              const Divider(color: AppColors.borderHairline, height: 1),
              _buildSettingTile('Automated CVE Vuln Alerts', 'Continuous sync', false),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSavedItem(String title, String version, String category, String score) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevation1,
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: AppColors.borderHairline, width: 1),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                '$version • $category',
                style: GoogleFonts.inter(fontSize: 11, color: AppColors.textTertiary),
              ),
            ],
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
              color: AppColors.surfaceElevation2,
              borderRadius: BorderRadius.circular(9999),
              border: Border.all(color: AppColors.accentPrimary.withOpacity(0.4), width: 1),
            ),
            child: Text(
              score,
              style: GoogleFonts.jetBrainsMono(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                color: AppColors.textPrimary,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSettingTile(String title, String subtitle, bool enabled) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w500, color: AppColors.textPrimary),
              ),
              const SizedBox(height: 2),
              Text(
                subtitle,
                style: GoogleFonts.inter(fontSize: 11, color: AppColors.textTertiary),
              ),
            ],
          ),
          Icon(
            enabled ? Icons.check_box_rounded : Icons.check_box_outline_blank_rounded,
            size: 20,
            color: enabled ? AppColors.accentPrimary : AppColors.textTertiary,
          ),
        ],
      ),
    );
  }
}
"""

# 19. lib/main.dart
files["lib/main.dart"] = """import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'theme/app_theme.dart';
import 'theme/app_colors.dart';
import 'widgets/top_app_bar.dart';
import 'widgets/bottom_nav_bar.dart';
import 'screens/critiques_screen.dart';
import 'screens/benchmarks_screen.dart';
import 'screens/ai_verdicts_screen.dart';
import 'screens/profile_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: AppColors.canvasBase,
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );
  runApp(const DevCritiqueApp());
}

class DevCritiqueApp extends StatelessWidget {
  const DevCritiqueApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DevCritique Minimal',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const MainNavigationScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    CritiquesScreen(),
    BenchmarksScreen(),
    AiVerdictsScreen(),
    ProfileScreen(),
  ];

  final List<String> _titles = const [
    'DEVCRITIQUE',
    'BENCHMARKS',
    'AI CONSENSUS',
    'SAVED SIGNALS',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.canvasBase,
      appBar: DevCritiqueTopBar(
        title: _titles[_currentIndex],
        onFilterTap: () {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Filter options: P99 Latency, Throughput, Memory footprint'),
              duration: Duration(seconds: 2),
            ),
          );
        },
        onSearchTap: () {
          setState(() {
            _currentIndex = 0; // jump to critiques search
          });
        },
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: DevCritiqueBottomBar(
        currentIndex: _currentIndex,
        onTabSelected: (index) {
          setState(() => _currentIndex = index);
        },
      ),
    );
  }
}
"""

# Write all files to disk
for rel_path, content in files.items():
    full_path = os.path.join(BASE_DIR, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Wrote {len(files)} files to {BASE_DIR}")

# Create zip file in public/ and root
os.makedirs("public", exist_ok=True)
zip_targets = ["public/flutter_devcritique_app.zip", "flutter_devcritique_app.zip"]

for zip_target in zip_targets:
    with zipfile.ZipFile(zip_target, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, filenames in os.walk(BASE_DIR):
            for filename in filenames:
                file_path = os.path.join(root, filename)
                # Store relative to flutter_project
                archive_name = os.path.relpath(file_path, start=os.path.dirname(BASE_DIR))
                zipf.write(file_path, arcname=archive_name)
    print(f"Created ZIP: {zip_target} (size: {os.path.getsize(zip_target)} bytes)")

# Also export as JSON for the web UI code viewer and JSZip builder
os.makedirs("src/data", exist_ok=True)
json_catalog = []
for rel_path, content in files.items():
    json_catalog.append({
        "path": f"flutter_project/{rel_path}",
        "name": os.path.basename(rel_path),
        "content": content,
        "size": len(content),
    })

with open("src/data/flutterFiles.json", "w", encoding="utf-8") as f:
    json.dump(json_catalog, f, indent=2)

print("Exported src/data/flutterFiles.json")
