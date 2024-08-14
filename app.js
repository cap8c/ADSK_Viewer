var options = {
    env: 'AutodeskProduction',
    accessToken: 'YOUR_ACCESS_TOKEN'  // Replace this with the actual token
};

Autodesk.Viewing.Initializer(options, function onInitialized() {
    var viewerDiv = document.getElementById('forgeViewer');
    var viewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv);
    viewer.start();

    var documentId = 'urn:dXJuOmFkc2sud2lwLmZvcmdlLmFwaS5jb20vc2FtcGxlLnJ2dA';  // Sample URN

    Autodesk.Viewing.Document.load(documentId, function (doc) {
        var viewables = doc.getRoot().getDefaultGeometry();
        viewer.loadDocumentNode(doc, viewables).then(function() {
            console.log('Model loaded successfully!');
        });
    }, function (errorMsg) {
        console.error('Error loading document:', errorMsg);
    });
});
