var fileList = dataFiles.map(function(m){
    m.path = "../."+m.rel_path;
    return m;
})
.sort(function(a,b) {
    return a.filename < b.filename ? -1 : 1;
});
var settings = {
    labelColumn:"filename",
    ignoredColumns: ["local_path","rel_path","path"],
    files:fileList
};
var explorer = webcodebook.createExplorer(".explorer", settings)
explorer.init();
