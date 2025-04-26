import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { Car } from "@/types/Car";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface CarsTableProps {
    cars: Car[];
    onEdit: (car: Car) => void;
    onDelete: (id: number | undefined) => void;
}

export const CarsTable = ({ cars, onEdit, onDelete }: CarsTableProps) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [carToDelete, setCarToDelete] = useState<number | undefined>(undefined);
    const [globalFilter, setGlobalFilter] = useState("");

    const handleDelete = () => {
        if (carToDelete) {
            onDelete(carToDelete);
            setIsDeleteDialogOpen(false);
        }
    };

    const columns: ColumnDef<Car>[] = [
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => (
                <div className="w-24 h-24 flex items-center justify-center">
                    <img
                        src={row.original.image}
                        alt={`${row.original.brand} ${row.original.model}`}
                        className="w-full h-full object-contain"
                    />
                </div>
            ),
        },
        {
            accessorKey: "matriculation",
            header: "Matriculation",
        },
        {
            accessorKey: "brand",
            header: "Brand",
        },
        {
            accessorKey: "model",
            header: "Model",
        },
        {
            accessorKey: "category",
            header: "Category",
        },
        {
            accessorKey: "fuel",
            header: "Fuel",
        },
        {
            accessorKey: "transmission",
            header: "Transmission",
        },
        {
            accessorKey: "luggage",
            header: "Luggage",
        },
        {
            accessorKey: "seats",
            header: "Seats",
        },
        {
            accessorKey: "ac",
            header: "A/C",
            cell: ({ row }) => (row.original.ac ? "Yes" : "No"),
        },
        {
            accessorKey: "doors",
            header: "Doors",
        },
        {
            accessorKey: "discount",
            header: "Discount",
        },
        {
            accessorKey: "price_per_day",
            header: "Price/Day",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const car = row.original;

                return (
                    <div className="flex space-x-2">
                        {/* Edit Button */}
                        <Button variant="ghost" onClick={() => onEdit(car)}>
                            <Edit className="w-4 h-4" />
                        </Button>

                        {/* Delete Button */}
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setCarToDelete(car.id);
                                setIsDeleteDialogOpen(true);
                            }}
                        >
                            <Trash className="w-4 h-4 text-red-500" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: cars,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
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
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogTrigger>
                    <span className="hidden"></span> {/* Hidden trigger */}
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the car.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
