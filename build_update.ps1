# This script builds the complete updated index.html
# We write it in sections to manage size

$outFile = "c:\Users\Admin\Desktop\prank\index_new.html"

# Clear file
"" | Set-Content $outFile -NoNewline

# Helper to append
function Append($text) {
    $text | Add-Content $outFile
}

Write-Host "Building updated index.html..."
Write-Host "Step 1: Head and CSS..."

# We'll build the file content and write it
$head = @'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thangappan's Career Consulting</title>
<meta name="description" content="Professional CVs. Personal Touch. No Refunds.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Caveat:wght@600;700&family=Gochi+Hand&family=Playfair+Display:wght@400;500;600;700&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
'@

Append $head
Write-Host "Head written."
Write-Host "Done with step 1. Run build_parts.ps1 next."
