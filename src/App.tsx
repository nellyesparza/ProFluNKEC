import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  Code2,
  Sliders,
  FolderArchive,
  Terminal,
  Layers,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Github,
  Zap,
  Cpu
} from 'lucide-react';
import { PhoneSimulator } from './components/PhoneSimulator';
import { CodeExplorer } from './components/CodeExplorer';
import { DesignSpecView } from './components/DesignSpecView';
import { ZipDownloadModal } from './components/ZipDownloadModal';
import { projectStats } from './data/flutterProject';

export default function App() {
  const [activeView, setActiveView] = useState<'simulator' | 'code' | 'specs'>('simulator');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);

  const handleDirectDownload = () => {
    // Open modal or directly trigger download
    setIsDownloadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-[#dfe2ef] flex flex-col font-['Inter'] selection:bg-[#6366F1]/30 selection:text-[#c0c1ff]">
      {/* Top Navbar */}
      <header className="h-16 border-b border-[#334155]/60 bg-[#090D16]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#6366F1] flex items-center justify-center text-white shadow-[0_0_16px_rgba(99,102,241,0.4)]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm sm:text-base text-[#F8FAFC] tracking-wide">
                DEVCRITIQUE MINIMAL
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#6366F1]/15 text-[#c0c1ff] border border-[#6366F1]/30 font-mono text-[10px] font-semibold">
                Flutter 3.x
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8] hidden sm:block">
              Código completo y ejecutable generado para emulador o dispositivo móvil
            </p>
          </div>
        </div>

        {/* Action Button: Download ZIP */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/flutter_devcritique_app.zip"
            download="flutter_devcritique_app.zip"
            className="px-3.5 sm:px-4 py-2 rounded bg-[#6366F1] hover:bg-[#4f52e2] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-[0_0_16px_rgba(99,102,241,0.25)] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar .ZIP</span>
          </a>

          <button
            onClick={() => setIsDownloadModalOpen(true)}
            className="px-3 py-2 rounded bg-[#0F172A] hover:bg-[#1E293B] border border-[#334155] text-xs text-[#94A3B8] hover:text-[#F8FAFC] hidden md:flex items-center gap-1.5 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-[#6366F1]" />
            <span>Instrucciones CLI</span>
          </button>
        </div>
      </header>

      {/* Hero Subbar / Mode Switcher */}
      <section className="border-b border-[#334155]/40 bg-[#0F172A]/40 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* View Tabs */}
          <div className="flex items-center gap-1.5 bg-[#090D16] p-1 rounded-lg border border-[#334155]/60 w-fit">
            <button
              onClick={() => setActiveView('simulator')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-all ${
                activeView === 'simulator'
                  ? 'bg-[#6366F1] text-white shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Simulador de App</span>
            </button>

            <button
              onClick={() => setActiveView('code')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-all ${
                activeView === 'code'
                  ? 'bg-[#6366F1] text-white shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Explorador de Código ({projectStats.totalFiles})</span>
            </button>

            <button
              onClick={() => setActiveView('specs')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-all ${
                activeView === 'specs'
                  ? 'bg-[#6366F1] text-white shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Tokens de Diseño</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 text-xs text-[#94A3B8] font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              <span>19 archivos Flutter listos</span>
            </div>
            <span className="text-[#334155]">•</span>
            <span>pubspec.yaml + google_fonts</span>
            <span className="text-[#334155]">•</span>
            <span className="text-[#c0c1ff]">Null-Safety estricto</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {activeView === 'simulator' && (
          <div className="space-y-6">
            {/* Context Notice */}
            <div className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-xs sm:text-sm text-[#F8FAFC]">
                    Aplicación Flutter idéntica a las especificaciones y capturas
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Puedes interactuar con la app abajo (cambiar entre 4 pestañas, filtrar por categoría, buscar, ver tarjetas de telemetría y veredictos de IA) o descargar el paquete ZIP completo con el botón superior.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="px-3.5 py-1.5 rounded bg-[#1E293B] hover:bg-[#334155] border border-white/5 text-xs text-[#c0c1ff] flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <FolderArchive className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>Ver qué incluye el ZIP</span>
              </button>
            </div>

            {/* Interactive Phone Simulator */}
            <PhoneSimulator />
          </div>
        )}

        {activeView === 'code' && (
          <CodeExplorer onDownloadZip={() => setIsDownloadModalOpen(true)} />
        )}

        {activeView === 'specs' && <DesignSpecView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#334155]/50 bg-[#090D16] py-6 px-4 sm:px-8 text-xs text-[#64748B] mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6366F1]"></span>
            <span className="text-[#94A3B8] font-semibold">DevCritique Minimal</span>
            <span>—</span>
            <span>Generador & Paquete Flutter 3.16+</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            >
              Comandos de Instalación
            </button>
            <a
              href="/flutter_devcritique_app.zip"
              download
              className="text-[#6366F1] hover:underline font-medium"
            >
              Descarga Directa (22 KB)
            </a>
          </div>
        </div>
      </footer>

      {/* ZIP Download & Quickstart Modal */}
      <ZipDownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
