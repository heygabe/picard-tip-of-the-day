// script.js – fetch a daily Picard tip and display it
(async () => {
  const TIP_ACCOUNT = "PicardTips@mas.to"; // Mastodon account identifier
  const LOOKUP_URL = "https://mas.to/api/v1/accounts/lookup?acct=" + encodeURIComponent(TIP_ACCOUNT);

  async function fetchAccountId() {
    const resp = await fetch(LOOKUP_URL, { mode: "cors" });
    if (!resp.ok) throw new Error(`Lookup request failed ${resp.status}`);
    const acct = await resp.json();
    if (!acct.id) throw new Error("Account ID not found");
    return acct.id;
  }

  async function fetchTips(accountId) {
    const url = `https://mas.to/api/v1/accounts/${accountId}/statuses?limit=200`;
    const resp = await fetch(url, { mode: "cors" });
    if (!resp.ok) throw new Error(`Statuses request failed ${resp.status}`);
    return await resp.json();
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
    console.error(e);
    document.getElementById("tip").innerHTML = "<p>Failed to load tip.</p>";
  }
})();
(async () => {
  const TIP_ACCOUNT = "PicardTips@mas.to"; // Mastodon account identifier
  const LOOKUP_URL = "https://mas.to/api/v1/accounts/lookup?acct=" + encodeURIComponent(TIP_ACCOUNT);

  async function fetchAccountId() {
    const resp = await fetch(LOOKUP_URL, { mode: "cors" });
    if (!resp.ok) throw new Error(`Lookup request failed ${resp.status}`);
    const acct = await resp.json();
    if (!acct.id) throw new Error("Account ID not found");
    return acct.id;
  }

  async function fetchTips(accountId) {
    const url = `https://mas.to/api/v1/accounts/${accountId}/statuses?limit=200`;
    const resp = await fetch(url, { mode: "cors" });
    if (!resp.ok) throw new Error(`Statuses request failed ${resp.status}`);
    return await resp.json();
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
    console.error(e);
    document.getElementById("tip").innerHTML = "<p>Failed to load tip.</p>";
  }
})();
(async () => {
  const TIP_ACCOUNT = "PicardTips@mas.to"; // Mastodon account identifier
  const LOOKUP_URL = "https://mas.to/api/v1/accounts/lookup?acct=" + encodeURIComponent(TIP_ACCOUNT);

  async function fetchAccountId() {
    const resp = await fetch(LOOKUP_URL, { mode: "cors" });
    if (!resp.ok) throw new Error(`Lookup request failed ${resp.status}`);
    const acct = await resp.json();
    if (!acct.id) throw new Error("Account ID not found");
    return acct.id;
  }

  async function fetchTips(accountId) {
    const url = `https://mas.to/api/v1/accounts/${accountId}/statuses?limit=200`;
    const resp = await fetch(url, { mode: "cors" });
    if (!resp.ok) throw new Error(`Statuses request failed ${resp.status}`);
    return await resp.json();
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
    console.error(e);
    document.getElementById("tip").innerHTML = "<p>Failed to load tip.</p>";
  }
})();
(async () => {
  const TIP_ACCOUNT = "PicardTips@mas.to"; // Mastodon account identifier
  const LOOKUP_URL = "https://mas.to/api/v1/accounts/lookup?acct=" + encodeURIComponent(TIP_ACCOUNT);

  async function fetchAccountId() {
    const resp = await fetch(LOOKUP_URL, { mode: "cors" });
    if (!resp.ok) throw new Error(`Lookup request failed ${resp.status}`);
    const acct = await resp.json();
    if (!acct.id) throw new Error("Account ID not found");
    return acct.id;
  }

  async function fetchTips(accountId) {
    const url = `https://mas.to/api/v1/accounts/${accountId}/statuses?limit=200`;
    const resp = await fetch(url, { mode: "cors" });
    if (!resp.ok) throw new Error(`Statuses request failed ${resp.status}`);
    return await resp.json();
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
    console.error(e);
    document.getElementById("tip").innerHTML = "<p>Failed to load tip.</p>";
  }
})();
(async () => {
  const TIP_ACCOUNT = "PicardTips@mas.to"; // Mastodon account identifier
  const SEARCH_URL = "https://fe.disroot.org/api/v2/search?q=" + encodeURIComponent(TIP_ACCOUNT);

  async function fetchAccountId() {
    const resp = await fetch(SEARCH_URL, { mode: "cors" });
    if (!resp.ok) throw new Error(`Search request failed ${resp.status}`);
    const data = await resp.json();
    const acct = data.accounts.find(a => a.acct && a.acct.toLowerCase() === TIP_ACCOUNT.toLowerCase());
    const resp = await fetch(LOOKUP_URL, { mode: "cors" });
    if (!resp.ok) throw new Error(`Lookup request failed ${resp.status}`);
    const acct = await resp.json();
    if (!acct.id) throw new Error("Account ID not found");
    return acct.id;
  }

  async function fetchTips(accountId) {
    const url = `https://mas.to/api/v1/accounts/${accountId}/statuses?limit=200`;
    const resp = await fetch(url, { mode: "cors" });
    if (!resp.ok) throw new Error(`Statuses request failed ${resp.status}`);
    return await resp.json();
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
    console.error(e);
    document.getElementById("tip").innerHTML = "<p>Failed to load tip.</p>";
  }
})();
