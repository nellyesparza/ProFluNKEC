import 'package:flutter/material.dart';
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
