class Investigation {
    id = 0;
    query = new Query();
    response = new Response();
    datetime = new Date();
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
    datetime = new Date();
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
        let localInvestigations = this._investigations
            .toSorted((a, b) => a.datetime - b.datetime)
            .slice(0, 25);

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

    poseQuestionAsync(question) {
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
        query.prompt.type = "Default";
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
                response.answer = "Lorem ipsum ID000001 dolor sit amet ID000024";
                response.documentIds = [ "ID000001", "ID000024" ]
                resolve(response);
            }, 3000);
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
            setTimeout(() => resolve(10000000000), 4000);
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
}

export default HttpClient = new HttpClient();