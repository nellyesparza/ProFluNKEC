import 'package:flutter/material.dart';
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
