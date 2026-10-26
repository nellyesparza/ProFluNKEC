import 'package:flutter/material.dart';
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
