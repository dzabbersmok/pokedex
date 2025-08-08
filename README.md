# pokedex

## REPL
REPL stands for "read-eval-print loop". It's a common type of program that allows for interactivity. You type in a command, and the program evaluates it and prints the result. You can then type in another command, and so on.

## tsconfig.json
- **rootDir** is where your TypeScript files are located
- **outDir** is where your compiled JavaScript files will go (won't modify these - they're generated from TypeScript files)
- **include** specifies the files to include in the compilation
- **exclude** specifies the files to exclude from the compilation
- **strict** enables all strict type checking options
- **esModuleInterop** allows you to use ES module syntax
- **moduleResolution** specifies how modules are resolved
- **skipLibCheck**  skipstype checking all declaration files
- **baseUrl** allows you to use paths relative to the project root
