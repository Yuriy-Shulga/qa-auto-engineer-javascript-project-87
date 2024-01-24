status: lint
	git status

install:
	npm ci

publish:
	npm publish --dry-run

test:
	npx jest

test-coverage:
	npx jest --coverage

lint:
	npx eslint . --fix