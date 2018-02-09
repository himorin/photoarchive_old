var def_global = 'config.json';
var conf_list = 'zz_donot_delete_list.json';
var conf_thumbwidth = 200;
var conf_disppadleft = 260;

var conf_global;

function DoInitialize {
  LoadGlobalConfig();
  LoadImageList();
}

function LoadGlobalConfig () {
  var httpReq = new XMLHttpRequest();
  httpReq.open('GET', def_global, false);
  httpReq.send();
  conf_global = undefined;
  if (httpReq.status === 200) {
    conf_global = JSON.parse(httpReq.responseText);
  } 
  if (conf_global === undefined) {
    console.log('failed to load collection name: ' + collection);
    window.alert('ERROR: Could not load site configuration.');
    return false;
  }
  document.getElementById('title').innerText = conf_global.site_title;
}

var cdilhtml = '';
var cwidth = 0;
function DisplayImageList (collection) {
  var httpReq = new XMLHttpRequest();
  httpReq.open('GET', collection + '.json', false);
  httpReq.send();
  var json_load = undefined;
  if (httpReq.status === 200) {
    json_load = JSON.parse(httpReq.responseText);
  } 
  if (json_load === undefined) {
    console.log('failed to load collection name: ' + collection);
    return false;
  }
  cwidth = document.getElementById('photoview').clientWidth;
  cwidth = Math.floor((cwidth - conf_disppadleft) / conf_thumbwidth);
  document.getElementById('photoview').innerHTML = '';
  cdilhtml = '';
  cdilhtml += '<div class="disp-title">' + json_load.title + '</div>';
  cdilhtml += '<div class="disp-desc">' + json_load.description + '</div>';
  cdilhtml += '<div class="disp-author">' + json_load.author + '</div>';
  document.getElementById('photoview').innerHTML += cdilhtml;
  cdilhtml = '';
  Object.keys(json_load.items).forEach(function (name) {
    cdilhtml += '<div class="photo-single">';
    cdilhtml += '<img src="thumb/' + name + '" onclick="DisplayImageOver(\'' + name + '\')">';
    cdilhtml += '<br />' + json_load.items[name].name + '</div>';
  });
  document.getElementById('photoview').innerHTML += cdilhtml;
}
function DisplayHide () {
  document.getElementById('img-overlay').style.display = 'none';
  document.getElementById('img-overlay-src').src = '';
}
function DisplayImageOver (name) {
  document.getElementById('img-overlay-src').src = 'orig/' + name;
  document.getElementById('img-overlay').style.display = 'block';
}

function LoadImageList () {
  var httpReq = new XMLHttpRequest();
  httpReq.open('GET', conf_list, false);
  httpReq.send();
  var json_load = undefined;
  if (httpReq.status === 200) {
    json_load = JSON.parse(httpReq.responseText);
  } 
  if (json_load === undefined) {
    console.log('failed to load collection name: ' + collection);
    return false;
  }
  Object.keys(json_load).forEach(function (name) {
    var cli = '';
    cli = '<li><a onclick="DisplayImageList(\'' + name + '\')">' + json_load[name].title + '</a></li>';
    document.getElementById('menu').innerHTML += cli;
  });
}

