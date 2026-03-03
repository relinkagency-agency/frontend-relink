/** @format */

import { getFeedbacks } from "@/lib/actions/feedbacks";
import { MessageSquare, Star, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { DeleteFeedbackButton } from "./delete-button";

export default async function AdminFeedbacksPage() {
    const result = await getFeedbacks();
    const feedbacks = result.data || [];

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-[family-name:var(--font-relink-fine)] text-white tracking-tight">
                    Testimonials
                </h1>
                <p className="text-white/40 font-[family-name:var(--font-relink-neue)] mt-2 italic">
                    Control guest feedback and approved testimonials.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedbacks.map((feedback: any) => (
                    <div key={feedback.id} className="group relative p-8 rounded-none bg-white/[0.02] border border-white/5 hover:border-amber-50/20 transition-all duration-500 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white/40 uppercase">
                                        {feedback.photoUrl ? (
                                            <span className="text-[10px]">PHOTO</span>
                                        ) : (
                                            feedback.name.charAt(0)
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white tracking-widest uppercase font-[family-name:var(--font-relink-neue)]">
                                            {feedback.name}
                                        </div>
                                        <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-0.5">
                                            {feedback.businessName || 'Reviewer'}
                                        </div>
                                    </div>
                                </div>
                                <div className={`text-[9px] px-2 py-0.5 rounded-none border font-bold uppercase tracking-widest ${feedback.status === 'approved' ? 'text-emerald-500 border-emerald-500/20' : 'text-amber-500 border-amber-500/20'}`}>
                                    {feedback.status}
                                </div>
                            </div>

                            <p className="text-xs text-white/60 leading-relaxed italic font-[family-name:var(--font-relink-neue)]">
                                "{feedback.content}"
                            </p>

                            <div className="text-[10px] text-amber-50/40 font-bold uppercase tracking-widest">
                                Using: {feedback.services || 'General'}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] text-white/20 uppercase font-black tracking-tighter">
                                {new Date(feedback.createdAt).toLocaleDateString()}
                            </span>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-none bg-white/5 border border-white/5 text-white/20 hover:text-emerald-500 transition-all" title="Approve">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                </button>
                                <DeleteFeedbackButton id={feedback.id} />
                            </div>
                        </div>
                    </div>
                ))}

                {feedbacks.length === 0 && (
                    <div className="col-span-full py-32 text-center rounded-none border border-dashed border-white/5">
                        <div className="p-6 rounded-none bg-white/5 w-fit mx-auto mb-6">
                            <MessageSquare className="w-8 h-8 text-white/20" />
                        </div>
                        <p className="text-white/40 font-[family-name:var(--font-relink-neue)] text-sm italic">
                            No testimonials received yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
