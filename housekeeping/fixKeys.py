import re

def main():
    file = open("./src/assets/jsons/dexCounts.json", 'r')
    outFile = open("./housekeeping/newdexCounts.json", 'w')
    countsre = re.compile(r'".*": \{[\W+].*"species"')
    keyre = re.compile(r'".*": \{')
    fileString = file.read()
    #automatically finds how many entries to update
    dexCounts = len(re.findall(countsre, fileString)) - 1
    for i in range(dexCounts, -1, -1):
        #print(re.search(keyre, fileString))
        fileString = re.sub(keyre, "\"" + str(i) + "\": {", fileString, i+2)
    outFile.write(fileString.replace("0", "Pokedex", 1))
    file.close()
    outFile.close()

if __name__ == "__main__":
    main()