# find path to script directory
cwd="$(dirname $(readlink -f "$0"))"

# change into app directory
cd ${cwd}/../../app/

echo "Removing package-lock"
rm -rf ./package-lock.json
echo "Removing modules"
rm -rf ./node_modules
echo "Performing fresh 'npm install'"
npm install
