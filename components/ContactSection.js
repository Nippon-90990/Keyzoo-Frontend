// components/ContactSection.js
import React from "react";
import ContactCard from "./ContactCard";

import BusinessIcon from "@/public/contact/BusinessIcon";
import LegalIcon from "@/public/contact/LegalIcon";
import TalentIcon from "@/public/contact/TalentIcon";


export default function ContactSection() {
    return (
        <section className="bg-black text-white flex justify-center items-center h-screen">
            {/* centered spotlight */}
            <div className="relative ">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-12 w-[620px] h-[620px] rounded-full bg-purple-900/50 blur-[160px] pointer-events-none" />
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold">Contact Us</h1>
                        <p className="text-gray-400 mt-3">
                            Need any help? Or got a suggestion? Drop us an email!
                        </p>
                    </div>

                    {/* cards */}
                    <div className="grid gap-6 md:grid-cols-3">
                        <ContactCard
                            Icon={BusinessIcon}
                            title="Business Development"
                            email="business@driffle.com"
                        >
                            For all questions or information regarding our business, kindly
                            reach out to us at the following contact information:
                        </ContactCard>

                        <ContactCard
                            Icon={LegalIcon}
                            title="Legal Department"
                            email="legal@driffle.com"
                        >
                            For clarification or assistance with any legal matters, our team
                            of experts is available to assist you. Please contact them at:
                        </ContactCard>

                        <ContactCard
                            Icon={TalentIcon}
                            title="Talent Team"
                            email="careers@driffle.com"
                        >
                            Are you seeking a new employment opportunity? Our Talent team is
                            available to assist you. Please contact them at:
                        </ContactCard>
                    </div>

                    {/* Issues with purchase CTA (same style as earlier) */}
                    <div className="mt-20 text-center">
                        <h2 className="text-2xl font-semibold mb-2">Issues With Purchase?</h2>
                        <p className="text-gray-400 mb-6">
                            The best way to resolve it quickly is to create a ticket.
                        </p>
                        <button className="px-6 py-2 rounded-full border border-gray-700 bg-[#4444444d] text-white cursor-pointer hover:bg-transparent hover:border-white transition">
                            Mail us at
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
