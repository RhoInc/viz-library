import requests
import os
import json

def getGistList(user):
    #get all of the gists for a user and save the data as json
    print("Getting gists for "+user)

    url = "https://api.github.com/users/"+user+"/gists"
    response = requests.get(url)

    if(response.status_code==200):
        print("Got "+str(len(response.json()))+" gists for "+user)
        return response.json()
    else:
        print("Something went wrong getting gists for "+user)

def getAllGists(userList):
    print("Getting gists for "+str(len(userList))+" users.")
    allGists = []
    for name in userList:
        userGists = getGistList(name)
        allGists = allGists + userGists
    print("Got a total of "+str(len(allGists))+" gists")
    return allGists

def scrapeFiles(gists, destinationPath):
    i = 0
    for gist in gists:
        i=i+1
        gist["gist_dir"] = "../../bin/gists/"+gist["id"]
        if not os.path.exists(gist["gist_dir"]):
            os.makedirs(gist["gist_dir"])
        for key in gist['files']:
            fileMeta = gist['files'][key]
            filePath = gist["gist_dir"] + "/" + fileMeta["filename"]
            if not os.path.exists(filePath):
                file_url=fileMeta["raw_url"]
                file_content = requests.get(file_url)
                saveFile(file_content.text, filePath)
            else:
                print(filePath+" already saved.")
        print("Scraped " + str(i) + " of " + str(len(gists)) + " gists.")

def saveFile(contents, filename):
	myFile = open(filename, 'w+')
	myFile.truncate()
	myFile.write(contents)
	myFile.close()
	print("Content saved as: "+filename)

# This basic command line argument parsing code is provided
def main():
    allGists = getAllGists(["jwildfire","nbryant","samussiah"])
    scrapeFiles(allGists, "../../bin/gists")
    print(json.dumps(allGists))
    saveFile("var gists = "+json.dumps(allGists),"../../util/web/data/gists.js")

if __name__ == '__main__':
  main()
