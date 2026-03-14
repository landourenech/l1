"use client"

import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "N°",
    size: 5, // 5%
    cell: ({ row }) => (
      <div className="px-1 py-2 font-medium text-center border-l border-white/5 text-xs opacity-70">
        {row.index + 1}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Nom",
    size: 80, // 80%
    cell: ({ row }) => (
      <div className="px-4 py-2 font-medium truncate">
        {row.getValue("name")}
      </div>
    ),
  },
  
  {
    accessorKey: "status",
    header: "Devoirs",
    size: 15, // 15%
    cell: ({ row }) => {
      const exercises = row.original.exercises || []
      const realCount = exercises.filter(
        (img: string) => img && img !== "/manque.png" && img !== "#"
      ).length
      
      let dotColor = "bg-orange-500"
      if (realCount >= 5) dotColor = "bg-green-500"
      if (realCount === 0) dotColor = "bg-red-500"

      return (
        <div className="flex items-center justify-end gap-2 px-4 font-medium border-l border-white/5">
          <span className="text-[10px] sm:text-xs whitespace-nowrap">{realCount} / 5</span>
          <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor}`} />
        </div>
      )
    },
  },
]
