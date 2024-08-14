var viewer;
var options = {
    env: 'AutodeskProduction',
    accessToken: 'YOUR_ACCESS_TOKEN',  // Placeholder to be replaced by GitHub Actions
    api: 'derivativeV2'  // Use 'derivativeV2_EU' for models uploaded in Europe
};
var documentId = 'urn:YOUR_URN_ID';  // Placeholder for URN

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
