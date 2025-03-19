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
import { Client } from '@/types/Client';

interface ClientsTableProps {
    clients: Client[];
    onEdit: (client: Client) => void;
    onDelete: (id: number | undefined) => void;
}

export const ClientsTable = ({ clients, onEdit, onDelete }: ClientsTableProps) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<number | undefined>(undefined);

    const handleDelete = () => {
        if (clientToDelete) {
            onDelete(clientToDelete);
            setIsDeleteDialogOpen(false);
        }
    };


    const columns: ColumnDef<Client>[] = [
        {
            accessorKey: "identity_or_passport_number",
            header: "ID/Passport",
        },
        {
            accessorKey: "full_name",
            header: "Full Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "mobile_number",
            header: "Mobile Number",
        },
        {
            accessorKey: "address",
            header: "Address",
        },
        {
            accessorKey: "permit_license_id",
            header: "Permit License ID",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const client = row.original;

                return (
                    <div className="flex space-x-2">
                        <Button variant="ghost" onClick={() => onEdit(client)}>
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setClientToDelete(client.id);
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

    // Initialize the table
    const table = useReactTable({
        data: clients,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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
                            This action cannot be undone. This will permanently delete the client.
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
