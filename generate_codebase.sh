#!/bin/bash
OUTPUT_FILE="/Users/alabid/.gemini/antigravity-ide/brain/c649d5a9-fc4f-4cce-b1d7-4d36598b646a/codebase.md"
echo "# Full Codebase" > "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "## 1. Project Structure" >> "$OUTPUT_FILE"
echo '```text' >> "$OUTPUT_FILE"
find . -type f -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/.git/*" -not -path "*/public/*" -not -name "package-lock.json" | sort >> "$OUTPUT_FILE"
echo '```' >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

FILES=$(find . -type f -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/.git/*" -not -path "*/public/*" -not -name "package-lock.json" -not -name "*.ico" -not -name "*.png" -not -name "*.jpg" -not -name "structure.txt" -not -name "generate_codebase.sh" | sort)

for file in $FILES; do
    echo "## $file" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # Determine extension
    ext="${file##*.}"
    lang=""
    case "$ext" in
        ts|tsx) lang="typescript" ;;
        js|jsx) lang="javascript" ;;
        json) lang="json" ;;
        css) lang="css" ;;
        md) lang="markdown" ;;
        *) lang="text" ;;
    esac
    
    echo '```'"$lang" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo '```' >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

echo "Done generating codebase.md"
