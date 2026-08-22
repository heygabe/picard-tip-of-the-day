// script.js – fetch a daily Picard tip and display it
(async () => {
  const TIP_ACCOUNT = "PicardTips@mas.to"; // Mastodon account identifier
  const LOOKUP_URL = "https://mas.to/api/v1/accounts/lookup?acct=" + encodeURIComponent(TIP_ACCOUNT);

  async function fetchAccountId() {
    console.log("Fetching account ID from", LOOKUP_URL);
    const resp = await fetch(LOOKUP_URL, { mode: "cors" });
    if (!resp.ok) {
      console.error("Lookup request failed", resp.status, resp.statusText);
      throw new Error(`Lookup request failed ${resp.status}`);
    }
    const acct = await resp.json();
    if (!acct.id) {
      console.error("Account ID not found in response", acct);
      throw new Error("Account ID not found");
    }
    return acct.id;
  }

  async function fetchTips(accountId) {
    const url = `https://mas.to/api/v1/accounts/${accountId}/statuses?limit=200`;
    console.log("Fetching tips from", url);
    const resp = await fetch(url, { mode: "cors" });
    if (!resp.ok) {
      console.error("Statuses request failed", resp.status, resp.statusText);
      throw new Error(`Statuses request failed ${resp.status}`);
    }
    const data = await resp.json();
    console.log(`Received ${data.length} statuses`);
    return data;
  }

  function stripHtml(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  try {
    const accountId = await fetchAccountId();
    const allStatuses = await fetchTips(accountId);
    if (!allStatuses.length) {
      document.getElementById("tip").innerHTML = "<p>No tips found.</p>";
      return;
    }
    const today = new Date();
    const dayCount = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    const idx = dayCount % allStatuses.length;
    const tipStatus = allStatuses[idx];
    const tipText = stripHtml(tipStatus.content);
    document.getElementById("tip").innerHTML = `<p>${tipText}</p>`;
  } catch (e) {
    console.error("Error loading tip:", e);
    document.getElementById("tip").innerHTML = "<p>Failed to load tip.</p>";
  }
})();
