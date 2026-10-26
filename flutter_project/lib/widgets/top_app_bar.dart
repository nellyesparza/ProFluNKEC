import 'package:flutter/material.dart';
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
