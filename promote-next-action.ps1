param(
    [string]$FilePath
)

# Zpracuj jen soubory v projects/
if ($FilePath -notmatch '\\projects\\') {
    exit 0
}

$content = Get-Content -Path $FilePath -Raw -Encoding UTF8
if (-not $content) { exit 0 }

$lines = $content -split "`n"
$modified = $false

for ($i = 0; $i -lt $lines.Count; $i++) {
    # Najdi splněný task, který má stále #next-action
    if ($lines[$i] -match '^(\s*- \[x\].*)#next-action(.*)$') {
        $before = $Matches[1]
        $after = $Matches[2]

        # Odstraň #next-action ze splněného tasku
        $lines[$i] = ($before + $after).TrimEnd()

        # Najdi hned PRVNÍ nesplněný task a přidej mu #next-action (pokud ho ještě nemá)
        for ($j = $i + 1; $j -lt $lines.Count; $j++) {
            if ($lines[$j] -match '^\s*- \[ \]') {
                if ($lines[$j] -notmatch '#next-action') {
                    $lines[$j] = $lines[$j].TrimEnd() + ' #next-action'
                    $modified = $true
                }
                break
            }
        }
        break
    }
}

if ($modified) {
    $joined = $lines -join "`n"
    [System.IO.File]::WriteAllText($FilePath, $joined, [System.Text.UTF8Encoding]::new($false))
}
