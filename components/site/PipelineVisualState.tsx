"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

const FINAL_STAGES = [
    { label: "Data", targetCount: 12480, sub: "accounts researched", targetWidth: 100 },
    { label: "Outreach", targetCount: 4216, sub: "multi-channel touches", targetWidth: 83 },
    { label: "Conversations", targetCount: 612, sub: "live replies & calls", targetWidth: 66 },
    { label: "Qualified", targetCount: 184, sub: "sales-ready leads", targetWidth: 49 },
    { label: "Meetings", targetCount: 96, sub: "booked this quarter", targetWidth: 32 },
];

function useCountUp(target: number, duration: number = 2500) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            
            // Ease out quart
            const easeProgress = 1 - Math.pow(1 - Math.min(progress / duration, 1), 4);
            
            setCount(Math.floor(easeProgress * target));

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [target, duration]);

    return count;
}

export function PipelineVisualState() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative rounded-xl border border-border bg-card/80 p-5 shadow-2xl backdrop-blur-md md:p-6 overflow-hidden group">
            {/* Ambient background pulse */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="mb-6 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        PIPELINE ENGINE · LIVE
                    </span>
                </div>
                <span className="font-mono text-xs font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    Q3 · 2026
                </span>
            </div>

            <div className="space-y-4 relative z-10">
                {FINAL_STAGES.map((s, i) => {
                    return <AnimatedStageRow key={s.label} stage={s} index={i} mounted={mounted} />;
                })}
            </div>

            <div className="mt-8 relative z-10">
                <svg viewBox="0 0 400 60" className="h-14 w-full drop-shadow-md" aria-hidden>
                    <path
                        d="M0 50 C 60 48, 90 40, 130 36 S 210 30, 250 20 S 340 10, 400 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-amber-500"
                        strokeDasharray="400"
                        strokeDashoffset={mounted ? 0 : 400}
                        style={{ transition: "stroke-dashoffset 2.5s cubic-bezier(0.4, 0, 0.2, 1) 1s" }}
                    />
                    <path 
                        d="M0 50 C 60 48, 90 40, 130 36 S 210 30, 250 20 S 340 10, 400 4 L400 60 L0 60Z" 
                        fill="currentColor" 
                        className="text-amber-500/10" 
                        style={{ opacity: mounted ? 1 : 0, transition: "opacity 1s ease 2s" }}
                    />
                </svg>
                <div className="flex justify-between font-mono text-[10px] text-muted-foreground mt-2 px-1">
                    <span className="font-semibold">WK 01</span>
                    <span className="text-amber-500 font-bold bg-amber-500/10 px-2 rounded">PIPELINE VALUE ↑ 3.4×</span>
                    <span className="font-semibold">WK 12</span>
                </div>
            </div>
        </div>
    );
}

function AnimatedStageRow({ stage, index, mounted }: { stage: typeof FINAL_STAGES[0], index: number, mounted: boolean }) {
    // Stagger start time based on index
    const delay = index * 400;
    
    const [startCounting, setStartCounting] = useState(false);

    useEffect(() => {
        if (mounted) {
            const timer = setTimeout(() => setStartCounting(true), delay);
            return () => clearTimeout(timer);
        }
    }, [mounted, delay]);

    const count = useCountUp(startCounting ? stage.targetCount : 0, 2000);
    const width = startCounting ? stage.targetWidth : 0;
    const isFinal = index === FINAL_STAGES.length - 1;

    return (
        <div className="transition-all duration-700 ease-out transform translate-y-0 opacity-100" style={{ transitionDelay: `${delay}ms` }}>
            <div className="mb-1.5 flex items-baseline justify-between text-[11px] sm:text-xs">
                <span className="font-mono uppercase tracking-wider font-semibold text-foreground">
                    <span className="text-muted-foreground/60 mr-1.5">0{index + 1}</span> 
                    {stage.label}
                </span>
                <span className="text-muted-foreground font-medium">{stage.sub}</span>
            </div>
            <div className="h-9 overflow-hidden rounded-md bg-secondary border border-border/50 shadow-inner relative">
                {/* Shimmer effect inside empty bar */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/5 to-transparent animate-[shimmer_2s_infinite]" />
                
                <div
                    className={`flex h-full items-center px-3 sm:px-4 transition-all duration-[2000ms] ease-out relative overflow-hidden ${
                        isFinal 
                            ? "bg-gradient-to-r from-amber-500 to-amber-400" 
                            : "bg-gradient-to-r from-[oklch(0.25_0.025_252)] to-[oklch(0.35_0.025_252)] border-l-2 border-amber-500"
                    }`}
                    style={{ width: `${width}%` }}
                >
                    {/* Inner glare */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10" />
                    
                    <span
                        className={`font-display text-sm sm:text-base font-bold relative z-10 ${
                            isFinal
                                ? "text-[oklch(0.15_0.028_252)] drop-shadow-sm"
                                : "text-foreground"
                        }`}
                    >
                        {count.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}