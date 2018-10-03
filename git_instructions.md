# How to use git for this project

### git checkout BRANCHNAME
 - changes the branch you're working on
 - master is the main branch

### git push REPO BRANCH
 - origin is the repository you're in
 - master is the main branch
 - git push origin master will upload to your repository
 
## How to upload your code to the original fork
 - git checkout -b new_branch_name
 - git add .
 - git commit -m "SOME MESSAGE HERE"
 - git push origin same_branch_name_as_earlier
 - compare the branches on GitHub and it'll get approved

## How to update your fork
 - git checkout master
 - git fetch upstream
 - git pull
