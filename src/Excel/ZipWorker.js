/* jshint unused: false */
/* globals  importScripts, JSZip, postMessage */

var onmessage = function(event) {
    "use strict";
    if (!event.data || !event.data.ziplib) { return; }
    
    importScripts(event.data.ziplib);
    
    var zip = new JSZip();
    var files = event.data.files;
    for(var path in files) {
        if(files.hasOwnProperty(path)) {
            var content = files[path];
            path = path.substr(1);
            zip.file(path, content, {base64: false});
        }
    }
    postMessage({
        base64: !!event.data.base64
    });
    zip.generateAsync({
        type: !!event.data.type ? event.data.type ? !!event.data.base64 ? 'base64' : JSZip.support.uint8array ? 'uint8array' : 'binarystring'
    }).then(function(content){
        postMessage({
            status: 'done',
            data: content
        });
    });
};



