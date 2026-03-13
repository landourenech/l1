"use client"

import * as React from "react" // Ajout de React pour useMemo
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
  
  // On trie les données par le champ "name" avant de les passer à la table
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const nameA = (a as any).name?.toLowerCase() || ""
      const nameB = (b as any).name?.toLowerCase() || ""
      return nameA.localeCompare(nameB)
    })
  }, [data])

  const table = useReactTable({
    data: sortedData, // Utilisation des données triées
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleOpenChange = (next: boolean) => {
    setDialogOpen(next)
    if (!next) setSelectedRow(null)
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <Table className="w-full bg-black/40 backdrop-blur-sm  rounded-md bg-black/50  shadow-xl border border-white/10 text-white/80">
        <TableHeader >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} 
            className="table w-full table-fixed bg-[#706586]/50 text-white/80 ">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
<TableBody className="block max-h-[60vh] w-full overflow-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
               
                className="w-full table-fixed  hover:bg-white/10 cursor-pointer table hover:text-white-100 hover:white/40 border-white/10 hover:shadow-lg transition-all duration-200 hover:to-white/20  "
             
                   onClick={() => {
                  setSelectedRow(row.original)
                  setDialogOpen(true)
                }}>
                 {row.getVisibleCells().map((cell) => (
                   <TableCell key={cell.id} className="p-0 "> {/* p-0 pour que le trigger du Dialog remplisse tout */}
                                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))
                            ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {selectedRow ? (
              <ExerciseDialog
                studentName={selectedRow.name ?? ""}
                images={selectedRow.exercises ?? []}
                open={dialogOpen}
                onOpenChange={handleOpenChange}
                hideTrigger
              />
            ) : null}
    </div>
  )
}