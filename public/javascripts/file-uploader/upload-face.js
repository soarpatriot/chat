function createUploader(){
    var uploader = new qq.FileUploader({
        element: document.getElementById('file-uploader-demo1'),
        action: '/upload-face',
        debug: true,
        extraDropzones: [qq.getByClass(document, 'qq-upload-extra-drop-area')[0]],
        listElement: document.getElementById('result-list'),
        uploadButtonText: '上传',
        cancelButtonText: '取消',
        failUploadText: '上传失败',
        multiple:false,
        sizeLimit:1024000,
        allowedExtensions:['jpg','gif','png'],
        onComplete: function(id, fileName, response){
            //alert('id: '+id+ '   fileName: '+fileName);
            //if (!response.success){
            //  ok(false, 'server did not receive file')
            // return;
            //}
            //var faceUrl = '/images/face/'+fileName;
            var faceUrl = response.url;
            $('#image-face').attr('src',faceUrl);
            $('#image-face-hidden').attr('value',faceUrl);
            //delete response.success;
            //delete response.qqfile;

            // same(response, data, 'server received file and data');
        }
    });
}

// in your app create uploader as soon as the DOM is ready
// don't wait for the window to load
window.onload = createUploader;