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
import { Download, Edit, Trash } from 'lucide-react';

import { Reservation, Car, Client } from '@/types/Reservation';
import { router } from '@inertiajs/react';

interface ReservationsTableProps {
    reservations: Reservation[];
    cars: Car[];
    clients: Client[];
    onEdit: (reservation: Reservation) => void;
    onDelete: (id: number | undefined) => void;
}

export function ReservationsTable({ reservations, cars, clients, onEdit, onDelete }: ReservationsTableProps) {
    function formatDate(datetime: string) {
        if (!datetime) return '';
        const date = new Date(datetime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return (
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
                        <TableCell>
                            <Button variant="outline" size="icon" onClick={() => onEdit(reservation)}>
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="icon" onClick={() => onDelete(reservation.id)}>
                                <Trash className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => router.get(`/reservations/${reservation.id}/contract`)}>
                                <Download className="w-4 h-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

