<?php
$response = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $url = 'https://rtb.retreaver.com/rtbs.json?key=de52d107-77e6-4200-99e4-4b6d68bff683&publisher_id=cd471266&caller_number=' . urlencode($_POST['caller_number']);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Retreaver RTB Form</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            padding: 40px;
            width: 100%;
            max-width: 480px;
        }
        h1 {
            color: #2c3e50;
            margin-top: 0;
            margin-bottom: 30px;
            font-size: 24px;
            text-align: center;
        }
        .form-group { margin-bottom: 25px; }
        label {
            display: block;
            margin-bottom: 8px;
            color: #34495e;
            font-weight: 500;
        }
        input {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #dce4ec;
            border-radius: 5px;
            font-size: 16px;
            transition: border-color 0.3s;
            box-sizing: border-box;
        }
        input:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 2px rgba(52,152,219,0.2);
        }
        button {
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 14px 20px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: background-color 0.3s;
        }
        button:hover { background-color: #2980b9; }
        .response-data {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 20px;
        }
        .response-data h3 { margin-top: 0; color: #2c3e50; font-size: 18px; }
        .response-data pre {
            background-color: #ffffff;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            padding: 10px;
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
            margin: 0;
            font-family: monospace;
            font-size: 13px;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Retreaver RTB</h1>

    <?php if ($response): ?>
    <div class="response-data">
        <h3>API Response:</h3>
        <pre><?php echo htmlspecialchars(json_encode(json_decode($response), JSON_PRETTY_PRINT)); ?></pre>
    </div>
    <?php endif; ?>

    <form method="POST" action="">
        <div class="form-group">
            <label for="caller_number">Caller Number</label>
            <input type="tel" id="caller_number" name="caller_number" placeholder="+17194451111" required>
        </div>
        <button type="submit">Submit</button>
    </form>
</div>
</body>
</html>