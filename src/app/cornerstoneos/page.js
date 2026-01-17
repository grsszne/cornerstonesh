"use client";

import { Suspense } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CornerstoneOS from "@/components/CornerstoneOS";
import AiSearchDemo from "@/components/AiSearchDemo";
import ScrollToRef from "@/components/ScrollToRef";
import ScribbleUnderline from "@/components/ScribbleUnderline";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Cpu,
    LockKey,
    Brain,
    MagicWand,
    CirclesThreePlus,
    ArrowRight,
    BookOpenText,
    Tag,
    CalendarBlank,
    ChatCircleDots,
    EnvelopeSimple,
    Clock,
    Users
} from "@phosphor-icons/react";

export default function CornerstoneOSPage() {
    return (
        <>
            <Suspense fallback={null}>
                <ScrollToRef />
            </Suspense>
            <main className="min-h-screen bg-background text-foreground pt-32 pb-24">

                {/* Hero Section */}
                <section className="container-swiss mb-32 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-foreground mb-8">
                            The OS for the<br />
                            <span className="italic">Individual.</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-sans text-foreground/70 max-w-2xl text-balance mb-12 leading-relaxed">
                            A calm, dashboard-centric operating system where your email, files, and calendar share context—not just storage space.
                        </p>
                    </motion.div>
                </section>

                {/* Live Demo Section */}
                <section className="container-swiss mb-48">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl mb-6">Experience the Dashboard</h2>
                        <p className="font-sans text-foreground/70 max-w-xl mx-auto">
                            A single interface for your entire digital life. Mail, Files, Calendar, and Home Automation—all in one place.
                        </p>
                    </div>
                    <CornerstoneOS />
                </section>



                {/* Core Experiences Section - Bento Grid */}
                <section className="container-swiss mb-48">
                    <div className="text-center mb-20">
                        <h2 className="font-serif text-5xl mb-6">Designed for Focus</h2>
                        <p className="font-sans text-foreground/70 max-w-xl mx-auto text-lg leading-relaxed">
                            Every app is built to work together, sharing context and reducing friction.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-[300px] gap-6">

                        {/* 1. Contextual Topics (Large, Top Left) */}
                        <div className="md:col-span-3 lg:col-span-8 row-span-1 p-8 rounded-3xl bg-foreground/[0.02] border border-foreground/10 relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col h-full items-start">
                                <div className="flex items-center gap-3 mb-4">
                                    <Tag className="w-6 h-6 text-foreground/40" />
                                    <h3 className="font-serif text-2xl">Contextual Topics</h3>
                                </div>
                                <p className="font-sans text-foreground/60 max-w-sm leading-relaxed mb-8">
                                    Organize everything by topic. Emails, files, and events are automatically tagged and grouped for easy retrieval.
                                </p>
                                <div className="w-full mt-auto">
                                    <MockTags />
                                </div>
                            </div>
                            {/* Background decoration */}
                            <div className="absolute -right-20 -top-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors duration-1000"></div>
                        </div>

                        {/* 2. Unified Calendar (Tall, Top Right) */}
                        <div className="md:col-span-3 lg:col-span-4 row-span-2 p-8 rounded-3xl bg-foreground/[0.02] border border-foreground/10 relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <CalendarBlank className="w-6 h-6 text-foreground/40" />
                                    <h3 className="font-serif text-2xl">Unified Calendar</h3>
                                </div>
                                <p className="font-sans text-foreground/60 leading-relaxed mb-auto">
                                    See your entire schedule in one view. Context from emails and messages is one click away.
                                </p>
                                <div className="mt-8 scale-90 sm:scale-100 origin-bottom-left">
                                    <MockCalendar />
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-1000"></div>
                        </div>

                        {/* 3. P2P Messaging (Square, Bottom Left) */}
                        <div className="md:col-span-3 lg:col-span-4 row-span-1 p-8 rounded-3xl bg-foreground/[0.02] border border-foreground/10 relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-auto">
                                    <ChatCircleDots className="w-6 h-6 text-foreground/40" />
                                    <h3 className="font-serif text-2xl">P2P Messaging</h3>
                                </div>
                                <div className="mt-8">
                                    <MockChat />
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors duration-1000"></div>
                        </div>

                        {/* 4. Integrated Mail (Medium, Bottom Center) */}
                        <div className="md:col-span-3 lg:col-span-4 row-span-1 p-8 rounded-3xl bg-foreground/[0.02] border border-foreground/10 relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <EnvelopeSimple className="w-6 h-6 text-foreground/40" />
                                    <h3 className="font-serif text-2xl">Integrated Mail</h3>
                                </div>
                                <p className="font-sans text-sm text-foreground/60 leading-relaxed max-w-xs mb-auto">
                                    A calm inbox that understands what's important. Filter by topic instantly.
                                </p>
                                <div className="mt-4">
                                    <MockMail />
                                </div>
                            </div>
                            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-zinc-500/5 rounded-full blur-3xl group-hover:bg-zinc-500/10 transition-colors duration-1000"></div>
                        </div>

                    </div>
                </section>

                {/* Intelligence Section */}
                <section className="bg-muted py-32 mb-48">
                    <div className="container-swiss grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-foreground/5 rounded-full text-[10px] font-sans font-medium uppercase tracking-widest mb-8 border border-foreground/5">
                                <Brain className="w-3 h-3 text-foreground/60" />
                                On-Device Intelligence
                            </div>
                            <h2 className="font-serif text-4xl md:text-5xl mb-8">Unified Search.<br />Connected Intelligence.</h2>
                            <p className="font-sans text-lg text-foreground/70 mb-8 leading-relaxed">
                                CornerstoneOS indexes every file, email, photo, and message on your Foundation locally. Our on-device AI understands relationships between your work—finding the email thread that relates to a document, the meeting that sparked a project, the photo from that client dinner—all connected by context.
                            </p>

                            <div className="space-y-6">
                                <FeatureItem
                                    icon={BookOpenText}
                                    title="Cross-App Context"
                                    desc="Search for a project name and find emails, files, calendar events, and notes—all connected intelligently."
                                />
                                <FeatureItem
                                    icon={MagicWand}
                                    title="Semantic Search"
                                    desc="Search for 'the receipt from that Greek place' instead of keywords."
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-foreground/[0.02] blur-3xl -z-10 rounded-full"></div>
                            <AiSearchDemo />
                        </div>
                    </div>
                </section>

                {/* Architecture Section */}
                <section className="container-swiss mb-48">
                    <h2 className="font-serif text-4xl text-center mb-24">Built for Integration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-foreground/5 rounded-2xl flex items-center justify-center">
                                <LockKey className="w-6 h-6 opacity-40" />
                            </div>
                            <h3 className="font-serif text-2xl">Unified Context</h3>
                            <p className="font-sans text-foreground/60 leading-relaxed">
                                Running locally means your email, files, and calendar can share intelligence without API limits or cloud bottlenecks. Instant search, unlimited context, seamless connections.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-foreground/5 rounded-2xl flex items-center justify-center">
                                <CirclesThreePlus className="w-6 h-6 opacity-40" />
                            </div>
                            <h3 className="font-serif text-2xl">Matter-Native</h3>
                            <p className="font-sans text-foreground/60 leading-relaxed">
                                Total home automation without the cloud. CornerstoneOS acts as a local bridge for all your smart devices, ensuring your home works even if the internet goes out.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-foreground/5 rounded-2xl flex items-center justify-center">
                                <Cpu className="w-6 h-6 opacity-40" />
                            </div>
                            <h3 className="font-serif text-2xl">Open Core</h3>
                            <p className="font-sans text-foreground/60 leading-relaxed">
                                Built on a hardened Linux foundation with a custom application sandbox. Transparent, auditable, and engineered for long-term stability.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Community Marketplace Section */}
                <section className="container-swiss mb-48">
                    <div className="text-center mb-20">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6">Community Driven</h2>
                        <p className="font-sans text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                            Open SDK. Open marketplace. Build integrations and share with the community.
                        </p>
                    </div>

                    {/* Marketplace Explanation */}
                    <div className="max-w-3xl mx-auto mb-20">
                        <div className="space-y-8">
                            <div className="text-center">
                                <p className="font-sans text-foreground/70 leading-relaxed">
                                    Foundation's open architecture means anyone can build integrations that extend what your system can do. From media servers to home automation, photo backup to developer tools—if you can think it, you can build it.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-foreground/10">
                                <div className="text-center">
                                    <div className="font-serif text-2xl mb-2">Open SDK</div>
                                    <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                                        Modern TypeScript SDK with full documentation and examples
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="font-serif text-2xl mb-2">Curated</div>
                                    <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                                        Every integration reviewed for security and quality standards
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="font-serif text-2xl mb-2">Community First</div>
                                    <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                                        Built by users, for users—no vendor lock-in or proprietary restrictions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular Integrations - Single Monitor */}
                    <div className="mb-20">
                        <h3 className="font-serif text-2xl mb-8 text-center">Popular Integrations</h3>

                        {/* Monitor Frame */}
                        <div className="relative" style={{ perspective: "1200px" }}>
                            <div
                                className="bg-foreground/5 border-2 border-foreground/20 rounded-xl p-2 shadow-2xl"
                                style={{
                                    transform: "rotateX(2deg)",
                                    transformStyle: "preserve-3d"
                                }}
                            >
                                {/* Screen Bezel */}
                                <div className="bg-muted border border-foreground/10 rounded-lg overflow-hidden">
                                    {/* Screen Content */}
                                    <div className="p-8 md:p-12">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <IntegrationCard
                                                name="Immich Photos"
                                                description="Self-hosted photo backup with facial recognition and smart albums"
                                                downloads="8.9K"
                                                category="Media"
                                                rating="4.8"
                                            />
                                            <IntegrationCard
                                                name="Home Security Hub"
                                                description="UniFi Protect integration with AI motion detection"
                                                downloads="6.2K"
                                                category="Home Automation"
                                                rating="4.7"
                                            />
                                            <IntegrationCard
                                                name="Weather Station"
                                                description="Local weather data from personal sensors"
                                                downloads="4.1K"
                                                category="Home Automation"
                                                rating="4.6"
                                            />
                                            <IntegrationCard
                                                name="Document Scanner"
                                                description="OCR and organize paper documents automatically"
                                                downloads="3.8K"
                                                category="Productivity"
                                                rating="4.8"
                                            />
                                            <IntegrationCard
                                                name="Energy Monitor"
                                                description="Track home power usage in real-time"
                                                downloads="2.9K"
                                                category="Home Automation"
                                                rating="4.5"
                                            />
                                            <IntegrationCard
                                                name="Git Server"
                                                description="Host private repositories with web interface"
                                                downloads="5.3K"
                                                category="Developer Tools"
                                                rating="4.9"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Monitor Stand */}
                            <div className="flex justify-center mt-2">
                                <div className="h-2 bg-foreground/10 rounded-full w-24"></div>
                            </div>
                        </div>
                    </div>

                    {/* Developer Section with Code Example */}
                    <div className="border-t border-foreground/10 pt-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            {/* Left - Developer Info */}
                            <div>
                                <h3 className="font-serif text-3xl mb-6">Build for Foundation</h3>
                                <p className="font-sans text-lg text-foreground/70 mb-8 leading-relaxed">
                                    The Foundation SDK makes it ridiculously simple to build integrations. Write once, deploy to thousands of devices.
                                </p>

                                <div className="space-y-6 mb-8">
                                    <div>
                                        <h4 className="font-sans font-medium text-foreground mb-2">Open SDK with TypeScript</h4>
                                        <p className="font-sans text-sm text-foreground/60">Modern development experience with full type safety and excellent docs</p>
                                    </div>
                                    <div>
                                        <h4 className="font-sans font-medium text-foreground mb-2">Sandboxed Execution</h4>
                                        <p className="font-sans text-sm text-foreground/60">Secure runtime environment with granular permission controls</p>
                                    </div>
                                    <div>
                                        <h4 className="font-sans font-medium text-foreground mb-2">Community Marketplace</h4>
                                        <p className="font-sans text-sm text-foreground/60">Share your integrations with thousands of Foundation users</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="bg-foreground text-background px-8 py-3 font-sans text-sm font-medium hover:opacity-90 transition-opacity">
                                        View SDK Docs
                                    </button>
                                    <button className="border border-foreground/20 px-8 py-3 font-sans text-sm font-medium hover:bg-foreground/5 transition-colors">
                                        Browse Marketplace
                                    </button>
                                </div>
                            </div>

                            {/* Right - Code Example */}
                            <div>
                                <div className="bg-foreground/[0.03] border border-foreground/10 rounded-lg overflow-hidden">
                                    <div className="border-b border-foreground/10 px-4 py-3 flex items-center justify-between">
                                        <span className="font-mono text-xs text-foreground/50">photo-backup.ts</span>
                                        <span className="font-sans text-xs text-foreground/40">Foundation SDK Example</span>
                                    </div>
                                    <div className="p-6 font-mono text-sm leading-relaxed">
                                        <div className="text-foreground/50">
                                            <span className="text-purple-400">import</span> {"{"} Foundation {"}"} <span className="text-purple-400">from</span> <span className="text-green-400">'@foundation/sdk'</span>;
                                        </div>
                                        <div className="text-foreground/50 mt-4">
                                            <span className="text-purple-400">const</span> <span className="text-blue-400">app</span> = <span className="text-purple-400">new</span> <span className="text-yellow-400">Foundation</span>.<span className="text-blue-400">App</span>({"{"});
                                        </div>
                                        <div className="text-foreground/50 ml-4">
                                            name: <span className="text-green-400">'Photo Backup'</span>,
                                        </div>
                                        <div className="text-foreground/50 ml-4">
                                            permissions: [<span className="text-green-400">'files.read'</span>]
                                        </div>
                                        <div className="text-foreground/50">
                                            {"}"});
                                        </div>
                                        <div className="text-foreground/50 mt-4">
                                            app.<span className="text-blue-400">on</span>(<span className="text-green-400">'file.created'</span>, <span className="text-purple-400">async</span> (file) {"=>"} {"{"}
                                        </div>
                                        <div className="text-foreground/50 ml-4">
                                            <span className="text-purple-400">if</span> (file.<span className="text-blue-400">isPhoto</span>()) {"{"}
                                        </div>
                                        <div className="text-foreground/50 ml-8">
                                            <span className="text-purple-400">await</span> app.storage.<span className="text-blue-400">backup</span>(file);
                                        </div>
                                        <div className="text-foreground/50 ml-8">
                                            app.<span className="text-blue-400">notify</span>(<span className="text-green-400">'Photo backed up!'</span>);
                                        </div>
                                        <div className="text-foreground/50 ml-4">
                                            {"}"}
                                        </div>
                                        <div className="text-foreground/50">
                                            {"}"});
                                        </div>
                                    </div>
                                    <div className="border-t border-foreground/10 px-4 py-2 bg-foreground/[0.02]">
                                        <p className="font-sans text-xs text-foreground/50">That's it. 10 lines to create a photo backup automation.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Alternative OS Options Section */}
                <section className="bg-muted py-32 mb-32">
                    <div className="container-swiss">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-serif text-4xl mb-6 text-foreground">Not for you?</h2>
                            <p className="font-sans text-lg text-foreground/70 mb-16 leading-relaxed">
                                Foundation is hardware-first. While CornerstoneOS ships as the default experience, you're free to bring your own operating system. Here are some popular alternatives that work well with Foundation's architecture:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-sans text-sm font-medium text-foreground uppercase tracking-wider">NAS-Focused</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-sans font-medium text-foreground mb-1">Unraid</h4>
                                            <p className="font-sans text-sm text-foreground/60 leading-relaxed">Flexible storage pooling with Docker and VM support.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-sans font-medium text-foreground mb-1">TrueNAS</h4>
                                            <p className="font-sans text-sm text-foreground/60 leading-relaxed">Enterprise-grade ZFS storage with extensive plugin ecosystem.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-sans font-medium text-foreground mb-1">OpenMediaVault</h4>
                                            <p className="font-sans text-sm text-foreground/60 leading-relaxed">Lightweight Debian-based NAS solution with web UI.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-sans text-sm font-medium text-foreground uppercase tracking-wider">General Purpose</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-sans font-medium text-foreground mb-1">Proxmox VE</h4>
                                            <p className="font-sans text-sm text-foreground/60 leading-relaxed">Virtualization platform for running multiple OS instances.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-sans font-medium text-foreground mb-1">Ubuntu Server</h4>
                                            <p className="font-sans text-sm text-foreground/60 leading-relaxed">Standard Linux server with wide hardware support.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-sans font-medium text-foreground mb-1">Debian</h4>
                                            <p className="font-sans text-sm text-foreground/60 leading-relaxed">Stable, minimal foundation for custom configurations.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-foreground/10">
                                <p className="font-sans text-sm text-foreground/50 italic">
                                    Foundation's open architecture means you're never locked in. <ScribbleUnderline delay={0.3}>Install what works for you.</ScribbleUnderline>
                                </p>
                                <p className="font-sans text-sm text-foreground/40 mt-4">
                                    The OS boots off an internal 2230 M.2 NVMe SSD, and we're more than willing to install an OS of your choice for you. Just know it hasn't been extensively tested on different operating systems yet.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="container-swiss pt-32 border-t border-foreground/5 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="font-serif text-5xl mb-8">Ready to take control?</h2>
                        <p className="font-sans text-lg text-foreground/60 mb-12">
                            CornerstoneOS comes pre-installed on every Foundation chassis. Reserve yours in the next production run.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <Link
                                href="/preorder"
                                className="bg-foreground text-background px-12 py-4 font-sans font-medium text-sm hover:opacity-90 transition-opacity"
                            >
                                Preorder
                            </Link>
                            <Link
                                href="/foundation"
                                className="font-sans text-sm font-medium flex items-center gap-2 hover:opacity-60 transition-opacity"
                            >
                                Explore Foundation Hardware <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

            </main >
        </>
    );
}

function IntegrationCard({ name, description, downloads, category, rating }) {
    return (
        <div className="border border-foreground/10 bg-foreground/[0.02] hover:border-foreground/20 hover:bg-foreground/[0.04] transition-all p-5 rounded-lg flex flex-col h-full">
            <div className="mb-auto">
                <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-foreground/5 border border-foreground/10 font-sans text-[10px] text-foreground/60 rounded uppercase tracking-wider">
                        {category}
                    </span>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-xs">★</span>
                        <span className="font-sans text-xs text-foreground/60">{rating}</span>
                    </div>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2 leading-tight">{name}</h3>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">{description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-foreground/10">
                <span className="font-sans text-xs text-foreground/50">
                    {downloads} installs
                </span>
                <button className="px-4 py-1.5 bg-foreground/10 hover:bg-foreground/20 font-sans text-xs font-medium transition-colors rounded">
                    Install
                </button>
            </div>
        </div>
    );
}

function FeatureItem({ icon: Icon, title, desc }) {
    return (
        <div className="flex gap-4">
            <div className="shrink-0 mt-1">
                <Icon className="w-5 h-5 text-foreground/40" />
            </div>
            <div>
                <h4 className="font-sans font-medium text-foreground">{title}</h4>
                <p className="font-sans text-sm text-foreground/60 mt-1">{desc}</p>
            </div>
        </div>
    );
}

// --- Mock UI Components ---

function MockTags() {
    return (
        <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100/10 border border-yellow-200/20 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-sans font-medium">
                <span className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></span>
                baking
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-100/10 border border-orange-200/20 text-orange-600 dark:text-orange-400 rounded-full text-xs font-sans font-medium">
                <span className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></span>
                vegetarian
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100/10 border border-green-200/20 text-green-600 dark:text-green-400 rounded-full text-xs font-sans font-medium">
                <span className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></span>
                agile workflow
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100/10 border border-blue-200/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-sans font-medium">
                <span className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></span>
                research
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100/10 border border-stone-200/20 text-stone-600 dark:text-stone-400 rounded-full text-xs font-sans font-medium">
                <Tag className="w-3 h-3 opacity-60" />
                tea
            </span>
        </div>
    )
}

function MockCalendar() {
    return (
        <div className="bg-background border border-foreground/10 rounded-lg p-4 shadow-sm select-none">
            <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-lg">January</span>
                <span className="text-xs font-sans text-foreground/40">2026</span>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <div key={i} className="text-[10px] text-center text-foreground/30 font-sans">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-sm font-sans">
                {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const isToday = day === 15;
                    const hasEvent = [15, 18, 22].includes(day);
                    return (
                        <div key={i} className={`
                            aspect-square flex items-center justify-center rounded-md text-xs relative
                            ${isToday ? 'bg-foreground text-background font-bold' : 'text-foreground/70 hover:bg-foreground/5'}
                        `}>
                            {day}
                            {hasEvent && !isToday && (
                                <div className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full"></div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Event Item */}
            <div className="mt-4 pt-3 border-t border-foreground/10 flex items-start gap-3">
                <div className="w-1 h-8 bg-blue-500 rounded-full shrink-0"></div>
                <div>
                    <div className="text-xs font-bold text-foreground">Meet with Matthew</div>
                    <div className="text-[10px] text-foreground/50">3:00 PM - 4:00 PM • Coffee</div>
                </div>
            </div>
        </div>
    )
}

function MockChat() {
    return (
        <div className="space-y-3 font-sans">
            <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-foreground/10 flex-shrink-0"></div>
                <div className="bg-foreground/[0.04] p-3 rounded-2xl rounded-tl-sm text-xs text-foreground/80 leading-relaxed max-w-[180px]">
                    Did you get the updated layout for the dashboard?
                </div>
            </div>
            <div className="flex gap-2 flex-row-reverse">
                <div className="w-6 h-6 rounded-full bg-foreground flex-shrink-0"></div>
                <div className="bg-foreground text-background p-3 rounded-2xl rounded-tr-sm text-xs leading-relaxed max-w-[180px]">
                    Yes! Pushing the changes now.
                </div>
            </div>
        </div>
    )
}

function MockMail() {
    return (
        <div className="bg-background border border-foreground/5 rounded-xl p-3 shadow-sm select-none">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-100/20 text-orange-600 dark:text-orange-400 flex items-center justify-center text-[10px] font-bold">M</div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-foreground">Matthew Aito</span>
                        <span className="text-[10px] text-foreground/50">Re: Rice Research</span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-foreground/30">7:41 AM</span>
                    <span className="px-1.5 py-0.5 bg-orange-100/10 text-orange-600 border border-orange-200/20 rounded-[4px] text-[8px] font-medium uppercase tracking-wider">Important</span>
                </div>
            </div>
            <p className="text-[11px] text-foreground/60 leading-relaxed line-clamp-2">
                Rice is a cereal grain and in its domesticated form is the staple food of over half of the world's population...
            </p>
        </div>
    )
}
