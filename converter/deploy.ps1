param (
    [int]$RevisionVersion
)

$imageName = "i7657043/html-lex-converter:latest"

docker build -t $imageName .

docker push $imageName

if ($Cache_type -eq "no-store") {
    az containerapp update `
        -n html-lex-converter-app -g html-lex-converter `
        --revision-suffix "v$RevisionVersion" `
        --image "docker.io/$imageName"
}