Add-Type -AssemblyName System.Drawing

# Get all promo images
$files = Get-ChildItem "promo*.jpeg" | Where-Object { $_.Name -notlike "*_optimized*" }

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    # Load image
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    
    # Calculate new dimensions (max width 1200px for web)
    $maxWidth = 1200
    $maxHeight = 800
    
    $ratio = [math]::Min($maxWidth / $img.Width, $maxHeight / $img.Height)
    $newWidth = [int]($img.Width * $ratio)
    $newHeight = [int]($img.Height * $ratio)
    
    # Create new bitmap with resized dimensions
    $resized = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($resized)
    
    # Set high quality resizing
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    # Draw resized image
    $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
    
    # Get JPEG encoder
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object {$_.MimeType -eq 'image/jpeg'}
    
    # Set quality to 85% for better balance
    $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 85L)
    
    # Create optimized filename
    $newName = $file.Name.Replace('.jpeg', '_web.jpeg')
    $newPath = Join-Path $file.DirectoryName $newName
    
    # Save optimized image
    $resized.Save($newPath, $encoder, $params)
    
    # Clean up
    $graphics.Dispose()
    $resized.Dispose()
    $img.Dispose()
    
    # Show file sizes
    $originalSize = [math]::Round($file.Length / 1KB, 2)
    $optimizedFile = Get-Item $newPath
    $optimizedSize = [math]::Round($optimizedFile.Length / 1KB, 2)
    $savings = [math]::Round((($file.Length - $optimizedFile.Length) / $file.Length) * 100, 1)
    
    Write-Host "Original: ${originalSize}KB (${file.Width}x${file.Height}px)"
    Write-Host "Optimized: ${optimizedSize}KB (${newWidth}x${newHeight}px)"
    Write-Host "Saved: ${savings}%"
    Write-Host "Created: $newName"
    Write-Host "---"
}

Write-Host "Advanced image optimization complete!"
