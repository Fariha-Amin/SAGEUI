const filterTableData = (array, filters) => {
  console.log(filters);

  let filteredArray = array;

  if (filters.user.value) {
    filteredArray = filteredArray.filter((summarizerData) =>
      summarizerData.user
        .toLowerCase()
        .includes(filters.user.value.toLowerCase())
    );
  }

  if (filters.documentId.value) {
    filteredArray = filteredArray.filter((summarizer) =>
      summarizer.documentId
        .toLowerCase()
        .includes(filters.documentId.value.toLowerCase())
    );
  }
  if (filters.notes.value) {
    filteredArray = filteredArray.filter((summarizer) =>
      summarizer.notes.toLowerCase().includes(filters.notes.value.toLowerCase())
    );
  }
  if (filters.summary.value) {
    filteredArray = filteredArray.filter((summarizer) =>
      summarizer.summary
        .toLowerCase()
        .includes(filters.summary.value.toLowerCase())
    );
  }

  return filteredArray;
};

const sortByProperty = (array, property, direction = 1) => {
  // Check if direction is 'asc' or 'desc'
  const sortOrder = direction;

  // Sorting the array based on the specified property and direction
  return array.sort((a, b) => {
    // Compare the values of the specified property
    const valueA = a[property];
    const valueB = b[property];

    if (valueA < valueB) return -1 * sortOrder;
    if (valueA > valueB) return 1 * sortOrder;
    return 0;
  });
};

const skipAndTake = (array, skipCount, takeCount) =>
  array.slice(skipCount, skipCount + takeCount);

const SummarizerService = {
  getData() {
    return [
      {
        recId: 1,
        summaryGeneratedOn: "2023-09-06",
        user: "cfortun0",
        documentId: "ID00002138, ID638769, ID98724, ID284756",
        summary: "lacinia erat vestibulum sed",
        notes: "Skinder",
        inprogress: true,
      },
      {
        recId: 2,
        summaryGeneratedOn: "2023-09-20",
        user: "nloakes1",
        documentId: "443523183-2",
        summary: "maecenas rhoncus aliquam lacus morbi",
        notes: "Twitternation",
        inprogress: true,
      },
      {
        recId: 3,
        summaryGeneratedOn: "2023-12-10",
        user: "ekenneford2",
        documentId: "972824131-3",
        summary: "dis parturient montes nascetur",
        notes: "Oozz",
      },
      {
        recId: 4,
        summaryGeneratedOn: "2024-01-06",
        user: "tlesek3",
        documentId: "550357660-8",
        summary: "in sapien iaculis congue vivamus metus",
        notes: "Brightdog",
      },
      {
        recId: 5,
        summaryGeneratedOn: "2023-12-19",
        user: "jpoleye4",
        documentId: "170160161-3",
        summary: "volutpat eleifend donec ut dolor morbi",
        notes: "Gabcube",
      },
      {
        recId: 6,
        summaryGeneratedOn: "2023-05-31",
        user: "rgrissett5",
        documentId: "850025347-9",
        summary: "ligula sit amet eleifend",
        notes: "Devpoint",
      },
      {
        recId: 7,
        summaryGeneratedOn: "2024-01-11",
        user: "hhaslin6",
        documentId: "186306048-0",
        summary: "urna pretium nisl ut volutpat sapien arcu",
        notes: "Bluejam",
      },
      {
        recId: 8,
        summaryGeneratedOn: "2023-05-01",
        user: "pmartusov7",
        documentId: "892643918-6",
        summary: "nulla sed accumsan felis ut",
        notes: "Gabspot",
      },
      {
        recId: 9,
        summaryGeneratedOn: "2023-11-20",
        user: "mparminter8",
        documentId: "148819193-X",
        summary: "ipsum aliquam non mauris morbi non lectus",
        notes: "Devbug",
      },
      {
        recId: 10,
        summaryGeneratedOn: "2023-07-16",
        user: "cwillmott9",
        documentId: "482030825-4",
        summary: "ut erat id mauris vulputate",
        notes: "Gabspot",
      },
      {
        recId: 11,
        summaryGeneratedOn: "2023-10-11",
        user: "dcarstairsa",
        documentId: "876891379-6",
        summary: "placerat ante nulla justo aliquam quis",
        notes: "Zoomcast",
      },
      {
        recId: 12,
        summaryGeneratedOn: "2023-08-28",
        user: "smullesb",
        documentId: "417999504-2",
        summary: "nulla nunc purus phasellus",
        notes: "Dynazzy",
      },
      {
        recId: 13,
        summaryGeneratedOn: "2023-09-27",
        user: "jbaisec",
        documentId: "796628069-1",
        summary: "nec sem duis aliquam",
        notes: "Twitternation",
      },
      {
        recId: 14,
        summaryGeneratedOn: "2023-05-20",
        user: "fcollumbelld",
        documentId: "229092549-7",
        summary: "ligula sit amet eleifend pede libero quis",
        notes: "Aimbo",
      },
      {
        recId: 15,
        summaryGeneratedOn: "2023-08-17",
        user: "fboxelle",
        documentId: "900751918-2",
        summary: "consectetuer adipiscing elit proin",
        notes: "Topicblab",
      },
      {
        recId: 16,
        summaryGeneratedOn: "2023-04-18",
        user: "hjorgensenf",
        documentId: "716453346-6",
        summary: "enim lorem ipsum dolor",
        notes: "Viva",
      },
      {
        recId: 17,
        summaryGeneratedOn: "2023-06-06",
        user: "rserrierg",
        documentId: "343111280-3",
        summary: "dis parturient montes nascetur",
        notes: "Gigazoom",
      },
      {
        recId: 18,
        summaryGeneratedOn: "2023-07-14",
        user: "sblondellh",
        documentId: "584201186-7",
        summary: "neque aenean auctor gravida sem",
        notes: "Fliptune",
      },
      {
        recId: 19,
        summaryGeneratedOn: "2023-04-30",
        user: "sbockmanni",
        documentId: "072883808-7",
        summary: "curae duis faucibus accumsan odio curabitur convallis",
        notes: "Photojam",
      },
      {
        recId: 20,
        summaryGeneratedOn: "2023-08-04",
        user: "gdecruzej",
        documentId: "943614176-9",
        summary: "in purus eu magna vulputate luctus",
        notes: "Eadel",
      },
      {
        recId: 21,
        summaryGeneratedOn: "2023-08-04",
        user: "wspriggink",
        documentId: "233583013-9",
        summary: "etiam faucibus cursus urna",
        notes: "Fiveclub",
      },
      {
        recId: 22,
        summaryGeneratedOn: "2023-03-29",
        user: "tgimsonl",
        documentId: "732782768-4",
        summary: "vestibulum proin eu mi nulla ac",
        notes: "Realbridge",
      },
      {
        recId: 23,
        summaryGeneratedOn: "2023-09-13",
        user: "htapem",
        documentId: "591110125-4",
        summary: "sapien urna pretium nisl ut",
        notes: "Rhyzio",
      },
      {
        recId: 24,
        summaryGeneratedOn: "2023-11-21",
        user: "sgreenlyn",
        documentId: "349083003-2",
        summary: "vel augue vestibulum ante ipsum",
        notes: "Yoveo",
      },
      {
        recId: 25,
        summaryGeneratedOn: "2023-10-06",
        user: "fburdetto",
        documentId: "864677902-5",
        summary: "eget elit sodales scelerisque mauris sit amet",
        notes: "Aimbu",
      },
      {
        recId: 26,
        summaryGeneratedOn: "2023-06-22",
        user: "nolufsenp",
        documentId: "284436692-9",
        summary: "sed augue aliquam erat volutpat",
        notes: "Realblab",
      },
      {
        recId: 27,
        summaryGeneratedOn: "2023-10-11",
        user: "lzettoiq",
        documentId: "292732683-5",
        summary: "etiam pretium iaculis justo in hac",
        notes: "Oyoloo",
      },
      {
        recId: 28,
        summaryGeneratedOn: "2023-08-12",
        user: "hfullalover",
        documentId: "158940459-9",
        summary: "orci eget orci vehicula condimentum curabitur in",
        notes: "Pixonyx",
      },
      {
        recId: 29,
        summaryGeneratedOn: "2023-12-12",
        user: "lhanselmanns",
        documentId: "872155555-9",
        summary: "primis in faucibus orci",
        notes: "Fadeo",
      },
      {
        recId: 30,
        summaryGeneratedOn: "2023-05-09",
        user: "cwookeyt",
        documentId: "529538404-7",
        summary: "quis turpis eget elit sodales",
        notes: "Fanoodle",
      },
      {
        recId: 31,
        summaryGeneratedOn: "2023-11-02",
        user: "rwynrehameu",
        documentId: "126606362-5",
        summary: "duis bibendum morbi non quam nec dui",
        notes: "Browseblab",
      },
      {
        recId: 32,
        summaryGeneratedOn: "2023-10-26",
        user: "ffallsv",
        documentId: "431167800-2",
        summary: "iaculis congue vivamus metus arcu",
        notes: "Thoughtbridge",
      },
      {
        recId: 33,
        summaryGeneratedOn: "2023-06-28",
        user: "radolphinew",
        documentId: "621207526-3",
        summary: "quis orci nullam molestie",
        notes: "Lajo",
      },
      {
        recId: 34,
        summaryGeneratedOn: "2023-06-19",
        user: "ebyshx",
        documentId: "562919244-2",
        summary: "gravida nisi at nibh in",
        notes: "Devify",
      },
      {
        recId: 35,
        summaryGeneratedOn: "2023-04-27",
        user: "bwimpeyy",
        documentId: "290878704-0",
        summary: "cras pellentesque volutpat dui maecenas tristique est",
        notes: "Topiczoom",
      },
      {
        recId: 36,
        summaryGeneratedOn: "2023-02-27",
        user: "gmunneryz",
        documentId: "847058232-1",
        summary: "convallis nulla neque libero convallis",
        notes: "Topicstorm",
      },
      {
        recId: 37,
        summaryGeneratedOn: "2023-03-14",
        user: "tbaly10",
        documentId: "835364980-2",
        summary: "praesent lectus vestibulum quam",
        notes: "Fanoodle",
      },
      {
        recId: 38,
        summaryGeneratedOn: "2023-03-08",
        user: "glidell11",
        documentId: "489577463-5",
        summary: "dictumst maecenas ut massa",
        notes: "Vipe",
      },
      {
        recId: 39,
        summaryGeneratedOn: "2023-09-01",
        user: "ecromar12",
        documentId: "968470137-3",
        summary: "nulla integer pede justo lacinia eget",
        notes: "Mudo",
      },
      {
        recId: 40,
        summaryGeneratedOn: "2023-12-20",
        user: "nliveley13",
        documentId: "073545939-8",
        summary: "in quis justo maecenas rhoncus aliquam",
        notes: "Jazzy",
      },
      {
        recId: 41,
        summaryGeneratedOn: "2023-04-23",
        user: "lmarcham14",
        documentId: "188778395-4",
        summary: "quis tortor id nulla ultrices aliquet",
        notes: "Oyope",
      },
      {
        recId: 42,
        summaryGeneratedOn: "2023-08-02",
        user: "zbartul15",
        documentId: "327114365-X",
        summary: "dolor quis odio consequat varius",
        notes: "Tazzy",
      },
      {
        recId: 43,
        summaryGeneratedOn: "2023-07-15",
        user: "twinsor16",
        documentId: "122757691-9",
        summary: "feugiat et eros vestibulum ac est lacinia",
        notes: "Dynabox",
      },
      {
        recId: 44,
        summaryGeneratedOn: "2023-06-18",
        user: "ebroadwood17",
        documentId: "198197267-6",
        summary: "nascetur ridiculus mus etiam vel augue",
        notes: "Feedmix",
      },
      {
        recId: 45,
        summaryGeneratedOn: "2023-10-14",
        user: "mmee18",
        documentId: "615889229-7",
        summary: "a suscipit nulla elit ac nulla sed",
        notes: "Dynava",
      },
      {
        recId: 46,
        summaryGeneratedOn: "2023-10-15",
        user: "ekasman19",
        documentId: "872431631-8",
        summary: "eleifend quam a odio in hac habitasse",
        notes: "Quimba",
      },
      {
        recId: 47,
        summaryGeneratedOn: "2023-09-02",
        user: "adufty1a",
        documentId: "091651371-8",
        summary: "pretium iaculis diam erat",
        notes: "Demimbu",
      },
      {
        recId: 48,
        summaryGeneratedOn: "2023-12-23",
        user: "vmidgely1b",
        documentId: "892015868-1",
        summary: "nec dui luctus rutrum nulla tellus",
        notes: "Brainbox",
      },
      {
        recId: 49,
        summaryGeneratedOn: "2023-02-11",
        user: "econgrave1c",
        documentId: "476336580-0",
        summary: "sapien non mi integer ac neque",
        notes: "Realpoint",
      },
      {
        recId: 50,
        summaryGeneratedOn: "2024-01-12",
        user: "nmatkovic1d",
        documentId: "719967526-7",
        summary: "nam ultrices libero non",
        notes: "Flashspan",
      },
      {
        recId: 51,
        summaryGeneratedOn: "2023-03-25",
        user: "jtomasino1e",
        documentId: "650847231-3",
        summary: "nulla ut erat id mauris",
        notes: "Buzzster",
      },
      {
        recId: 52,
        summaryGeneratedOn: "2023-07-27",
        user: "hkhalid1f",
        documentId: "704887584-4",
        summary: "leo odio condimentum id luctus nec",
        notes: "Topicshots",
      },
      {
        recId: 53,
        summaryGeneratedOn: "2024-01-25",
        user: "lsloegrave1g",
        documentId: "412757226-4",
        summary: "pede morbi porttitor lorem id",
        notes: "Skinix",
      },
      {
        recId: 54,
        summaryGeneratedOn: "2023-09-27",
        user: "pbreyt1h",
        documentId: "099736333-9",
        summary: "faucibus orci luctus et",
        notes: "Nlounge",
      },
      {
        recId: 55,
        summaryGeneratedOn: "2023-12-26",
        user: "bsproson1i",
        documentId: "851203064-X",
        summary: "et magnis dis parturient montes nascetur ridiculus",
        notes: "Eamia",
      },
      {
        recId: 56,
        summaryGeneratedOn: "2023-03-27",
        user: "jlyptrit1j",
        documentId: "216409411-5",
        summary: "consectetuer eget rutrum at lorem integer tincidunt",
        notes: "Kwideo",
      },
      {
        recId: 57,
        summaryGeneratedOn: "2023-10-04",
        user: "webbin1k",
        documentId: "053923638-1",
        summary: "elit sodales scelerisque mauris sit amet",
        notes: "Tazz",
      },
      {
        recId: 58,
        summaryGeneratedOn: "2023-02-23",
        user: "aharmes1l",
        documentId: "364190850-7",
        summary: "ligula vehicula consequat morbi a ipsum integer",
        notes: "Oozz",
      },
      {
        recId: 59,
        summaryGeneratedOn: "2023-12-15",
        user: "lcovotti1m",
        documentId: "172371814-9",
        summary: "nibh quisque id justo sit",
        notes: "Yodoo",
      },
      {
        recId: 60,
        summaryGeneratedOn: "2023-07-04",
        user: "cblazejewski1n",
        documentId: "074882983-0",
        summary: "platea dictumst maecenas ut",
        notes: "Skyble",
      },
      {
        recId: 61,
        summaryGeneratedOn: "2023-02-20",
        user: "amatuschek1o",
        documentId: "526911266-3",
        summary: "at turpis donec posuere metus",
        notes: "Kaymbo",
      },
      {
        recId: 62,
        summaryGeneratedOn: "2023-07-02",
        user: "gcrees1p",
        documentId: "627450332-3",
        summary: "risus dapibus augue vel accumsan tellus",
        notes: "Yombu",
      },
      {
        recId: 63,
        summaryGeneratedOn: "2023-04-27",
        user: "jbellocht1q",
        documentId: "092032833-4",
        summary: "dui vel sem sed sagittis",
        notes: "Thoughtbridge",
      },
      {
        recId: 64,
        summaryGeneratedOn: "2023-04-23",
        user: "avigurs1r",
        documentId: "785576716-9",
        summary: "sapien quis libero nullam",
        notes: "Flipstorm",
      },
      {
        recId: 65,
        summaryGeneratedOn: "2023-12-07",
        user: "blent1s",
        documentId: "556608833-3",
        summary: "a ipsum integer a nibh in",
        notes: "Aivee",
      },
      {
        recId: 66,
        summaryGeneratedOn: "2023-03-17",
        user: "fiskov1t",
        documentId: "898018938-9",
        summary: "enim blandit mi in porttitor pede justo",
        notes: "Yakijo",
      },
      {
        recId: 67,
        summaryGeneratedOn: "2023-10-17",
        user: "pnickless1u",
        documentId: "748385207-0",
        summary: "nec nisi vulputate nonummy maecenas tincidunt lacus",
        notes: "Skyndu",
      },
      {
        recId: 68,
        summaryGeneratedOn: "2024-01-23",
        user: "lfer1v",
        documentId: "565717430-5",
        summary: "nibh ligula nec sem duis",
        notes: "Oodoo",
      },
      {
        recId: 69,
        summaryGeneratedOn: "2024-01-30",
        user: "ttoor1w",
        documentId: "834674906-6",
        summary: "morbi non lectus aliquam",
        notes: "Camimbo",
      },
      {
        recId: 70,
        summaryGeneratedOn: "2023-04-01",
        user: "emeredyth1x",
        documentId: "970079024-X",
        summary: "neque aenean auctor gravida sem praesent",
        notes: "Avamba",
      },
      {
        recId: 71,
        summaryGeneratedOn: "2023-02-11",
        user: "ededam1y",
        documentId: "801294593-2",
        summary: "sed augue aliquam erat volutpat",
        notes: "Flashpoint",
      },
      {
        recId: 72,
        summaryGeneratedOn: "2023-12-13",
        user: "hlottrington1z",
        documentId: "318983167-X",
        summary: "neque aenean auctor gravida sem",
        notes: "Dabfeed",
      },
      {
        recId: 73,
        summaryGeneratedOn: "2023-07-15",
        user: "spetett20",
        documentId: "999355716-1",
        summary: "potenti in eleifend quam a odio",
        notes: "Izio",
      },
      {
        recId: 74,
        summaryGeneratedOn: "2023-10-22",
        user: "hhubatsch21",
        documentId: "647007863-X",
        summary: "nec molestie sed justo pellentesque",
        notes: "Aimbo",
      },
      {
        recId: 75,
        summaryGeneratedOn: "2023-03-08",
        user: "sdudman22",
        documentId: "260849189-8",
        summary: "sit amet turpis elementum ligula vehicula consequat",
        notes: "Vidoo",
      },
      {
        recId: 76,
        summaryGeneratedOn: "2023-06-28",
        user: "ltorpie23",
        documentId: "642928651-7",
        summary: "ut blandit non interdum in ante",
        notes: "Cogibox",
      },
      {
        recId: 77,
        summaryGeneratedOn: "2023-09-16",
        user: "dcommucci24",
        documentId: "785307632-0",
        summary: "odio consequat varius integer",
        notes: "Twitterlist",
      },
      {
        recId: 78,
        summaryGeneratedOn: "2023-11-15",
        user: "flitherland25",
        documentId: "790903992-1",
        summary: "cras mi pede malesuada in imperdiet",
        notes: "Ailane",
      },
      {
        recId: 79,
        summaryGeneratedOn: "2024-01-11",
        user: "ssuthren26",
        documentId: "461954904-5",
        summary: "cras non velit nec",
        notes: "Trunyx",
      },
      {
        recId: 80,
        summaryGeneratedOn: "2023-08-01",
        user: "scardenosa27",
        documentId: "316943381-4",
        summary: "et commodo vulputate justo",
        notes: "Roodel",
      },
      {
        recId: 81,
        summaryGeneratedOn: "2024-01-15",
        user: "vkither28",
        documentId: "461770490-6",
        summary: "ipsum primis in faucibus orci",
        notes: "Realpoint",
      },
      {
        recId: 82,
        summaryGeneratedOn: "2023-11-16",
        user: "thans29",
        documentId: "455340350-1",
        summary: "lacinia aenean sit amet justo morbi",
        notes: "Eamia",
      },
      {
        recId: 83,
        summaryGeneratedOn: "2023-04-06",
        user: "amaccosty2a",
        documentId: "241188011-1",
        summary: "dapibus at diam nam",
        notes: "Feedfish",
      },
      {
        recId: 84,
        summaryGeneratedOn: "2023-02-06",
        user: "hseamon2b",
        documentId: "486092071-6",
        summary: "nascetur ridiculus mus vivamus",
        notes: "Cogidoo",
      },
      {
        recId: 85,
        summaryGeneratedOn: "2023-04-18",
        user: "bgoulborn2c",
        documentId: "527449370-X",
        summary: "sit amet nulla quisque",
        notes: "Skivee",
      },
      {
        recId: 86,
        summaryGeneratedOn: "2023-12-29",
        user: "bclancey2d",
        documentId: "448988291-2",
        summary: "platea dictumst maecenas ut massa quis augue",
        notes: "Dynabox",
      },
      {
        recId: 87,
        summaryGeneratedOn: "2023-05-04",
        user: "ccreasy2e",
        documentId: "540613362-4",
        summary: "suspendisse potenti cras in purus eu magna",
        notes: "Edgeify",
      },
      {
        recId: 88,
        summaryGeneratedOn: "2024-01-22",
        user: "dplumbley2f",
        documentId: "383870865-2",
        summary: "tempor convallis nulla neque libero convallis eget",
        notes: "Divavu",
      },
      {
        recId: 89,
        summaryGeneratedOn: "2023-06-17",
        user: "pmcphillimey2g",
        documentId: "006169861-X",
        summary: "porttitor id consequat in consequat",
        notes: "Kaymbo",
      },
      {
        recId: 90,
        summaryGeneratedOn: "2023-05-15",
        user: "pmcqueen2h",
        documentId: "161593927-X",
        summary: "curabitur gravida nisi at nibh",
        notes: "Tagchat",
      },
      {
        recId: 91,
        summaryGeneratedOn: "2023-08-08",
        user: "cmacallester2i",
        documentId: "972379237-0",
        summary: "varius nulla facilisi cras non velit",
        notes: "Tekfly",
      },
      {
        recId: 92,
        summaryGeneratedOn: "2023-05-16",
        user: "eraitie2j",
        documentId: "700532277-0",
        summary: "tincidunt lacus at velit vivamus",
        notes: "Eabox",
      },
      {
        recId: 93,
        summaryGeneratedOn: "2023-03-01",
        user: "hbrabant2k",
        documentId: "176998776-2",
        summary: "primis in faucibus orci",
        notes: "Mymm",
      },
      {
        recId: 94,
        summaryGeneratedOn: "2023-04-26",
        user: "hperone2l",
        documentId: "237717251-2",
        summary: "sagittis dui vel nisl duis",
        notes: "Youfeed",
      },
      {
        recId: 95,
        summaryGeneratedOn: "2024-01-30",
        user: "rvenditti2m",
        documentId: "882280235-7",
        summary: "eget rutrum at lorem integer tincidunt ante",
        notes: "Skinte",
      },
      {
        recId: 96,
        summaryGeneratedOn: "2024-01-25",
        user: "pquarrington2n",
        documentId: "945250324-6",
        summary: "aliquam augue quam sollicitudin",
        notes: "Mycat",
      },
      {
        recId: 97,
        summaryGeneratedOn: "2023-08-17",
        user: "arediers2o",
        documentId: "350101203-9",
        summary: "proin interdum mauris non ligula",
        notes: "Browsecat",
      },
      {
        recId: 98,
        summaryGeneratedOn: "2023-07-13",
        user: "tavramovic2p",
        documentId: "845856130-1",
        summary: "suscipit nulla elit ac",
        notes: "Fivespan",
      },
      {
        recId: 99,
        summaryGeneratedOn: "2023-05-11",
        user: "snattrass2q",
        documentId: "423507877-1",
        summary: "ipsum aliquam non mauris morbi",
        notes: "Oyonder",
      },
      {
        recId: 100,
        summaryGeneratedOn: "2023-05-17",
        user: "jjoriot2r",
        documentId: "906245445-3",
        summary: "mattis pulvinar nulla pede",
        notes: "Zooveo",
      },
    ];
  },
  getFilterAndPaginatedData(sageDataTableRequest) {
    let dummayData = this.getData();

    let filterData = filterTableData(dummayData, sageDataTableRequest.filters);

    const orderedData = sageDataTableRequest.sortField
      ? sortByProperty(
          filterData,
          sageDataTableRequest.sortField,
          sageDataTableRequest.sortOrder
        )
      : filterData;

    return {
      data: skipAndTake(
        orderedData,
        sageDataTableRequest.first,
        sageDataTableRequest.rows
      ),
      totalRecords: filterData.length,
    };
  },
  getsummaryData() {
    return Promise.resolve(this.getData());
  },
};

module.exports = SummarizerService;
