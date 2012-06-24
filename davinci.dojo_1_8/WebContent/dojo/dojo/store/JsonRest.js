/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/store/JsonRest",["../_base/xhr","../json","../_base/declare","./util/QueryResults"],function(_1,_2,_3,_4){var _5=null;return _3("dojo.store.JsonRest",_5,{constructor:function(_6){_3.safeMixin(this,_6);},target:"",idProperty:"id",get:function(id,_7){var _8=_7||{};_8.Accept=this.accepts;return _1("GET",{url:this.target+id,handleAs:"json",headers:_8});},accepts:"application/javascript, application/json",getIdentity:function(_9){return _9[this.idProperty];},put:function(_a,_b){_b=_b||{};var id=("id" in _b)?_b.id:this.getIdentity(_a);var _c=typeof id!="undefined";return _1(_c&&!_b.incremental?"PUT":"POST",{url:_c?this.target+id:this.target,postData:_2.stringify(_a),handleAs:"json",headers:{"Content-Type":"application/json",Accept:this.accepts,"If-Match":_b.overwrite===true?"*":null,"If-None-Match":_b.overwrite===false?"*":null}});},add:function(_d,_e){_e=_e||{};_e.overwrite=false;return this.put(_d,_e);},remove:function(id){return _1("DELETE",{url:this.target+id});},query:function(_f,_10){var _11={Accept:this.accepts};_10=_10||{};if(_10.start>=0||_10.count>=0){_11.Range=_11["X-Range"]="items="+(_10.start||"0")+"-"+(("count" in _10&&_10.count!=Infinity)?(_10.count+(_10.start||0)-1):"");}var _12=this.target.indexOf("?")>-1;if(_f&&typeof _f=="object"){_f=_1.objectToQuery(_f);_f=_f?(_12?"&":"?")+_f:"";}if(_10&&_10.sort){var _13=this.sortParam;_f+=(_f||_12?"&":"?")+(_13?_13+"=":"sort(");for(var i=0;i<_10.sort.length;i++){var _14=_10.sort[i];_f+=(i>0?",":"")+(_14.descending?"-":"+")+encodeURIComponent(_14.attribute);}if(!_13){_f+=")";}}var _15=_1("GET",{url:this.target+(_f||""),handleAs:"json",headers:_11});_15.total=_15.then(function(){var _16=_15.ioArgs.xhr.getResponseHeader("Content-Range");return _16&&(_16=_16.match(/\/(.*)/))&&+_16[1];});return _4(_15);}});});