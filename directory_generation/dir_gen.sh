#!/bin/bash
while read -r line; do
    if [[ "$line" == */ ]]; then
        mkdir -p "$line"
    else
        mkdir -p "$(dirname "$line")" && [ ! -f "$line" ] && touch "$line"
    fi
done