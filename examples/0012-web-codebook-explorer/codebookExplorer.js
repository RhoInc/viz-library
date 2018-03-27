function initExplorer(fileList){
	console.log(fileList)
	var fileList = fileList.map(function(m){
		m.path = "../."+m.rel_path;
		return m;
	})
	var settings = {
		labelColumn:"filename",
		ignoredColumns: ["local_path","rel_path","path"],
		files:fileList
	};
	var explorer = webcodebook.createExplorer(".explorer", settings).init();
}
console.log(dataFiles)
initExplorer(dataFiles)
