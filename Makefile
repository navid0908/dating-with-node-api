test:
	@node node_modules/lab/bin/lab -a code
test-coverage:
	@node node_modules/lab/bin/lab -a code -t 100
test-coverage-html:
	@node node_modules/lab/bin/lab -a code -r html -o coverage.html

.PHONY: test test-coverage test-coverage-html