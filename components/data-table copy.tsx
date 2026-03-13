"use client"; // Doit être la PREMIÈRE ligne

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ExerciseDialog } from "@/components/dialog"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedRow, setSelectedRow] = React.useState<any | null>(null)
  
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const nameA = (a as any).name?.toLowerCase() || ""
      const nameB = (b as any).name?.toLowerCase() || ""
      return nameA.localeCompare(nameB)
    })
  }, [data])

  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleOpenChange = (next: boolean) => {
    setDialogOpen(next)
    if (!next) setSelectedRow(null)
  }

  return (
    <div className="overflow-hidden rounded-md border border-white/10 shadow-2xl">
      <Table className="w-full bg-black/40 backdrop-blur-md text-white/80">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="flex w-full bg-[#706586]/50 border-white/10">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="flex-1 flex items-center text-white font-bold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* Barre de défilement personnalisée */}
        <TableBody className="block max-h-[60vh] w-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => {
                  setSelectedRow(row.original)
                  setDialogOpen(true)
                }}
                className="flex w-full border-white/5 hover:bg-white/10 cursor-pointer transition-all duration-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="flex-1 p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Aucun résultat.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedRow && (
        <ExerciseDialog
          studentName={selectedRow.name ?? ""}
          images={selectedRow.exercises ?? []}
          open={dialogOpen}
          onOpenChange={handleOpenChange}
          hideTrigger
        />
      )}
    </div>
  )
}
