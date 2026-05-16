'use client'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function ProductSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-4 overflow-hidden rounded-3xl bg-secondary/20">
            <Skeleton height={220} />
          </div>
          <div className="space-y-3">
            <Skeleton height={14} width="70%" />
            <Skeleton height={16} width="100%" />
            <Skeleton height={14} width="50%" />
            <div className="flex items-center gap-2">
              <Skeleton circle height={24} width={24} />
              <Skeleton height={12} width="30%" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
