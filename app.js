var viewer;
var options = {
    env: 'AutodeskProduction',
    accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY0RE9XMnJoOE9tbjNpdk1NU0xlNGQ2VHEwUV9SUzI1NiIsInBpLmF0bSI6ImFzc2MifQ.eyJzY29wZSI6WyJkYXRhOnJlYWQiLCJkYXRhOndyaXRlIl0sImNsaWVudF9pZCI6IkdEc0F1WFl4R1ltblc5am5JbVY4Z0o5aE1CWXhsblhKT1BiNm1IMVlzYXJyazJIRCIsImlzcyI6Imh0dHBzOi8vZGV2ZWxvcGVyLmFwaS5hdXRvZGVzay5jb20iLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbSIsImp0aSI6IkExOVNpajZITHpLWUEydlpua0JJQkE2Y09kdFc2OFJUdVNvSWdLUzhHTDZkbEU4cHlUUHZMd3FsWGhwR2VHSGIiLCJleHAiOjE3MjM2NzE5MTN9.E7pqmQ35OTGSrPQd35XI752TuB3qQ7tfL0LDOydAobWcypdRU1xyLPqRO0bLm04jIukHK1zX-ZvF5iQJ4Ox3oAOA3f_TAjZIHPxvNT2w3X97x6BxkQn7aun5sORx9gxQBOygVml8NhFbirmwh4rOJ6nAekQk7VFu34d2lIs6llpumCQu1odubRL5iqrVUf2FFa-u1HgWudIaEvft13fKfqhmoSo3O-dtqQdnRO-c-En9MEJGnyj9o_jSl2tDSJpeXvGuF1O-aacndvN9ZMCeFHu_4ezNSk12TZqmT_FzxXLWn8JzSJwa2r308u9mppUXxYhtHGT9W4q4_a9sRptSKg',  // Placeholder to be replaced by GitHub Actions
    api: 'derivativeV2'
};
var documentId = 'urn:dXJuOmFkc2sud2lwLmZvcmdlLmFwaS5jb20vc2FtcGxlLnJ2dA';  // Sample model URN

Autodesk.Viewing.Initializer(options, function onInitialized(){
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
});

function onDocumentLoadSuccess(doc) {
    var geometries = doc.getRoot().search({'type':'geometry'});
    if (geometries.length === 0) {
        console.error('Document contains no geometries.');
        return;
    }

    var initGeom = geometries[0];

    var viewerDiv = document.getElementById('MyViewerDiv');
    var config = {
        extensions: initGeom.extensions() || []
    };
    viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv, config);

    var svfUrl = doc.getViewablePath(initGeom);
    var modelOptions = {
        sharedPropertyDbPath: doc.getPropertyDbPath()
    };
    viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
}

function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');
    console.log('Validate model loaded: ' + (viewer.model === model));
    console.log(model);
}

function onLoadModelError(viewerErrorCode) {
    console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}
