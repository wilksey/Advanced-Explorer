/* Generated by Scriptol */

var fs = require('fs');
var scriptol = require('/scriptolj/scriptol.js');

// PNG Compress (c) 2015 scriptol.com
// License MIT

// Interface to pngquant



var net=require('net');
var oslib=require('os');


os = oslib.platform()

var client = net.connect({port: 1031}, function() {
  console.log("Png.js open TCP connection to server...");
});

client.on('end',  function() {
     console.log('Png.js: TCP connection closed by the server.');
});



function display(content)
{
   console.log(content);
   
    client.write(JSON.stringify( {
        "type":"message", "app": "PNGCompress", "content" : content
    }));
    
   return;
}
function byeServer()
{
   
    client.end("Bye...");
    
   return;
}

function syntax()
{
   console.log();
   console.log("PNG 1.0 - www.scriptol.com");
   console.log("Interface to pngquant when used locally from an HTML page");
   console.log("Syntax:   node png.js all sourcepath");
   console.log("    or:   node png.js list sourcepath file [file] etc...");
   console.log("Options:");
   console.log("  all : all png file in the source path");
   console.log(" list : list of png files given in argument");
   process.exit();
   return;
}

function getExt(fname)
{
   var p=fname.lastIndexOf(".");
   if(p===-1) {
      return "";
   }
   var ext=fname.slice(p+1);
   return ext;
}
function buildPath(path,name)
{
   if(path.slice(-1)==="/") {
      return path+name;
   }
   return path+"/"+name;
}

// Processing files

function compressing(filelist)
{

   var program=buildPath(process.cwd(),"BoxL/PNGCompress/pngquant");

   if(os==="win32") {
      program+=".exe";
      filelist=filelist.replace("/","\\");
   }   
   else {
      filelist=filelist.replace("\\","/");
   }

   var command=program+" -f --ext .png "+filelist;
   console.log(command);

   var res=scriptol.exec(command);
   console.log(res);

   return res;
}
//  Main program

function main(argnum,arglist)
{

   // The program requires 3 parameters at least plus the name of the program

   if(arglist.length<3) {
      syntax();
   }

   // Processing options

   arglist.shift();

   console.log("Png.js arguments: "+' '+arglist.join(' '));


   var mode=arglist.shift().trim();
   var sourcepath=arglist.shift();
   var filelist=" ";
   var weblist="";
   var count=0;

   
   if(mode==="list") {

      $_break0:while(arglist.length>0) {
         do {
            var fname=arglist.shift();
            weblist+=fname+"<br>";
            filelist+=buildPath(sourcepath,fname)+" ";
            count+=1;
         } while(false);
      }
   }   
   else {
      if(mode==="all") {

         var dlist=fs.readdirSync(sourcepath);
         console.log("Mode all,"+' '+dlist.length+' '+"files.");
         for(var fname in dlist) {
            fname=String(dlist[fname]);
            if(getExt(fname)!="png") {
               continue;
            }
            fname=buildPath(sourcepath,fname);
            if(scriptol.filetype(fname)==="file") {
               weblist+=fname+"<br>";
               filelist+=fname+" ";
               count+=1;
            }
         }
      }   
   else {
      console.log("Error"+' '+mode+' '+"unknow option.");
   }   }

   // Starting

   if(count>0) {
      var res=compressing(filelist);
      if(!res) {
         count=0;
      }
   }

   display(weblist+"<br>"+String(count)+" files compressed.");
   byeServer();

   return 0;
}
main(process.argv.length-1,process.argv.slice(1));



/* End */
