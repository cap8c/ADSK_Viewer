function initializeViewer() {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: function(onGetAccessToken) {
      const forgeAccessToken = 'YOUR_ACCESS_TOKEN';  // Replace with your actual token

      onGetAccessToken(forgeAccessToken, 3600);
    }
  };

  Autodesk.Viewing.Initializer(options, function() {
    var viewerApp = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
    viewerApp.start();

    // Use the sample model URN
    var documentId = 'urn:dXJuOmFkc2sud2lwLmZvcmdlLmFwaS5jb20vc2FtcGxlLnJ2dA';
    Autodesk.Viewing.Document.load(documentId, function(doc) {
      var viewables = doc.getRoot().getDefaultGeometry();
      viewerApp.loadDocumentNode(doc, viewables);
    }, function(errorMsg) {
      console.error("Error loading document: ", errorMsg);
    });
  });
}

initializeViewer();
