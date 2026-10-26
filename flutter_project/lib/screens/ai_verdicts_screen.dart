import 'package:flutter/material.dart';
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
