"use client"

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
    <div className="overflow-hidden rounded-md border border-white/10">
      <Table className="w-full bg-black/40 backdrop-blur-sm shadow-xl text-white/80">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow 
              key={headerGroup.id} 
              className="flex w-full bg-[#706586]/50 text-white/80 border-none"
            >
              {headerGroup.headers.map((header) => (
                <TableHead 
                  key={header.id}
                  className="flex items-center"
                  style={{ width: `${header.column.getSize()}%` }}
                >
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
        
        <TableBody className="block max-h-[60vh] w-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="flex w-full border-white/10 hover:bg-white/10 cursor-pointer transition-all duration-200"
                onClick={() => {
                  setSelectedRow(row.original)
                  setDialogOpen(true)
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell 
                    key={cell.id} 
                    className="p-0 flex items-center overflow-hidden h-12"
                    style={{ width: `${cell.column.getSize()}%` }}
                  >
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
