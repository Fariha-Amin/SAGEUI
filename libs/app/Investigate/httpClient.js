class HttpClient {
    constructor() {
        this._chatHistory = [];
    }

    getChatHistoryAsync() {
        let localChatHistory = this._chatHistory;
        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(localChatHistory), 3000);
        });

        return mockAsyncTask;
    }

    poseQuestionAsync(question) {
        let localChatHistory = this._chatHistory;
        let addToChatHistory = () => localChatHistory.push({
            id: localChatHistory.length + 1,
            question,
            answer: "foo bar",
            datetime: new Date()
        });

        let mockAsyncTask = new Promise(function (resolve, reject) {
            setTimeout(() => { 
                addToChatHistory(); 
                resolve(); 
                return;
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
}

export default HttpClient = new HttpClient();