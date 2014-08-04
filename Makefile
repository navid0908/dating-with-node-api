test:
	@node node_modules/lab/bin/lab
test-coverage:
	@node node_modules/lab/bin/lab -t 100
test-coverage-html:
	@node node_modules/lab/bin/lab -r html -o coverage.html

.PHONY: test test-coverage test-coverage-html