PACKAGE_MANAGER=pnpm
CHANGE_MANAGER=changeset
SET_VERSION_COMMAND=version

while read -p "New Version? (y/n): " is_new_version
do
if [[ $is_new_version == "y" ]]; then
    $PACKAGE_MANAGER $CHANGE_MANAGER $SET_VERSION_COMMAND
    break
fi

if [[ $is_new_version == "n" ]]; then
    $PACKAGE_MANAGER $CHANGE_MANAGER
    break
fi

    echo "Enter y or n (case sensitive)"
done