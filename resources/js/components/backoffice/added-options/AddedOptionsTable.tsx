import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
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
import { AddedOption } from '@/types/AddedOption';

interface AddedOptionsTableProps {
    addedOptions: AddedOption[];
    onEdit: (addedOption: AddedOption) => void;
    onDelete: (id: number | undefined) => void;
}

export const AddedOptionsTable = ({
                                      addedOptions,
                                      onEdit,
                                      onDelete
                                  }: AddedOptionsTableProps) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [addedOptionToDelete, setAddedOptionToDelete] = useState<number | undefined>(undefined);

    const handleDelete = () => {
        if (addedOptionToDelete) {
            onDelete(addedOptionToDelete);
            setIsDeleteDialogOpen(false);
        }
    };

    const columns: ColumnDef<AddedOption>[] = [
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
                <div className="max-w-xs truncate">
                    {row.getValue("description")}
                </div>
            ),
        },
        {
            accessorKey: "price_per_day",
            header: "Price Per Day",
            cell: ({ row }) => (
                <span>${parseFloat(row.getValue("price_per_day")).toFixed(2)}</span>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const addedOption = row.original;

                return (
                    <div className="flex space-x-2">
                        <Button variant="ghost" onClick={() => onEdit(addedOption)}>
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setAddedOptionToDelete(addedOption.id);
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
        data: addedOptions,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
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

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogTrigger>
                    <span className="hidden"></span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the added option.
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
