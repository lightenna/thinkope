SOURCE_ENV="develop"
TARGET_ENV="master"
git fetch --all && git checkout ${TARGET_ENV} && git merge ${SOURCE_ENV} && git push && git checkout ${SOURCE_ENV}
