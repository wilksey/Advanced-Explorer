/* Generated by Scriptol */










eval(fs.readFileSync(__dirname + '/strtools.js')+'');


// Comparing two strings, first with wildcards

function matchingstr(str1,str2,casesensitive)
{
   casesensitive=typeof casesensitive !== 'undefined' ? casesensitive : false;

   if(str1==='*') {
      return true;
   }
   if(str2==='*') {
      return true;
   }
   var l=str1.length;
   if(l!=str2.length) {
      return false;
   }

   if(!casesensitive) {
      str1=str1.toLowerCase();
      str2=str2.toLowerCase();
   }

   // now comparing each char, but the ? wildcard
   for(i=0;i<=l-1;i++) {

      var c=str1.charAt(i);
      var d=str2.charAt(i);
      if(c==='?') {
         continue;
      }
      if(d==='?') {
         continue;
      }
      if(c!=d) {
         return false;
      }
   }

   return true;
}

// Comparing two filenames with wildcards

function patmatch(pattern,filename,casesensitive)
{
   casesensitive=typeof casesensitive !== 'undefined' ? casesensitive : false;
   if(pattern==="") {
      return true;
   }

   // Extracting node and last extension
   var namep="";
   var extp="";
   var namef="";
   var extf="";
   $_I1=StrTools.splitExt(pattern);
   namep=$_I1[0];
   extp=$_I1[1];
   $_I1=StrTools.splitExt(filename);
   namef=$_I1[0];
   extf=$_I1[1];
   if(!matchingstr(namep,namef,casesensitive)) {
      return false;
   }
   if(!matchingstr(extp,extf,casesensitive)) {
      return false;
   }
   return true;
}
// Check if wildcard

function wildcard(str)
{
   var p=str.lastIndexOf("/");
   if(p===-1) {
      p=str.lastIndexOf("\\");
      if(p===-1) {
         return false;
      }
   }
   var pattern=str.slice(p+1);
   p=pattern.indexOf(".");
   if(p===-1) {
      return false;
   }
   if(pattern.slice(0,p-0)==="*") {
      return true;
   }
   if(pattern.slice(p)==="*") {
      return true;
   }
   return false;
}

/* End */
