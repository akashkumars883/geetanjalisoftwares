Add-Type -AssemblyName System.Drawing

$srcPath = "d:\Full Stack Dev\geetanjalisoftwares\public\logo.png"
$destRotated = "d:\Full Stack Dev\geetanjalisoftwares\public\logo-rotated.png"

$img = [System.Drawing.Image]::FromFile($srcPath)
$w = $img.Width
$h = $img.Height

$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)

$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$g.TranslateTransform([float]($w / 2), [float]($h / 2))
$g.RotateTransform(-12)
$g.TranslateTransform([float](-$w / 2), [float](-$h / 2))

$g.DrawImage($img, 0, 0, $w, $h)

$bmp.Save($destRotated, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Host "Exact in-place rotated logo (-12 deg) saved successfully!"
