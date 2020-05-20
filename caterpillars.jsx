const PATH = "\\Users\\Nicole\\Documents\\JsPhoto\\";
const SAVE_QUALITY = 12;
const NUM_SQUARES = 12;

var boys = [
    { first: 'Anthony', last: 'Queen', gender: 'B'},
    { first: 'Brayden', last: 'Munro', gender: 'B'},
    { first: 'Charlie', last: 'Aronoff', gender: 'B'},
    { first: 'Daniel', last: 'Macy', gender: 'B'},
    { first: 'Dominic', last: 'Urikh', gender: 'B'},
    { first: 'Dov', last: 'Friedman', gender: 'B'},
    { first: 'Elliott', last: 'Luther', gender: 'B'},
    { first: 'Jeremy', last: 'Garrett', gender: 'B'},
    { first: 'Jonah', last: 'Rubin', gender: 'B'},
    { first: 'Liam', last: 'Mcarleton', gender: 'B'},
    { first: 'Max', last: 'Friedenberg', gender: 'B'},
    { first: 'Jonah', last: 'Rubin', gender: 'B'},
    { first: 'Dominic', last: 'Urikh', gender: 'B'},
    // { first: 'Elliott', last: 'Luther', gender: 'B'},
];
var girls = [
    { first: 'Annabel', last: 'Brand', gender: 'G'},
    { first: 'Elise', last: 'Cohen', gender: 'G'},
    { first: 'Ella', last: 'Trompeter', gender: 'G'},
    { first: 'Fiona', last: 'Leider', gender: 'G'},
    { first: 'Gina', last: 'Gershonowicz', gender: 'G'},
    { first: 'Judy', last: 'Montingelli', gender: 'G'},
    { first: 'Kayla', last: 'Lerman', gender: 'G'},
    { first: 'Orlee', last: 'Beale', gender: 'G'},
    { first: 'Pearl', last: 'Schwartz', gender: 'G'},
    { first: 'Bellarose', last: 'Weinstock', gender: 'G'},
    { first: 'Kayla', last: 'Lerman', gender: 'G'},
    { first: 'Bellarose', last: 'Weinstock', gender: 'G'},
    { first: 'Annabel', last: 'Brand', gender: 'G'},
    { first: 'Elise', last: 'Cohen', gender: 'G'},
    { first: 'Ella', last: 'Trompeter', gender: 'G'},
    { first: 'Ella', last: 'Trompeter', gender: 'G'},
];

small_names();
big_names();

function small_names() {
    // Set up the document with the proper doc information
    var docName = "Caterpillar_small_";
    var fileRef = File(PATH + "templates\\" + docName + "template.psd");
    var docFile = open(fileRef);
    toggleLayerVisibility(docFile, false);
    
    var docInfo = [{
        docRef: docFile,
        docName: docName,
        docCount: 1,
        spaceCount: 0,
    }];
    var numSpaces = 12;

    // Run the automation for each caterpillar version
    caterpillarSet(docInfo[0], numSpaces, 'B', false); // boys - first names
    caterpillarSet(docInfo[0], numSpaces, 'B', true);  // boys - full names
    caterpillarSet(docInfo[0], numSpaces, 'G', false); // girls - first names
    caterpillarSet(docInfo[0], numSpaces, 'G', true);  // girls - full names

    saveDoc(docName, docInfo[0].docCount);

    docFile.close(SaveOptions.DONOTSAVECHANGES);
}

function big_names() {
    // Set up the document with the proper doc information
    var docName = "Caterpillar_big_";
    var fileRef = File(PATH + "templates\\" + docName + "template.psd");
    var docFile = open(fileRef);
    toggleLayerVisibility(docFile, false);

    var docInfo = [{
        docRef: docFile,
        docName: docName,
        docCount: 1,
        spaceCount: 0,
    }];
    var boyNumSpaces = 3;
    var girlNumSpaces = 2;

    // Run the automation for each caterpillar version
    caterpillarSet(docInfo[0], boyNumSpaces, 'B', true);  // boys - full names
    caterpillarSet(docInfo[0], girlNumSpaces, 'G', true);  // girls - full names

    saveDoc(docName, docInfo[0].docCount);

    docFile.close(SaveOptions.DONOTSAVECHANGES);
}

function caterpillarSet(docInfo, numSpaces, gender, isFullName) {
    var nameCount = 0;
    var nameList;
    var genderStr;

    // Select the appropriate list and string for the gender
    if (gender === 'B') {
        nameList = boys;
        genderStr = 'boy';
    } else if (gender === 'G') {
        nameList = girls;
        genderStr = 'girl';
    } else {
        alert("Error: invalid gender character");
    }

    for (; nameCount < nameList.length; ++nameCount) {
        // If the page is full, save the document and clear the page
        if (docInfo.spaceCount === numSpaces) {
            saveDoc(docInfo.docName, docInfo.docCount);
            ++docInfo.docCount;
            docInfo.spaceCount = 0;
            toggleLayerVisibility(docInfo.docRef, false);
        }

        // Make the appropriate caterpillar gender visible
        docInfo.docRef.layerSets[genderStr + '_caterpillar'].layers['caterpillar' + docInfo.spaceCount].visible = true;

        // Make the appropriate name visible
        if (!isFullName) {
            docInfo.docRef.layerSets[genderStr + '_firstname'].layers['name' + docInfo.spaceCount].visible = true;
            docInfo.docRef.layerSets[genderStr + '_firstname'].layers["name" + docInfo.spaceCount].textItem.contents = 
                nameList[nameCount].first.toUpperCase();
        } else {
            docInfo.docRef.layerSets[genderStr + '_fullname'].layers['name' + docInfo.spaceCount].visible = true;
            docInfo.docRef.layerSets[genderStr + '_fullname'].layers["name" + docInfo.spaceCount].textItem.contents = 
                nameList[nameCount].first.toUpperCase() + "\r" + nameList[nameCount].last.toUpperCase();
        }

        ++docInfo.spaceCount;
    }
}

function toggleLayerVisibility(docRef, boolVal) {
    for (var set = 0; set < docRef.layerSets.length; ++set) {
        docRef.layerSets[set].visible = true;
        for (var layer = 0; layer < docRef.layerSets[set].layers.length; ++layer) {
            docRef.layerSets[set].layers[layer].visible = boolVal;
        }
    }
}

function saveDoc(title, docCount) {
    // Save a jpeg version
    jpgFile = new File(PATH + "output\\" + title + docCount + ".jpg");
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.quality = SAVE_QUALITY;
    activeDocument.saveAs(jpgFile, jpgSaveOptions, true, Extension.LOWERCASE);

    // Save a photoshop version
    // psdFile = new File(PATH + "output\\" + title + docCount + ".psd");
    // activeDocument.saveAs(psdFile);
}

// https://www.adobe.com/content/dam/acom/en/devnet/photoshop/scripting/photoshop-cc-scripting-guide.pdf
// https://wwwimages2.adobe.com/content/dam/acom/en/devnet/photoshop/pdfs/photoshop-cc-javascript-ref.pdf

// function parseNames() {
//     alert(names);
    // const fs = require('fs').default();
  
    // // alert(PATH + "names.txt");
    // fs.readFile(PATH + "names.txt", (err, data) => { 
    //     if (err) throw err; 
    
    //     alert(data.toString()); 
    // }) 
// }

// function parseNames() {
//     var reader = newFileReader();

//     reader.onload = function(e) {
//     var data = e.target.result;
//     var workbook = XLSX.read(data, {
//         type: 'binary'
//     });

//     workbook.SheetNames.forEach(function(sheetName) {
//         // Here is your object
//         var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
//         var json_object = JSON.stringify(XL_row_object);
//         alert(json_object);

//     })

//     };

//     reader.onerror = function(ex) {
//         alert(ex);
//     };

//     reader.readAsBinaryString(file);
// }

// TODO
// Accommodate long names
// Read in from excel or text file
// Automate big caterpillars

// 151 -> 81 -> 58(22)
// Total line count 142