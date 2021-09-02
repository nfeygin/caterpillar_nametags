const PATH = "O:\\Katrine's_School_Stuff\\Caterpillar_Names_Program\\";
const SAVE_QUALITY = 12;
const NUM_SQUARES = 12;

var boys = [
    { first: 'Anthony', last: 'Pauwels', gender: 'B'},
    { first: 'Brooks', last: 'Levin', gender: 'B'},
    { first: 'Daniel', last: 'Uvaydov', gender: 'B'},
    { first: 'Jacob', last: 'Mellin', gender: 'B'},
    { first: 'Jacob', last: 'Sherman', gender: 'B'},
    { first: 'Jaxon', last: 'Wallace', gender: 'B'},
    { first: 'Kambell', last: 'Kirshman', gender: 'B'},
    { first: 'Liam', last: 'Rickli', gender: 'B'},
    { first: 'Parker', last: 'Meisel', gender: 'B'},
    { first: 'Zevi', last: 'Anderson', gender: 'B'},
];
var girls = [
    { first: 'Beatrice', last: 'Wiesenthal', gender: 'G'},
    { first: 'Lincoln', last: 'Diem', gender: 'G'},
    { first: 'Maya', last: 'Benoliel', gender: 'G'},
    { first: 'Olivia', last: 'Israilov', gender: 'G'},
    { first: 'Rachel', last: 'Billiau', gender: 'G'},
    { first: 'Shayna', last: 'Shlom', gender: 'G'},
    { first: 'Sophie', last: 'Starr', gender: 'G'},
];

// parseNames();
small_names();
big_names();
growth_chart();

function parseNames() {
    // var boy_duplicates = new Map();
    // var girl_duplicates = new Map();

    for (var i = 0; i < boys.length; ++i) {
        if (boy_duplicates.has(boys[i])) {
            boy_duplicates.set(boys[i], true);
        } else {
            boy_duplicates.set(boys[i], false);
        }
    }

    // for (var i = 0; i < girls.length; ++i) {
    //     if (girl_duplicates.has(girls[i])) {
    //         girl_duplicates.set(girls[i], true);
    //     } else {
    //         girl_duplicates.set(girls[i], false);
    //     }
    // }

    boy_duplicates.forEach(function(value, key) {
        alert(key + ' = ' + value);
    })
}

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
    caterpillarSet(docInfo[0], girlNumSpaces, 'G', true); // girls - full names

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

function growth_chart() {
    // Set up the document with the proper doc information
    var docName = "Caterpillar_growth_chart_";
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

    // Run the automation
    growth_chart_work(docInfo[0], numSpaces, boys);  // boys
    growth_chart_work(docInfo[0], numSpaces, girls); // girls

    saveDoc(docName, docInfo[0].docCount);

    docFile.close(SaveOptions.DONOTSAVECHANGES);
}

function growth_chart_work(docInfo, numSpaces, nameList) {
    var nameCount = 0;

    for (; nameCount < nameList.length; ++nameCount) {
        // If the page is full, save the document and clear the page
        if (docInfo.spaceCount === numSpaces) {
            saveDoc(docInfo.docName, docInfo.docCount);
            ++docInfo.docCount;
            docInfo.spaceCount = 0;
            toggleLayerVisibility(docInfo.docRef, false);
        }

        // Make the appropriate layers visible
        docInfo.docRef.layers['caterpillar' + docInfo.spaceCount].visible = true;
        docInfo.docRef.layers['name' + docInfo.spaceCount].visible = true;

        // Insert the next name
        docInfo.docRef.layers["name" + docInfo.spaceCount].textItem.contents = nameList[nameCount].first;

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

    for (var layer = 0; layer < docRef.layers.length; ++layer) {
        docRef.layers[layer].visible = boolVal;
    }
}

function saveDoc(title, docCount) {
    // Save a jpeg version
    jpgFile = new File(PATH + "output\\" + title + docCount + ".jpg");
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.quality = SAVE_QUALITY;
    activeDocument.saveAs(jpgFile, jpgSaveOptions, true, Extension.LOWERCASE);

    // Save a photoshop version
    psdFile = new File(PATH + "output\\" + title + docCount + ".psd");
    activeDocument.saveAs(psdFile);
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

// 151 -> 81 -> 58(22)
// Total line count 142
