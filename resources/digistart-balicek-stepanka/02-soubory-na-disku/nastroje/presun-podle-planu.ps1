<#
  presun-podle-planu.ps1 – PŘESUNE soubory podle schváleného plánu. Nic nemaže, nic nepřepisuje.

  Plán = CSV se středníkem a hlavičkou:  zdroj;cil
    zdroj = úplná cesta k souboru,  cil = úplná cesta, kam má soubor přijít (včetně názvu souboru)
  Plán vám připraví asistentka a vy ho PŘED spuštěním projdete (jde otevřít v Excelu).

  Postup – VŽDY nejdřív zkouška:
    .\presun-podle-planu.ps1 -Plan plan.csv                  # zkouška: jen vypíše, co by se stalo, nic nepřesune
    .\presun-podle-planu.ps1 -Plan plan.csv -Provest         # skutečný přesun + uloží protokol presun-log-....csv
    .\presun-podle-planu.ps1 -Vratit presun-log-....csv      # vrátí přesun zpět (podle protokolu)

  Bezpečnostní pravidla skriptu:
   - nikdy nemaže; když už je v cíli soubor stejného názvu, přidá k názvu _2, _3 (nepřepíše ho)
   - přesouvá jen soubory (složky nechává), které leží tam, kam plán ukazuje
   - zdroj i cíl musí být v téže kořenové složce (parametr -Koren), aby se nic nepřesunulo mimo váš disk/složku
#>
param(
  [string]$Plan,
  [string]$Koren,
  [switch]$Provest,
  [string]$Vratit
)

function Najdi-VolnyNazev([string]$cesta) {
  if (-not (Test-Path -LiteralPath $cesta)) { return $cesta }
  $dir = Split-Path $cesta -Parent; $base = [IO.Path]::GetFileNameWithoutExtension($cesta); $ext = [IO.Path]::GetExtension($cesta)
  $i = 2
  while (Test-Path -LiteralPath (Join-Path $dir "${base}_$i$ext")) { $i++ }
  return (Join-Path $dir "${base}_$i$ext")
}

# ---------- vrácení zpět ----------
if ($Vratit) {
  $log = @(Import-Csv -LiteralPath $Vratit -Delimiter ';' -Encoding UTF8 | Where-Object { $_.stav -eq 'presunuto' })
  [array]::Reverse($log)
  $ok = 0; $chyb = 0
  foreach ($r in $log) {
    try {
      if (-not (Test-Path -LiteralPath $r.kam)) { Write-Warning "Chybí (už přesunuto jinam?): $($r.kam)"; $chyb++; continue }
      $zpet = Najdi-VolnyNazev $r.odkud
      New-Item -ItemType Directory -Force -Path (Split-Path $zpet -Parent) | Out-Null
      Move-Item -LiteralPath $r.kam -Destination $zpet
      $ok++
    } catch { Write-Warning "Nepovedlo se vrátit: $($r.kam) – $($_.Exception.Message)"; $chyb++ }
  }
  Write-Host "Vráceno: $ok, problémů: $chyb"
  exit 0
}

if (-not $Plan) { Write-Host "Chybí -Plan (nebo -Vratit). Viz popis na začátku souboru."; exit 1 }
$radky = Import-Csv -LiteralPath $Plan -Delimiter ';' -Encoding UTF8
if (-not $radky -or -not ($radky[0].PSObject.Properties.Name -contains 'zdroj' -and $radky[0].PSObject.Properties.Name -contains 'cil')) {
  Write-Error "Plán musí mít hlavičku: zdroj;cil"; exit 1
}
if (-not $Koren) {
  # společný kořen = nejdelší společný začátek všech zdrojů a cílů
  $vse = @($radky.zdroj) + @($radky.cil)
  $Koren = $vse[0]
  foreach ($p in $vse) { while ($Koren -and -not $p.StartsWith($Koren, [StringComparison]::OrdinalIgnoreCase)) { $Koren = Split-Path $Koren -Parent } }
}
Write-Host "Kořen operace: $Koren"
if ($Provest) { Write-Host "REŽIM: SKUTEČNÝ PŘESUN" -ForegroundColor Yellow } else { Write-Host "REŽIM: ZKOUŠKA (nic se nepřesune)" -ForegroundColor Cyan }

$protokol = New-Object System.Collections.Generic.List[object]
$n = 0; $preskoceno = 0
foreach ($r in $radky) {
  $z = $r.zdroj.Trim(); $c = $r.cil.Trim()
  $stav = ''
  if (-not $z.StartsWith($Koren, [StringComparison]::OrdinalIgnoreCase) -or -not $c.StartsWith($Koren, [StringComparison]::OrdinalIgnoreCase)) { $stav = 'preskoceno: mimo kořen' }
  elseif (-not (Test-Path -LiteralPath $z -PathType Leaf)) { $stav = 'preskoceno: zdroj není soubor' }
  elseif ($z -ieq $c) { $stav = 'preskoceno: beze změny' }
  if ($stav) { $preskoceno++; Write-Host "  přeskočeno [$stav]  $z" -ForegroundColor DarkGray; $protokol.Add([pscustomobject]@{odkud=$z;kam=$c;stav=$stav}); continue }

  $cilFinal = Najdi-VolnyNazev $c
  if ($Provest) {
    try {
      New-Item -ItemType Directory -Force -Path (Split-Path $cilFinal -Parent) | Out-Null
      Move-Item -LiteralPath $z -Destination $cilFinal
      $stav = 'presunuto'; $n++
    } catch { $stav = "chyba: $($_.Exception.Message)" }
  } else { $stav = 'zkouska'; $n++ }
  Write-Host ("  {0}: {1}  ->  {2}" -f $stav, $z, $cilFinal)
  $protokol.Add([pscustomobject]@{odkud=$z;kam=$cilFinal;stav=$stav})
}

if ($Provest) {
  $logCesta = Join-Path (Split-Path -Parent (Resolve-Path -LiteralPath $Plan).Path) ("presun-log-{0:yyyyMMdd-HHmmss}.csv" -f (Get-Date))
  $protokol | Export-Csv -LiteralPath $logCesta -Delimiter ';' -NoTypeInformation -Encoding UTF8
  Write-Host "Přesunuto: $n, přeskočeno: $preskoceno. Protokol (pro vrácení zpět): $logCesta" -ForegroundColor Green
} else {
  Write-Host "Zkouška: bylo by přesunuto $n, přeskočeno $preskoceno. Až bude plán v pořádku, spusťte znovu s -Provest."
}
