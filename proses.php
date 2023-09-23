<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $pesan = $_POST["pesan"];

    // Alamat email penerima
    $tujuan = "muhamadrifkizulfikar@gmail.com";

    // Subjek email
    $subjek = "Pesan dari $name";

    // Pesan email
    $pesanEmail = "name: $name\n";
    $pesanEmail .= "Email: $email\n";
    $pesanEmail .= "Pesan:\n$pesan";

    // Header tambahan
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Kirim email
    if (mail($tujuan, $subjek, $pesanEmail, $headers)) {
        echo "Pesan telah berhasil terkirim!";
    } else {
        echo "Pesan gagal terkirim. Silakan coba lagi.";
    }
}
?>
