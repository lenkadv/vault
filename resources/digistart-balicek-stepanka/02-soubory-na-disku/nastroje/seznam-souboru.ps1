<#
  seznam-souboru.ps1 – vyrobí SEZNAM souborů ve složce (jen čtení, nic nemění, nic nemaže).

  Použití (PowerShell, Windows):
    .\seznam-souboru.ps1 -Cesta "C:\Users\Jana\Documents"
    .\seznam-souboru.ps1 -Cesta "D:\Soubory" -Vystup "C:\Users\Jana\Desktop\seznam.csv"

  Výsledek: soubor seznam-souboru.csv (oddělovač středník, otevře se v Excelu)
    sloupce: cesta (relativní), slozka, nazev, pripona, velikost_kb, zmeneno
  + vedle něj souhrn-slozek.txt: kolik souborů a kolik MB je v každé složce první úrovně.
  Tyhle dva soubory pak vložte do chatu s asistentkou (nebo je jí ukažte), ať z nich navrhne strukturu.

  Skript NEčte obsah souborů, jen názvy, velikosti a data. Přeskakuje skryté a systémové položky
  a složky, které nejsou vaše (node_modules, .git, AppData, $RECYCLE.BIN, System Volume Information).
#>
param(
  [Parameter(Mandatory=$true)][string]$Cesta,
  [string]$Vystup = (Join-Path (Get-Location) "seznam-souboru.csv")
)

if (-not (Test-Path -LiteralPath $Cesta -PathType Container)) { Write-Error "Složka neexistuje: $Cesta"; exit 1 }
$koren = (Resolve-Path -LiteralPath $Cesta).Path.TrimEnd('\')
$preskocit = '\\(node_modules|\.git|AppData|\$RECYCLE\.BIN|System Volume Information)(\\|$)'

Write-Host "Procházím $koren ..."
$radky = New-Object System.Collections.Generic.List[object]
Get-ChildItem -LiteralPath $koren -Recurse -File -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName.Substring($koren.Length) -notmatch $preskocit -and -not ($_.Attributes -band [IO.FileAttributes]::Hidden) -and -not ($_.Attributes -band [IO.FileAttributes]::System) } |
  ForEach-Object {
    $rel = $_.FullName.Substring($koren.Length).TrimStart('\')
    $radky.Add([pscustomobject]@{
      cesta       = $rel
      slozka      = (Split-Path $rel -Parent)
      nazev       = $_.Name
      pripona     = $_.Extension.ToLower()
      velikost_kb = [math]::Round($_.Length / 1KB, 1)
      zmeneno     = $_.LastWriteTime.ToString('yyyy-MM-dd')
    })
  }

$radky | Export-Csv -LiteralPath $Vystup -Delimiter ';' -NoTypeInformation -Encoding UTF8
Write-Host ("Hotovo: {0} souborů -> {1}" -f $radky.Count, $Vystup)

# souhrn po složkách první úrovně
$souhrn = $radky | Group-Object { if ($_.cesta -like '*\*') { ($_.cesta -split '\\')[0] } else { '(volné soubory v kořeni)' } } | ForEach-Object {
  [pscustomobject]@{ slozka = $_.Name; souboru = $_.Count; MB = [math]::Round((($_.Group | Measure-Object velikost_kb -Sum).Sum) / 1024, 1) }
} | Sort-Object souboru -Descending
$souhrnCesta = Join-Path (Split-Path -Parent $Vystup) "souhrn-slozek.txt"
$souhrn | Format-Table -AutoSize | Out-String -Width 200 | Set-Content -LiteralPath $souhrnCesta -Encoding UTF8
Write-Host "Souhrn po složkách: $souhrnCesta"
if ($radky.Count -gt 20000) { Write-Host "POZOR: souborů je hodně. Pro chat radši pošlete jen souhrn a seznam jedné podsložky." }
