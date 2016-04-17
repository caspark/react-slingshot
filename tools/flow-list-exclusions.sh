#!/bin/bash

readonly RED='\033[1;33m'
readonly NC='\033[0m'

readonly EXCLUDED_FILES="$(find src/{back,front} -iname '*.js' -printf '%p: ' -exec head -n1 {} \; | grep -v '// @flow' | cut -d':' -f1)"

if [[ "$1" = '--color' ]]; then
  printf "${RED}${EXCLUDED_FILES}${NC}\n"
else
  echo "${EXCLUDED_FILES}"
fi
