import React from 'react';
import { Palette, Type, Layers, Box, Sparkles, Check, Shield } from 'lucide-react';

export const DesignSpecView: React.FC = () => {
  const colorTokens = [
    { name: 'Canvas Base', hex: '#090D16', role: 'Fondo oscuro obsidian de la app', flutter: 'AppColors.canvasBase' },
    { name: 'Surface Elevation 1', hex: '#0F172A', role: 'Tarjetas primarias y contenedores', flutter: 'AppColors.surfaceElevation1' },
    { name: 'Surface Elevation 2', hex: '#1E293B', role: 'Micro-tarjetas y estados interactivos', flutter: 'AppColors.surfaceElevation2' },
    { name: 'Surface Elevation 3 / Border', hex: '#334155', role: 'Bordes de campos y separadores', flutter: 'AppColors.borderDefault' },
    { name: 'Accent Primary', hex: '#6366F1', role: 'Electric Indigo para acciones principales', flutter: 'AppColors.accentPrimary' },
    { name: 'Accent Secondary', hex: '#8B5CF6', role: 'Electric Violet para síntesis de IA', flutter: 'AppColors.accentSecondary' },
    { name: 'Semantic Success', hex: '#10B981', role: 'Métricas óptimas y credencial verificada', flutter: 'AppColors.semanticSuccess' },
    { name: 'Semantic Error', hex: '#F43F5E', role: 'Alertas y desventajas arquitectónicas', flutter: 'AppColors.semanticError' },
  ];

  const componentsSpecs = [
    {
      name: 'Top App Bar',
      spec: '56px fixed height, frosted backdrop (85% opacidad, backdrop blur), centrado de logo/título, acciones laterales 40x40px.',
    },
    {
      name: 'Bottom Navigation Bar',
      spec: '64px fixed height + safe area, 4 pestañas primarias, icono 20px, etiqueta 10px, barra indicadora superior activa de 2px con resplandor.',
    },
    {
      name: 'Software Review Card',
      spec: 'Fondo #0F172A, borde 1px hairline, padding 16px, píldora de puntuación consenso 9.4/10, fragmentos pros/cons y credencial de revisor.',
    },
    {
      name: 'Metric Micro-Cards',
      spec: 'Fondo #1E293B, padding compacto 8px, lectura numérica tabular (p99 latency, req/s, memory base) en JetBrains Mono.',
    },
    {
      name: 'AI Verdict Badge & Summary',
      spec: 'Píldora con spark icon, fondo rgba(139,92,246,0.12), borde 1px violeta. Tarjeta con acento lateral izquierdo 2px solid #8B5CF6.',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Intro Header */}
      <div className="bg-[#0F172A] border border-[#334155] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-3 h-3 rounded-full bg-[#6366F1]"></span>
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#F8FAFC]">
            Sistema de Diseño: DevCritique Minimal
          </h2>
        </div>
        <p className="text-sm text-[#94A3B8] leading-relaxed">
          Diseñado para ingenieros de software, arquitectos de sistemas y directores de ingeniería que buscan análisis técnicos rigurosos sin rodeos ni adornos de marketing. Se implementa en Flutter usando tokens estrictos de color, tipografía y micro-interacciones disciplinadas.
        </p>
      </div>

      {/* Colors Grid */}
      <div className="bg-[#0F172A] border border-[#334155] rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#6366F1]" />
          <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#F8FAFC]">
            Tokens de Color (AppColors.dart)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {colorTokens.map((c) => (
            <div
              key={c.name}
              className="bg-[#090D16] border border-white/5 rounded-lg p-3 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-5 h-5 rounded border border-white/20 shrink-0"
                  style={{ backgroundColor: c.hex }}
                ></span>
                <span className="font-mono text-xs font-semibold text-[#F8FAFC]">{c.hex}</span>
              </div>
              <p className="text-xs font-semibold text-[#dfe2ef]">{c.name}</p>
              <p className="text-[11px] text-[#94A3B8] mt-1 line-clamp-2">{c.role}</p>
              <code className="mt-2 text-[10px] font-mono text-[#c0c1ff] bg-[#1E293B] px-1.5 py-0.5 rounded w-fit">
                {c.flutter}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Component Architectural Specs */}
      <div className="bg-[#0F172A] border border-[#334155] rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#8B5CF6]" />
          <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#F8FAFC]">
            Componentes Flutter Implementados
          </h3>
        </div>

        <div className="space-y-3">
          {componentsSpecs.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-[#090D16] border border-white/5 rounded-lg flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded bg-[#1E293B] flex items-center justify-center font-mono text-xs text-[#6366F1] font-bold shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#F8FAFC]">
                  {item.name}
                </h4>
                <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">{item.spec}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
