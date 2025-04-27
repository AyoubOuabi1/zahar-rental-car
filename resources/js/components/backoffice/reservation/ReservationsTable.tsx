import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Download, Trash, Eye } from 'lucide-react';
import { Reservation, Car, Client,AddedOption,Place } from '@/types/Reservation';
import { router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";


interface ReservationsTableProps {
    reservations: Reservation[];
    cars: Car[];
    clients: Client[];
    places: Place[];
    options: AddedOption[];
    onDelete: (id: number | undefined) => void;
}

export function ReservationsTable({ reservations, cars, clients, places, options, onDelete }: ReservationsTableProps) {
    const [selectedReservation, setSelectedReservation] = React.useState<Reservation | null>(null);
    const [modalOpen, setModalOpen] = React.useState(false);

    function formatDate(datetime: string) {
        if (!datetime) return '';
        const date = new Date(datetime);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    function openModal(reservation: Reservation) {
        setSelectedReservation(reservation);
        setModalOpen(true);
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Flight Number</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Car</TableHead>
                        <TableHead>Pick-up Date</TableHead>
                        <TableHead>Drop-off Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                            <TableCell>{reservation.flight_number}</TableCell>
                            <TableCell>{clients.find(client => client.id === reservation.client_id)?.full_name}</TableCell>
                            <TableCell>{cars.find(car => car.id === reservation.car_id)?.model}</TableCell>
                            <TableCell>{formatDate(reservation.date_from)}</TableCell>
                            <TableCell>{formatDate(reservation.date_to)}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button variant="destructive" size="icon" onClick={() => onDelete(reservation.id)}>
                                    <Trash className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => router.get(`/reservations/${reservation.id}/contract`)}>
                                    <Download className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={() => openModal(reservation)}
                                >
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Modal */}
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
                                        <div><strong>Pick-up Date:</strong> {formatDate(selectedReservation.date_from)}</div>
                                        <div><strong>Drop-off Date:</strong> {formatDate(selectedReservation.date_to)}</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div><strong>Pickup Place:</strong> {places.find(place => place.id === selectedReservation.pickup_place_id)?.title ?? 'Unknown'}</div>
                                        <div><strong>Dropoff Place:</strong> {places.find(place => place.id === selectedReservation.dropoff_place_id)?.title ?? 'Unknown'}</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div><strong>Status:</strong> {selectedReservation.status}</div>
                                        <div><strong>Total Price:</strong> ${selectedReservation.total_price}</div>
                                    </div>

                                    {/* Show added options if available */}
                                    {selectedReservation.added_options && selectedReservation.added_options.length > 0 && (
                                        <div>
                                            <strong>Added Options:</strong>
                                            <ul className="list-disc pl-5">
                                                {selectedReservation.added_options.map((option, idx) => {
                                                    const optionDetails = options.find(opt => opt.id === option.id);
                                                    return (
                                                        <li key={idx}>
                                                            {optionDetails ? optionDetails.title : `Option ID: ${option.id}`}
                                                            {" "} - Quantity: {option.pivot.quantity}
                                                            {" "} - Price/Day: ${option.pivot.price_at_reservation}
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
        </>
    );
}
