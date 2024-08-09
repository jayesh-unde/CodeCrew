export const LANGUAGE_VERSIONS = {
    python: "3.10.0",
    java: "15.0.2",
    cpp: "11.2.0",  // Assuming GCC version for C++
};

export const CODE_SNIPPETS = {
    python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    cpp: `\n#include<iostream>\n\nint main() {\n\tstd::cout << "Hello, World!" << std::endl;\n\treturn 0;\n}\n`
};
