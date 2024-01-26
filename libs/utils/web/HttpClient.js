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
            setTimeout(() => { addToChatHistory; resolve; }, 3000);
        });

        return mockAsyncTask;
    }
}

export default HttpClient;