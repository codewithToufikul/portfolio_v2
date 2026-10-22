import React, { useState, useEffect } from 'react';
import { Download, ArrowUpRight, Sparkles, Terminal, Activity } from 'lucide-react';
import { PhotoPreview } from './PhotoStudio/PhotoPreview';

export function Hero({
  personal,
  kpis,
  photoSettings,
  onOpenPhotoStudio,
  liveLatency = 32,
  healthyCount = 6,
  t,
}) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personal.rotatingRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [personal.rotatingRoles]);

  return (
    <section id="top" className="py-8 md:py-14 border-b border-line">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Bio & CTAs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span>{t('hero.eyebrow')}</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-fg text-balance leading-none">
              {personal.name}
            </h1>

            {/* Rotating Role Pill */}
            <div className="h-8 flex items-center font-mono text-sm md:text-base text-muted">
              <span className="text-ok mr-2">›</span>
              <span className="text-fg font-medium tracking-tight border-b border-dashed border-accent pb-0.5">
                {personal.rotatingRoles[roleIndex]}
              </span>
            </div>
          </div>

          <p className="text-muted text-sm sm:text-base max-w-2xl leading-relaxed">
            {personal.bio}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs pt-1">
            <a
              href="#deployments"
              className="px-4 py-2.5 bg-accent text-bg font-semibold hover:brightness-110 transition-all flex items-center gap-1.5"
            >
              <span>{t('nav.viewWork')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={personal.resumeDownloadUrl}
              download="Toufikul_Islam_Resume.pdf"
              className="px-4 py-2.5 border border-line bg-surface hover:border-accent text-fg transition-all flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-accent" />
              <span>{t('nav.downloadCv')}</span>
            </a>

            <button
              onClick={onOpenPhotoStudio}
              className="px-4 py-2.5 border border-line bg-surface hover:border-accent text-muted hover:text-accent transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span>{t('hero.photoStudio')}</span>
            </button>
          </div>

          {/* 4 KPI Summary Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line pt-2">
            <div className="bg-surface p-3.5 sm:p-4">
              <small className="block font-mono text-[11px] text-muted uppercase tracking-wider mb-1">
                Services
              </small>
              <strong className="font-display font-bold text-2xl sm:text-3xl text-fg tabular-nums block">
                {healthyCount}
                <span className="text-xs sm:text-sm font-normal text-muted ml-1">/6 healthy</span>
              </strong>
            </div>

            <div className="bg-surface p-3.5 sm:p-4">
              <small className="block font-mono text-[11px] text-muted uppercase tracking-wider mb-1">
                p95 latency
              </small>
              <strong className="font-display font-bold text-2xl sm:text-3xl text-fg tabular-nums block">
                {liveLatency}
                <span className="text-xs sm:text-sm font-normal text-muted ml-1">ms</span>
              </strong>
            </div>

            <div className="bg-surface p-3.5 sm:p-4">
              <small className="block font-mono text-[11px] text-muted uppercase tracking-wider mb-1">
                Deployments
              </small>
              <strong className="font-display font-bold text-2xl sm:text-3xl text-fg tabular-nums block">
                {personal.stats.projectsShipped}
                <span className="text-xs sm:text-sm font-normal text-muted ml-1">shipped</span>
              </strong>
            </div>

            <div className="bg-surface p-3.5 sm:p-4">
              <small className="block font-mono text-[11px] text-muted uppercase tracking-wider mb-1">
                Shipping since
              </small>
              <strong className="font-display font-bold text-2xl sm:text-3xl text-fg tabular-nums block">
                {personal.shippingSince}
              </strong>
            </div>
          </div>
        </div>

        {/* Right Column: Hologram Photo Card */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="w-full max-w-[320px] bg-surface border border-line p-3 shadow-hud relative">
            {/* Top terminal badge */}
            <div className="flex items-center justify-between font-mono text-[10px] text-muted pb-2 border-b border-line mb-2">
              <span className="text-accent flex items-center gap-1">
                <Activity className="w-3 h-3 text-ok" />
                <span>TELEMETRY_FEED</span>
              </span>
              <span>NODE_ID: BD-DHK</span>
            </div>

            {/* Photo with active studio settings */}
            <PhotoPreview
              settings={photoSettings}
              interactive={true}
              onOpenStudio={onOpenPhotoStudio}
              showBadge={true}
            />

            {/* Quick calibration trigger */}
            <div className="mt-2 text-center font-mono text-[11px]">
              <button
                onClick={onOpenPhotoStudio}
                className="text-muted hover:text-accent underline underline-offset-4"
              >
                [Calibrate Hologram & Filters]
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
