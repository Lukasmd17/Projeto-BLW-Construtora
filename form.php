<?php
$response = [
    "nome" => $_POST["nome"],
    "email" => $_POST["email"],
    "mensagem" => $_POST["mensagem"],
];
if (isset($_FILES['anexo'])) {
    $pasta = 'uploads/';
    move_uploaded_file($_FILES['anexo']['tmp_name'], $pasta . $_FILES['anexo']['name']);
    $response["anexo"] = $pasta . $_FILES['anexo']['name'];
}
echo json_encode($response);
