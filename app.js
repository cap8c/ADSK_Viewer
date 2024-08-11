var options = {
  env: 'AutodeskProduction',
  getAccessToken: function(onGetAccessToken) {
    // Replace with your logic to obtain an access token
    var accessToken = 'YOUR_ACCESS_TOKEN';
    var expireTimeSeconds = 3600;
    onGetAccessToken(accessToken, expireTimeSeconds);
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
