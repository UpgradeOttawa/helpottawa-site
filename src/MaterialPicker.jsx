import React, { useMemo, useState } from 'react';
import {
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  Filter,
  Leaf,
  MapPin,
  Search,
  ShoppingCart,
  X,
} from 'lucide-react';
import helpOttawaConfig from './helpOttawaConfig';

const BUY_CANADIAN_ART = 'https://static.wixstatic.com/media/6fa76d_1ef047b6c7c04dfba963240f331051cc~mv2.jpg/v1/fill/w_614,h_614,al_c,q_85,enc_avif,quality_auto/file-QxG4YYTqyiiaAUnTKz72F5_edited.jpg';
const PAINTOTTAWA_HOMEUPGRADERS_MARK = 'https://static.wixstatic.com/media/6fa76d_1e0695f9d7b54e018ea9f073a400825d.jpg/v1/fill/w_600,h_36,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/6fa76d_1e0695f9d7b54e018ea9f073a400825d.jpg';

const materialGroups = [
  { id: 'all', label: 'All materials', keywords: [] },
  { id: 'lumber', label: 'Lumber & framing', keywords: ['hardware', 'materials', 'building'] },
  { id: 'drywall', label: 'Drywall & insulation', keywords: ['hardware', 'materials', 'building'] },
  { id: 'paint', label: 'Paint & coatings', keywords: ['paint', 'coatings', 'hardware', 'materials'] },
  { id: 'flooring', label: 'Flooring & tile', keywords: ['tile', 'stone', 'materials'] },
  { id: 'plumbing', label: 'Plumbing & fixtures', keywords: ['plumbing', 'fixtures'] },
  { id: 'electrical', label: 'Electrical & lighting', keywords: ['hardware', 'materials', 'building'] },
  { id: 'roofing', label: 'Roofing & exterior', keywords: ['hardware', 'materials', 'building'] },
  { id: 'trim', label: 'Trim & millwork', keywords: ['hardware', 'materials', 'building'] },
];

const projectPhases = [
  'Any phase',
  'Site preparation & demolition',
  'Framing & structural work',
  'Plumbing & HVAC',
  'Electrical & lighting',
  'Insulation & air sealing',
  'Drywall & interior walls',
  'Painting & finishing',
  'Flooring installation',
  'Cabinetry & millwork',
  'Doors & trim',
  'Roofing & exterior protection',
  'Final fixtures & hardware',
];

const phaseToGroup = {
  'Framing & structural work': 'lumber',
  'Plumbing & HVAC': 'plumbing',
  'Electrical & lighting': 'electrical',
  'Insulation & air sealing': 'drywall',
  'Drywall & interior walls': 'drywall',
  'Painting & finishing': 'paint',
  'Flooring installation': 'flooring',
  'Cabinetry & millwork': 'trim',
  'Doors & trim': 'trim',
  'Roofing & exterior protection': 'roofing',
  'Final fixtures & hardware': 'all',
};

function csvEscape(value) {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

function MapleLeaf({ className = '' }) {
  return (
    <svg viewBox="0 0 64 72" aria-hidden="true" className={className} fill="currentColor">
      <path d="M32 0l5.7 12.5 10.9-5.4-2.7 13.2 12.3 2.2-9.4 9.3 7.4 7.4-16.8 2.9 2.4 17.3-9.8-5.9-9.8 5.9 2.4-17.3-16.8-2.9 7.4-7.4-9.4-9.3 12.3-2.2-2.7-13.2 10.9 5.4L32 0z" />
      <path d="M29.5 52h5v20h-5z" />
    </svg>
  );
}

export default function MaterialPicker() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');
  const [phase, setPhase] = useState('Any phase');
  const [canadianOnly, setCanadianOnly] = useState(true);
  const [selected, setSelected] = useState([]);

  const suppliers = useMemo(() => {
    const q = query.trim().toLowerCase();
    const activeGroup = materialGroups.find((item) => item.id === group) ?? materialGroups[0];

    return helpOttawaConfig.suppliers
      .filter((supplier) => !canadianOnly || supplier.canadianOwned)
      .filter((supplier) => {
        if (!activeGroup.keywords.length) return true;
        const haystack = `${supplier.name} ${supplier.category}`.toLowerCase();
        return activeGroup.keywords.some((keyword) => haystack.includes(keyword));
      })
      .filter((supplier) => {
        if (!q) return true;
        return `${supplier.name} ${supplier.category} ${supplier.locations}`.toLowerCase().includes(q);
      })
      .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
  }, [query, group, canadianOnly]);

  const manufacturers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return helpOttawaConfig.canadianManufacturers.filter((maker) => {
      if (!q) return true;
      return `${maker.name} ${maker.category} ${maker.location} ${maker.availableAt.join(' ')}`
        .toLowerCase()
        .includes(q);
    });
  }, [query]);

  const choosePhase = (value) => {
    setPhase(value);
    setGroup(phaseToGroup[value] ?? 'all');
  };

  const toggleSelected = (supplier) => {
    setSelected((current) =>
      current.some((item) => item.name === supplier.name)
        ? current.filter((item) => item.name !== supplier.name)
        : [...current, supplier]
    );
  };

  const exportSelection = () => {
    const rows = [
      ['Supplier', 'Category', 'Location', 'Canadian-owned directory flag', 'Website'],
      ...selected.map((supplier) => [
        supplier.name,
        supplier.category,
        supplier.locations,
        supplier.canadianOwned ? 'Yes' : 'No',
        supplier.url,
      ]),
    ];
    const blob = new Blob([rows.map((row) => row.map(csvEscape).join(',')).join('\n')], {
      type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'helpottawa-canadian-material-suppliers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-slate-950">
      <header className="border-b border-red-900/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="HelpOttawa Canadian Material Picker home">
            <span className="grid h-11 w-11 place-items-center rounded-sm bg-[#d71920] text-white shadow-sm">
              <MapleLeaf className="h-7 w-7" />
            </span>
            <span>
              <strong className="block text-xl font-black tracking-tight">HelpOttawa.ca</strong>
              <span className="block text-[10px] font-black uppercase tracking-[.23em] text-[#d71920]">Canadian Material Picker</span>
            </span>
          </a>
          <a
            href="https://www.paintottawa.com/buy-canadian"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-red-300 hover:text-[#b5121b] sm:inline-flex"
          >
            Original Buy Canadian resource <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-red-900/10 bg-white">
        <MapleLeaf className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 rotate-12 text-red-50 md:h-96 md:w-96" />
        <MapleLeaf className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 -rotate-12 text-red-50" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-10 md:px-8 md:py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 border-l-4 border-[#d71920] bg-red-50 px-4 py-2 text-sm font-black uppercase tracking-[.12em] text-[#b5121b]">
              <MapleLeaf className="h-5 w-5" /> Buy Canadian renovation materials
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl md:text-6xl">
              Find the Canadian option <span className="text-[#d71920]">before you buy.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              The Buy Canadian material idea started as a PaintOttawa resource. HelpOttawa expands it across renovation trades so you can search Ottawa suppliers, compare Canadian-first options and build a sourcing list for the job.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold">
              <span className="rounded-full bg-[#d71920] px-4 py-2 text-white">🇨🇦 Canadian-owned filter</span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2">Ottawa supplier directory</span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2">Renovation phase matching</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -inset-3 rotate-2 rounded-[2rem] bg-[#d71920]" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-3 shadow-2xl">
              <img
                src={BUY_CANADIAN_ART}
                alt="Buy Canadian material artwork from the established PaintOttawa resource"
                className="aspect-square w-full rounded-[1.15rem] object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,.08)]">
          <div className="bg-[#d71920] px-5 py-4 text-white md:px-7">
            <p className="text-xs font-black uppercase tracking-[.2em]">Start with your project</p>
            <h2 className="mt-1 text-xl font-black">What are you buying?</h2>
          </div>
          <div className="grid gap-4 p-5 md:p-7 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
            <label className="relative block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[.16em] text-slate-500">Search</span>
              <Search className="pointer-events-none absolute bottom-3.5 left-3.5 h-5 w-5 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Supplier, manufacturer, material…"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-950 outline-none ring-red-500 transition focus:border-red-400 focus:ring-2"
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-black uppercase tracking-[.16em] text-slate-500">Project phase</span>
              <div className="relative">
                <select
                  value={phase}
                  onChange={(event) => choosePhase(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-950 outline-none ring-red-500 focus:border-red-400 focus:ring-2"
                >
                  {projectPhases.map((item) => <option key={item}>{item}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
              </div>
            </label>

            <label>
              <span className="mb-2 block text-xs font-black uppercase tracking-[.16em] text-slate-500">Material group</span>
              <div className="relative">
                <select
                  value={group}
                  onChange={(event) => setGroup(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-950 outline-none ring-red-500 focus:border-red-400 focus:ring-2"
                >
                  {materialGroups.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
                <Filter className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
              </div>
            </label>

            <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl border-2 border-red-100 bg-red-50 px-4 py-3 text-[#a90f17]">
              <input
                type="checkbox"
                checked={canadianOnly}
                onChange={(event) => setCanadianOnly(event.target.checked)}
                className="h-5 w-5 accent-[#d71920]"
              />
              <span className="text-sm font-black">Canadian-owned only</span>
            </label>
          </div>
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[1fr_340px]">
          <div>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[.18em] text-[#d71920]">
                  <MapleLeaf className="h-5 w-5" /> Ottawa supplier directory
                </p>
                <h2 className="mt-1 text-3xl font-black tracking-tight">{suppliers.length} matching suppliers</h2>
              </div>
              {query && (
                <button onClick={() => setQuery('')} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#d71920]">
                  <X className="h-4 w-4" /> Clear search
                </button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {suppliers.map((supplier) => {
                const isSelected = selected.some((item) => item.name === supplier.name);
                return (
                  <article key={supplier.name} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-lg">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {supplier.canadianOwned && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d71920] px-3 py-1 text-xs font-black text-white">
                              <MapleLeaf className="h-3.5 w-3.5" /> Canadian-owned
                            </span>
                          )}
                          {supplier.featured && <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">Ottawa pick</span>}
                        </div>
                        <h3 className="mt-3 text-xl font-black text-slate-950">{supplier.name}</h3>
                        <p className="mt-1 text-sm font-medium text-slate-500">{supplier.category}</p>
                      </div>
                      <button
                        onClick={() => toggleSelected(supplier)}
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 transition ${isSelected ? 'border-[#d71920] bg-[#d71920] text-white' : 'border-slate-200 bg-white text-slate-500 hover:border-red-300 hover:text-[#d71920]'}`}
                        aria-label={isSelected ? `Remove ${supplier.name}` : `Add ${supplier.name}`}
                      >
                        {isSelected ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                      </button>
                    </div>
                    <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                      <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d71920]" /> {supplier.locations}</p>
                      {supplier.discount && <p className="flex gap-2"><Leaf className="mt-0.5 h-4 w-4 shrink-0 text-[#d71920]" /> {supplier.discount}</p>}
                    </div>
                    <a href={supplier.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#c3151d] hover:text-[#8f0e14]">
                      Visit supplier <ExternalLink className="h-4 w-4" />
                    </a>
                  </article>
                );
              })}
            </div>

            {!suppliers.length && (
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                No directory match for those filters. Remove a filter or search a broader term.
              </div>
            )}

            <div className="mt-12 border-t-4 border-[#d71920] pt-7">
              <p className="text-sm font-black uppercase tracking-[.18em] text-[#d71920]">Canadian manufacturer / operations index</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight">Canadian sourcing leads in the current HelpOttawa catalogue</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">A Canadian office or facility does not prove that every product is manufactured in Canada. Treat these as leads and verify the specific SKU before purchase.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {manufacturers.map((maker) => (
                  <article key={maker.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-black">{maker.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{maker.category}</p>
                      </div>
                      {maker.ccmcCertified && <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-800">CCMC flag</span>}
                    </div>
                    <p className="mt-4 flex gap-2 text-sm text-slate-700"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d71920]" /> {maker.location}</p>
                    <p className="mt-3 text-xs leading-5 text-slate-500">Directory says available at: {maker.availableAt.join(', ')}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg xl:sticky xl:top-6">
            <div className="bg-[#d71920] px-5 py-5 text-white">
              <p className="text-xs font-black uppercase tracking-[.2em] text-red-100">Your Canadian sourcing list</p>
              <h2 className="mt-2 text-xl font-black">{selected.length ? `${selected.length} supplier${selected.length === 1 ? '' : 's'} saved` : 'Build a shortlist'}</h2>
            </div>
            <div className="p-5">
              <p className="text-sm leading-6 text-slate-600">Tap the cart icon on a supplier, then export the shortlist for your project.</p>
              <div className="mt-5 space-y-2">
                {selected.map((supplier) => (
                  <div key={supplier.name} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
                    <span className="text-sm font-bold">{supplier.name}</span>
                    <button onClick={() => toggleSelected(supplier)} className="text-slate-400 hover:text-[#d71920]" aria-label={`Remove ${supplier.name}`}>
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={exportSelection}
                disabled={!selected.length}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d71920] px-4 py-3 font-black text-white transition hover:bg-[#b5121b] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <Download className="h-5 w-5" /> Export shortlist CSV
              </button>
              <div className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                <strong className="mb-1 block text-slate-700">Verify before you buy.</strong>
                HelpOttawa does not claim a commercial relationship with listed suppliers. Supplier ownership and manufacturer details are directory metadata. Verify stock, price, product origin and certification directly with the seller or manufacturer.
              </div>
            </div>
          </aside>
        </section>
      </main>

      <section className="mt-6 border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 md:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#d71920]">Where this started</p>
            <h2 className="mt-1 text-2xl font-black">PaintOttawa’s Buy Canadian material resource, expanded for every renovation trade.</h2>
          </div>
          <a href="https://www.paintottawa.com/buy-canadian" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-black text-[#c3151d]">
            View the original page <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
          <img
            src={PAINTOTTAWA_HOMEUPGRADERS_MARK}
            alt="PaintOttawa.com by HomeUpgraders.ca"
            className="h-auto max-h-14 max-w-full object-contain object-left"
            loading="lazy"
          />
        </div>
      </section>

      <footer className="bg-[#d71920] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex items-center gap-3">
            <MapleLeaf className="h-9 w-9" />
            <div>
              <div className="text-lg font-black">HelpOttawa.ca</div>
              <div className="text-sm text-red-100">Canadian-first renovation sourcing · Ottawa, Ontario</div>
            </div>
          </div>
          <div className="text-sm font-bold text-red-50">A HomeUpgraders renovation resource</div>
        </div>
      </footer>
    </div>
  );
}
