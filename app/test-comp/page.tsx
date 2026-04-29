'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ScrollAnimation from '@/app/test-comp/scrol_animation'

// ─── CONFIG ──────────────────────────────────────────────────────────────────

/** Image paths for each quadrant: top-left, top-right, bottom-left, bottom-right */
const IMAGES = [
    '/test-comp/home.webp',
    '/test-comp/insurance.webp',
    '/test-comp/legal.webp',
    '/test-comp/solar.webp',
]

/** Per-image rotation in degrees (index matches IMAGES) */
const IMAGE_ROTATIONS = [270, 0, 180, 90]

/** Outer circle diameter in px */
const OUTER_SIZE = 1720 // px

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
        heading: 'Fill Your Installation Calendar — Every Week',
        body: 'Lead4s connects home improvement contractors with high-intent homeowners actively requesting quotes. Every contact is TCPA-verified, delivered to your CRM in real time, and exclusive to your business.',
        stat: { value: '4.8×', label: 'Average contractor ROI' },
        cta: { label: 'Get Home Improvement Leads', href: '/industries' },
    },
    {
        eyebrow: 'Insurance',
        heading: 'Policy-Ready Buyers. Delivered at 50ms.',
        body: 'Stop chasing cold lists. Lead4s routes verified insurance leads to the best matching agent or offer the moment intent is captured — with TrustForm consent documentation on every record.',
        stat: { value: '98%', label: 'Lead delivery rate' },
        cta: { label: 'Scale Insurance Volume', href: '/industries' },
    },
    {
        eyebrow: 'Legal',
        heading: 'Verified Case Inquiries for High-Volume Firms',
        body: 'Drive qualified legal intake with compliance-first funnels built for mass tort, personal injury, and consumer law. Real-time handoff means your intake team reaches every prospect first.',
        stat: { value: '24h', label: 'Campaign go-live time' },
        cta: { label: 'Start Legal Intake Campaigns', href: '/industries' },
    },
    {
        eyebrow: 'Solar',
        heading: 'Scale Qualified Solar Leads With Full Compliance',
        body: 'Lead4s powers solar acquisition with exclusive, consent-verified leads from homeowners who match your install criteria. Reduce cost-per-acquisition and increase close rates with intent-matched volume.',
        stat: { value: '100k+', label: 'Solar leads delivered monthly' },
        cta: { label: 'Grow Your Solar Pipeline', href: '/industries' },
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

export default function TestPage() {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [rotation, setRotation] = useState(0)

    const activeStepIndex = Math.max(0, ROTATION_STEPS.indexOf(rotation))
    const activeContent = STEP_CONTENT[activeStepIndex] ?? STEP_CONTENT[0]

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
        <main>
            <section className="flex h-screen w-full items-center justify-center bg-white/20">
                <p className="text-2xl font-bold text-gray-800">Page continues here</p>
            </section>


            <ScrollAnimation />
        </main>
    )
}
