'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// ─── CONFIG ──────────────────────────────────────────────────────────────────

/** Outer circle diameter in px */
const OUTER_SIZE = 1620 // px

/** Inner (hole) circle diameter in px */
const INNER_SIZE = 392 // px

/** Divider line thickness in px */
const DIVIDER_SIZE = 12 // px

/** Only these angles are visible while scrolling */
const ROTATION_STEPS = [0, 90, 180, 270]

/** Scroll distance (in vh) required to move one step */
const STEP_SCROLL_VH = 1

/** Small hold before first step starts */
const ENTRY_DELAY_VH = 1

/** Small hold after last step ends, before section releases */
const EXIT_DELAY_VH = 1

/** Content shown for each snapped angle (0, 90, 180, 270) */
const STEP_CONTENT = [
    {
        eyebrow: 'Home Improvement',
        image: '/test-comp/insurance.webp',
        imageRotation: 270,
        heading: 'Fill Your Installation Calendar — Every Week',
        body: 'Lead4s connects home improvement contractors with high-intent homeowners actively requesting quotes. Every contact is TCPA-verified, delivered to your CRM in real time, and exclusive to your business.',
        stat: { value: '4.8×', label: 'Average contractor ROI' },
        cta: { label: 'Get Home Improvement Leads', href: '/partnership' },
        theme: {
            sectionBackground: 'radial-gradient(circle at 76% 18%, rgba(98, 191, 164, 0.18), transparent 28%), linear-gradient(135deg, #061613 0%, #0a1f1b 48%, #102b24 100%)',
            panelBackground: 'rgba(8, 24, 20, 0.72)',
            panelBorder: 'rgba(129, 230, 189, 0.16)',
            eyebrow: '#72e5be',
            heading: '#f2fff9',
            body: '#bdd9cf',
            divider: 'rgba(114, 229, 190, 0.28)',
            statBackground: 'rgba(114, 229, 190, 0.12)',
            statBorder: 'rgba(114, 229, 190, 0.2)',
            statValue: '#f2fff9',
            statLabel: '#91b9ac',
            buttonBackground: '#7be0bb',
            buttonText: '#07211a',
            buttonHover: '#95e9ca',
            indicatorActive: '#7be0bb',
            indicatorInactive: 'rgba(145, 185, 172, 0.32)',
            holeBackground: '#081814',
            dividerFill: 'rgba(6, 22, 19, 0.92)',
        },
    },
    {
        eyebrow: 'Insurance',
        image: '/test-comp/home.webp',
        imageRotation: 0,
        heading: 'Policy-Ready Buyers. Delivered at 50ms.',
        body: 'Stop chasing cold lists. Lead4s routes verified insurance leads to the best matching agent or offer the moment intent is captured — with TrustForm consent documentation on every record.',
        stat: { value: '98%', label: 'Lead delivery rate' },
        cta: { label: 'Scale Insurance Volume', href: '/partnership' },
        theme: {
            sectionBackground: 'radial-gradient(circle at 72% 16%, rgba(111, 196, 255, 0.16), transparent 30%), linear-gradient(135deg, #07111f 0%, #0d1c33 46%, #12284a 100%)',
            panelBackground: 'rgba(10, 19, 35, 0.74)',
            panelBorder: 'rgba(114, 182, 255, 0.16)',
            eyebrow: '#80c7ff',
            heading: '#edf6ff',
            body: '#b3c5da',
            divider: 'rgba(128, 199, 255, 0.24)',
            statBackground: 'rgba(128, 199, 255, 0.12)',
            statBorder: 'rgba(128, 199, 255, 0.18)',
            statValue: '#edf6ff',
            statLabel: '#8fa7c3',
            buttonBackground: '#80c7ff',
            buttonText: '#07182a',
            buttonHover: '#9ed5ff',
            indicatorActive: '#80c7ff',
            indicatorInactive: 'rgba(143, 167, 195, 0.32)',
            holeBackground: '#0a1323',
            dividerFill: 'rgba(7, 17, 31, 0.92)',
        },
    },
    {
        eyebrow: 'Legal',
        image: '/test-comp/legal.webp',
        imageRotation: 180,
        heading: 'Verified Case Inquiries for High-Volume Firms',
        body: 'Drive qualified legal intake with compliance-first funnels built for mass tort, personal injury, and consumer law. Real-time handoff means your intake team reaches every prospect first.',
        stat: { value: '24h', label: 'Campaign go-live time' },
        cta: { label: 'Start Legal Intake Campaigns', href: '/partnership' },
        theme: {
            sectionBackground: 'radial-gradient(circle at 74% 14%, rgba(153, 169, 255, 0.14), transparent 28%), linear-gradient(135deg, #0d1020 0%, #161c35 48%, #1f2547 100%)',
            panelBackground: 'rgba(16, 19, 37, 0.76)',
            panelBorder: 'rgba(154, 168, 255, 0.15)',
            eyebrow: '#adb8ff',
            heading: '#f3f5ff',
            body: '#c4cae5',
            divider: 'rgba(173, 184, 255, 0.24)',
            statBackground: 'rgba(173, 184, 255, 0.11)',
            statBorder: 'rgba(173, 184, 255, 0.18)',
            statValue: '#f3f5ff',
            statLabel: '#9fa8d0',
            buttonBackground: '#adb8ff',
            buttonText: '#131936',
            buttonHover: '#c0c9ff',
            indicatorActive: '#adb8ff',
            indicatorInactive: 'rgba(159, 168, 208, 0.3)',
            holeBackground: '#101325',
            dividerFill: 'rgba(13, 16, 32, 0.92)',
        },
    },
    {
        eyebrow: 'Solar',
        image: '/test-comp/solar.webp',
        imageRotation: 90,
        heading: 'Scale Qualified Solar Leads With Full Compliance',
        body: 'Lead4s powers solar acquisition with exclusive, consent-verified leads from homeowners who match your install criteria. Reduce cost-per-acquisition and increase close rates with intent-matched volume.',
        stat: { value: '100k+', label: 'Solar leads delivered monthly' },
        cta: { label: 'Grow Your Solar Pipeline', href: '/partnership' },
        theme: {
            sectionBackground: 'radial-gradient(circle at 74% 18%, rgba(255, 214, 122, 0.16), transparent 30%), linear-gradient(135deg, #181109 0%, #23180b 46%, #35240f 100%)',
            panelBackground: 'rgba(24, 17, 9, 0.74)',
            panelBorder: 'rgba(255, 214, 122, 0.16)',
            eyebrow: '#ffd87f',
            heading: '#fff8e9',
            body: '#dcc7aa',
            divider: 'rgba(255, 216, 127, 0.24)',
            statBackground: 'rgba(255, 216, 127, 0.11)',
            statBorder: 'rgba(255, 216, 127, 0.2)',
            statValue: '#fff8e9',
            statLabel: '#c4ab84',
            buttonBackground: '#ffd87f',
            buttonText: '#251807',
            buttonHover: '#ffe29b',
            indicatorActive: '#ffd87f',
            indicatorInactive: 'rgba(196, 171, 132, 0.32)',
            holeBackground: '#181109',
            dividerFill: 'rgba(24, 17, 9, 0.92)',
        },
    },
]

// ─── DERIVED (do not edit) ────────────────────────────────────────────────────


/** Total scroll zone height including all pause zones */
const TOTAL_VH = ENTRY_DELAY_VH + STEP_SCROLL_VH * (ROTATION_STEPS.length - 1) + EXIT_DELAY_VH

/**
 * Maps raw scroll progress (0–1) to discrete rotation steps.
 * Result is always one of: 0, 90, 180, 270.
 */
function scrollToRotation(progress: number): number {
    const scrolledVh = progress * TOTAL_VH
    if (scrolledVh <= ENTRY_DELAY_VH) {
        return ROTATION_STEPS[0]
    }

    const usableVh = scrolledVh - ENTRY_DELAY_VH
    const rawStep = usableVh / STEP_SCROLL_VH
    const stepIndex = Math.min(
        ROTATION_STEPS.length - 1,
        Math.max(0, Math.round(rawStep)),
    )

    return ROTATION_STEPS[stepIndex]
}

// ─────────────────────────────────────────────────────────────────────────────

const quadrantStyles: React.CSSProperties[] = [
    { position: 'absolute', top: 0, left: 0, width: '50%', height: '50%' },
    { position: 'absolute', top: 0, right: 0, width: '50%', height: '50%' },
    { position: 'absolute', bottom: 0, left: 0, width: '50%', height: '50%' },
    { position: 'absolute', bottom: 0, right: 0, width: '50%', height: '50%' },
]

export default function ScrollAnimation() {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [rotation, setRotation] = useState(0)

    const activeStepIndex = Math.max(0, ROTATION_STEPS.indexOf(rotation))
    const activeContent = STEP_CONTENT[activeStepIndex] ?? STEP_CONTENT[0]
    const activeTheme = activeContent.theme

    useEffect(() => {
        const handleScroll = () => {
            const wrapper = wrapperRef.current
            if (!wrapper) return
            const { top, height } = wrapper.getBoundingClientRect()
            const scrollable = height - window.innerHeight
            const scrolled = -top
            const progress = Math.min(Math.max(scrolled / scrollable, 0), 1)
            setRotation(scrollToRotation(progress))
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <div ref={wrapperRef} style={{ height: `${TOTAL_VH * 100}vh` }} className="relative">
                <section
                    className="sticky top-0 h-screen w-full transition-colors duration-500"
                    style={{ background: activeTheme.sectionBackground }}
                >
                    <div className="relative h-full w-full overflow-hidden">
                        <div className="absolute right-0 top-0 z-30 flex h-screen w-1/2 items-center justify-center px-8 lg:px-16">
                            <div
                                key={rotation}
                                className="w-full max-w-md rounded-[28px] border p-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl lg:p-10"
                                style={{
                                    animation: 'fadeSlideIn 320ms ease-out both',
                                    background: activeTheme.panelBackground,
                                    borderColor: activeTheme.panelBorder,
                                }}
                            >
                                {/* Eyebrow */}
                                <p
                                    className="text-xs font-semibold uppercase tracking-[0.18em]"
                                    style={{ color: activeTheme.eyebrow }}
                                >
                                    {activeContent.eyebrow}
                                </p>

                                {/* Heading */}
                                <h2
                                    className="mt-3 text-[1.85rem] font-bold leading-tight tracking-tight"
                                    style={{ color: activeTheme.heading }}
                                >
                                    {activeContent.heading}
                                </h2>

                                {/* Divider */}
                                <div className="mt-5 h-px w-12" style={{ backgroundColor: activeTheme.divider }} />

                                {/* Body */}
                                <p
                                    className="mt-4 text-[0.93rem] leading-[1.7]"
                                    style={{ color: activeTheme.body }}
                                >
                                    {activeContent.body}
                                </p>

                                {/* Stat pill */}
                                <div
                                    className="mt-6 inline-flex items-baseline gap-2 rounded-xl border px-4 py-3"
                                    style={{
                                        backgroundColor: activeTheme.statBackground,
                                        borderColor: activeTheme.statBorder,
                                    }}
                                >
                                    <span
                                        className="text-2xl font-bold tracking-tight"
                                        style={{ color: activeTheme.statValue }}
                                    >
                                        {activeContent.stat.value}
                                    </span>
                                    <span className="text-xs" style={{ color: activeTheme.statLabel }}>
                                        {activeContent.stat.label}
                                    </span>
                                </div>

                                {/* CTA */}
                                <div className="mt-6">
                                    <a
                                        href={activeContent.cta.href}
                                        className="inline-flex min-h-11 items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                        style={{
                                            backgroundColor: activeTheme.buttonBackground,
                                            color: activeTheme.buttonText,
                                            boxShadow: '0 18px 40px rgba(0, 0, 0, 0.18)',
                                        }}
                                        onMouseEnter={(event) => {
                                            event.currentTarget.style.backgroundColor = activeTheme.buttonHover
                                        }}
                                        onMouseLeave={(event) => {
                                            event.currentTarget.style.backgroundColor = activeTheme.buttonBackground
                                        }}
                                    >
                                        {activeContent.cta.label}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                                            <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L9.22 5.03a.75.75 0 1 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>

                                {/* Step indicators */}
                                <div className="mt-8 flex items-center gap-2">
                                    {ROTATION_STEPS.map((step) => (
                                        <div
                                            key={step}
                                            className="h-1 rounded-full transition-all duration-300"
                                            style={{
                                                width: rotation === step ? '2rem' : '0.5rem',
                                                backgroundColor: rotation === step ? activeTheme.indicatorActive : activeTheme.indicatorInactive,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div
                            className="absolute left-0 top-full"
                            style={{ transform: 'translate(-50%, -50%)' }}
                        >
                            <div
                                className="relative overflow-hidden rounded-full"
                                style={{
                                    width: OUTER_SIZE,
                                    height: OUTER_SIZE,
                                    transform: `rotate(${rotation}deg)`,
                                    transition: 'transform 420ms ease-out',
                                    willChange: 'transform',
                                }}
                            >
                        {/* 4 image quadrants */}
                        {STEP_CONTENT.map((item, i) => (
                            <div key={item.image} style={{ ...quadrantStyles[i], overflow: 'hidden' }}>
                                <Image
                                    src={item.image}
                                    alt={item.eyebrow}
                                    fill
                                    className="object-cover"
                                    sizes={`${OUTER_SIZE / 2}px`}
                                    style={{ transform: `rotate(${item.imageRotation}deg)` }}
                                />
                            </div>
                        ))}

                                {/* Horizontal divider */}
                                <div
                                    className="absolute left-0 z-10 w-full"
                                    style={{
                                        top: '50%',
                                        height: DIVIDER_SIZE,
                                        transform: 'translateY(-50%)',
                                        backgroundColor: activeTheme.dividerFill,
                                    }}
                                />
                                {/* Vertical divider */}
                                <div
                                    className="absolute top-0 z-10 h-full"
                                    style={{
                                        left: '50%',
                                        width: DIVIDER_SIZE,
                                        transform: 'translateX(-50%)',
                                        backgroundColor: activeTheme.dividerFill,
                                    }}
                                />

                                {/* Inner hole */}
                                <div
                                    className="absolute z-20 rounded-full"
                                    style={{
                                        width: INNER_SIZE,
                                        height: INNER_SIZE,
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        backgroundColor: activeTheme.holeBackground,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>



            <style jsx>{`
                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    )
}
