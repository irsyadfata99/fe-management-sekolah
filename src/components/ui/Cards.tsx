// ============================================================================
// 2. FIXED: src/components/ui/Cards.tsx
// Fix all TypeScript and ESLint errors
// ============================================================================

"use client";

import { Alumni, Testimoni, Stats, Program } from "@/lib/types";

// FIXED: Alumni Card Component dengan proper typing
export function AlumniCard({ alumni }: { alumni: Alumni }) {
  return (
    <div className="card">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold theme-text-primary">{alumni.nama_lengkap?.charAt(0) || "A"}</span>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{alumni.nama_lengkap}</h3>
          <p className="text-gray-600">Lulusan {alumni.tahun_lulus}</p>
        </div>
      </div>
      <p className="text-gray-600 mb-3">{alumni.pekerjaan_sekarang}</p>
      <p className="text-sm text-gray-500 line-clamp-3">{alumni.deskripsi}</p>
    </div>
  );
}

// FIXED: Testimoni Card Component dengan proper typing dan escaped quotes
export function TestimoniCard({ testimoni }: { testimoni: Testimoni }) {
  return (
    <div className="card">
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="font-semibold theme-text-primary">{testimoni.nama_lengkap?.charAt(0) || "T"}</span>
          </div>
          <div>
            <h4 className="font-semibold">{testimoni.nama_lengkap}</h4>
            <p className="text-sm text-gray-500">{testimoni.status}</p>
          </div>
        </div>
        {/* FIXED: Escaped quotes */}
        <p className="text-gray-600 italic line-clamp-4">&ldquo;{testimoni.deskripsi}&rdquo;</p>
      </div>
    </div>
  );
}

// FIXED: Stats Card Component dengan proper typing
export function StatsCard({ stat }: { stat: Stats }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold theme-text-primary mb-2">{stat.value}</div>
      <div className="text-gray-600 font-medium">{stat.label}</div>
    </div>
  );
}

// FIXED: Program Card Component dengan proper typing
export function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="card text-center">
      <div className="w-16 h-16 theme-primary rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">{program.code}</div>
      <h3 className="font-semibold text-lg mb-3">{program.name}</h3>
      <p className="text-gray-600 text-sm">{program.description}</p>
    </div>
  );
}
