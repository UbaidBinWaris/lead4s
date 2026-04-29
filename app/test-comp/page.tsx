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
const OUTER_SIZE = 320 // px

/** Inner (hole) circle diameter in px */
const INNER_SIZE = 192 // px

/** Divider line thickness in px */
const DIVIDER_SIZE = 12 // px

/** Total degrees the circle rotates across the full scroll zone */
const ROTATION_DEGREES = 270

/**
 * Degree marks where the rotation pauses.
 * At each angle the circle holds still for SNAP_PAUSE_VH of scrolling.
 */
const SNAP_ANGLES = [90, 180, 270]

/**
 * How many viewport-heights of scroll are "consumed" as a pause at each snap angle.
 * Higher = longer pause. 0 = no pause.
 */
const SNAP_PAUSE_VH = 1

/** Initial delay after section is fully visible, before rotation starts */
const ENTRY_DELAY_VH = 0.8

/** Scroll budget for each rotation segment (0-90, 90-180, 180-270) */
const ROTATION_SEGMENT_VH = [0.3, 0.85, 0.85]

/** Viewport-heights of scroll dedicated to the actual spinning (excluding pauses) */
const SCROLL_HEIGHT_VH = ROTATION_SEGMENT_VH.reduce((sum, value) => sum + value, 0)

// ─── DERIVED (do not edit) ────────────────────────────────────────────────────

/** Total scroll zone height including all pause zones */
const TOTAL_VH = ENTRY_DELAY_VH + SCROLL_HEIGHT_VH + SNAP_ANGLES.length * SNAP_PAUSE_VH

/**
 * Maps raw scroll progress (0–1) to rotation degrees,
 * inserting a dead zone at each SNAP_ANGLE.
 */
function scrollToRotation(progress: number): number {
    const scrolledVh = progress * TOTAL_VH

    let remaining = scrolledVh
    let angle = 0
    const prevAngle = [0, ...SNAP_ANGLES]

    // Hold at 0deg until the section is fully in view for a short time.
    if (remaining <= ENTRY_DELAY_VH) {
        return 0
    }
    remaining -= ENTRY_DELAY_VH

    for (let i = 0; i < SNAP_ANGLES.length; i++) {
        const segDeg = SNAP_ANGLES[i] - prevAngle[i]
        const segmentVh = ROTATION_SEGMENT_VH[i] ?? ROTATION_SEGMENT_VH.at(-1)

        // Rotation segment
        if (remaining <= segmentVh) {
            return angle + (remaining / segmentVh) * segDeg
        }
        remaining -= segmentVh
        angle = SNAP_ANGLES[i]

        // Pause zone at this snap angle
        if (remaining <= SNAP_PAUSE_VH) {
            return SNAP_ANGLES[i]
        }
        remaining -= SNAP_PAUSE_VH
    }

    return ROTATION_DEGREES
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
