Add-Type -AssemblyName System.Drawing

# Get all promo images
$files = Get-ChildItem "promo*.jpeg"

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    # Load image
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    
    # Get JPEG encoder
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object {$_.MimeType -eq 'image/jpeg'}
    
    # Set quality to 75%
    $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 75L)
    
    # Create optimized filename
    $newName = $file.Name.Replace('.jpeg', '_optimized.jpeg')
    $newPath = Join-Path $file.DirectoryName $newName
    
    # Save optimized image
    $img.Save($newPath, $encoder, $params)
    $img.Dispose()
    
    # Show file sizes
    $originalSize = [math]::Round($file.Length / 1KB, 2)
    $optimizedFile = Get-Item $newPath
    $optimizedSize = [math]::Round($optimizedFile.Length / 1KB, 2)
    $savings = [math]::Round((($file.Length - $optimizedFile.Length) / $file.Length) * 100, 1)
    
    Write-Host "Original: $originalSize KB -> Optimized: $optimizedSize KB (Saved: $savings%)"
    Write-Host "Created: $newName"
    Write-Host "---"
}

Write-Host "Image optimization complete!"
