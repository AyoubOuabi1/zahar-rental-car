<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        td, th { padding: 8px; border: 1px solid #000; }
        .header { margin-bottom: 30px; }
    </style>
</head>
<body>
<div class="header">
    <h2>ZAHAR RENT CAR</h2>
    <p>Adress : Lot AL Massar Bureau 2 ETG<br>
        Marrakech, Maroc<br>
        Tél : 07 62 41 01 43 / Tél : 06 15 65 37 43<br>
        Email : rentcarzahar@gmail.com</p>
</div>

<h3>CONTRAIT {{ $contractNumber }}</h3>

<p>Marque : {{ $reservation->car->brand }} {{ $reservation->car->model }}<br>
    N°d’immatriculation : {{ $reservation->car->matriculation }}</p>

<table>
    <tr>
        <th></th>
        <th>Lieu</th>
        <th>Date</th>
        <th>Heure</th>
        <th>Prorongation</th>
    </tr>
    <tr>
        <td>Départ</td>
        <td>{{ $reservation->pickupPlace->address ?? 'N/A' }}</td>
        <td>{{ $reservation->date_from->format('d/m/Y') }}</td>
        <td>{{ $reservation->date_from->format('H:i') }}</td>
        <td></td>
    </tr>
    <tr>
        <td>Retour</td>
        <td>{{ $reservation->dropoffPlace->address ?? 'N/A' }}</td>
        <td>{{ $reservation->date_to->format('d/m/Y') }}</td>
        <td>{{ $reservation->date_to->format('H:i') }}</td>
        <td></td>
    </tr>
</table>

<h4>Locataire</h4>
<p>Nom : {{ $reservation->client->full_name }}<br>
    N°Passport/CIN : {{ $reservation->client->identity_or_passport_number }}<br>
    Permis de conduire : {{ $reservation->client->permit_license_id }}</p>
</body>
</html>
