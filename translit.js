var lat=new Array("jo","zh","i'","ch","sh","xh","je","ju","ja","a","b","v","g","d","e","z","i","k","l","m","n","o","p","r","s","t","u","f","x","c","'","      y","`","j","h");
var cyr=new Array("¸","æ","é","÷","ø","ù","ý","þ","ÿ","à","á","â","ã","ä","å","ç","è","ê","ë","ì","í","î","ï","ð","ñ","ò","ó","ô","õ","ö","ü","û","ú","æ      ","õ");
 
var latcap=new Array("JO","Jo","ZH","Zh","I'","Ch","CH","Sh","SH","Xh","XH","Je","JE","Ju","JU","Ja","JA","A","B","V","G","D","E","Z","I","K","L","M","N","      O","P","R","S","T","U","F","X","C","Y","J","H");
var cyrcap=new Array("¨","¨","Æ","Æ","É","×","×","Ø","Ø","Ù","Ù","Ý","Ý","Þ","Þ","ß","ß","À","Á","Â","Ã","Ä","Å","Ç","È","Ê","Ë","Ì","Í","Î","Ï","Ð","Ñ","Ò      ","Ó","Ô","Õ","Ö","Û","Æ","Õ");
 
function translate(tex)
{
var buf=tex;
var i;
for (i=0;i<latcap.length;i++)
        {
        buf=replace(buf,latcap[i],cyrcap[i],1,0);
        }
 
for (i=0;i<lat.length;i++)
        {
        buf=replace(buf,lat[i],cyr[i],1,0);
        }
 
tex=buf;
return tex;
}

function translate2(tex)
{
var buf=tex;
var i;
for (i=0;i<latcap.length;i++)
        {
        buf=replace(buf,cyrcap[i],latcap[i],1,0);
        }
 
for (i=0;i<lat.length;i++)
        {
        buf=replace(buf,cyr[i],lat[i],1,0);
        }
 
tex=buf;
return tex;
}
 
function replace(target,oldTerm,newTerm,caseSens,wordOnly) {
 
        var work = target;
        var ind = 0;
        var next = 0;
 
        if (!caseSens) {
          oldTerm = oldTerm.toLowerCase();
          work = target.toLowerCase();
        }
 
        while ((ind = work.indexOf(oldTerm,next)) >= 0) {
          if (wordOnly) {
            var before = ind - 1;
            var after = ind + oldTerm.length;
            if (!(space(work.charAt(before)) && space(work.charAt(after)))) {
              next = ind + oldTerm.length;
              continue;
            }
          }
          target = target.substring(0,ind) + newTerm +
          target.substring(ind+oldTerm.length,target.length);
          work = work.substring(0,ind) + newTerm +
          work.substring(ind+oldTerm.length,work.length);
          next = ind + newTerm.length;
          if (next >= work.length) { break; }
        }
 
        return target;
 
}

