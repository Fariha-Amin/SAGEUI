export const DataService = {
  getTableData(url, params) {
    const queryParams = params
      ? Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&")
      : "";
    const fetchUrl = url + "?" + queryParams;
    console.log(fetchUrl);
    return fetch(fetchUrl).then((res) => res.json());
  },
  updateSummarizeData(url, data) {

    this.getLoginUserInfo("https://localhost/GenAI/GetLoginuserInfo");
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  },
  
  getLoginUserInfo(url){
    
    return fetch(url).then((res) => console.log("User info",res.json()));        
  }

};
