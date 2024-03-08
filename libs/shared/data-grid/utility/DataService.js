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
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  },
};
