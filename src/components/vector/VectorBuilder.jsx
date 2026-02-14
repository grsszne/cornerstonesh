"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Tooltip component
function Tooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full border border-foreground/30 text-foreground/40 hover:border-foreground/50 hover:text-foreground/60 transition-colors"
        style={{ fontSize: "10px", lineHeight: "1" }}
      >
        ?
      </button>
      {isVisible && (
        <div className="absolute z-50 left-0 top-6 w-64 p-3 bg-background border border-foreground/20 shadow-lg">
          <div className="font-sans text-xs text-foreground/70 leading-relaxed">
            {content}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

// Hardware database with 2026 pricing and specs
const HARDWARE = {
  gpus: [
    {
      id: "rtx-pro-6000",
      name: "RTX PRO 6000 Blackwell",
      vram: 96,
      tops: 4000,
      power: 600,
      price: 12500,
      cores: 24064,
    },
    {
      id: "rtx-5090",
      name: "RTX 5090",
      vram: 32,
      tops: 1800,
      power: 450,
      price: 2899,
      cores: 16384,
    },
    {
      id: "a6000-ada",
      name: "A6000 Ada",
      vram: 48,
      tops: 2400,
      power: 300,
      price: 8900,
      cores: 18176,
    },
  ],
  cpus: [
    {
      id: "threadripper-9995wx",
      name: "Threadripper PRO 9995WX",
      cores: 96,
      threads: 192,
      tdp: 350,
      price: 11699,
      pcie: 128,
      gen: "Shimada Peak (Zen 5)",
    },
    {
      id: "threadripper-9985wx",
      name: "Threadripper PRO 9985WX",
      cores: 64,
      threads: 128,
      tdp: 350,
      price: 7999,
      pcie: 128,
      gen: "Shimada Peak (Zen 5)",
    },
    {
      id: "threadripper-9975wx",
      name: "Threadripper PRO 9975WX",
      cores: 32,
      threads: 64,
      tdp: 350,
      price: 4099,
      pcie: 128,
      gen: "Shimada Peak (Zen 5)",
    },
    {
      id: "threadripper-9965wx",
      name: "Threadripper PRO 9965WX",
      cores: 24,
      threads: 48,
      tdp: 350,
      price: 2499,
      pcie: 128,
      gen: "Shimada Peak (Zen 5)",
    },
  ],
  ram: [
    { id: "byo", capacity: 0, ecc: false, price: 0, byo: true },
    { id: "64gb", capacity: 64, ecc: false, price: 580 },
    { id: "128gb", capacity: 128, ecc: false, price: 1180 },
    { id: "128gb-ecc", capacity: 128, ecc: true, price: 1680 },
    { id: "256gb-ecc", capacity: 256, ecc: true, price: 3800 },
    { id: "512gb-ecc", capacity: 512, ecc: true, price: 11500 },
  ],
  storage: [
    { id: "2tb", capacity: 2, gen: 4, price: 380 },
    { id: "4tb", capacity: 4, gen: 4, price: 780 },
    { id: "8tb", capacity: 8, gen: 4, price: 1600 },
    { id: "4tb-gen5", capacity: 4, gen: 5, price: 920 },
    { id: "8tb-gen5", capacity: 8, gen: 5, price: 1880 },
    { id: "16tb-gen5", capacity: 16, gen: 5, price: 4200 },
  ],
  networking: [
    { id: "1gbe", speed: 1, price: 0 },
    { id: "10gbe", speed: 10, price: 450 },
    { id: "25gbe", speed: 25, price: 1100 },
    { id: "100gbe", speed: 100, price: 3200 },
  ],
};

// Model size estimation (rough approximations)
const estimateModelCapacity = (totalVRAM) => {
  // FP16 requires ~2 bytes per parameter
  // Leave 20% overhead for KV cache and activations
  const usableVRAM = totalVRAM * 0.8;
  const paramsInBillions = (usableVRAM * 1024) / 2 / 1000;

  if (paramsInBillions >= 405) return "Llama 3.1 405B";
  if (paramsInBillions >= 180) return "Llama 3.1 405B (quantized)";
  if (paramsInBillions >= 70) return "Llama 3.1 70B or GPT-4 class";
  if (paramsInBillions >= 34) return "CodeLlama 34B or Mixtral 8x7B";
  if (paramsInBillions >= 13) return "Llama 2 13B";
  if (paramsInBillions >= 7) return "Llama 2 7B or Mistral 7B";
  return "Small models (<7B)";
};

export default function VectorBuilder() {
  const [config, setConfig] = useState({
    gpuId: "rtx-pro-6000",
    gpuCount: 2,
    cpuId: "threadripper-9975wx",
    ramId: "256gb-ecc",
    storageId: "8tb-gen5",
    networkId: "10gbe",
    nodeCount: 1,
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const specs = useMemo(() => {
    const gpu = HARDWARE.gpus.find((g) => g.id === config.gpuId);
    const cpu = HARDWARE.cpus.find((c) => c.id === config.cpuId);
    const ram = HARDWARE.ram.find((r) => r.id === config.ramId);
    const storage = HARDWARE.storage.find((s) => s.id === config.storageId);
    const network = HARDWARE.networking.find((n) => n.id === config.networkId);

    const gpusPerNode = config.gpuCount;
    const totalGPUs = gpusPerNode * config.nodeCount;
    const totalVRAM = gpu.vram * totalGPUs;
    const totalTOPS = gpu.tops * totalGPUs;

    // Per-node power calculation
    const powerPerNode = gpu.power * gpusPerNode + cpu.tdp + 150;
    const totalPower = powerPerNode * config.nodeCount;

    // Per-node pricing
    const nodePrice =
      gpu.price * gpusPerNode +
      cpu.price +
      ram.price +
      storage.price +
      network.price +
      4800; // Base system cost (enterprise case, redundant PSU, server mobo, liquid cooling, assembly, testing)

    const totalPrice = nodePrice * config.nodeCount;

    // Infrastructure costs (load balancer, switch, cabling, rack for multi-node)
    const infrastructureCost =
      config.nodeCount > 1 ? 8500 + (config.nodeCount - 1) * 1200 : 0;
    const totalPriceWithInfrastructure = totalPrice + infrastructureCost;

    const modelCapacity = estimateModelCapacity(totalVRAM);

    return {
      gpu,
      cpu,
      ram,
      storage,
      network,
      gpusPerNode,
      totalGPUs,
      totalVRAM,
      totalTOPS,
      powerPerNode,
      totalPower,
      nodePrice,
      totalPrice,
      infrastructureCost,
      totalPriceWithInfrastructure,
      modelCapacity,
    };
  }, [config]);

  const updateConfig = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="py-32 md:py-40 bg-muted">
      <div className="container-swiss">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Build Your Own Vector
          </h2>
          <p className="font-sans text-lg text-foreground/50 max-w-2xl mx-auto leading-relaxed">
            Configure enterprise-grade AI hardware for your exact workload. Real
            components. Real pricing. Real performance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Configuration Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            {/* GPU Selection */}
            <div className="border border-foreground/10 p-6">
              <div className="flex items-center mb-4">
                <label className="font-sans text-sm text-foreground/40 uppercase tracking-wider">
                  GPU
                </label>
                <Tooltip
                  content={
                    <>
                      <strong className="text-foreground">
                        Critical for inference.
                      </strong>{" "}
                      VRAM determines max model size. More VRAM = larger models.
                      TOPS affects throughput. For production inference, GPU is
                      your #1 bottleneck. Recommend 96GB+ for 70B+ models, 48GB
                      for 13-34B models.
                    </>
                  }
                />
              </div>
              <select
                value={config.gpuId}
                onChange={(e) => updateConfig("gpuId", e.target.value)}
                className="w-full bg-background border border-foreground/10 text-foreground font-sans px-4 py-3 mb-4 focus:outline-none focus:border-foreground/30"
              >
                {HARDWARE.gpus.map((gpu) => (
                  <option key={gpu.id} value={gpu.id}>
                    {gpu.name} — {gpu.vram}GB VRAM, {gpu.tops} TOPS — $
                    {gpu.price.toLocaleString()}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-4">
                <span className="font-sans text-sm text-foreground/40">
                  Quantity
                </span>
                <div className="flex gap-2">
                  {[1, 2, 4, 8].map((n) => (
                    <button
                      key={n}
                      onClick={() => updateConfig("gpuCount", n)}
                      className={`font-sans px-4 py-2 border transition-colors ${
                        config.gpuCount === n
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-foreground/50 border-foreground/10 hover:border-foreground/30"
                      }`}
                    >
                      ×{n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CPU Selection */}
            <div className="border border-foreground/10 p-6">
              <div className="flex items-center mb-4">
                <label className="font-sans text-sm text-foreground/40 uppercase tracking-wider">
                  CPU
                </label>
                <Tooltip
                  content={
                    <>
                      <strong className="text-foreground">
                        Moderate impact.
                      </strong>{" "}
                      Handles preprocessing, tokenization, and data movement.
                      More cores help with concurrent requests and batching. 32+
                      cores recommended for high-throughput inference. PCIe
                      lanes critical for multi-GPU setups.
                    </>
                  }
                />
              </div>
              <select
                value={config.cpuId}
                onChange={(e) => updateConfig("cpuId", e.target.value)}
                className="w-full bg-background border border-foreground/10 text-foreground font-sans px-4 py-3 focus:outline-none focus:border-foreground/30"
              >
                {HARDWARE.cpus.map((cpu) => (
                  <option key={cpu.id} value={cpu.id}>
                    {cpu.name} — {cpu.cores}C/{cpu.threads}T — $
                    {cpu.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* RAM Selection */}
            <div className="border border-foreground/10 p-6">
              <div className="flex items-center mb-4">
                <label className="font-sans text-sm text-foreground/40 uppercase tracking-wider">
                  RAM
                </label>
                <Tooltip
                  content={
                    <>
                      <strong className="text-foreground">
                        Important for context.
                      </strong>{" "}
                      System RAM stores KV cache overflow, request queues, and
                      model metadata. Larger context windows need more RAM. ECC
                      recommended for production. 256GB+ for serving 70B+ models
                      with long contexts.
                    </>
                  }
                />
              </div>
              <select
                value={config.ramId}
                onChange={(e) => updateConfig("ramId", e.target.value)}
                className="w-full bg-background border border-foreground/10 text-foreground font-sans px-4 py-3 focus:outline-none focus:border-foreground/30"
              >
                {HARDWARE.ram.map((ram) => (
                  <option key={ram.id} value={ram.id}>
                    {ram.byo
                      ? "Bring Your Own RAM — $0"
                      : `${ram.capacity}GB DDR5 ${ram.ecc ? "ECC" : ""} — $${ram.price.toLocaleString()}`}
                  </option>
                ))}
              </select>
              {config.ramId === "byo" && (
                <div className="mt-3 p-3 border border-foreground/20 bg-foreground/5">
                  <p className="font-sans text-xs text-foreground/60 leading-relaxed">
                    <strong className="text-foreground">
                      Using your own RAM?
                    </strong>{" "}
                    We recommend DDR5 ECC for production deployments. Ensure
                    compatibility with your selected CPU and motherboard.
                    Minimum 128GB recommended for 70B+ models. Consider
                    potential KV cache overflow. DDR5 required.
                  </p>
                </div>
              )}
            </div>

            {/* Storage Selection */}
            <div className="border border-foreground/10 p-6">
              <div className="flex items-center mb-4">
                <label className="font-sans text-sm text-foreground/40 uppercase tracking-wider">
                  Storage
                </label>
                <Tooltip
                  content={
                    <>
                      <strong className="text-foreground">
                        Low impact on inference.
                      </strong>{" "}
                      Stores model weights and logs. Fast NVMe reduces model
                      load times but doesn't affect runtime performance. Gen4
                      sufficient for most; Gen5 for frequent model swapping.
                      8TB+ for multiple large models.
                    </>
                  }
                />
              </div>
              <select
                value={config.storageId}
                onChange={(e) => updateConfig("storageId", e.target.value)}
                className="w-full bg-background border border-foreground/10 text-foreground font-sans px-4 py-3 focus:outline-none focus:border-foreground/30"
              >
                {HARDWARE.storage.map((storage) => (
                  <option key={storage.id} value={storage.id}>
                    {storage.capacity}TB NVMe Gen{storage.gen} — $
                    {storage.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Networking Selection */}
            <div className="border border-foreground/10 p-6">
              <div className="flex items-center mb-4">
                <label className="font-sans text-sm text-foreground/40 uppercase tracking-wider">
                  Networking
                </label>
                <Tooltip
                  content={
                    <>
                      <strong className="text-foreground">
                        Critical for clusters.
                      </strong>{" "}
                      10GbE fine for single-node or low-concurrency. 25GbE
                      recommended for production multi-node. 100GbE essential
                      for high-throughput clusters with 4+ GPUs per node to
                      prevent network bottlenecks.
                    </>
                  }
                />
              </div>
              <select
                value={config.networkId}
                onChange={(e) => updateConfig("networkId", e.target.value)}
                className="w-full bg-background border border-foreground/10 text-foreground font-sans px-4 py-3 focus:outline-none focus:border-foreground/30"
              >
                {HARDWARE.networking.map((net) => (
                  <option key={net.id} value={net.id}>
                    {net.speed}GbE
                    {net.price > 0
                      ? ` — $${net.price.toLocaleString()}`
                      : " (included)"}
                  </option>
                ))}
              </select>
            </div>

            {/* Node Count */}
            <div className="border border-foreground/10 p-6 bg-muted">
              <div className="flex items-center mb-4">
                <label className="font-sans text-sm text-foreground/40 uppercase tracking-wider">
                  Parallel Nodes
                </label>
                <Tooltip
                  content={
                    <>
                      <strong className="text-foreground">
                        Scale throughput.
                      </strong>{" "}
                      Multiple independent nodes process separate inference
                      requests in parallel. 2 nodes = 2× throughput, 3 nodes =
                      3× throughput. Perfect for high-concurrency workloads.
                      Each node runs its own models independently.
                    </>
                  }
                />
              </div>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => updateConfig("nodeCount", n)}
                    className={`flex-1 font-sans px-4 py-3 border transition-colors ${
                      config.nodeCount === n
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground/50 border-foreground/10 hover:border-foreground/30"
                    }`}
                  >
                    {n} {n === 1 ? "Node" : "Nodes"}
                  </button>
                ))}
              </div>
              <div className="font-sans text-xs text-foreground/40 leading-relaxed">
                {config.nodeCount === 1 ? (
                  <>Single node handles all inference requests</>
                ) : (
                  <>
                    {config.nodeCount} independent nodes with {specs.totalGPUs}{" "}
                    total GPUs. Load balancer distributes requests for{" "}
                    {config.nodeCount}× parallel throughput. Includes network
                    switch and cabling.
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Specs Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            {/* Total Price */}
            <div className="border border-foreground/10 p-8 mb-6 bg-background">
              <div className="font-sans text-sm text-foreground/40 uppercase tracking-wider mb-2">
                Total System Cost
              </div>
              <div className="font-serif text-5xl text-foreground mb-1 tabular-nums">
                ${specs.totalPriceWithInfrastructure.toLocaleString()}
              </div>
              <div className="font-sans text-sm text-foreground/30">
                {config.nodeCount > 1
                  ? `${config.nodeCount} nodes + networking`
                  : "One-time hardware purchase"}
              </div>
              {config.nodeCount > 1 && (
                <div className="mt-3 pt-3 border-t border-foreground/10 text-xs text-foreground/40">
                  ${specs.nodePrice.toLocaleString()} per node ×{" "}
                  {config.nodeCount} + $
                  {specs.infrastructureCost.toLocaleString()} infrastructure
                </div>
              )}
            </div>

            {/* Performance Stats */}
            <div className="border border-foreground/10 bg-background">
              <div className="grid grid-cols-2 gap-px bg-foreground/10">
                <div className="bg-background p-6">
                  <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-2">
                    Total VRAM
                  </div>
                  <div className="font-serif text-2xl text-foreground">
                    {specs.totalVRAM}GB
                  </div>
                  {config.nodeCount > 1 && (
                    <div className="font-sans text-xs text-foreground/30 mt-1">
                      {specs.gpu.vram * specs.gpusPerNode}GB per node
                    </div>
                  )}
                </div>
                <div className="bg-background p-6">
                  <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-2">
                    Total TOPS
                  </div>
                  <div className="font-serif text-2xl text-foreground">
                    {specs.totalTOPS.toLocaleString()}
                  </div>
                  {config.nodeCount > 1 && (
                    <div className="font-sans text-xs text-foreground/30 mt-1">
                      {specs.totalGPUs} GPUs total
                    </div>
                  )}
                </div>
                <div className="bg-background p-6">
                  <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-2">
                    Power Draw
                  </div>
                  <div className="font-serif text-2xl text-foreground">
                    {specs.totalPower}W
                  </div>
                  {config.nodeCount > 1 && (
                    <div className="font-sans text-xs text-foreground/30 mt-1">
                      {specs.powerPerNode}W per node
                    </div>
                  )}
                </div>
                <div className="bg-background p-6">
                  <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-2">
                    {config.nodeCount > 1 ? "Nodes" : "PCIe Lanes"}
                  </div>
                  <div className="font-serif text-2xl text-foreground">
                    {config.nodeCount > 1 ? config.nodeCount : specs.cpu.pcie}
                  </div>
                  {config.nodeCount > 1 && (
                    <div className="font-sans text-xs text-foreground/30 mt-1">
                      {specs.cpu.pcie} lanes each
                    </div>
                  )}
                </div>
              </div>

              {/* Model Capacity */}
              <div className="border-t border-foreground/10 p-6">
                <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-3">
                  Estimated Model Capacity
                </div>
                <div className="font-serif text-xl text-foreground mb-2">
                  {specs.modelCapacity}
                </div>
                <div className="font-sans text-xs text-foreground/30 leading-relaxed">
                  Based on FP16 precision with 20% overhead for KV cache. Actual
                  capacity varies with quantization and context length.
                </div>
              </div>

              {/* Load Balancing */}
              {config.nodeCount > 1 && (
                <div className="border-t border-foreground/10 p-6">
                  <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-3">
                    Load Balancing
                  </div>
                  <div className="font-serif text-lg text-foreground mb-2">
                    HAProxy + Health Checks
                  </div>
                  <div className="font-sans text-xs text-foreground/30 leading-relaxed">
                    Intelligent load balancer distributes incoming requests
                    across {config.nodeCount} nodes. Automatic failover, health
                    monitoring, and request queuing for optimal throughput.
                  </div>
                </div>
              )}

              {/* Component Breakdown */}
              <div className="border-t border-foreground/10 p-6 space-y-3">
                <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-4">
                  {config.nodeCount > 1
                    ? "Per-Node Configuration"
                    : "Configuration"}
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-sans text-sm text-foreground/50">
                    {config.gpuCount}× {specs.gpu.name}
                  </span>
                  <span className="font-sans text-sm text-foreground tabular-nums">
                    ${(specs.gpu.price * config.gpuCount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-sans text-sm text-foreground/50">
                    {specs.cpu.name}
                  </span>
                  <span className="font-sans text-sm text-foreground tabular-nums">
                    ${specs.cpu.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-sans text-sm text-foreground/50">
                    {specs.ram.byo
                      ? "RAM (Bring Your Own)"
                      : `${specs.ram.capacity}GB DDR5 ${specs.ram.ecc ? "ECC" : ""}`}
                  </span>
                  <span className="font-sans text-sm text-foreground tabular-nums">
                    {specs.ram.price > 0
                      ? `$${specs.ram.price.toLocaleString()}`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-sans text-sm text-foreground/50">
                    {specs.storage.capacity}TB NVMe Gen{specs.storage.gen}
                  </span>
                  <span className="font-sans text-sm text-foreground tabular-nums">
                    ${specs.storage.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-sans text-sm text-foreground/50">
                    {specs.network.speed}GbE Networking
                  </span>
                  <span className="font-sans text-sm text-foreground tabular-nums">
                    {specs.network.price > 0
                      ? `$${specs.network.price.toLocaleString()}`
                      : "Included"}
                  </span>
                </div>
                <div className="border-t border-foreground/10 pt-3 mt-3">
                  <div className="flex justify-between items-start">
                    <span className="font-sans text-sm text-foreground/50">
                      Base System
                    </span>
                    <span className="font-sans text-sm text-foreground tabular-nums">
                      $4,800
                    </span>
                  </div>
                  <div className="font-sans text-xs text-foreground/30 mt-1">
                    Enterprise chassis, redundant PSU, server mobo, liquid
                    cooling
                  </div>
                </div>
                {config.nodeCount > 1 && (
                  <>
                    <div className="border-t border-foreground/10 pt-3 mt-3">
                      <div className="flex justify-between items-start">
                        <span className="font-sans text-sm text-foreground/50">
                          Subtotal per Node
                        </span>
                        <span className="font-sans text-sm text-foreground tabular-nums">
                          ${specs.nodePrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-sans text-sm text-foreground/50">
                        × {config.nodeCount} Nodes
                      </span>
                      <span className="font-sans text-sm text-foreground tabular-nums">
                        ${specs.totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-sans text-sm text-foreground/50">
                        Cluster Infrastructure
                      </span>
                      <span className="font-sans text-sm text-foreground tabular-nums">
                        ${specs.infrastructureCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="font-sans text-xs text-foreground/30 mt-1">
                      {specs.network.speed}GbE switch, cabling, rack mount
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 border border-foreground/10 p-6 bg-background">
              <p className="font-sans text-sm text-foreground/50 mb-4">
                Need help sizing your infrastructure? We&apos;ll analyze your
                workload and recommend the optimal configuration.
              </p>
              <button className="w-full bg-foreground text-background font-sans text-sm uppercase tracking-wider py-3 px-6 hover:bg-foreground/90 transition-colors">
                Get Custom Quote
              </button>
            </div>
          </motion.div>
        </div>

        {/* Technical Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 max-w-3xl mx-auto border-t border-foreground/10 pt-12"
        >
          <h3 className="font-serif text-2xl text-foreground mb-6">
            Technical Notes
          </h3>
          <div className="space-y-4 font-sans text-sm text-foreground/50 leading-relaxed">
            <p>
              <strong className="text-foreground/70">
                Power Requirements:
              </strong>{" "}
              Systems over 2000W require 240V circuits or dual PSUs. We include
              enterprise-grade redundant power supplies for critical
              deployments.
            </p>
            <p>
              <strong className="text-foreground/70">Cooling:</strong> All
              configurations include professional-grade cooling solutions.
              Rack-mount systems support hot-aisle/cold-aisle deployments.
            </p>
            <p>
              <strong className="text-foreground/70">GPU Connectivity:</strong>{" "}
              Multi-GPU configurations use NVLink (when available) or PCIe 5.0
              switches for maximum inter-GPU bandwidth.
            </p>
            <p>
              <strong className="text-foreground/70">Load Balancing:</strong>{" "}
              Multi-node systems include HAProxy load balancer with health
              checks, automatic failover, and intelligent request distribution.
              Each node runs independently, processing separate inference
              requests in parallel for linear throughput scaling (2 nodes = 2×
              capacity, 3 nodes = 3× capacity).
            </p>
            <p>
              <strong className="text-foreground/70">
                Network Infrastructure:
              </strong>{" "}
              Multi-node configurations include enterprise switches with full
              non-blocking bandwidth, CAT8 or fiber cabling (depending on
              speed), and rack mounting hardware. 10GbE sufficient for most
              deployments; 25GbE or 100GbE for ultra-high concurrency workloads.
            </p>
            <p>
              <strong className="text-foreground/70">Warranty:</strong> 3-year
              parts and labor included. 4-hour response SLA available for
              enterprise customers.
            </p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 3rem;
        }
        select option {
          background: var(--background);
          color: var(--foreground);
        }
      `}</style>
    </section>
  );
}
