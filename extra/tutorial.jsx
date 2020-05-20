// // Hello World Script
// // Remember current unit settings and then set units to
// // the value expected by this script 
// var originalUnit = preferences.rulerUnits
// preferences.rulerUnits = Units.INCHES

// // Create a new 2x4 inch document and assign it to a variable
// var docRef = app.documents.add( 2, 4 )

// // Create a new art layer containing test
// var artLayerRef = docRef.artLayers.add()
// artLayerRef.kind = LayerKind.TEXT

// // Set the contents of the text layer.
// var textItemRef = artLayerRef.textItem
// textItemRef.contents = "Hello, World"

// // Release references
// docRef = null
// artLayerRef = null
// textItemRef = null

// // Restore original ruler unit setting
// app.preferences.rulerUnits = originalUnits

documents.add(8, 11.5)
displayDialogs = DialogModes.NO

// var count = 15;
// alert('out function count: ' + count);
// add10(count);
// alert('out function count: ' + count);

var person = [{
    name: "Luka Feygin",
    age: 1,
}];
alert('out function age: ' + person[0].age);
add10(person[0]);
alert('out function count: ' + person[0].age);

function add10(count) {
    count.age += 10;
    alert('in function count: ' + count.age);
}

// jpgFile = new File("\\Users\\Nicole\\Documents\\PyPhoto\\trial1.jpg")
// jpgSaveOptions = new JPEGSaveOptions()
// jpgSaveOptions.quality = 12
// activeDocument.saveAs(jpgFile, jpgSaveOptions, true, Extension.LOWERCASE)