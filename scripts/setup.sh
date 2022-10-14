if ! command pnpm -v &> /dev/null
then

    echo "Installing PNPM Package Manager"

    if ! command brew -v
    then
        curl -fsSL https://get.pnpm.io/install.sh | sh -
    fi

    brew install pnpm
fi

PNPM_VERSION="$(pnpm -v)"

echo "PNPM Version $PNPM_VERSION Detected"