#!/bin/bash

readonly RED='\033[1;33m'
readonly NC='\033[0m'

readonly EXCLUDED_FILES="$(find src/{back,front} -iname '*.js' -printf '%p: ' -exec head -n1 {} \; | grep -v '// @flow' | cut -d':' -f1)"

if [[ -z "$EXCLUDED_FILES" ]]; then
  if [[ "$1" = '--pretty' ]]; then
    echo "Flow type checker: all files in src/{back,front} are marked with \"// @flow\" - great! They will all be type-checked :)"
  fi
else
  if [[ "$1" = '--pretty' ]]; then
    echo 'Flow type checker: the following files are missing \"// @flow\" as their first line so they will be excluded from type-checking:'
    printf "${RED}${EXCLUDED_FILES}${NC}\n"
  else
    echo "${EXCLUDED_FILES}"
  fi
fi
