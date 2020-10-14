git:  ## add, commit and push in one command
	git add .
	git commit -m "$m"
	git push origin master

pushDev:  ## push to the dev branch
	git add .
	git commit -m "$m"
	git push origin dev