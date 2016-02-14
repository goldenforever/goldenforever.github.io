#!/usr/bin/env bash
cd ~/public_html/some-js/jsmin;
min_a=$(python -m jsmin ../compiler.js)
echo "$min_a" > ../compiler.min.js
min_b=$(python -m jsmin ../root.js)
echo "$min_b" > ../root.min.js
cd ~/public_html/some-js;
python generate.py