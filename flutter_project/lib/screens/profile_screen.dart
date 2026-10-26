import 'package:flutter/material.dart';
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
