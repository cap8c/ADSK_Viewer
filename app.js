// Function to initialize the Autodesk Forge Viewer
function initializeViewer() {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: function(onGetAccessToken) {
      // Retrieve the Forge access token from an environment variable
      const forgeAccessToken = process.env.FORGE_ACCESS_TOKEN;

      // Check if the token exists
      if (!forgeAccessToken) {
        console.error("Forge access token is not available.");
        return;
      }

      // Provide the access token and its expiration time (in seconds)
      onGetAccessToken(forgeAccessToken, 3600);
    }
  };

  // Initialize the viewer
  Autodesk.Viewing.Initializer(options, function() {
    var viewerApp = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
    viewerApp.start();

    // Replace 'YOUR_MODEL_URN' with your actual model URN
    var documentId = 'urn:YOUR_MODEL_URN';
    Autodesk.Viewing.Document.load(documentId, function(doc) {
      var viewables = doc.getRoot().getDefaultGeometry();
      viewerApp.loadDocumentNode(doc, viewables);
    }, function(errorMsg) {
      console.error("Error loading document: ", errorMsg);
    });
  });
}

// Call the function to initialize the viewer
initializeViewer();
