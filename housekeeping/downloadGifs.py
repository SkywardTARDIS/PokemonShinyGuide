#!/usr/bin/env python3
import re
import requests

def main():
    file = open("./housekeeping/paldeaGifs.json")
    urlRe = re.compile(r'http[\S]+download')
    dexNo = re.compile(r'[0-9]+')
    header = file.readline()
    header = file.readline()
    while header:
        url = re.findall(urlRe, header)
        number = re.findall(dexNo, header)[0]
        if url:
            print(url[0])
            r = requests.get(url[0], allow_redirects=True)
            filename = "./housekeeping/" + number + ".gif"
            open(filename, 'wb').write(r.content)
        header = file.readline()


if __name__ == "__main__":
    main()