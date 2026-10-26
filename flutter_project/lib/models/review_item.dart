class MetricData {
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
