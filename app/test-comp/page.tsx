'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// ─── CONFIG ──────────────────────────────────────────────────────────────────

/** Image paths for each quadrant: top-left, top-right, bottom-left, bottom-right */
const IMAGES = [
    '/test-comp/1.webp',
    '/test-comp/2.webp',
    '/test-comp/3.webp',
    '/test-comp/4.avif',
]

/** Per-image rotation in degrees (index matches IMAGES) */
const IMAGE_ROTATIONS = [270, 0, 180, 90]

/** Outer circle diameter in px */
const OUTER_SIZE = 520 // px

/** Inner (hole) circle diameter in px */
const INNER_SIZE = 192 // px

/** Divider line thickness in px */
const DIVIDER_SIZE = 12 // px

/** Only these angles are visible while scrolling */
const ROTATION_STEPS = [0, 90, 180, 270]

/** Scroll distance (in vh) required to move one step */
const STEP_SCROLL_VH = 0.85

/** Small hold before first step starts */
const ENTRY_DELAY_VH = 0.5

// ─── DERIVED (do not edit) ───────────ll switch the rotation to discrete snap steps (0°, 90°, 180°, 270° only) and add auto-jump behavior so small scrolls move directly to the next step instead of stopping between angles.


/** Total scroll zone height including all pause zones */
const TOTAL_VH = ENTRY_DELAY_VH + STEP_SCROLL_VH * (ROTATION_STEPS.length - 1)

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
            {/* Scroll zone — sticky section stays pinned until full rotation completes */}
            <div ref={wrapperRef} style={{ height: `${TOTAL_VH * 100}vh` }} className="relative">
                <section className="sticky top-0 flex h-screen w-full items-center justify-center bg-white">
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
                        {IMAGES.map((src, i) => (
                            <div key={src} style={{ ...quadrantStyles[i], overflow: 'hidden' }}>
                                <Image
                                    src={src}
                                    alt={`image ${i + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes={`${OUTER_SIZE / 2}px`}
                                    style={{ transform: `rotate(${IMAGE_ROTATIONS[i] ?? 0}deg)` }}
                                />
                            </div>
                        ))}

                        {/* Horizontal divider */}
                        <div
                            className="absolute left-0 z-10 w-full bg-white"
                            style={{ top: '50%', height: DIVIDER_SIZE, transform: 'translateY(-50%)' }}
                        />
                        {/* Vertical divider */}
                        <div
                            className="absolute top-0 z-10 h-full bg-white"
                            style={{ left: '50%', width: DIVIDER_SIZE, transform: 'translateX(-50%)' }}
                        />

                        {/* Inner hole */}
                        <div
                            className="absolute z-20 rounded-full bg-white"
                            style={{
                                width: INNER_SIZE,
                                height: INNER_SIZE,
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    </div>
                </section>
            </div>

            {/* Normal page content — visible after full rotation */}
            <section className="flex h-screen w-full items-center justify-center bg-white/20">
                <p className="text-2xl font-bold text-gray-800">Page continues here</p>
            </section>
        </main>
    )
}
