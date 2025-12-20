'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AsciiArt from '@/components/AsciiArt';
import FadeIn from '@/components/FadeIn';
import { getModuleColorClass, MODULE_OPTIONS } from '@/lib/modules';

// Mirror the FoundationBuilder options for config key generation
const MEMORY_OPTIONS = [
    { label: "Intel N100 8GB" },
    { label: "Intel N100 16GB" },
    { label: "Intel N305 16GB" },
];

const BOOT_STORAGE_OPTIONS = [
    { label: "256GB" },
    { label: "512GB" },
    { label: "1TB" },
    { label: "2TB" },
    { label: "4TB" },
    { label: "8TB" },
];

const NETWORKING_OPTIONS = [
    { id: "ethernet-1" },
    { id: "ethernet-2.5" },
    { id: "ethernet-5" },
    { id: "ethernet-10" },
];

const QUESTIONS = [
    {
        id: 'use-case',
        title: 'What will you primarily use Foundation for?',
        subtitle: 'Select all that apply',
        multiSelect: true,
        options: [
            { value: 'media', label: 'Media Server', description: 'Stream movies, music, and photos', weight: { storage: 3, network: 2, cpu: 1 } },
            { value: 'backup', label: 'Backup & Storage', description: 'Store files, photos, and backups', weight: { storage: 5, network: 1, cpu: 1 } },
            { value: 'development', label: 'Development', description: 'Docker, VMs, testing environments', weight: { storage: 2, network: 2, cpu: 5 } },
            { value: 'content-creation', label: 'Content Creation', description: 'Video editing, footage storage', weight: { storage: 4, network: 5, cpu: 2 } },
            { value: 'home-automation', label: 'Home Automation', description: 'Smart home hub, IoT devices', weight: { storage: 1, network: 2, cpu: 2 } },
            { value: 'surveillance', label: 'Security/Surveillance', description: 'IP cameras, NVR recording', weight: { storage: 5, network: 3, cpu: 2 } },
        ]
    },
    {
        id: 'storage',
        title: 'How much storage do you need?',
        subtitle: 'Think about current and future needs',
        multiSelect: false,
        options: [
            { value: 'small', label: '2-8TB', description: 'Documents, photos, light media', weight: { storage: 1 } },
            { value: 'medium', label: '8-24TB', description: 'Media library, backups', weight: { storage: 3 } },
            { value: 'large', label: '24-48TB', description: 'Large media collection, 4K content', weight: { storage: 4 } },
            { value: 'xlarge', label: '48TB+', description: 'Professional workflows, massive archives', weight: { storage: 5 } },
        ]
    },
    {
        id: 'performance',
        title: 'What level of performance do you need?',
        subtitle: 'Consider your most demanding workload',
        multiSelect: false,
        options: [
            { value: 'basic', label: 'Basic', description: 'File storage, simple services', weight: { cpu: 1 } },
            { value: 'moderate', label: 'Moderate', description: 'Media transcoding, multiple users', weight: { cpu: 2 } },
            { value: 'high', label: 'High', description: 'VMs, containers, heavy multitasking', weight: { cpu: 4 } },
            { value: 'extreme', label: 'Extreme', description: 'AI/ML workloads, development clusters', weight: { cpu: 5 } },
        ]
    },
    {
        id: 'network',
        title: 'What are your network speed requirements?',
        subtitle: 'Based on how you transfer files',
        multiSelect: false,
        options: [
            { value: '1gbe', label: '1 Gigabit', description: 'Standard home network, ~125 MB/s', weight: { network: 1 } },
            { value: '2.5gbe', label: '2.5 Gigabit', description: 'Fast transfers, ~312 MB/s', weight: { network: 2 } },
            { value: '5gbe', label: '5 Gigabit', description: 'Professional workflows, ~625 MB/s', weight: { network: 3 } },
            { value: '10gbe', label: '10 Gigabit', description: 'Enterprise grade, ~1.25 GB/s', weight: { network: 5 } },
        ]
    },
    {
        id: 'reliability',
        title: 'How important is data protection?',
        subtitle: 'Consider uptime and redundancy needs',
        multiSelect: false,
        options: [
            { value: 'standard', label: 'Standard', description: 'Regular backups are sufficient', weight: { reliability: 1 } },
            { value: 'important', label: 'Important', description: 'Some redundancy preferred', weight: { reliability: 3 } },
            { value: 'critical', label: 'Critical', description: 'Need RAID and UPS backup', weight: { reliability: 5 } },
        ]
    },
];

// Component pricing (base prices in dollars)
const PRICING = {
    cpu: {
        'N100': 0,      // base
        'N305': 200,    // upgrade
    },
    ram: {
        '8GB': 0,       // base
        '16GB': 100,    // upgrade
        '32GB': 250,    // upgrade
    },
    systemStorage: {
        '256GB': -50,   // downgrade
        '512GB': 0,     // base
        '1TB': 150,
        '2TB': 350,
    },
    expansionDrive: {
        '1TB': 80,
        '2TB': 140,
        '4TB': 260,
        '8TB': 480,
    },
    modules: {
        '2.5GbE': 80,
        '5GbE': 150,
        '10GbE': 300,
        'SD Reader': 60,
        'UPS': 120,
    },
    base: 499, // Base Foundation price
};

export default function ConfiguratorClient() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = QUESTIONS[currentStep];
    const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

    const handleAnswer = (questionId, value) => {
        const question = QUESTIONS.find(q => q.id === questionId);

        if (question.multiSelect) {
            const currentAnswers = answers[questionId] || [];
            const newAnswers = currentAnswers.includes(value)
                ? currentAnswers.filter(v => v !== value)
                : [...currentAnswers, value];
            setAnswers({ ...answers, [questionId]: newAnswers });
        } else {
            setAnswers({ ...answers, [questionId]: value });
        }
    };

    const handleNext = () => {
        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const canProceed = () => {
        const question = QUESTIONS[currentStep];
        const answer = answers[question.id];
        if (question.multiSelect) {
            return answer && answer.length > 0;
        }
        return answer !== undefined;
    };

    const buildCustomConfiguration = () => {
        const scores = {
            storage: 0,
            network: 0,
            cpu: 0,
            reliability: 0,
        };

        // Calculate weighted scores based on answers
        Object.entries(answers).forEach(([questionId, value]) => {
            const question = QUESTIONS.find(q => q.id === questionId);
            if (question.multiSelect) {
                value.forEach(v => {
                    const option = question.options.find(o => o.value === v);
                    if (option?.weight) {
                        Object.entries(option.weight).forEach(([key, weight]) => {
                            scores[key] = (scores[key] || 0) + weight;
                        });
                    }
                });
            } else {
                const option = question.options.find(o => o.value === value);
                if (option?.weight) {
                    Object.entries(option.weight).forEach(([key, weight]) => {
                        scores[key] = (scores[key] || 0) + weight;
                    });
                }
            }
        });

        // Determine CPU based on CPU score
        let cpu, cpuModel;
        if (scores.cpu >= 8) {
            cpu = 'N305';
            cpuModel = 'N305 (8-core)';
        } else {
            cpu = 'N100';
            cpuModel = 'N100 (4-core)';
        }

        // Determine RAM based on CPU and overall workload
        let ram;
        if (scores.cpu >= 4 || scores.storage >= 5) {
            ram = '16GB';
        } else {
            ram = '8GB';
        }

        // Determine system storage based on use case
        let systemStorage;
        if (scores.cpu >= 8) {
            systemStorage = '1TB';
        } else if (scores.cpu >= 4 || scores.storage >= 5) {
            systemStorage = '512GB';
        } else {
            systemStorage = '256GB';
        }

        // Determine expansion drives based on storage score
        let expansion, totalStorage, driveCount, driveSize;
        if (scores.storage >= 15) {
            driveCount = 4;
            driveSize = '8TB';
            totalStorage = '32TB';
        } else if (scores.storage >= 10) {
            driveCount = 4;
            driveSize = '4TB';
            totalStorage = '16TB';
        } else if (scores.storage >= 6) {
            driveCount = 2;
            driveSize = '4TB';
            totalStorage = '8TB';
        } else if (scores.storage >= 3) {
            driveCount = 2;
            driveSize = '2TB';
            totalStorage = '4TB';
        } else {
            driveCount = 1;
            driveSize = '2TB';
            totalStorage = '2TB';
        }

        // RAID configuration based on reliability
        const useRaid = scores.reliability >= 4 && driveCount >= 2;
        expansion = useRaid
            ? `${driveCount}× ${driveSize} RAID1`
            : driveCount > 1
                ? `${driveCount}× ${driveSize} (${totalStorage})`
                : `${driveCount}× ${driveSize}`;

        // Determine modules based on scores
        const modules = [];
        const bayConfig = [];

        // Map storage size to module ID
        const storageSizeMap = {
            '1TB': 'storage-1tb',
            '2TB': 'storage-2tb',
            '4TB': 'storage-4tb',
            '8TB': 'storage-8tb',
        };

        // Add storage drives to bays
        for (let i = 0; i < driveCount; i++) {
            bayConfig.push({
                id: storageSizeMap[driveSize],
                label: `${driveSize} NVMe`,
            });
        }

        // Network module - use exact user selection
        let networkModule = null;
        const networkAnswer = answers['network'];

        if (networkAnswer === '10gbe') {
            modules.push('10GbE');
            networkModule = { id: 'ethernet-10', label: '10GbE' };
        } else if (networkAnswer === '5gbe') {
            modules.push('5GbE');
            networkModule = { id: 'ethernet-5', label: '5GbE' };
        } else if (networkAnswer === '2.5gbe') {
            modules.push('2.5GbE');
            networkModule = { id: 'ethernet-2.5', label: '2.5GbE' };
        } else if (networkAnswer === '1gbe') {
            // 1GbE is standard, don't add to modules list
            networkModule = { id: 'ethernet-1', label: '1GbE' };
        }

        if (networkModule && networkModule.id !== 'ethernet-1') {
            bayConfig.push(networkModule);
        }

        // Content creation module
        const useCases = answers['use-case'] || [];
        if (useCases.includes('content-creation')) {
            modules.push('SD Reader');
            bayConfig.push({ id: 'sd-reader', label: 'Dual SD' });
        }

        // Reliability module
        if (scores.reliability >= 4) {
            modules.push('UPS');
            bayConfig.push({ id: 'ups', label: 'UPS' });
        }

        const modulesStr = modules.length > 0 ? modules.join(' + ') : '1GbE Standard';

        // Calculate total price
        let totalPrice = PRICING.base;
        totalPrice += PRICING.cpu[cpu];
        totalPrice += PRICING.ram[ram];
        totalPrice += PRICING.systemStorage[systemStorage];
        totalPrice += driveCount * PRICING.expansionDrive[driveSize];
        modules.forEach(mod => {
            totalPrice += PRICING.modules[mod] || 0;
        });

        // Personal configuration - no personas
        const name = 'Your Foundation';
        const tagline = 'CUSTOM BUILT';
        const description = 'Configured specifically for your workflow and requirements';

        // Generate use case descriptions
        const useCaseDescriptions = [];
        useCases.forEach(uc => {
            const option = QUESTIONS[0].options.find(o => o.value === uc);
            if (option) {
                useCaseDescriptions.push(option.description);
            }
        });

        // Add technical highlights
        if (scores.network >= 6) {
            useCaseDescriptions.push('High-speed network transfers');
        }
        if (useRaid) {
            useCaseDescriptions.push('Redundant RAID protection');
        }
        if (scores.cpu >= 8) {
            useCaseDescriptions.push('Heavy compute workloads');
        }

        // Generate config key using same bit packing as FoundationBuilder
        const generateConfigKey = () => {
            let val = BigInt(0);

            // Memory: 2 bits (position 0)
            const memoryLabel = cpu === 'N305' ? 'Intel N305 16GB' : (ram === '16GB' ? 'Intel N100 16GB' : 'Intel N100 8GB');
            const memIdx = MEMORY_OPTIONS.findIndex(o => o.label === memoryLabel);
            val |= BigInt(memIdx >= 0 ? memIdx : 0);

            // Boot Storage: 2 bits (position 2)
            const storageIdx = BOOT_STORAGE_OPTIONS.findIndex(o => o.label === systemStorage);
            val |= BigInt(storageIdx >= 0 ? storageIdx : 1) << BigInt(2);

            // Networking: 3 bits (position 4) - 0 = none, 1-4 = options
            const netIdx = networkModule ? NETWORKING_OPTIONS.findIndex(o => o.id === networkModule.id) + 1 : 0;
            val |= BigInt(netIdx) << BigInt(4);

            // Bays: 8 slots * 6 bits each
            bayConfig.forEach((bay, i) => {
                const shift = BigInt(7 + (i * 6));
                if (bay) {
                    const moduleIdx = MODULE_OPTIONS.findIndex(o => o.id === bay.id) + 1;
                    val |= BigInt(moduleIdx) << shift;
                }
            });

            // Encode to Base36
            return val.toString(36).toUpperCase();
        };

        const configKey = generateConfigKey();

        return {
            name,
            tagline,
            description,
            cpu: `${cpuModel} ${ram}`,
            cpuOption: cpu === 'N305' ? 'Intel N305 16GB' : (ram === '16GB' ? 'Intel N100 16GB' : 'Intel N100 8GB'),
            storage: `${systemStorage} NVMe`,
            bootStorageOption: systemStorage,
            expansion,
            modules: modulesStr,
            bayConfig,
            networkingId: networkModule?.id || 'ethernet-1',
            configKey,
            price: totalPrice,
            useCases: useCaseDescriptions.slice(0, 5), // Limit to 5 use cases
            scores, // Include scores for debugging
        };
    };

    const recommendedConfig = showResults ? buildCustomConfiguration() : null;

    if (showResults && recommendedConfig) {
        return (
            <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20">
                {/* Results Section */}
                <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]">
                        <AsciiArt width={200} height={100} numCircles={60} />
                    </div>

                    <div className="max-w-4xl mx-auto relative z-10">
                        <FadeIn>
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="h-px w-12 bg-orange-500"></div>
                                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-orange-500">
                                        {recommendedConfig.tagline}
                                    </span>
                                    <div className="h-px w-12 bg-orange-500"></div>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-4">
                                    {recommendedConfig.name}
                                </h1>
                                <p className="text-xl font-mono opacity-60">
                                    {recommendedConfig.description}
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="bg-gray-50 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 rounded-2xl p-8 md:p-12 mb-8">
                                {/* Header */}
                                <div className="mb-8 pb-6 border-b border-black/10 dark:border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-mono text-xs uppercase tracking-widest text-orange-500">
                                            Recommended Config
                                        </span>
                                        <span className="font-mono text-xs text-black/30 dark:text-white/30">
                                            {recommendedConfig.tagline}
                                        </span>
                                    </div>
                                </div>

                                {/* Use Cases */}
                                <div className="mb-8">
                                    <div className="font-mono text-xs uppercase tracking-wider text-black/40 dark:text-white/40 mb-4">
                                        Perfect For
                                    </div>
                                    <div className="space-y-3">
                                        {recommendedConfig.useCases.map((useCase, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <div className="w-1 h-1 bg-orange-500 mt-2 shrink-0"></div>
                                                <span className="text-sm opacity-70 leading-relaxed">{useCase}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Specifications */}
                                <div className="pt-6 border-t border-black/10 dark:border-white/10">
                                    <div className="font-mono text-xs uppercase tracking-wider text-black/40 dark:text-white/40 mb-4">
                                        System Spec
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between font-mono text-xs">
                                            <span className="text-black/40 dark:text-white/40">Processor</span>
                                            <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                                            <span className="text-black/80 dark:text-white/80">{recommendedConfig.cpu}</span>
                                        </div>
                                        <div className="flex items-center justify-between font-mono text-xs">
                                            <span className="text-black/40 dark:text-white/40">Boot Storage</span>
                                            <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                                            <span className="text-black/80 dark:text-white/80">{recommendedConfig.storage}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Installed Modules */}
                                {recommendedConfig.bayConfig.length > 0 && (
                                    <div className="pt-6 border-t border-black/10 dark:border-white/10 mt-6">
                                        <div className="font-mono text-xs uppercase tracking-wider text-black/40 dark:text-white/40 mb-4">
                                            Installed Modules
                                        </div>
                                        <div className="space-y-2">
                                            {recommendedConfig.bayConfig.map((mod, idx) => {
                                                const moduleType = mod.id.split('-')[0];
                                                const colorClass = moduleType === 'storage' ? 'orange' :
                                                                  moduleType === 'ethernet' ? 'green' :
                                                                  moduleType === 'sd' ? 'yellow' :
                                                                  moduleType === 'ups' ? 'purple' : 'orange';

                                                return (
                                                    <div
                                                        key={idx}
                                                        className={`flex justify-between font-mono text-xs pl-3 border-l-2 border-${colorClass}-500/30`}
                                                    >
                                                        <span className="text-black/60 dark:text-white/60">Bay {idx + 1}</span>
                                                        <span className={`text-${colorClass}-500`}>
                                                            {mod.label}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Price */}
                                <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-sm text-black/60 dark:text-white/60">
                                            Starting Price
                                        </span>
                                        <span className="text-3xl font-medium">
                                            ${recommendedConfig.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                                <Link
                                    href={`/foundation?key=${recommendedConfig.configKey}&ref=builder`}
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl"
                                >
                                    Build This Configuration →
                                </Link>
                                <button
                                    onClick={() => {
                                        setShowResults(false);
                                        setCurrentStep(0);
                                        setAnswers({});
                                    }}
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-transparent text-black dark:text-white border border-black/20 dark:border-white/20 hover:border-orange-500 hover:text-orange-500 transition-all duration-300 rounded-full"
                                >
                                    Start Over
                                </button>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20">
            {/* Questionnaire Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]">
                    <AsciiArt width={200} height={100} numCircles={60} />
                </div>

                <div className="max-w-3xl mx-auto w-full relative z-10">
                    {/* Progress Bar */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-mono text-xs uppercase tracking-wider opacity-40">
                                Question {currentStep + 1} of {QUESTIONS.length}
                            </span>
                            <span className="font-mono text-xs uppercase tracking-wider opacity-40">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <div className="h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-orange-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Question */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
                                    {currentQuestion.title}
                                </h2>
                                <p className="font-mono text-sm opacity-60">
                                    {currentQuestion.subtitle}
                                </p>
                            </div>

                            {/* Options */}
                            <div className="space-y-4 mb-12">
                                {currentQuestion.options.map((option) => {
                                    const isSelected = currentQuestion.multiSelect
                                        ? (answers[currentQuestion.id] || []).includes(option.value)
                                        : answers[currentQuestion.id] === option.value;

                                    return (
                                        <motion.button
                                            key={option.value}
                                            onClick={() => handleAnswer(currentQuestion.id, option.value)}
                                            className={`
                                                w-full text-left p-6 rounded-xl border transition-all duration-300
                                                ${isSelected
                                                    ? 'border-orange-500 bg-orange-500/5'
                                                    : 'border-black/10 dark:border-white/10 hover:border-orange-500/50'
                                                }
                                            `}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`
                                                    w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5
                                                    ${isSelected
                                                        ? 'border-orange-500 bg-orange-500'
                                                        : 'border-black/20 dark:border-white/20'
                                                    }
                                                `}>
                                                    {isSelected && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="w-2 h-2 bg-white rounded-full"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium mb-1">{option.label}</div>
                                                    <div className="font-mono text-xs opacity-60">
                                                        {option.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                    className={`
                                        inline-flex items-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-wider
                                        transition-all duration-300 rounded-full
                                        ${currentStep === 0
                                            ? 'opacity-30 cursor-not-allowed'
                                            : 'hover:text-orange-500'
                                        }
                                    `}
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={!canProceed()}
                                    className={`
                                        inline-flex items-center gap-2 px-8 py-4 font-mono text-sm uppercase tracking-wider
                                        transition-all duration-300 rounded-full
                                        ${canProceed()
                                            ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl'
                                            : 'bg-black/10 dark:bg-white/10 opacity-30 cursor-not-allowed'
                                        }
                                    `}
                                >
                                    {currentStep === QUESTIONS.length - 1 ? 'See Results' : 'Next'} →
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </main>
    );
}
