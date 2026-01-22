import React from 'react';
import { Shield, Star, Eye, ArrowRight } from 'lucide-react';

const ContractorsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Find Verified Contractors</h1>
          <p className="text-xl text-slate-300">
            See actual completed work in 3D. Compare verified portfolios. Hire with confidence.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Coming Soon!</h2>
          <p className="text-xl text-slate-600 mb-8">
            We're building a network of verified Ottawa contractors with Matterport 3D verification.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-slate-50 p-8 rounded-xl">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Portfolios</h3>
              <p className="text-slate-600">3D Matterport scans of actual completed work</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-xl">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Real Reviews</h3>
              <p className="text-slate-600">From verified Ottawa homeowners</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-xl">
              <Eye className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">See Quality First</h3>
              <p className="text-slate-600">Virtual tours before you hire</p>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">For Contractors</h3>
            <p className="text-slate-700 mb-6">
              Interested in becoming a verified contractor? Get Matterport verification and featured placement for just $275/month.
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors">
              Apply Now <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContractorsPage;
