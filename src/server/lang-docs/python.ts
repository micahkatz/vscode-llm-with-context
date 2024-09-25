export default `
Key concepts in Python include:

Variables and Data Types: Python is dynamically typed, meaning you don't need to declare the type of a variable. Common data types include int, float, str, list, tuple, set, and dict.

Indentation: Python uses indentation (whitespace) to define blocks of code, unlike other languages that use braces {}. Proper indentation is essential for code structure.

Functions: Functions in Python are defined using the def keyword, followed by the function name and parameters. Functions can return values using return or return None by default.

Lists, Tuples, and Dictionaries:

Lists: Ordered, mutable collections. Defined with square brackets: my_list = [1, 2, 3].
Tuples: Ordered, immutable collections. Defined with parentheses: my_tuple = (1, 2, 3).
Dictionaries: Key-value pairs. Defined with curly braces: my_dict = {'key': 'value'}.
Loops and Conditionals:

For and While Loops: Python uses for and while loops to iterate over sequences or execute a block of code while a condition is true.
If-Else Statements: Conditional logic is handled with if, elif, and else.
List Comprehensions: A concise way to create lists. For example: [x*2 for x in range(5)] creates a list of numbers doubled from 0 to 4.

Object-Oriented Programming (OOP): Python supports OOP with classes and objects. Classes are defined using the class keyword. They can contain attributes (variables) and methods (functions).

Inheritance: Python classes can inherit properties and methods from other classes, allowing code reuse. Inheritance is specified by passing the parent class to the child class, e.g., class Child(Parent).

Modules and Packages: Python allows you to organize code into reusable modules (Python files). A package is a collection of modules organized into directories. Modules are imported using the import statement.

Exceptions and Error Handling: Python handles errors with try, except, and finally blocks, allowing the program to recover or handle exceptions gracefully.

Iterators and Generators:

Iterators: Objects that can be iterated (looped) upon, such as lists or custom objects with the __iter__() method.
Generators: Special functions that yield values one at a time, useful for generating large sequences without consuming memory. Defined with yield instead of return.
Decorators: Functions that modify the behavior of other functions or methods. They are often used for logging, enforcing access control, or modifying outputs.

Lambda Functions: Anonymous, inline functions defined with the lambda keyword. They are often used for short, simple functions like lambda x: x + 1.

File Handling: Python makes reading and writing files easy with built-in open(), read(), and write() functions, supporting text, binary, and JSON formats.

Pythonic Code: Writing clean, readable, and efficient code that adheres to Python's design philosophy (found in import this). Key principles include simplicity, readability, and avoiding complex one-liners.

Type Hinting: Although Python is dynamically typed, it supports optional type hints to specify variable and function return types. This improves code readability and helps with static analysis.`;
