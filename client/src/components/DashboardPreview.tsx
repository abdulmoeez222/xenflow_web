import { motion } from "framer-motion";
import { TrendingUp, Users, MessageSquare, Phone } from "lucide-react";

export function DashboardPreview() {
    const stats = [
        { label: "Active Leads", value: "1,284", icon: Users, color: "text-blue-500", progress: 75 },
        { label: "Conversions", value: "87%", icon: TrendingUp, color: "text-green-500", progress: 87 },
        { label: "AI Responses", value: "5.4k", icon: MessageSquare, color: "text-primary", progress: 92 },
        { label: "Voice Calls", value: "942", icon: Phone, color: "text-purple-500", progress: 65 },
    ];

    return (
        <div className="w-full bg-black/60 rounded-3xl border border-white/10 p-6 font-sans overflow-hidden shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-white uppercase">Live Lead Capture</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/5"
                    >
                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                            <stat.icon className="w-3 h-3" />
                            <span className="text-[10px] uppercase tracking-wider">{stat.label}</span>
                        </div>
                        <div className="text-xl font-extrabold text-white mb-3">{stat.value}</div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${stat.progress}%` }}
                                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                className={`h-full bg-gradient-to-r from-primary to-primary/50`}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Live Feed */}
            <div className="space-y-4">
                {[
                    { name: "John D.", type: "Real Estate", time: "Just now", status: "Qualified" },
                    { name: "Sarah M.", type: "E-commerce", time: "2m ago", status: "Booked" },
                    { name: "Alex K.", type: "SaaS", time: "5m ago", status: "In Call" },
                ].map((lead, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                                {lead.name.split(' ')[0][0]}
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white">{lead.name}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-tighter">{lead.type}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-bold text-primary uppercase">{lead.status}</div>
                            <div className="text-[8px] text-gray-600">{lead.time}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
