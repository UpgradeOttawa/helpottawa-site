import React from 'react';
import { Calculator, Map, Shield, Users, CheckCircle, ArrowRight, Star } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-red-600 rounded-full text-sm font-semibold mb-6">
                🇨🇦 Proudly Canadian • Ottawa-Based
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Plan Your Renovation with Confidence
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Free calculators, hazard checks, and verified contractors. 
                Everything you need to renovate smart in Ottawa.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/bathroom-calculator" 
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-lg transition-colors inline-flex items-center gap-2"
                >
                  Calculate Costs <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="/hazard-map" 
                  className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold text-lg transition-colors"
                >
                  Check for Hazards
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Free Forever
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Ottawa Pricing
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Verified Contractors
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <span>Average Bathroom Reno</span>
                    <span className="font-bold text-2xl">$24,500</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <span>Time to Complete</span>
                    <span className="font-bold text-2xl">2-3 weeks</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                    <span>Your Savings vs. Big Box</span>
                    <span className="font-bold text-2xl text-green-400">15-25%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-slate-600">
              From planning to completion, we've got Ottawa covered
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Cost Calculators</h3>
              <p className="text-slate-600 mb-4">
                Get instant estimates with Ottawa-specific pricing. No more guessing.
              </p>
              <a href="/bathroom-calculator" className="text-blue-600 font-semibold inline-flex items-center gap-1">
                Try Calculator <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Map className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hazard Mapping</h3>
              <p className="text-slate-600 mb-4">
                Check for asbestos, lead, radon, and mold before you start work.
              </p>
              <a href="/hazard-map" className="text-red-600 font-semibold inline-flex items-center gap-1">
                Check Your Area <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Contractors</h3>
              <p className="text-slate-600 mb-4">
                3D verified portfolios. See actual completed work before you hire.
              </p>
              <a href="/contractors" className="text-green-600 font-semibold inline-flex items-center gap-1">
                Find Contractors <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Fair Pricing</h3>
              <p className="text-slate-600 mb-4">
                Direct-to-worker connections. No middleman markups. Just fair rates.
              </p>
              <a href="/about" className="text-purple-600 font-semibold inline-flex items-center gap-1">
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Free Renovation Calculators
            </h2>
            <p className="text-xl text-slate-600">
              Ottawa-specific pricing. Get accurate estimates in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Calculator 1 - Bathroom */}
            <a href="/bathroom-calculator" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl hover:shadow-xl transition-all">
                <div className="text-4xl mb-4">🚿</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Bathroom Renovation</h3>
                <p className="text-slate-600 mb-4">
                  Calculate costs for fixtures, tile, plumbing, electrical, and more.
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                  Calculate Now <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </a>

            {/* Calculator 2 - Kitchen (Coming Soon) */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-8 rounded-xl opacity-75">
                <div className="text-4xl mb-4">🍳</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Kitchen Renovation</h3>
                <p className="text-slate-600 mb-4">
                  Cabinets, countertops, appliances, plumbing, electrical.
                </p>
                <div className="text-slate-500 font-semibold">Coming Soon</div>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full">
                SOON
              </div>
            </div>

            {/* Calculator 3 - Deck (Coming Soon) */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-8 rounded-xl opacity-75">
                <div className="text-4xl mb-4">🏡</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Deck Builder</h3>
                <p className="text-slate-600 mb-4">
                  Wood, composite, stone. Get estimates for your outdoor space.
                </p>
                <div className="text-slate-500 font-semibold">Coming Soon</div>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full">
                SOON
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">More calculators coming: Paint, Drywall, Flooring, Basement, and more!</p>
          </div>
        </div>
      </section>

      {/* Hazard Check CTA */}
      <section className="py-20 px-6 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-4xl font-bold mb-4">
            Check for Hazards Before You Start
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Ottawa homes built before 2000 may contain asbestos, lead paint, or radon. 
            Check your area for free before starting any renovation.
          </p>
          <a 
            href="/hazard-map" 
            className="inline-block px-8 py-4 bg-white text-red-600 hover:bg-red-50 rounded-lg font-bold text-lg transition-colors"
          >
            Check Hazard Map Now
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Ottawa Homeowners Love HelpOttawa
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-4">
                "The bathroom calculator was spot-on! Saved me from overpaying. The hazard check found asbestos we didn't know about. Lifesaver!"
              </p>
              <div className="font-semibold text-slate-900">Sarah M.</div>
              <div className="text-sm text-slate-500">Orléans</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-4">
                "Finally, accurate Ottawa pricing! No more wild guesses. The visual designer helped me plan the perfect layout."
              </p>
              <div className="font-semibold text-slate-900">Mike T.</div>
              <div className="text-sm text-slate-500">Kanata</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-4">
                "Found verified contractors through the site. The 3D tours let me see their actual work. So much better than just photos!"
              </p>
              <div className="font-semibold text-slate-900">Jennifer L.</div>
              <div className="text-sm text-slate-500">Barrhaven</div>
            </div>
          </div>
        </div>
      </section>

      {/* Canadian Focus */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-red-50 to-slate-50 rounded-2xl p-12 border-2 border-red-200">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-6xl mb-4">🇨🇦</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Supporting Canadian Manufacturing
                </h2>
                <p className="text-lg text-slate-700 mb-6">
                  We prioritize Canadian-made products and CCMC-certified materials. 
                  Support our economy while getting quality that meets Canadian building codes.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-slate-700">Canadian manufacturers featured first</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-slate-700">CCMC certified materials database</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-slate-700">Support local Ottawa suppliers</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Featured Canadian Suppliers</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="text-2xl">🏠</div>
                    <div>
                      <div className="font-semibold">Home Hardware</div>
                      <div className="text-sm text-slate-500">100% Canadian</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="text-2xl">🛠️</div>
                    <div>
                      <div className="font-semibold">RONA</div>
                      <div className="text-sm text-slate-500">Canadian Heritage</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="text-2xl">🚰</div>
                    <div>
                      <div className="font-semibold">EMCO Corporation</div>
                      <div className="text-sm text-slate-500">Ottawa-Based</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Renovation?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Get accurate estimates, check for hazards, and find verified contractors. All free.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="/bathroom-calculator" 
              className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-lg transition-colors"
            >
              Calculate Bathroom Cost
            </a>
            <a 
              href="/hazard-map" 
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold text-lg transition-colors"
            >
              Check for Hazards
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
