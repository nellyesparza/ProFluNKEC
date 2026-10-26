import 'package:flutter/material.dart';
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
