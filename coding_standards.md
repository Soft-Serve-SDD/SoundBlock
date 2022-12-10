#### The frontend 
- React Components start with Capitalized (our sister to classes)
- Functions are lowercase
- Hooks are declared at top
- We make use of context when there are 3 or more levels of nesting when passing down props. Props are how react components pass data to each other.  

We follow the coding standards of prettier, and opinionated code formatter. These include  
- Use single quotes for literals
- Add space after keywords such as `if` and `for`
- Terminating statements with a semicolon
- Aligning opening and closing braces in the the same column 
- More can be found in the prettier documentation: https://prettier.io/docs/en/rationale.html  

Running `prettier --write .` will enforce these conventions.

We make use of ESlint, a linter system for the frontend. The command `eslint .` will check all the files in the current direction, looking for potential errors and issues, and enforcing certain coding standards. 


#### Backend
The backend Python code was written to meet PEP8 coding standards. This includes but is not limited to:
- 2 blank lines before top level function and class definitions and blank line at end of file
- Camelcase for class names, lowercase for function names
- No redundant parentheses
- Global variable names are in all caps  

The full link to the PEP8 style guide can be accessed here: https://peps.python.org/pep-0008/. This was enforced by using the Pycharm IDE to check for and enforce the rules of PEP8 python style guide in the backend code. This way, violations of this standard were marked with yellow underscores. An example is shown below.
