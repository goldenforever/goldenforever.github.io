function makescrn(a,b) {
	$("#html").css("height",a+"px");
	$("#html").css("width",b+"px");
  $("#html").css("border-radius","0");
}
function makescreen() {
  makescrn(document.getElementById("height").value,document.getElementById("width").value);
}
function makecirclescreen() {
  makecirclescrn(document.getElementById("radius").value);
}
function makecirclescrn(radius) {
	$("#html").css("height",(2*radius)+"px");
	$("#html").css("width",(2*radius)+"px");
	$("#html").css("border-radius",(radius+"px"));
}
function parse(val) {
      var result = "Not found",
      tmp = [];
      location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
      });
      return result;
}
var h = parse("h");
var w = parse("w");
var r = parse("r");

if (r.length > 4) {
  if (w.length < 5 && h.length < 5) {  
    makescrn(h,w);
    $("#height").first().val(h);
    $("#width").first().val(w);
  }
} else {
  makecirclescrn(r);
  $("#radius").first().val(r);
}
