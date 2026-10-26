# DevCritique Minimal (Flutter App)

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
