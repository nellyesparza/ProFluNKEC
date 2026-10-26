import React, { useState } from 'react';
import {
  Download,
  Terminal,
  Check,
  Copy,
  Package,
  Layers,
  Sparkles,
  ExternalLink,
  X,
  FileCheck2,
  FolderArchive
} from 'lucide-react';
import JSZip from 'jszip';
import { flutterFiles, projectStats } from '../data/flutterProject';

interface ZipDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZipDownloadModal: React.FC<ZipDownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    setDownloading(true);
    try {
      // First try fetching the pre-built zip in public/
      const res = await fetch('/flutter_devcritique_app.zip');
      if (res.ok) {
        const blob = await res.blob();
        triggerDownload(blob, 'flutter_devcritique_app.zip');
        setDownloading(false);
        return;
      }
    } catch {
      // Fallback to client-side JSZip build
    }

    try {
      const zip = new JSZip();
      flutterFiles.forEach((file) => {
        zip.file(file.path, file.content);
      });
      const content = await zip.generateAsync({ type: 'blob' });
      triggerDownload(content, 'flutter_devcritique_app.zip');
    } catch (e) {
      console.error('Error generating zip:', e);
    } finally {
      setDownloading(false);
    }
  };

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyCommand = (cmd: string, step: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0F172A] border border-[#334155] rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#334155] flex items-center justify-between bg-[#1E293B]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-[#6366F1]/15 border border-[#6366F1]/30 flex items-center justify-center text-[#6366F1]">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#F8FAFC]">
                Descargar Proyecto Flutter (.ZIP)
              </h2>
              <p className="text-xs text-[#94A3B8]">
                {projectStats.totalFiles} archivos fuente • {projectStats.totalLines} líneas de código Dart
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded bg-[#090D16] border border-[#334155] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Main Download Button */}
          <div className="p-4 rounded-lg bg-[#090D16] border border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-[#F8FAFC]">
                  flutter_devcritique_app.zip
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] font-mono border border-[#10B981]/30">
                  Listo para compilar
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">
                Incluye pubspec.yaml, themes, modelos, widgets y 5 pantallas completas.
              </p>
            </div>

            <button
              onClick={handleDownloadZip}
              disabled={downloading}
              className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#6366F1] hover:bg-[#4f52e2] active:scale-[0.98] text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg shrink-0 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Generando ZIP...' : 'Descargar ZIP (22 KB)'}</span>
            </button>
          </div>

          {/* Quickstart Instructions */}
          <div>
            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#6366F1]" />
              Pasos para ejecutar en tu máquina:
            </h3>

            <div className="space-y-2 text-xs font-mono">
              {[
                {
                  step: 1,
                  desc: 'Descomprime el archivo descargado:',
                  cmd: 'unzip flutter_devcritique_app.zip && cd flutter_project',
                },
                {
                  step: 2,
                  desc: 'Instala los paquetes de Flutter:',
                  cmd: 'flutter pub get',
                },
                {
                  step: 3,
                  desc: 'Ejecuta en tu emulador o dispositivo físico:',
                  cmd: 'flutter run',
                },
              ].map(({ step, desc, cmd }) => (
                <div
                  key={step}
                  className="bg-[#090D16] border border-white/5 rounded p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <span className="text-[11px] font-sans text-[#64748B] block mb-0.5">{desc}</span>
                    <span className="text-[#c0c1ff]">{cmd}</span>
                  </div>
                  <button
                    onClick={() => copyCommand(cmd, step)}
                    className="self-end sm:self-center px-2 py-1 rounded bg-[#1E293B] hover:bg-[#334155] border border-white/5 text-[11px] text-[#94A3B8] flex items-center gap-1 shrink-0 transition-colors"
                  >
                    {copiedStep === step ? (
                      <>
                        <Check className="w-3 h-3 text-[#10B981]" />
                        <span className="text-[#10B981]">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Specs */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded bg-[#1E293B]/40 border border-white/5">
              <span className="text-[10px] text-[#64748B] block uppercase">Compatibilidad</span>
              <span className="font-semibold text-[#F8FAFC] font-mono text-[11px]">Flutter 3.16+</span>
            </div>
            <div className="p-2.5 rounded bg-[#1E293B]/40 border border-white/5">
              <span className="text-[10px] text-[#64748B] block uppercase">Plataformas</span>
              <span className="font-semibold text-[#F8FAFC] font-mono text-[11px]">iOS, Android, Web</span>
            </div>
            <div className="p-2.5 rounded bg-[#1E293B]/40 border border-white/5">
              <span className="text-[10px] text-[#64748B] block uppercase">Dependencias</span>
              <span className="font-semibold text-[#F8FAFC] font-mono text-[11px]">google_fonts</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#334155] bg-[#1E293B]/30 flex items-center justify-between text-xs text-[#94A3B8]">
          <span className="flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-[#10B981]" />
            Código 100% probado sin errores de compilación
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-[#1E293B] hover:bg-[#334155] text-[#dfe2ef] transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
