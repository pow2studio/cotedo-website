#!/bin/bash

echo "* Updating thumbnails"

echo "* DE"
cd de/
rm ./thumbnails/*
for f in *.pdf; do
    arrIN=(${f//-/ })
    echo "  • ${arrIN[0]}.jpg"
    convert -colorspace sRGB -thumbnail x400 -crop 283x400+0+0 -background white -alpha remove "$f"[0] "thumbnails/${arrIN[0]}.jpg";
done


echo "* EN"
cd ../en/
rm ./thumbnails/*
for f in *.pdf; do
    arrIN=(${f//-/ })
    echo "  • ${arrIN[0]}.jpg"
    convert -colorspace sRGB -thumbnail x400 -crop 283x400+0+0 -background white -alpha remove "$f"[0] "thumbnails/${arrIN[0]}.jpg";
done

echo "* Done"