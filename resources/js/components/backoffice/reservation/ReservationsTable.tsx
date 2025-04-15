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
import { Edit, Trash } from "lucide-react";

import { Reservation, Car, Client } from '@/types/Reservation';

interface ReservationsTableProps {
    reservations: Reservation[];
    cars: Car[];
    clients: Client[];
    onEdit: (reservation: Reservation) => void;
    onDelete: (id: number | undefined) => void;
}

export function ReservationsTable({ reservations, cars, clients, onEdit, onDelete }: ReservationsTableProps) {
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
                        <TableCell>{reservation.date_from}</TableCell>
                        <TableCell>{reservation.date_to}</TableCell>
                        <TableCell>
                            <Button variant="outline" size="icon" onClick={() => onEdit(reservation)}>
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="icon" onClick={() => onDelete(reservation.id)}>
                                <Trash className="w-4 h-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

