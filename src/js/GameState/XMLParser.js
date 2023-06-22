//Made with ChatGPT as experiment.

const fs = require('fs');
const ex = require('excalibur');

function parseXMLFileAndConvertToColliders(filePath) {
    const xmlData = fs.readFileSync(filePath, 'utf-8');

    // Create a parser object
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

    // Get all mxGeometry elements
    const mxGeometryElements = xmlDoc.getElementsByTagName('mxGeometry');

    // Convert mxGeometry elements to Box Colliders
    for (let i = 0; i < mxGeometryElements.length; i++) {
        const mxGeometryElement = mxGeometryElements[i];
        const x = parseInt(mxGeometryElement.getAttribute('x'));
        const y = parseInt(mxGeometryElement.getAttribute('y'));
        const width = parseInt(mxGeometryElement.getAttribute('width'));
        const height = parseInt(mxGeometryElement.getAttribute('height'));

        // Create Box Collider using mxGeometry attributes
        const boxCollider = new ex.BoxCollider({
            width: width,
            height: height,
            // Set other properties like position, color, collision type, etc.
        });

        // Set Box Collider position based on mxGeometry coordinates
        boxCollider.pos.setTo(x, y);

        // Add the Box Collider to your Excalibur.js scene or appropriate object
        scene.add(boxCollider);
    }
}

// Example usage
const filePath = 'your_xml_file.xml';
parseXMLFileAndConvertToColliders(filePath);
