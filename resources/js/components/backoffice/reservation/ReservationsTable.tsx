import * as React from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
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
import { Download, Trash, Eye } from "lucide-react";
import { Reservation, Car, Client, AddedOption, Place } from "@/types/Reservation";
import { router } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
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

interface ReservationsTableProps {
    reservations: Reservation[];
    cars: Car[];
    clients: Client[];
    places: Place[];
    options: AddedOption[];
    onDelete: (id: number | undefined) => void;
}

export function ReservationsTable({
                                      reservations,
                                      cars,
                                      clients,
                                      places,
                                      options,
                                      onDelete,
                                  }: ReservationsTableProps) {
    const [selectedReservation, setSelectedReservation] = React.useState<Reservation | null>(null);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [reservationToDelete, setReservationToDelete] = React.useState<number | undefined>();

    function formatDate(datetime: string) {
        if (!datetime) return "";
        const date = new Date(datetime);
        return date.toISOString().slice(0, 19).replace("T", " ");
    }

    function openModal(reservation: Reservation) {
        setSelectedReservation(reservation);
        setModalOpen(true);
    }

    function handleDelete() {
        if (reservationToDelete) {
            onDelete(reservationToDelete);
            setIsDeleteDialogOpen(false);
        }
    }

    const columns: ColumnDef<Reservation>[] = [
        {
            accessorKey: "flight_number",
            header: "Flight Number",
        },
        {
            accessorKey: "client",
            header: "Client",
            cell: ({ row }) =>
                clients.find((c) => c.id === row.original.client_id)?.full_name ?? "Unknown",
        },
        {
            accessorKey: "car",
            header: "Car",
            cell: ({ row }) =>
                cars.find((c) => c.id === row.original.car_id)?.model ?? "Unknown",
        },
        {
            accessorKey: "date_from",
            header: "Pick-up Date",
            cell: ({ row }) => formatDate(row.original.date_from),
        },
        {
            accessorKey: "date_to",
            header: "Drop-off Date",
            cell: ({ row }) => formatDate(row.original.date_to),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                            setReservationToDelete(row.original.id);
                            setIsDeleteDialogOpen(true);
                        }}
                    >
                        <Trash className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.get(`/reservations/${row.original.id}/contract`)}
                    >
                        <Download className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => openModal(row.original)}
                    >
                        <Eye className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: reservations,
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
                        {table.getRowModel().rows.length ? (
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
                                    No reservations found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between py-4">
                <div className="text-sm text-muted-foreground">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <div className="flex space-x-2">
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
            </div>

            {/* Reservation Detail Dialog */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reservation Details</DialogTitle>
                        <DialogDescription>
                            {selectedReservation ? (
                                <div className="flex flex-col gap-4 mt-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><strong>Flight Number:</strong> {selectedReservation.flight_number ?? 'N/A'}</div>
                                        <div><strong>Client:</strong> {clients.find(client => client.id === selectedReservation.client_id)?.full_name ?? 'Unknown'}</div>
                                        <div><strong>Car:</strong> {cars.find(car => car.id === selectedReservation.car_id)?.model?? 'Unknown'}</div>
                                        <div><strong>price/Day:</strong> {cars.find(car => car.id === selectedReservation.car_id)?.price_per_day ?? 'Unknown'}DHs</div>

                                        <div><strong>Pick-up Date:</strong> {formatDate(selectedReservation.date_from)}</div>
                                        <div><strong>Drop-off Date:</strong> {formatDate(selectedReservation.date_to)}</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><strong>Pickup Place:</strong> {places.find(place => place.id === selectedReservation.pickup_place_id)?.title ?? 'Unknown'}</div>
                                        <div><strong>Dropoff Place:</strong> {places.find(place => place.id === selectedReservation.dropoff_place_id)?.title ?? 'Unknown'}</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><strong>Status:</strong> {selectedReservation.status}</div>
                                        <div><strong>Total Price:</strong> {selectedReservation.total_price}DHs</div>
                                    </div>
                                    {selectedReservation.added_options && selectedReservation.added_options.length > 0 && (
                                        <div>
                                            <strong>Added Options:</strong>
                                            <ul className="list-disc pl-5">
                                                {selectedReservation.added_options.map((option, idx) => {
                                                    const optionDetails = options.find(opt => opt.id === option.id);
                                                    return (
                                                        <li key={idx}>
                                                            {optionDetails ? optionDetails.title : `Option ID: ${option.id}`} - Quantity: {option.pivot.quantity} - Price/Day: {option.pivot.price_at_reservation}DHs
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p>No reservation selected.</p>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogTrigger>
                    <span className="hidden"></span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the reservation.
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
}
