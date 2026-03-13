"use client"

import { ColumnDef } from "@tanstack/react-table"
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "N°",
    cell: ({ row }) => {
      const lineNumber = row.index + 1

      return <div className="px-4 py-2 font-medium">{lineNumber}</div>
    },
  },
    {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => {
      const name = row.getValue("name") as string

      return (
        <div className="px-4 py-2 font-medium">{name}</div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Devoirs rendus",
    cell: ({ row }) => {
      const exercises = row.original.exercises || []
      const realCount = exercises.filter((img: string) => img && img !== "/manque.png" && img !== "#").length
      
      let dotColor = "bg-orange-500"
      if (realCount >= 5) dotColor = "bg-green-500"
      if (realCount === 0) dotColor = "bg-red-500"

      return (
        <div className="flex items-center  justify-between px-5 font-medium pointer-events-none">
          <span>{realCount} / 5</span>
          <span className={`h-2 w-2 rounded-full ${dotColor}`} />
        </div>
      )
    },
  },
  
]
