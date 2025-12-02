import Link from "next/link";

export const metadata = {
  title: "Project Protocol - Cornerstone",
  description: "Formal Request for Cross-Class ISP Authorization",
};

export default function TeachPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 relative border border-black/10 dark:border-white/10">
          {/* Diagonal lines background - only behind text content */}
          <div 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(315deg, transparent, transparent 20px, currentColor 20px, currentColor 21px)',
            }}
          />
          
          <div className="relative z-10 p-8 md:p-12">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm font-mono hover:opacity-70 transition-opacity mb-8"
            >
              &lt; Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              <span className="text-orange-500">Cornerstone</span>
            </h1>
            <p className="font-mono text-sm text-black/60 dark:text-white/60 mb-12 uppercase tracking-widest">
              We made this super secret page on our highly advanced website just for you, Teach. 
            </p>

            <div className="space-y-12 font-mono text-sm leading-relaxed">
              
              <section>
                <h2 className="text-2xl font-bold mb-6 underline decoration-2 decoration-orange-500 underline-offset-4">
                  1. The Request
                </h2>
                <p className="mb-4 text-lg font-medium">
                  We are asking for permission to form a cross-class Independent Study Project (ISP) team.
                </p>
                <p className="mb-4">
                  We know the rule: teams usually have to be in the same class period. We are asking for an exception because our project, <span className="font-bold">Cornerstone</span>, is too complex to be built by a random assortment of students. It requires a specific combination of hardware, software, and operational skills that only the three of us—Zane, Edgar, and Timi—can provide together.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6 underline decoration-2 decoration-orange-500 underline-offset-4">
                  2. You know who we are but you don't know what we're doing
                </h2>
                <p className="mb-6">
                  We have already divided responsibilities to ensure we can work asynchronously without blocking each other:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-black/20 dark:border-white/20 rounded-lg flex flex-col h-full">
                    <div className="text-orange-500 font-bold mb-1">OPERATIVE 01</div>
                    <div className="text-xl font-bold mb-2">Zane</div>
                    <div className="opacity-60 text-xs mb-2 font-bold">Role: Engineering Lead</div>
                    <ul className="list-disc list-inside text-xs opacity-80 space-y-1">
                      <li>Firmware Development</li>
                      <li>PCB Design & Manufacturing</li>
                      <li>Aluminum Chassis Design</li>
                      <li>Systems Architecture</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-black/20 dark:border-white/20 rounded-lg flex flex-col h-full">
                    <div className="text-orange-500 font-bold mb-1">OPERATIVE 02</div>
                    <div className="text-xl font-bold mb-2">Edgar</div>
                    <div className="opacity-60 text-xs mb-2 font-bold">Role: Software Lead</div>
                    <ul className="list-disc list-inside text-xs opacity-80 space-y-1">
                      <li>Public Web Presence</li>
                      <li>Local Dashboard UI</li>
                      <li>Backend API Integration</li>
                      <li>Network Telemetry</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-black/20 dark:border-white/20 rounded-lg flex flex-col h-full">
                    <div className="text-orange-500 font-bold mb-1">OPERATIVE 03</div>
                    <div className="text-xl font-bold mb-2">Timi</div>
                    <div className="opacity-60 text-xs mb-2 font-bold">Role: Operations & QA</div>
                    <ul className="list-disc list-inside text-xs opacity-80 space-y-1">
                      <li>Quality Assurance Testing</li>
                      <li>Product Rendering</li>
                      <li>Supply Chain Logistics</li>
                      <li>Market Research</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6 underline decoration-2 decoration-orange-500 underline-offset-4">
                  3. The Proposal
                </h2>
                <p className="mb-4">
                  We are not building "3D Snake." We are not building a "to-do list."
                </p>
                <p className="mb-4">
                  We are building <span className="font-bold">Cornerstone</span>, a hardware company. Our flagship product is the <span className="font-bold">Foundation</span>: a modular, stackable, aluminum-encased home server system designed for the post-cloud era.
                </p>
                
                <div className="space-y-8 mt-8">
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-orange-500">The Architecture</h3>
                    <p className="opacity-80 mb-4">
                      The Foundation is not a repackaged PC. It is a ground-up engineering effort centered around the <span className="font-bold">Raspberry Pi Compute Module 5 (CM5)</span>.
                    </p>
                    <ul className="list-disc list-inside opacity-80 space-y-2 ml-2">
                      <li><span className="font-bold">Compute:</span> Powered by the Broadcom BCM2712 Quad-core Cortex-A76 processor clocked at 2.4GHz, delivering desktop-class performance in a sub-5W power envelope.</li>
                      <li><span className="font-bold">Storage Fabric:</span> We have engineered a custom <span className="font-bold">Zero-Cable Backplane</span>. Unlike traditional servers that rely on a mess of SATA cables, our drives slot directly into a rigid PCB backbone. This supports up to 6x SATA SSDs with optimized airflow channels.</li>
                      <li><span className="font-bold">The Mortimer Interface:</span> This is our proprietary expansion standard. It utilizes a custom pinout carrying PCIe Gen 2, I2C for module discovery, and high-current power rails. This allows users to stack modules—like 2.5GbE networking, AI accelerators, or UPS battery backups—without tools or drivers.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-orange-500">The Physicality</h3>
                    <p className="opacity-80">
                      The chassis is CNC-milled from a solid block of <span className="font-bold">6061-T6 Aluminum</span>. It measures exactly 3.5" x 3.5" (89mm), matching the footprint of the drives it houses. The case itself acts as a passive thermal mass, dissipating heat from the NVMe drives and compute module, allowing for silent operation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-2 text-orange-500">The Software</h3>
                    <p className="opacity-80">
                      Hardware is useless without control. We are developing <span className="font-bold">CornerstoneOS</span>, a custom series of containerized services running on top of a<span className="font-bold">Debian</span> distro. The containers will include Kernel interfaces for direct hardware control, Next.js for web interfaces, NAS and other home server interfaces, and a Matter-native telemetry bridge, allowing the server to expose its health stats (CPU temp, fan speed, storage usage) directly to Apple HomeKit and Google Home.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6 underline decoration-2 decoration-orange-500 underline-offset-4">
                  4. Current Status (We Are Already Building)
                </h2>
                <p className="mb-4">
                  This is not just an idea. We have already begun significant engineering work to prove our commitment.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-black/10 dark:border-white/10 p-6 rounded-xl">
                    <h3 className="font-bold mb-2 text-orange-500">Hardware (CAD/EDA)</h3>
                    <p className="opacity-80 mb-4">
                      We are currently iterating on the aluminum chassis design in CAD, optimizing for thermal mass and manufacturability. The PCB backplane schematics are being finalized for the first prototype run.
                    </p>
                  </div>
                  <div className="border border-black/10 dark:border-white/10 p-6 rounded-xl">
                    <h3 className="font-bold mb-2 text-orange-500">Software Repositories</h3>
                    <p className="opacity-80 mb-4">
                      Currently, our <a href="https://cornerstone.sh" target="_blank" className="hover:text-orange-500 underline decoration-dotted underline-offset-4">public website</a>'s repository is public. It's repository can be seen here:
                    </p>
                    <ul className="space-y-2 text-xs">
                      <li>
                        <a href="https://github.com/grsszne/cornerstonesh/commits/" target="_blank" className="hover:text-orange-500 underline decoration-dotted underline-offset-4">
                          github.com/grsszne/cornerstonesh
                        </a>
                        <span className="block opacity-50 mt-1">The public-facing marketing site and documentation hub.</span>
                      </li>
                      <li>

                    <p className="opacity-80 mb-4">
                      Our firmware and os layer is currently private. It can be seen here. We can give you access if you want to help us.
                    </p>
                        <a href="https://github.com/grsszne/cornerstoneos/commits/" target="_blank" className="hover:text-orange-500 underline decoration-dotted underline-offset-4">
                          github.com/grsszne/cornerstoneos
                        </a>
                        <span className="block opacity-50 mt-1">The custom firmware and OS layer for the CM5.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6 underline decoration-2 decoration-orange-500 underline-offset-4">
                  5. The Exception
                </h2>
                <p className="mb-4">
                  We acknowledge that we are in different class periods. Logistically, this presents a coordination challenge.
                </p>
                <p className="mb-4">
                  However, the complexity of this project <em>requires</em> this specific configuration of talent.
                </p>
                <p className="mb-4">
                  A standard in-class group is formed by proximity. Our group is formed by necessity. Zane possesses the rare firmware/PCB skillset required to route the backplane. Edgar has the full-stack web experience to build the dashboard. Timi has the operational discipline to manage the supply chain and QA.
                </p>
                <p>
                  To force us into different groups would be to dilute three potential "A+" projects into three "B-" projects. We are willing to document our cross-class collaboration via GitHub commits, Slack logs, and rigorous Kanban board updates to prove that our output exceeds that of any co-located team.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6 underline decoration-2 decoration-orange-500 underline-offset-4">
                  6. The Deliverables
                </h2>
                <p className="mb-4">
                  By the end of the semester, we will deliver:
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded">HARDWARE</div>
                    <p>A functional physical prototype of the Foundation unit, CNC-milled or high-fidelity 3D printed, with working drive bays.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs font-bold rounded">SOFTWARE</div>
                    <p>A live, deployed version of CornerstoneOS (the dashboard you are looking at right now) controlling the hardware.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="border border-black dark:border-white px-2 py-1 text-xs font-bold rounded">DOCUMENTATION</div>
                    <p>A comprehensive engineering log (see /devlog) documenting every failure and success.</p>
                  </div>
                </div>
              </section>



              <section>
                <h2 className="text-2xl font-bold mb-6 underline decoration-2 decoration-orange-500 underline-offset-4">
                  7. Execution
                </h2>
                <p className="mb-8">
                  Signed (digitally) on this day, {"1 December 2025"}.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="border-t border-black dark:border-white pt-4">
                    <div className="font-script text-2xl mb-2 text-orange-500">Zane</div>
                    <div className="text-xs uppercase tracking-widest opacity-50">Zane</div>
                  </div>
                  <div className="border-t border-black dark:border-white pt-4">
                    <div className="font-script text-2xl mb-2 text-orange-500">Timi</div>
                    <div className="text-xs uppercase tracking-widest opacity-50">Timi</div>
                  </div>
                  <div className="border-t border-black dark:border-white pt-4">
                    <div className="font-script text-2xl mb-2 text-orange-500">Edgar</div>
                    <div className="text-xs uppercase tracking-widest opacity-50">Edgar</div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
