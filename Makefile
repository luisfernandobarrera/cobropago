clean:
	rm -rf cobropago/web/static/bundles/*
	find . -name "*.pyc" -print0 | xargs -0 rm -rf
	rm -rf htmlcov
	rm -rf .coverage
	rm -rf build
	rm -rf dist
	rm -rf src/*.egg-info

