import React from 'react';
import { CheckCircle, Users, Shield, Heart, Zap, Target } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About HelpOttawa</h1>
          <p className="text-xl text-slate-300">
            Making renovation planning accessible, transparent, and fair for every Ottawa homeowner.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-xl text-slate-600">
              To empower homeowners with the tools, knowledge, and connections they need 
              to make confident renovation decisions.
            </p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">The Problem We're Solving</h3>
            <p className="text-slate-700 mb-4">
              For too long, homeowners have faced three major challenges when planning renovations:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="text-red-600 font-bold mt-1">1.</div>
                <div>
                  <span className="font-semibold">No way to estimate costs accurately</span> - 
                  Contractors give wildly different quotes ($15K-35K for the same bathroom!)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="text-red-600 font-bold mt-1">2.</div>
                <div>
                  <span className="font-semibold">Hidden hazards</span> - 
                  Asbestos, lead paint, radon, and mold discovered mid-project cost thousands to remediate
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="text-red-600 font-bold mt-1">3.</div>
                <div>
                  <span className="font-semibold">Can't verify contractor quality</span> - 
                  Photos can be faked, reviews can be bought, no way to see actual work
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Solution</h3>
            <p className="text-slate-700 mb-4">
              HelpOttawa provides three revolutionary tools in one platform:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Free Cost Calculators</span> - 
                  Ottawa-specific pricing based on real contractor data. Know what to expect before getting quotes.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Hazard Map</span> - 
                  Check your area for asbestos, lead, radon, and mold risks before you start work. Save thousands.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Matterport Verification</span> - 
                  3D tours of contractors' actual completed work. See quality before you hire.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Transparency</h3>
              <p className="text-slate-600">
                No hidden fees, no markups, no surprises. Everything is open and clear from day one.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fairness</h3>
              <p className="text-slate-600">
                Direct connections between homeowners and workers. No 15-25% middleman fees like HomeAdvisor.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Community</h3>
              <p className="text-slate-600">
                Supporting Ottawa workers, Canadian manufacturers, and local suppliers. Keep money in our economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Our Story</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 mb-6">
              HelpOttawa was born from 20 years of frustration with the renovation industry. 
              After watching countless Ottawa homeowners get taken advantage of by inaccurate estimates, 
              hidden hazards, and unverified contractors, we knew something had to change.
            </p>

            <p className="text-slate-700 mb-6">
              The final straw came when a friend's bathroom renovation budget ballooned from 
              $18,000 to $35,000 due to unexpected asbestos in the tile adhesive. The contractor 
              didn't check beforehand. The homeowner didn't know to ask. Thousands of dollars 
              and weeks of delays could have been avoided with a simple hazard check.
            </p>

            <p className="text-slate-700 mb-6">
              We started building the platform we wish existed: accurate cost calculators using 
              real Ottawa pricing data, hazard maps showing known risks by neighborhood, and a 
              verification system that lets you see contractors' actual completed work in 3D.
            </p>

            <p className="text-slate-700 mb-6">
              Today, HelpOttawa helps thousands of Ottawa homeowners plan smarter renovations, 
              avoid costly surprises, and connect with verified contractors who do quality work 
              at fair prices.
            </p>
          </div>

          <div className="mt-12 bg-gradient-to-br from-red-50 to-slate-50 rounded-2xl p-8 border-2 border-red-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">🇨🇦 Our Canadian Commitment</h3>
            <p className="text-slate-700 mb-4">
              We're proudly Canadian and committed to supporting our economy:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-slate-700">Canadian manufacturers featured first in our calculators</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-slate-700">CCMC-certified materials prioritized</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-slate-700">Ottawa suppliers and contractors supported</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-slate-700">Jobs kept in our community</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Plan Your Renovation?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of Ottawa homeowners using HelpOttawa to plan smarter renovations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="/bathroom-calculator" 
              className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-lg transition-colors"
            >
              Try Free Calculator
            </a>
            <a 
              href="/contact" 
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold text-lg transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
