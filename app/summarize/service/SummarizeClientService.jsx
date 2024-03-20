function MapSightlineTreeToPrimeReactTree(sightlineJsTree) {
  const map = {}; // Map to store references to each object by its id

  // Create a map of objects by their id for quick lookup
  sightlineJsTree.forEach((item) => {
    map[item.id] = {
      key: item.id,
      parent: item.parent,
      data: item.text,
      lable: item.text,
      children: [],
    };
  });

  // Traverse the flat array and assign children to their respective parents
  const nestedArray = [];
  sightlineJsTree.forEach((item) => {
    if (item.parent !== null && item.parent !== "#") {
      const parent = map[item.parent];
      if (parent) {
        parent.children.push(map[item.id]);
      }
    } else {
      nestedArray.push(map[item.id]);
    }
  });

  return nestedArray;
}

export const summarizerApiClient = {
  async getPrimeReactDocumentMetaTreeList() {
    let data = await window.parent.GetBatchPrintSourceSelectionTreeDetails();

    return {
      saveSearch: MapSightlineTreeToPrimeReactTree(
        data.SourceSelectionSearchList
      ),
      tag: MapSightlineTreeToPrimeReactTree(data.SourceSelectionTagList),

      folder: MapSightlineTreeToPrimeReactTree(data.SourceSelectionFolderList),
    };
    //   .then((data) => {
    //     //setUserEmail(data.aaData.email);
    //     //setNodes(convertToNestedStructure(data.SourceSelectionSearchList));
    //     //console.log("Js Tree",convertToNestedStructure(data.SourceSelectionSearchList));
    //     //setLoadingApp(false);
    //   });
  },
};
