function initializeViewer() {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: function(onGetAccessToken) {
      const forgeAccessToken = 'YOUR_ACCESS_TOKEN';  // Placeholder for the token

      onGetAccessToken(forgeAccessToken, 3600);
    }
  };

  Autodesk.Viewing.Initializer(options, function() {
    var viewerApp = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
    viewerApp.start();

    var documentId = 'urn:YOUR_MODEL_URN';
    Autodesk.Viewing.Document.load(documentId, function(doc) {
      var viewables = doc.getRoot().getDefaultGeometry();
      viewerApp.loadDocumentNode(doc, viewables);
    });
  });
}

initializeViewer();
