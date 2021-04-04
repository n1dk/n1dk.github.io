
function DoRequest(url, callback)
{
  var req = Init();
  var ab = 0;

  function Init()
  {
    if (ab == 1) return 0;
    var s1 = 'CONTENT-TYPE', s2 = 'text/xml; codepage=windows-1251;';
    if (window.XMLHttpRequest)
    {
      req = new XMLHttpRequest();
      req.onreadystatechange = ProcessReqChange;
      req.open("GET", url, true);
      req.setRequestHeader(s1, s2);
      req.send(null);
    }
    else if (window.ActiveXObject)
    {
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (!req) req = new ActiveXObject("MSxml2.XMLHTTP");
      if (req)
      {
        req.onreadystatechange = ProcessReqChange;
        req.open("GET", url, true);
        req.setRequestHeader(s1, s2);
        req.send();
      }
    }
    ab = 1;
    setTimeout(ClearTimer,500);

    return req;
  }

  function ClearTimer()
  {
    ab = 0;
  }

  function ProcessReqChange()
  {
    if (req.readyState == 4 && req.status == 200)
    {
      callback(req);
    }
  }
}
