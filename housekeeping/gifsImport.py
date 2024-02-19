#!/usr/bin/env python3

def main():
    file = open("./housekeeping/exportGifs.ts", 'w')
    for i in range(906, 1011):
        file.write("import p" + str(i) + " from \"./" + str(i) + ".gif\";\n")

    file.write("const gifs = {\n")
    for i in range(906, 1011):
        file.write("\"p" + str(i) + "\": " + "p" + str(i) + ",\n")
    file.write("}")
    file.close()

if __name__ == "__main__":
    main()