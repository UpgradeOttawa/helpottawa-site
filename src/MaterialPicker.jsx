import React, { useMemo, useState } from 'react';
import {
  Check,
  ChevronDown,
  ExternalLink,
  Filter,
  Leaf,
  MapPin,
  Search,
  ShoppingCart,
  X,
  Download,
} from 'lucide-react';
import helpOttawaConfig from './helpOttawaConfig';

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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(220,38,38,.2),_transparent_34%),linear-gradient(135deg,#020617,#111827)]">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100">
            <span aria-hidden="true">🇨🇦</span> HelpOttawa.ca · Canadian-first renovation sourcing
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                Find the Canadian option before you buy the imported one.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Pick a renovation phase or material category, then compare Ottawa-area suppliers and Canadian manufacturer options already catalogued by HelpOttawa.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-slate-300 backdrop-blur">
              <strong className="block text-base text-white">Origin matters. Evidence matters more.</strong>
              Supplier ownership and manufacturer details are directory metadata, not a guarantee that every SKU is made in Canada. Check the package, manufacturer origin statement, and current supplier listing before purchase.
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-black/20 md:p-7">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
            <label className="relative block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[.18em] text-slate-400">Search</span>
              <Search className="pointer-events-none absolute bottom-3.5 left-3.5 h-5 w-5 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Supplier, manufacturer, material…"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-white outline-none ring-red-500 transition focus:ring-2"
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-[.18em] text-slate-400">Project phase</span>
              <div className="relative">
                <select
                  value={phase}
                  onChange={(event) => choosePhase(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-10 text-white outline-none ring-red-500 focus:ring-2"
                >
                  {projectPhases.map((item) => <option key={item}>{item}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-500" />
              </div>
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-[.18em] text-slate-400">Material group</span>
              <div className="relative">
                <select
                  value={group}
                  onChange={(event) => setGroup(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-10 text-white outline-none ring-red-500 focus:ring-2"
                >
                  {materialGroups.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
                <Filter className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-500" />
              </div>
            </label>

            <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
              <input
                type="checkbox"
                checked={canadianOnly}
                onChange={(event) => setCanadianOnly(event.target.checked)}
                className="h-5 w-5 accent-red-600"
              />
              <span className="text-sm font-semibold">Canadian-owned suppliers first</span>
            </label>
          </div>
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[1fr_340px]">
          <div>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[.2em] text-red-400">Ottawa supplier directory</p>
                <h2 className="mt-1 text-2xl font-black">{suppliers.length} matching suppliers</h2>
              </div>
              {query && (
                <button onClick={() => setQuery('')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
                  <X className="h-4 w-4" /> Clear search
                </button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {suppliers.map((supplier) => {
                const isSelected = selected.some((item) => item.name === supplier.name);
                return (
                  <article key={supplier.name} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-600">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {supplier.canadianOwned && <span className="rounded-full bg-red-500/15 px-2.5 py-1 text-xs font-bold text-red-200">🇨🇦 Canadian-owned</span>}
                          {supplier.featured && <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-200">Local pick</span>}
                        </div>
                        <h3 className="mt-3 text-xl font-bold text-white">{supplier.name}</h3>
                        <p className="mt-1 text-sm text-slate-400">{supplier.category}</p>
                      </div>
                      <button
                        onClick={() => toggleSelected(supplier)}
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition ${isSelected ? 'border-red-500 bg-red-600 text-white' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'}`}
                        aria-label={isSelected ? `Remove ${supplier.name}` : `Add ${supplier.name}`}
                      >
                        {isSelected ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                      </button>
                    </div>
                    <div className="mt-5 space-y-2 text-sm text-slate-300">
                      <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" /> {supplier.locations}</p>
                      {supplier.discount && <p className="flex gap-2"><Leaf className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" /> {supplier.discount}</p>}
                    </div>
                    <a href={supplier.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-red-300 hover:text-red-200">
                      Visit supplier <ExternalLink className="h-4 w-4" />
                    </a>
                  </article>
                );
              })}
            </div>

            {!suppliers.length && (
              <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
                No directory match for those filters. Remove a filter or search a broader term.
              </div>
            )}

            <div className="mt-10">
              <p className="text-sm font-bold uppercase tracking-[.2em] text-red-400">Canadian manufacturer index</p>
              <h2 className="mt-1 text-2xl font-black">Manufacturer options in the current HelpOttawa catalogue</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {manufacturers.map((maker) => (
                  <article key={maker.name} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold">{maker.name}</h3>
                        <p className="mt-1 text-sm text-slate-400">{maker.category}</p>
                      </div>
                      {maker.ccmcCertified && <span className="rounded-full bg-blue-500/15 px-2.5 py-1 text-xs font-bold text-blue-200">CCMC flag</span>}
                    </div>
                    <p className="mt-4 text-sm text-slate-300">{maker.location}</p>
                    <p className="mt-3 text-xs leading-5 text-slate-500">Directory says available at: {maker.availableAt.join(', ')}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-5 xl:sticky xl:top-6">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">Your sourcing list</p>
            <h2 className="mt-2 text-xl font-black">{selected.length ? `${selected.length} supplier${selected.length === 1 ? '' : 's'} saved` : 'Build a shortlist'}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Tap the cart icon on any supplier to compare a short list for this job.</p>
            <div className="mt-5 space-y-2">
              {selected.map((supplier) => (
                <div key={supplier.name} className="flex items-center justify-between gap-3 rounded-xl bg-slate-950 p-3">
                  <span className="text-sm font-semibold">{supplier.name}</span>
                  <button onClick={() => toggleSelected(supplier)} className="text-slate-500 hover:text-white" aria-label={`Remove ${supplier.name}`}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={exportSelection}
              disabled={!selected.length}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download className="h-5 w-5" /> Export shortlist CSV
            </button>
            <div className="mt-6 border-t border-slate-800 pt-5 text-xs leading-5 text-slate-500">
              HelpOttawa does not claim a commercial relationship with listed suppliers. Listings are a sourcing aid. Verify stock, price, product origin and certification directly with the seller/manufacturer.
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
