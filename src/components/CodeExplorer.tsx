import React, { useState } from 'react';
import {
  FileCode,
  Folder,
  FolderOpen,
  Copy,
  Check,
  Download,
  Search,
  FileText,
  FileCheck,
  Code2,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { flutterFiles, FlutterFile } from '../data/flutterProject';

interface CodeExplorerProps {
  onDownloadZip: () => void;
}

export const CodeExplorer: React.FC<CodeExplorerProps> = ({ onDownloadZip }) => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>('flutter_project/lib/main.dart');
  const [copied, setCopied] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    flutter_project: true,
    'flutter_project/lib': true,
    'flutter_project/lib/theme': true,
    'flutter_project/lib/models': true,
    'flutter_project/lib/data': true,
    'flutter_project/lib/widgets': true,
    'flutter_project/lib/screens': true,
  });

  const toggleFolder = (folderKey: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  };

  const currentFile =
    flutterFiles.find((f) => f.path === selectedFilePath) || flutterFiles[0];

  const handleCopyCode = async () => {
    if (!currentFile) return;
    try {
      await navigator.clipboard.writeText(currentFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadSingleFile = () => {
    if (!currentFile) return;
    const blob = new Blob([currentFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered files for search
  const filteredFiles = flutterFiles.filter(
    (f) =>
      f.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col lg:flex-row h-[750px] bg-[#0F172A] border border-[#334155] rounded-xl overflow-hidden shadow-2xl">
      {/* Left Sidebar: File Tree & Search */}
      <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-[#334155] bg-[#090D16] flex flex-col shrink-0">
        {/* Top Header of Sidebar */}
        <div className="p-3 border-b border-[#334155] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#6366F1]" />
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#F8FAFC]">
              Estructura Flutter
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#94A3B8] border border-white/5">
            {flutterFiles.length} archivos
          </span>
        </div>

        {/* Quick Search in Files */}
        <div className="p-2.5 border-b border-[#334155]/60">
          <div className="h-8 px-2.5 bg-[#1E293B] border border-[#334155] rounded flex items-center gap-1.5 focus-within:border-[#6366F1] transition-colors">
            <Search className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
            <input
              type="text"
              placeholder="Buscar en archivos o código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-xs text-[#F8FAFC] placeholder-[#64748B] outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-[11px] text-[#64748B] hover:text-[#94A3B8]"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* File Tree List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5 text-xs font-mono">
          {searchTerm ? (
            <div className="space-y-1">
              <span className="text-[10px] text-[#64748B] uppercase px-2 font-sans font-semibold">
                Resultados ({filteredFiles.length})
              </span>
              {filteredFiles.map((file) => (
                <button
                  key={file.path}
                  onClick={() => setSelectedFilePath(file.path)}
                  className={`w-full text-left px-2 py-1.5 rounded flex items-center gap-2 transition-colors ${
                    selectedFilePath === file.path
                      ? 'bg-[#6366F1]/20 text-[#c0c1ff] border border-[#6366F1]/40'
                      : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC]'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-[#6366F1]" />
                  <span className="truncate">{file.path.replace('flutter_project/', '')}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {/* Root Files */}
              <div className="px-1 py-1">
                <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-sans font-semibold px-2">
                  Configuración Base
                </span>
                {['pubspec.yaml', 'analysis_options.yaml', 'README.md'].map((fileName) => {
                  const path = `flutter_project/${fileName}`;
                  const file = flutterFiles.find((f) => f.path === path);
                  if (!file) return null;
                  const isSelected = selectedFilePath === path;
                  return (
                    <button
                      key={path}
                      onClick={() => setSelectedFilePath(path)}
                      className={`w-full text-left px-2 py-1 rounded flex items-center gap-2 transition-colors mt-0.5 ${
                        isSelected
                          ? 'bg-[#6366F1]/20 text-[#c0c1ff] border border-[#6366F1]/40'
                          : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC]'
                      }`}
                    >
                      <FileText
                        className={`w-3.5 h-3.5 shrink-0 ${
                          fileName.endsWith('.yaml') ? 'text-[#ffb783]' : 'text-[#8B5CF6]'
                        }`}
                      />
                      <span className="truncate">{fileName}</span>
                    </button>
                  );
                })}
              </div>

              {/* lib/ directory */}
              <div className="pt-2">
                <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-sans font-semibold px-2">
                  Código Fuente Dart (lib/)
                </span>

                {/* main.dart */}
                <button
                  onClick={() => setSelectedFilePath('flutter_project/lib/main.dart')}
                  className={`w-full text-left px-2 py-1.5 rounded flex items-center gap-2 transition-colors mt-1 ${
                    selectedFilePath === 'flutter_project/lib/main.dart'
                      ? 'bg-[#6366F1]/20 text-[#c0c1ff] border border-[#6366F1]/40'
                      : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC]'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-[#6366F1]" />
                  <span className="font-semibold text-[#F8FAFC]">main.dart</span>
                  <span className="ml-auto text-[9px] px-1 rounded bg-[#6366F1]/20 text-[#c0c1ff]">
                    entry
                  </span>
                </button>

                {/* Subfolders: theme, models, data, widgets, screens */}
                {[
                  { folder: 'theme', label: 'theme/ (tokens & estilos)' },
                  { folder: 'models', label: 'models/ (estructuras de datos)' },
                  { folder: 'data', label: 'data/ (telemetría y análisis)' },
                  { folder: 'widgets', label: 'widgets/ (componentes modulares)' },
                  { folder: 'screens', label: 'screens/ (vistas y navegación)' },
                ].map(({ folder, label }) => {
                  const prefix = `flutter_project/lib/${folder}`;
                  const filesInFolder = flutterFiles.filter((f) => f.path.startsWith(`${prefix}/`));
                  const isOpen = openFolders[prefix];

                  return (
                    <div key={folder} className="mt-1">
                      <button
                        onClick={() => toggleFolder(prefix)}
                        className="w-full text-left px-2 py-1 text-[#c7c4d7] hover:text-[#F8FAFC] flex items-center gap-1.5 group"
                      >
                        {isOpen ? (
                          <ChevronDown className="w-3 h-3 text-[#64748B]" />
                        ) : (
                          <ChevronRight className="w-3 h-3 text-[#64748B]" />
                        )}
                        <Folder className="w-3.5 h-3.5 text-[#6366F1] group-hover:text-[#8083ff]" />
                        <span className="font-semibold text-[11px] truncate">{label}</span>
                      </button>

                      {isOpen && (
                        <div className="pl-5 space-y-0.5 border-l border-[#334155]/60 ml-3 my-0.5">
                          {filesInFolder.map((file) => {
                            const isSelected = selectedFilePath === file.path;
                            return (
                              <button
                                key={file.path}
                                onClick={() => setSelectedFilePath(file.path)}
                                className={`w-full text-left px-2 py-1 rounded flex items-center gap-1.5 transition-colors ${
                                  isSelected
                                    ? 'bg-[#6366F1]/20 text-[#c0c1ff] border border-[#6366F1]/40'
                                    : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC]'
                                }`}
                              >
                                <FileCode className="w-3 h-3 text-[#94A3B8] shrink-0" />
                                <span className="truncate">{file.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Download ZIP Trigger in Sidebar */}
        <div className="p-3 border-t border-[#334155] bg-[#0F172A]">
          <button
            onClick={onDownloadZip}
            className="w-full py-2 px-3 bg-[#6366F1] hover:bg-[#4f52e2] text-white rounded font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar ZIP Completo</span>
          </button>
        </div>
      </div>

      {/* Right Area: Code Viewer */}
      <div className="flex-1 flex flex-col bg-[#0F172A] min-w-0">
        {/* File Tab Header */}
        <div className="h-12 px-4 border-b border-[#334155] bg-[#1E293B]/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <FileCode className="w-4 h-4 text-[#6366F1] shrink-0" />
            <span className="font-mono text-xs font-semibold text-[#F8FAFC] truncate">
              {currentFile?.path}
            </span>
            <span className="text-[10px] font-mono text-[#64748B] hidden sm:inline">
              ({currentFile?.content.split('\n').length} líneas • {Math.round(currentFile?.size / 1024 * 10) / 10} KB)
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1.5 rounded bg-[#090D16] hover:bg-[#1E293B] border border-[#334155] text-xs text-[#dfe2ef] flex items-center gap-1.5 transition-colors"
              title="Copiar contenido"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-[#10B981] font-medium">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>Copiar</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadSingleFile}
              className="px-2.5 py-1.5 rounded bg-[#090D16] hover:bg-[#1E293B] border border-[#334155] text-xs text-[#dfe2ef] flex items-center gap-1.5 transition-colors"
              title="Descargar este archivo individual"
            >
              <Download className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span className="hidden sm:inline">Descargar Archivo</span>
            </button>
          </div>
        </div>

        {/* Code Content with Line Numbers */}
        <div className="flex-1 overflow-auto p-4 bg-[#090D16] font-mono text-xs leading-relaxed text-[#dfe2ef] select-text">
          <pre className="table w-full">
            <code>
              {currentFile?.content.split('\n').map((line, idx) => (
                <div key={idx} className="table-row hover:bg-white/[0.02]">
                  <span className="table-cell pr-4 text-right select-none text-[#64748B]/60 text-[11px] w-12">
                    {idx + 1}
                  </span>
                  <span className="table-cell whitespace-pre font-mono text-[#dfe2ef]">
                    {/* Basic syntax coloring highlights for Dart/YAML */}
                    {formatSyntax(line)}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

// Simple visual syntax highlighter for Dart & YAML
function formatSyntax(line: string): React.ReactNode {
  if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
    return <span className="text-[#64748B] italic">{line}</span>;
  }
  if (line.trim().startsWith('import ') || line.trim().startsWith('export ')) {
    return (
      <span>
        <span className="text-[#6366F1] font-semibold">{line.split(' ')[0]} </span>
        <span className="text-[#ffb783]">{line.slice(line.split(' ')[0].length)}</span>
      </span>
    );
  }
  if (line.includes('class ') || line.includes('enum ')) {
    return <span className="text-[#c0c1ff] font-bold">{line}</span>;
  }
  if (line.includes('const ') || line.includes('final ') || line.includes('static ')) {
    return <span className="text-[#8B5CF6]">{line}</span>;
  }
  if (line.includes('return ') || line.includes('override')) {
    return <span className="text-[#ffb783]">{line}</span>;
  }
  return line;
}
