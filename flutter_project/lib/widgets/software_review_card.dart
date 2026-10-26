import 'package:flutter/material.dart';
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
