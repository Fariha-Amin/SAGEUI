class Investigation {
    id = 0;
    query = new Query();
    response = new Response();
    datetime = new Date();
    isFavorite = false;
    hasNote = false;
    hasFeedback = false;
    isDeleted = false;
}

class Result {
    isSuccess = true;
    failureReason = "";
}

class Response {
    id = 0;
    answer = "";
    isInProgress = true;
    result = new Result();
    documentIds = [];
    personNames = [];
    datetime = new Date();
    feedback = "";
}

class Query {
    id = 0;
    question = "";
    prompt = new Prompt();
    datetime = new Date();
}

class Prompt {
    id = 0;
    value = "";
    type = "";
}

class HttpClient {
    constructor() {
        this._investigations = [];
        this._querries = [];
        this._responses = [];
    }

    getInvestigationsAsync() {
        // Get the 25 most recent Q&A's for this user and project
        // GET - api/investigations?page=1&recordsPerPage=25&orderBy={datetime:desc}
        // header - userId
        // header - projectId
        // body - array of Investigation class from above
        //this.loadMockData(25);

        let maxItemCount = 25;
        let startIndex = this._investigations.length - maxItemCount;
        startIndex = startIndex < 0 ? 0 : startIndex;
        let endIndex = startIndex + maxItemCount;
        let localInvestigations = this._investigations
            .filter(i => !i.isDeleted)
            .toSorted((a, b) => a.datetime - b.datetime)
            .slice(startIndex, endIndex);

        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(localInvestigations), 3000);
        });

        return mockAsyncTask;
    }

    getInvestigationAsync(id) {
        // Get a specific Q&A for this user and project
        // GET - api/investigations/<id>
        // header - userId
        // header - projectId
        // body - see Investigation class above
        let that = this;
        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(that.getInvestigationById(id)), 3000);
        });

        return mockAsyncTask;
    }

    getInvestigationByQuestionAsync(id) {
        // Get a specific Q&A for this user and project
        // GET - api/investigations?queryId=<id>
        // header - userId
        // header - projectId
        // body - see Investigation class above
        let queryLookup = () => {
            return this._investigations.find(i => i.query.id === id);
        };

        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(queryLookup()), 3000);
        });

        return mockAsyncTask;
    }

    getInvestigationByAnswerAsync(id) {
        // Get a specific Q&A for this user and project
        // GET - api/investigations?responseId=<id>
        // header - userId
        // header - projectId
        // body - see Investigation class above
        let responseLookup = () => {
            return this._investigations.find(i => i.response.id === id);
        };

        let that = this;
        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(responseLookup()), 3000);
        });

        return mockAsyncTask;
    }


    updateInvestigation(model) {
        // Update the model with new values for this user and project
        // PUT - api/investigations/<id>
        // header - userId
        // header - projectId
        // body - see Investigation class above
        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(), 3000);
        });

        return mockAsyncTask;
    }

    poseQuestionAsync(question, type) {
        // Pose a new question to the API for this user and project
        // POST - api/investigations/questions
        // header - userId
        // header - projectId
        // body -
        // {
        //  query: "",
        //  prompt: {
        //   value: "",
        //   type: "",
        //  }
        // }

        let localInvestigations = this._investigations;
        let investigationId = localInvestigations.length + 1;

        let localQuerries = this._querries;
        let queryId = localQuerries.length + 1;

        let localResponses = this._responses;
        let responseId = localResponses.length + 1;

        // Set up the investigation
        let investigation = new Investigation();
        investigation.id = investigationId;

        // Set up the query
        let query = investigation.query;
        query.id = queryId;
        query.question = question;
        query.prompt.value = "Lorem ipsum";
        query.prompt.type = type;
        query.datetime = new Date();

        // Set up the reponse
        let response = investigation.response;
        response.id = responseId;

        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => {
                localInvestigations.push(investigation);
                localQuerries.push(query);
                localResponses.push(response);
                resolve(queryId);
                return;
            }, 3000);
        });

        return mockAsyncTask;
    }

    getQuestionsAsync() {
        // Get all questions from the API for this user and project
        // GET - api/investigations/questions
        // header - userId
        // header - projectId
        // body - array of Query class from above
        let localQuestions = this._querries;
        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(localQuestions), 3000);
        });

        return mockAsyncTask;
    }

    getQuestionAsync(id) {
        // Get a specific question from the API for this user and project
        // GET - api/investigations/questions/<id>
        // header - userId
        // header - projectId
        // body - see Query class above
        let that = this;
        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(that.getQueryById(id)), 3000);
        });

        return mockAsyncTask;
    }

    getQuestionByInvestigationAsync(id) {
        // Get a specific question from the API for this user and project
        // GET - api/investigations/questions?investigationId=<id>
        // header - userId
        // header - projectId
        // body - see Query class above
        let investigationLookup = () => {
            return this._investigations.find(i => i.id === id).query;
        };

        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(investigationLookup()), 3000);
        });

        return mockAsyncTask;
    }

    getQuestionByAnswerAsync(id) {
        // Get a specific question from the API for this user and project
        // GET - api/investigations/questions?responseId=<id>
        // header - userId
        // header - projectId
        // body - see Query class above
        let responseLookup = () => {
            return this._investigations.find(i => i.response.id === id).query;
        };

        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(responseLookup()), 3000);
        });

        return mockAsyncTask;
    }

    getAnswersAsync() {
        // Get all answers from the API for this user and project
        // GET - api/investigations/answers
        // header - userId
        // header - projectId
        // body - array of Response class from above
        let localAnswers = this._responses;
        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(localAnswers), 3000);
        });

        return mockAsyncTask;
    }

    getAnswerAsync(id) {
        // Poll the API for an answer to the user's previous question for this project
        // - Key off of "isInProgress" or something similar to know when the answer is ready
        // GET - api/investigations/answers/<id>
        // header - userId
        // header - projectId
        // body - see Response class above
        let that = this;
        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => {
                let response = that.getResponseById(id);
                response.isInProgress = false;
                resolve(response);
            }, 3000);
        });

        return mockAsyncTask;
    }

    getAnswerByQuestionAsync(id) {
        // Poll the API for an answer to the user's previous question for this project
        // - Key off of "isInProgress" or something similar to know when the answer is ready
        // GET - api/investigations/answers?queryId=<id>
        // header - userId
        // header - projectId
        // body - see Response class above
        let queryLookup = () => {
            return this._investigations.find(i => i.query.id === id).response;
        };

        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => {
                let response = queryLookup();
                response.isInProgress = false;

                // Random integer between 0 and 9 (both included)
                let rndNumber = Math.floor(Math.random() * 10);
                if (rndNumber > 8) {
                    response.answer = "";
                    response.documentIds = [];
                    response.personNames = [];
                    response.result.isSuccess = false;
                    response.result.failureReason = "I do not have enough information in the provided sources to answer your question";
                }
                else {
                    response.answer = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer non congue ipsum, ut euismod nulla.
                        Quisque in rutrum neque, Jeff Skilling ut varius odio. 
                        Sed sed lorem ID000001 nec odio pharetra volutpat vel sit amet orci. 
                        Maecenas sit amet tristique eros. 
                        Maecenas sagittis augue ac ID000024 condimentum malesuada. 
                        In rhoncus fermentum malesuada.
                        Proin sollicitudin enim vitae Harry Proper velit tempus ID000024 pulvinar. 
                        Quisque scelerisque nibh ipsum, non dignissim augue euismod mattis. 
                        Quisque accumsan suscipit scelerisque. 
                        Phasellus et vehicula justo. 
                        Nulla dictum ex nec sem tristique eleifend. 
                        Etiam a ID000001 leo ultricies, gravida nibh sit amet, at hendrerit erat Wanda Romaine commodo nec. 
                        In hac habitasse platea dictumst. 
                        Donec lectus odio, aliquam a nulla a, ullamcorper ID000024 luctus massa. 
                        Aliquam sem neque, consectetur sit amet sem nec, sodales feugiat lacus.`;
                    response.documentIds = ["ID000001", "ID000024"];
                    response.personNames = ["Jeff Skilling", "Harry Proper", "Wanda Romaine"];
                    response.feedback = "";
                    response.result.isSuccess = true;
                    response.result.failureReason = "";
                }
                resolve(response);
            }, 3000);
        });

        return mockAsyncTask;
    }

    getAnswerByPersonName(personId, id){
        // GET - api/investigations/person?personId=<personId>
        // header - userId
        // header - projectId
        // body - see Response class above
        
        let queryLookup = () => {
            return this._investigations.find(i => i.query.id === id).response;
        };
        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => {
                let response = queryLookup();
                response.isInProgress = false;
                response.answer = `Name of Individual: `+ personId.trim() +`
                Job Title: Senior Former President
                Line Manager/Reports to: Ken Lay(CEO of Enron)
                Department: Executive Management
                Office Location: Enron Corporation, Miami, Florida
                Telephone Number: +13058124747
                Internal Extension: Not Available
                Email: `+personId.trim().replace(/ /g,"_")+`@company.com
                Any identified projects: Project Hercules / Project Arnold`;
                response.feedback = "";
                response.result.isSuccess = true;
                response.result.failureReason = "";
                resolve(response);
            }, 500);
        });
        return mockAsyncTask;
    }
    
    getAnswerByInvestigationAsync(id) {
        // Poll the API for an answer to the user's previous question for this project
        // - Key off of "isInProgress" or something similar to know when the answer is ready
        // GET - api/investigations/answers?investigationId=<id>
        // header - userId
        // header - projectId
        // body - see Response class above
        let investigationLookup = () => {
            return this._investigations.find(i => i.id === id).response;
        };

        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => {
                let response = investigationLookup();
                response.isInProgress = false;
                resolve(response);
            }, 3000);
        });

        return mockAsyncTask;
    }

    getDocumentCountAsync() {
        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(1000), 1000);
        });

        return mockAsyncTask;
    }

    getDefaultPromptText() {
        const defaultPrompt = "Assistant that helps with general questions about the contents of documents.\n"+
        "Please identify person names in your answer.\n"+
        "Whenever you mention a person name you must encapsulate it within the <name> and </name> tags.\n"+
        "For instance, if you mention \'Joe Bloggs,\' you should format it as \"Here is information about <name>Joe Bloggs</name>\'s job title\".\n"+
        "Even if you cannot answer the question you must encapsulate the name.\n"+
        "You may be provided with the contents from several documents, if there are facts that answer the question in more than one document use those facts and cite that document.\n"+
        "If you find contradictory information in those documents, then highlight the contradiction and provide both answers.\n"+
        "Answer ONLY with the facts in the the source document.\n"+
        "Do not answer the question from any other source.\n"+
        "After you have stated a fact, provide a source for that fact at the end of the fact.\n"+
        "If there isn\'t enough information in the source to answer the question, say you do not know.\n"+
        "Do not generate answers that do not use the sources provided.\n"+
        "For each document that you reference extract all people names and list them along with the document reference from which they came.\n"+
        "Each Source has a name followed by the thorn character \'þ\' and the contents of that document.\n"+
        "Do not combine sources, reference each Source separately.\n"+
        "Use square brackets to reference the source document, e.g. [ID12345678]\n";

        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => resolve("Mock text"), 1000);
        });

        return mockAsyncTask;
    }

    // Mock data helpers
    getInvestigationById(id) {
        return this._investigations.find(i => i.id === id);
    }

    getQueryById(id) {
        return this._querries.find(i => i.id === id);
    }

    getResponseById(id) {
        return this._responses.find(i => i.id === id);
    }

    loadMockData(amountToAdd) {
        let index = this._investigations.length + 1;
        for (let i = index; i <= amountToAdd; i++) {
            // Set up the investigation
            let investigation = new Investigation();
            investigation.id = i;
            this._investigations.push(investigation);

            // Set up the query
            let query = investigation.query;
            query.id = i;
            query.question = `Question Number ${i}`;
            query.prompt.value = "Lorem ipsum";
            query.prompt.type = "Default";
            this._querries.push(query);

            // Set up the reponse
            let response = investigation.response;
            response.id = i;
            response.isInProgress = false;
            response.answer = `Answer Number ${i}`;
            this._responses.push(response);
        }
    }
}

export default HttpClient = new HttpClient();